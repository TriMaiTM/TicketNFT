// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract TicketNFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _nextTokenId;

    // Mapping to store original mint price of each ticket
    mapping(uint256 => uint256) public originalPrices;

    constructor() ERC721("VKU Event Ticket", "VKUT") Ownable(msg.sender) {
        // Sets default royalty to 5% (500 basis points) for the contract creator
        _setDefaultRoyalty(msg.sender, 500);
    }

    /**
     * @dev Mint a new ticket with an associated IPFS metadata URI.
     * User pays the initial ticket price (msg.value) to the organizer.
     */
    function mintTicket(string memory uri) public payable returns (uint256) {
        require(msg.value > 0, "Gia ve phai lon hon 0");

        uint256 tokenId = _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        // Record the original price so the marketplace knows the base price cap
        originalPrices[tokenId] = msg.value;

        return tokenId;
    }

    /**
     * @dev Expose the original mint price for external marketplaces.
     */
    function getOriginalPrice(uint256 tokenId) external view returns (uint256) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return originalPrices[tokenId];
    }

    /**
     * @dev Allows the organizer (owner) to withdraw the revenue from direct ticket sales.
     */
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Khong co tien de rut");
        payable(owner()).transfer(balance);
    }

    // --- Override required functions due to multiple inheritance ---

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
