// ts-check
// User domain model

const fs = require('fs');
const path = require('path');

const { instance, Sequelize } = require('../database');
const { hashPassword, isValidHash } = require('../util/crypto');

/**
 * Get user by login info.
 * 
 * @param {String} login login details. Can be email or phone.
 * @param {String} password password details.
 * @return {Promise} A promise for the matching record.
 */
async function getByLoginInfo(login, password) {
    let user;

    // Try to find user with matching description
    try {
        user = await User.findOne({ where: { login } });
    } catch (e) {
        return Promise.reject(e);
    }

    // Return user info if password matches.
    // Return null otherwise.
    return user == null
        ? Promise.resolve(null)
        : isValidHash(password, user.dataValues.password).then(
            (validity) => {
                return validity
                    ? user.dataValues : null;
            });
}

const User = instance.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        } 
    }
});

// Hash user password before saving to the database
User.beforeCreate((user, _) => {
    return hashPassword(user['password'])
        .then((hashed) => user['password'] = hashed);
});

module.exports = { User, getByLoginInfo };
