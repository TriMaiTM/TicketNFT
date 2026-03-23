const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./src/config/db');

// Models
const User = require('./src/models/User');
const Event = require('./src/models/Event');
const Ticket = require('./src/models/Ticket');
const Listing = require('./src/models/Listing');

const mockWallet = '0x1234567890abcdef1234567890abcdef12345678';

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing
    await User.deleteMany();
    await Event.deleteMany();
    await Ticket.deleteMany();
    await Listing.deleteMany();

    console.log('Database cleared. Seeding...');

    // 1. Create User
    const user = await User.create({
      walletAddress: mockWallet,
      role: 'ORGANIZER',
      name: 'Cyber Sonic Organizer'
    });

    // 2. Create Events
    const events = await Event.insertMany([
      {
        title: 'Neon Pulse Tokyo',
        description: 'Immerse yourself in the ultimate fusion of generative art and rhythmic precision.',
        date: new Date('2024-10-24T20:00:00Z'),
        location: 'Tokyo Cyberdistrict',
        totalTickets: 500,
        ticketsSold: 50,
        priceEth: 0.45,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxhd1JSfQLuah8r1jYMfc-X-vKX49qCW0r-LQ1GP-649STld8WWqddQ4tULFtvkhiCxe8TA1E8Unw8CT3xZnyjc9q6rdcIKLpQ7o8MMmjsgU8h4P-E0FjdWkrMX-vPJy9nTzfKlaJrW6-8F0-6yibVVy-zMWJQv0KGLcy6mrRZ6XWpZCkx_7wHzsjvXBiZTJ9luK73-UtSRGpvWsJm1e9L0Lt9bMavWrViGj9An1OSBm3VdMiK_l0R8xXm1Wv57rBZNnqmqLCdarVt',
        category: 'Music & Concerts',
        organizer: user._id
      },
      {
        title: 'Meta-Logic Summit',
        description: 'The world\'s first fully tokenized immersive tech festival.',
        date: new Date('2024-11-15T09:00:00Z'),
        location: 'Virtual Arena',
        totalTickets: 1000,
        ticketsSold: 800,
        priceEth: 0.12,
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhx2yBpiMctL8x--EoFFkiC8DhiCG3RpN1Rz3a-tXWDfhoRUG55nigR45uDijFSyI4cWiO2UMl4wg5cOOG2e-kirymeI7OmZjJFvdC9AyfqIK9U6SZsnqcZ0Lf-rHazE7aPaiTVv5rlsaBNYbkRm0KNAWngUdTAe2w6sLXMEHDb68aWO6MVsjaZ5NOVrtfWYGmUZZYiTb6z_y6dagtgoWzOpHPF0lN6Tc9fZf-zt09L8TWFW9K0BcA2o9oBYDIGFNTsckrxEjEhmSX',
        category: 'Tech Conferences',
        status: 'UPCOMING',
        organizer: user._id
      }
    ]);

    // 3. Create active Tickets (owned by someone)
    const tickets = await Ticket.insertMany([
      {
        tokenId: 1,
        eventId: events[0]._id,
        ownerAddress: mockWallet,
        status: 'VALID',
        purchasePriceEth: 0.45
      },
      {
        tokenId: 2,
        eventId: events[1]._id,
        ownerAddress: mockWallet,
        status: 'VALID',
        purchasePriceEth: 0.12
      }
    ]);

    // 4. Create Active Listings on Marketplace
    await Listing.create({
      listingId: 1,
      ticketId: tickets[0]._id,
      sellerAddress: mockWallet,
      priceEth: 0.85,
      status: 'ACTIVE'
    });

    console.log('Database Seeding Completed!');
    process.exit(0);

  } catch (err) {
    console.error('Error seeding DB:', err);
    process.exit(1);
  }
};

seedData();
