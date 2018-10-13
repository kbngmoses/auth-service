// Entry point for the routes
const express = require('express');

// Get and configure the router
const router = express.Router();

// authentication api
router.use('/auth', require('./auth'));

module.exports = router;
