import { expect } from "chai";
import { ethers } from "hardhat";

describe("TicketNFT (Core Ownership & Minting)", function () {
    let ticket: any;
    let owner: any;
    let user1: any;

    beforeEach(async function () {
        [owner, user1] = await ethers.getSigners();
        const TicketNFT = await ethers.getContractFactory("TicketNFT");
        ticket = await TicketNFT.deploy();
        await ticket.waitForDeployment();
    });

    it("should mint a ticket, assign ownership, and record original price", async function () {
        const mintPrice = ethers.parseEther("1.0");
        const tx = await ticket.connect(user1).mintTicket("ipfs://event-ticket-metadata", { value: mintPrice });
        await tx.wait();

        const ownerOfToken0 = await ticket.ownerOf(0);
        expect(ownerOfToken0).to.equal(user1.address);

        const recordedPrice = await ticket.getOriginalPrice(0);
        expect(recordedPrice).to.equal(mintPrice);
    });

    it("should configure ERC2981 royalties properly (5%)", async function () {
        const mintPrice = ethers.parseEther("1.0");
        await ticket.connect(user1).mintTicket("ipfs://event-ticket-metadata", { value: mintPrice });

        const resaleValue = ethers.parseEther("2.0");
        // Check royalty amount at 5% of 2 ETH = 0.1 ETH
        const [receiver, royaltyAmount] = await ticket.royaltyInfo(0, resaleValue);

        expect(receiver).to.equal(owner.address);
        expect(royaltyAmount).to.equal(ethers.parseEther("0.1"));
    });
});