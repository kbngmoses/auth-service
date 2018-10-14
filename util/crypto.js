// Cryptography utilities

// Dependencies
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const fs = require('fs');
const { defaultPrvKyPath } = require('../config/constants');

/**
 * Produces hash of the password.
 * 
 * @param {String} password password to hash.
 * @return {Promise} a hash promise.
 */
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (e, hashed) => {
            // encountered error(s)?
            if (e) {
                reject(e);
                return;
            }
            // resolve with an hash
            resolve(hashed);
        });
    });
}

/**
 * Checks validity of hash for the password.
 * 
 * @param {String} password password to compare against a hash
 * @param {String} hash immutable hash
 * @return {Promise} A boolean promise. 
 */
function isValidHash(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (e, validity) => {
            if (e) {
                reject(e);
            } else {
                resolve(validity);
            }
        });
    });
}

/**
 * Sign data and return a JWT token.
 * 
 * @param data {String} data to sign.
 * @returns {Promise} A promise of the signed token.
 */
function jwtSignDataRSA(data) {
    return new Promise((resolve) => {
        const prvtKyPath = process.env.PRIVATE_KEY_FILE || defaultPrvKyPath();
        if (!fs.existsSync(prvtKyPath)) {
            reject(`Path ${prvtKyPath} does not exist.`);
            return;
        }
        // Read key and sign user data.
        const key = fs.readFileSync(prvtKyPath).toString('utf8');
        const tkn = jsonWebToken.sign(data, key, { algorithm: 'RS256' });
        resolve(tkn);
    });
}
// h, i, j :)
module.exports = { hashPassword, isValidHash, jwtSignDataRSA };
