// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    // Biến lưu trữ phí bản quyền (5%)
    uint256 public royaltyPercentage = 5;

    // Cấu trúc dữ liệu của 1 chiếc vé
    struct Ticket {
        uint256 originalPrice; // Giá gốc lúc mua từ BTC
        uint256 resalePrice; // Giá treo bán lại trên chợ đen
        bool isForSale; // Trạng thái vé có đang được rao bán không
    }

    // Mapping ánh xạ từ ID vé (tokenId) ra thông tin vé
    mapping(uint256 => Ticket) public tickets;

    // Khởi tạo tên Token và Ký hiệu (Bạn có thể đổi tên tùy ý)
    constructor() ERC721("VKU Event Ticket", "VKUT") Ownable(msg.sender) {}

    /**
     * @dev 1. HÀM MUA VÉ GỐC TỪ BAN TỔ CHỨC
     * Người dùng gọi hàm này kèm theo tiền (msg.value) để mua vé mới
     */
    function mintTicket(string memory uri) public payable returns (uint256) {
        require(msg.value > 0, "Gia ve phai lon hon 0");

        uint256 tokenId = _nextTokenId++;

        // Tạo NFT vé và gắn vào ví người mua
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri); // Link IPFS chứa hình ảnh vé

        // Lưu thông tin giá gốc để làm cơ sở tính giá trần sau này
        tickets[tokenId] = Ticket({
            originalPrice: msg.value,
            resalePrice: 0,
            isForSale: false
        });

        return tokenId;
    }

    /**
     * @dev 2. HÀM TREO BÁN LẠI VÉ (CHỐNG PHE VÉ)
     * Chủ vé muốn bán lại. Bị giới hạn giá không được quá 110% giá gốc.
     */
    function listTicketForSale(uint256 tokenId, uint256 price) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "Ban khong phai chu so huu ve nay"
        );

        Ticket storage ticket = tickets[tokenId];
        uint256 maxPrice = (ticket.originalPrice * 110) / 100; // Tối đa 110%

        require(
            price <= maxPrice,
            "Gia ban lai khong duoc vuot qua 110% gia goc"
        );
        require(price > 0, "Gia ban phai lon hon 0");

        ticket.resalePrice = price;
        ticket.isForSale = true;
    }

    /**
     * @dev 3. HÀM MUA VÉ TRÊN CHỢ ĐEN (CHIA % BẢN QUYỀN)
     * Người thứ 3 vào mua vé đang được treo bán.
     */
    function buyResaleTicket(uint256 tokenId) public payable {
        Ticket storage ticket = tickets[tokenId];
        require(ticket.isForSale == true, "Ve nay khong duoc rao ban");
        require(
            msg.value == ticket.resalePrice,
            "So tien thanh toan khong khop voi gia ban"
        );

        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "Ban khong the tu mua ve cua chinh minh");

        // Tính toán chia tiền
        uint256 royaltyAmount = (msg.value * royaltyPercentage) / 100; // 5% cho BTC
        uint256 sellerAmount = msg.value - royaltyAmount; // 95% cho Người bán

        // Cập nhật trạng thái vé: Hủy trạng thái đang bán, cập nhật lại giá gốc mới
        ticket.isForSale = false;
        ticket.originalPrice = msg.value; // Reset giá gốc thành giá mới nhất để làm mốc 110% cho lần bán sau
        ticket.resalePrice = 0;

        // Chuyển vé cho người mua mới (Lưu ý: dùng _transfer thay vì safeTransferFrom để tránh lỗi approval trong nội bộ contract)
        _transfer(seller, msg.sender, tokenId);

        // Chuyển tiền (tiền bản quyền về cho Chủ hợp đồng - BTC, tiền thừa cho người bán)
        payable(owner()).transfer(royaltyAmount);
        payable(seller).transfer(sellerAmount);
    }

    /**
     * @dev HÀM RÚT TIỀN CHO BAN TỔ CHỨC
     * BTC rút doanh thu bán vé gốc từ hợp đồng về ví của mình
     */
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Khong co tien de rut");
        payable(owner()).transfer(balance);
    }
}
