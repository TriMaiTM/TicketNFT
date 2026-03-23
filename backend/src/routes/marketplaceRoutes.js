const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

router.get('/', marketplaceController.getActiveListings);

router.post('/list', marketplaceController.listTicket);
router.post('/buy', marketplaceController.buyTicket);

module.exports = router;
