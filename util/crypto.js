// Cryptography utilities

// Dependencies
const bcrypt = require('bcrypt');

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

module.exports = { hashPassword, isValidHash };
