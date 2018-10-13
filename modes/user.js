// ts-check
// User domain model

const fs = require('fs');
const path = require('path');

module.exports = class User {

    constructor({firstName, lastName, login, password}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.password = password;
    }

    /**
     * Create user from json data.
     * 
     * @param {Object} json json data.
     */
    static fromJson(json) {
        return new User(json);
    }

    /**
     * Get user by login credentials
     * 
     * @param {String} login login details - can either be email or phone number
     * @param {String} password user password. 
     */
    static getByLoginInfo(login, password) {
        const users = [].concat(JSON.parse( // we're using [].concat in order to make IDE happy
            fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'users.json'))));
        // find and return user with the matching login details
        const matching = users.find(
            (user) => user['login'] === login && user['password'] === password);
        return matching;
    }

    // Get user full name
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
