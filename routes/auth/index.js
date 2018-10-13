// Authentication Service

const router = require('express').Router();
const fs = require('fs');
const User = require('../../modes/user');
const bodyParser = require('body-parser');

// Perform user authentication
router.post('/', bodyParser.json(), (req, res) => {
    const { login, password } = req.body;
    const user = User.getByLoginInfo(login, password);
    // user not found?
    if (user == null) {
        return res.status(401).json({ 'error': 'Invalid email or password.' });
    }
    return res.json(user);
});

module.exports = router;
