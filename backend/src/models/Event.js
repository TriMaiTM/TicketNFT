const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  totalTickets: {
    type: Number,
    required: true,
  },
  ticketsSold: {
    type: Number,
    default: 0,
  },
  priceEth: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  contractAddress: {
    type: String,
    // Optional initially, updated after deployment
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    enum: ['Music & Concerts', 'Sports & Esports', 'Tech Conferences', 'Art Galleries'],
    default: 'Music & Concerts',
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'LIVE', 'ENDED', 'CANCELLED'],
    default: 'UPCOMING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Event', EventSchema);
