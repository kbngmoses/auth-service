// Authentication Service

const router = require('express').Router();
const fs = require('fs');
const {getByLoginInfo} = require('../../models/user');
const bodyParser = require('body-parser');

// Perform user authentication
router.post('/', bodyParser.json(), async (req, res) => {
    const { login, password } = req.body;
    let user;
    try {
        user = await getByLoginInfo(login, password);
    } catch(e) {
        console.error(e);
        return res.status(500).json({ 'error': 'Internal Server Error' });
    }
    // user not found?
    if (user == null) {
        return res.status(401).json({ 'error': 'Invalid email or password.' });
    }
    return res.json(user);
});

module.exports = router;
