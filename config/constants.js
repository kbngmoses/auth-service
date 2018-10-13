const path = require('path');
const homedir = require('os').homedir();

// Default database path.
const DEFAULT_DATABASE_URL = 'sqlite:../auth.db';

// Prefer value from env than default one.
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

// Path to private key
const  defaultPrvKyPath = () => {
    return path.join(homedir, '.ssh', 'id_rsa');
};

module.exports = { DATABASE_URL, defaultPrvKyPath };
