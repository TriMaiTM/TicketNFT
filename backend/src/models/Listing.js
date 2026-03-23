const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  listingId: {
    type: Number,
    // Smart contract listing ID, populated when created on-chain
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true,
  },
  sellerAddress: {
    type: String,
    required: true,
    lowercase: true,
  },
  priceEth: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'SOLD', 'CANCELLED'],
    default: 'ACTIVE',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  soldAt: {
    type: Date,
  }
});

module.exports = mongoose.model('Listing', ListingSchema);
