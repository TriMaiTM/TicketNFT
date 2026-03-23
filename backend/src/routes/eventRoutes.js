const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve a list of events
 *     description: Retrieve a list of events from the database.
 *     responses:
 *       200:
 *         description: A list of events.
 */
router.get('/', eventController.getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve a single event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A single event object.
 */
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);

module.exports = router;
