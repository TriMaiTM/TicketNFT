const Listing = require('../models/Listing');
const Ticket = require('../models/Ticket');

exports.getActiveListings = async (req, res) => {
  try {
    // Populate the ticket and the inner event associated with the ticket
    const listings = await Listing.find({ status: 'ACTIVE' }).populate({
      path: 'ticketId',
      populate: { path: 'eventId' }
    });
    res.status(200).json({ success: true, count: listings.length, data: listings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listTicket = async (req, res) => {
  try {
    const { ticketId, priceEth, sellerAddress } = req.body;
    
    if (!ticketId || !priceEth || !sellerAddress) {
      return res.status(400).json({ success: false, error: 'ticketId, priceEth, and sellerAddress are required' });
    }

    const newListing = await Listing.create({
      ticketId,
      priceEth,
      sellerAddress: sellerAddress.toLowerCase(),
      status: 'ACTIVE'
    });

    res.status(201).json({ success: true, data: newListing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.buyTicket = async (req, res) => {
  try {
    const { listingId, buyerAddress } = req.body;

    if (!listingId || !buyerAddress) {
      return res.status(400).json({ success: false, error: 'listingId and buyerAddress are required' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ success: false, error: 'Listing not found' });
    }

    if (listing.status !== 'ACTIVE') {
      return res.status(400).json({ success: false, error: 'Listing is not active' });
    }

    // Mark listing as sold
    listing.status = 'SOLD';
    listing.soldAt = Date.now();
    await listing.save();

    // Update ticket owner
    const ticket = await Ticket.findById(listing.ticketId);
    if (ticket) {
      ticket.ownerAddress = buyerAddress.toLowerCase();
      await ticket.save();
    }

    res.status(200).json({ success: true, data: listing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
