import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TicketNFTModule = buildModule("TicketNFTModule", (m) => {
    // m.contract() sẽ ra lệnh cho Hardhat lấy file TicketNFT.sol ra và deploy
    const ticketNFT = m.contract("TicketNFT");

    return { ticketNFT };
});

export default TicketNFTModule;