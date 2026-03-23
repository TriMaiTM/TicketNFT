import TicketNFTABI from '../contracts/TicketNFT.json';
import TicketMarketplaceABI from '../contracts/TicketMarketplace.json';

// IMPORTANT: Replace these with the actual deployed addresses from Hardhat localhost
export const TICKET_NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const MARKETPLACE_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const ticketNFTABI = TicketNFTABI.abi;
export const marketplaceABI = TicketMarketplaceABI.abi;
