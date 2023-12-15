const pgp = require('pg-promise')();
const db = pgp(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB_NAME}`);

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