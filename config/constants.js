
// Default database path.
const DEFAULT_DATABASE_URL = 'sqlite:../auth.db';

// Prefer value from env than default one.
const DATABASE_URL = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

module.exports = { DATABASE_URL };