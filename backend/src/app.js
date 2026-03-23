const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const eventRoutes = require('./routes/eventRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');

// Basic health route
app.get('/health', (req, res) => {
  res.json({ status: 'API is running...' });
});

// API Routes
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/marketplace', marketplaceRoutes);

// Setup Swagger UI Documentation
const setupSwagger = require('./config/swagger');
setupSwagger(app);

module.exports = app;
