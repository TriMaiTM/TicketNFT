const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    // Will be populated once minted on-chain
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  ownerAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ['MINTING', 'VALID', 'USED', 'REVOKED'],
    default: 'MINTING',
  },
  purchasePriceEth: {
    type: Number,
  },
  metadataUrl: {
    type: String,
    // URL to the IPFS metadata file
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
