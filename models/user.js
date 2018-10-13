// ts-check
// User domain model

const fs = require('fs');
const path = require('path');

const { instance, Sequelize } = require('../database');

/**
 * Get user by login info.
 * 
 * @param {String} login login details. Can be email or phone.
 * @param {String} password password details.
 * @return {Promise} A promise for the matching record.
 */
function getByLoginInfo(login, password) {
    return User.findOne({ where: { login, password } });
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
});

module.exports = { User, getByLoginInfo };
