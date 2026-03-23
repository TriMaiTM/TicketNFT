const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');

router.get('/', marketplaceController.getActiveListings);

module.exports = router;
