import { expect } from "chai";
import hre from "hardhat";
import { parseEther, formatEther } from "ethers";

describe("Hệ Thống Bán Vé NFT", function () {
    it("Nghiệp vụ: Mua vé -> Treo bán chợ đen -> Chia 5% Bản quyền", async function () {
        // 1. Kết nối tới mạng Hardhat và lấy ethers (Hardhat v3 API)
        const connection = await hre.network.connect();
        const ethers = connection.ethers;

        // Hardhat cung cấp sẵn các ví ảo (Signers) để test
        const [organizer, user1, user2] = await ethers.getSigners();

        // 2. Triển khai hợp đồng (Deploy)
        const TicketNFT = await ethers.getContractFactory("TicketNFT");
        const ticket = await TicketNFT.deploy();

        console.log("-------------------------------------------------");
        console.log("👉 KỊCH BẢN 1: USER 1 MUA VÉ GỐC");
        // User 1 gọi hàm mintTicket và trả 1 ETH
        const mintPrice = parseEther("1.0");
        await ticket.connect(user1).mintTicket("ipfs://link-anh-ve", { value: mintPrice });

        expect(await ticket.ownerOf(0)).to.equal(user1.address);
        console.log(`✅ User 1 (Ví: ${user1.address.slice(0, 6)}...) đã mua Vé số 0 thành công!`);

        console.log("-------------------------------------------------");
        console.log("👉 KỊCH BẢN 2: USER 1 TREO BÁN LẠI VÉ TRÊN CHỢ");
        // User 1 bán lại giá 1.1 ETH (Đúng luật <= 110% của 1 ETH)
        const resalePrice = parseEther("1.1");
        await ticket.connect(user1).listTicketForSale(0, resalePrice);
        console.log("✅ User 1 đã treo bán Vé số 0 với giá 1.1 ETH!");

        console.log("-------------------------------------------------");
        console.log("👉 KỊCH BẢN 3: USER 2 MUA LẠI VÉ VÀ CHIA TIỀN TỰ ĐỘNG");

        // Ghi nhận số dư ví Ban Tổ Chức (Organizer) TRƯỚC khi User 2 mua
        const organizerBalanceBefore = await ethers.provider.getBalance(organizer.address);

        // User 2 thanh toán 1.1 ETH để mua lại vé
        await ticket.connect(user2).buyResaleTicket(0, { value: resalePrice });

        // Kiểm tra xem vé đã sang tay User 2 chưa
        expect(await ticket.ownerOf(0)).to.equal(user2.address);
        console.log(`✅ Vé số 0 đã được sang tên cho User 2 (Ví: ${user2.address.slice(0, 6)}...)`);

        // Ghi nhận số dư ví Ban Tổ Chức SAU khi User 2 mua
        const organizerBalanceAfter = await ethers.provider.getBalance(organizer.address);

        // Tính toán tiền bản quyền nhận được
        const royaltyEarned = organizerBalanceAfter - organizerBalanceBefore;
        console.log(`💰 Ban Tổ Chức nhận được phí bản quyền tự động: ${formatEther(royaltyEarned)} ETH`);
        console.log("-------------------------------------------------");
    });
});