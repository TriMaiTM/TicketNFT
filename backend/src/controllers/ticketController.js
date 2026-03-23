const Ticket = require('../models/Ticket');

exports.getMyTickets = async (req, res) => {
  try {
    // In a real app with auth middleware, you'd use req.user.walletAddress
    // For now, we simulate by accepting it from the query params
    const { walletAddress } = req.query;
    if (!walletAddress) {
      return res.status(400).json({ success: false, error: 'walletAddress query parameter is required' });
    }

    const tickets = await Ticket.find({ ownerAddress: walletAddress.toLowerCase() }).populate('eventId');
    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('eventId');
    if (!ticket) {
      return res.status(404).json({ success: false, error: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
