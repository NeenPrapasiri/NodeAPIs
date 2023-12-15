const pgp = require('pg-promise')();
const db = pgp('postgres://user_1:P@ssW0rd1@postgres:5432/pg_db');

async function query(rawQuery, values = []) {
    try {
        if (values.length > 0) {
            return await db.query(rawQuery, values)
        } else {
            return await db.query(rawQuery)
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    query,
}