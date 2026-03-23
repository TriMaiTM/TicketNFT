import { Contract, type Signer } from 'ethers';
import { TICKET_NFT_ADDRESS, MARKETPLACE_ADDRESS, ticketNFTABI, marketplaceABI } from '../config/contracts';

export const getTicketNFTContract = (signer: Signer) => {
  return new Contract(TICKET_NFT_ADDRESS, ticketNFTABI, signer);
};

export const getMarketplaceContract = (signer: Signer) => {
  return new Contract(MARKETPLACE_ADDRESS, marketplaceABI, signer);
};
