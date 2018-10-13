// Authentication Service

const router = require('express').Router();
const bodyParser = require('body-parser');

const { jwtSignDataRSA } = require('../../util/crypto');
const {getByLoginInfo} = require('../../models/user');

// Perform user authentication
router.post('/', bodyParser.json(), async (req, res) => {
    const { login, password } = req.body;
    let user;
    try {
        user = await getByLoginInfo(login, password);
        // user not found?
        if (user == null) {
            return res.status(401).json({ 'error': 'Invalid email or password.' });
        }
        let token = await jwtSignDataRSA(JSON.stringify(user));
        return res.json({ token });
    } catch(e) {
        console.error(e);
        return res.status(500).json({ 'error': 'Internal Server Error' });
    }
});

module.exports = router;
