// Application entry point

const express = require('express');

const app = express();

// Map every request begining with /api to the routes
app.use('/api', require('./routes'));

module.exports = app;
