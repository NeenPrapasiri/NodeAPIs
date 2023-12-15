const db = require('../helper/db')

async function createBoardLog(dataLog) {
    const { boardId, status, topic, detail } = dataLog
    let rawQuery = `
        INSERT INTO
        tbl_board_log("board_id", "status", "topic", "detail")
        VALUES($1, $2, $3, $4)
        RETURNING board_log_id
    `
    const result = await db.query(rawQuery, [boardId, status, topic, detail])
    return result[0] ? true : false
}

async function geBoardListLog(boardId) {
    let rawQuery = `
        SELECT
            board_id,
            status,
            topic,
            detail,
            create_dt
        FROM tbl_board_log 
        WHERE board_id = $1
            AND delete_flag = 0
    `
    const result = await db.query(rawQuery, [boardId])
    return result[0] ? result : []
}

module.exports = {
    createBoardLog,
    geBoardListLog
}