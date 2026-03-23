import hre from "hardhat";
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TicketNFT
  const TicketNFT = await ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();
  await ticketNFT.waitForDeployment();
  const nftAddress = await ticketNFT.getAddress();
  console.log("TicketNFT deployed to:", nftAddress);

  // Deploy TicketMarketplace
  const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace");
  const marketplace = await TicketMarketplace.deploy();
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("TicketMarketplace deployed to:", marketplaceAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
