
const db = require('../helper/db')

async function getUserIdbyUuid(userUuid) {
    let rawQuery = `
        SELECT
            u.user_id AS "userId"
        FROM tbl_users u
        WHERE u.user_uuid = $1
            AND u.delete_flag = 0
    `

    const result = await db.query(rawQuery, [userUuid])
    return result[0] ? result[0].userId : undefined
}

async function getUserByUsername(username) {
    const rawQuery = `
        SELECT username, password, user_id
        FROM tbl_users
        WHERE username = $1
    `
    const result = await db.query(rawQuery, [username])
    return result[0] ? result[0] : { username: null, password: null, user_id: null }
}

module.exports = {
    getUserIdbyUuid,
    getUserByUsername
}