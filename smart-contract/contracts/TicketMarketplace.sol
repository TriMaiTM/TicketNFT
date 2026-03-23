// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ITicketNFT is IERC721, IERC2981 {
    function getOriginalPrice(uint256 tokenId) external view returns (uint256);
}

contract TicketMarketplace is ReentrancyGuard {

    struct Listing {
        address seller;
        uint256 price;
        bool isActive;
    }

    // nftContract => tokenId => Listing
    mapping(address => mapping(uint256 => Listing)) public listings;

    // Last recorded sale price on the marketplace to enforce dynamic price caps
    // nftContract => tokenId => price
    mapping(address => mapping(uint256 => uint256)) public lastSalePrice;

    event TicketListed(address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event TicketSold(address indexed nftContract, uint256 indexed tokenId, address buyer, uint256 price);
    event ListingCancelled(address indexed nftContract, uint256 indexed tokenId, address seller);

    /**
     * @dev List a ticket for sale on the secondary market.
     * Enforces a maximum price cap of 110% of the last sale price (or original mint price).
     */
    function listTicket(address nftContract, uint256 tokenId, uint256 price) external {
        ITicketNFT nft = ITicketNFT(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Ban khong phai chu so huu ve nay");
        require(nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "Marketplace chua duoc approve");
        require(price > 0, "Gia ban phai lon hon 0");

        // Determine base price for the cap
        uint256 basePrice = lastSalePrice[nftContract][tokenId];
        if (basePrice == 0) {
            basePrice = nft.getOriginalPrice(tokenId);
        }

        uint256 maxPrice = (basePrice * 110) / 100;
        require(price <= maxPrice, "Gia ban lai khong duoc vuot qua 110% gia moc chot");

        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            price: price,
            isActive: true
        });

        emit TicketListed(nftContract, tokenId, msg.sender, price);
    }

    /**
     * @dev Cancel an active listing.
     */
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.isActive, "Ve nay khong duoc rao ban");
        require(listing.seller == msg.sender, "Chi co nguoi ban moi co the huy");

        delete listings[nftContract][tokenId];
        emit ListingCancelled(nftContract, tokenId, msg.sender);
    }

    /**
     * @dev Buy a ticket from the marketplace.
     * Calculates royalty via ERC2981, transfers funds, and transfers the NFT.
     */
    function buyTicket(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.isActive, "Ve nay khong duoc rao ban");
        require(msg.value == listing.price, "So tien thanh toan khong khop voi gia ban");
        require(msg.sender != listing.seller, "Ban khong the tu mua ve cua chinh minh");

        ITicketNFT nft = ITicketNFT(nftContract);
        // Ensure seller still owns the token
        require(nft.ownerOf(tokenId) == listing.seller, "Nguoi ban khong con so huu ve nay");

        // Remove listing
        delete listings[nftContract][tokenId];

        // Process Royalties
        (address royaltyReceiver, uint256 royaltyAmount) = nft.royaltyInfo(tokenId, msg.value);
        uint256 sellerAmount = msg.value - royaltyAmount;

        // Update the last sale price to the new successful sale
        lastSalePrice[nftContract][tokenId] = msg.value;

        // Transfer NFT
        nft.safeTransferFrom(listing.seller, msg.sender, tokenId);

        // Transfer ETH
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            payable(royaltyReceiver).transfer(royaltyAmount);
        }
        payable(listing.seller).transfer(sellerAmount);

        emit TicketSold(nftContract, tokenId, msg.sender, msg.value);
    }
}
