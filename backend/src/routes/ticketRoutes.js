const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/my-tickets', ticketController.getMyTickets);
router.get('/:id', ticketController.getTicketById);

module.exports = router;
