const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const candidateRoutes = require('./routes/candidates');
const pipelineRoutes = require('./routes/pipeline');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/candidates', candidateRoutes);
app.use('/api/pipeline', pipelineRoutes);

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = app;