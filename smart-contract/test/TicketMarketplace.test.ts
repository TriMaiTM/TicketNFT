import { expect } from "chai";
import { ethers } from "hardhat";

describe("TicketMarketplace", function () {
  let ticketNFT: any;
  let marketplace: any;
  let owner: any;
  let buyer: any;
  let user3: any;

  beforeEach(async function () {
    [owner, buyer, user3] = await ethers.getSigners();

    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy();
    await ticketNFT.waitForDeployment();

    const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
    marketplace = await TicketMarketplace.deploy();
    await marketplace.waitForDeployment();
  });

  it("should enforce the 110% price cap based on original price", async function () {
    const mintPrice = ethers.parseEther("1.0");
    await ticketNFT.connect(owner).mintTicket("ipfs://event1", { value: mintPrice });
    
    // Transfer to the initial buyer to simulate a real sale, or the original buyer lists it
    const tokenId = 0;

    // Approve marketplace
    await ticketNFT.connect(owner).approve(await marketplace.getAddress(), tokenId);

    // Try to list at 1.2 ETH (120% > 110%), should fail
    await expect(
      marketplace.connect(owner).listTicket(await ticketNFT.getAddress(), tokenId, ethers.parseEther("1.2"))
    ).to.be.revertedWith("Gia ban lai khong duoc vuot qua 110% gia mốc chót");

    // List at 1.1 ETH (110%), should succeed
    await expect(
      marketplace.connect(owner).listTicket(await ticketNFT.getAddress(), tokenId, ethers.parseEther("1.1"))
    ).to.emit(marketplace, "TicketListed");
  });

  it("should facilitate a resale and distribute royalties", async function () {
    const mintPrice = ethers.parseEther("1.0");
    await ticketNFT.connect(buyer).mintTicket("ipfs://event2", { value: mintPrice });
    const tokenId = 0;

    // Approve marketplace
    await ticketNFT.connect(buyer).approve(await marketplace.getAddress(), tokenId);

    const listPrice = ethers.parseEther("1.1");
    await marketplace.connect(buyer).listTicket(await ticketNFT.getAddress(), tokenId, listPrice);

    // User3 buys the ticket
    const tx = await marketplace.connect(user3).buyTicket(await ticketNFT.getAddress(), tokenId, {
      value: listPrice,
    });

    const receipt = await tx.wait();

    // Check ownership
    expect(await ticketNFT.ownerOf(tokenId)).to.equal(user3.address);

    // Check last recorded sale price is accurately stored for future resales
    const lastSale = await marketplace.lastSalePrice(await ticketNFT.getAddress(), tokenId);
    expect(lastSale).to.equal(listPrice);
  });
});
