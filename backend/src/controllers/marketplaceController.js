const Listing = require('../models/Listing');

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
