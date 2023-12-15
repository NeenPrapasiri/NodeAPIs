const db = require('../helper/db')

async function createBoard(dataCreate, userId) {
    const { topic, detail } = dataCreate

    let rawQuery = `
        INSERT INTO
            tbl_board("status", "topic", "detail", "archive", "create_by")
        VALUES($1, $2, $3, $4, $5)
        RETURNING board_uuid
    `
    const result = await db.query(rawQuery, [1, topic, detail, 0, userId])
    return result[0] ? true : false
}


async function updateBoard(dataUpdate) {
    const { topic, detail, status, archive = 0, boardUuid } = dataUpdate

    let rawQuery = `
        UPDATE tbl_board
        SET 
            status = $1,
            topic = $2,
            detail = $3,
            archive = $4,
            update_dt = NOW()
        WHERE
            board_uuid = $5
        RETURNING board_uuid
    `
    const result = await db.query(rawQuery, [status, topic, detail, archive, boardUuid])
    return result[0] ? true : false
}

async function getBoardIdByUuid(boardUuid) {
    let rawQuery = `
        SELECT
            board_id AS "boardId"
        FROM tbl_board
        WHERE board_uuid = $1
    `

    const result = await db.query(rawQuery, [boardUuid])
    return result[0] ? result[0].boardId : undefined
}

async function getBoardList(viewMore) {
    let rawQuery = `
        SELECT
            b.board_uuid AS "boardUuid",
            b.topic,
            b.detail,
            b.create_dt AS "createDt",
            b.status,
            CONCAT(u.first_name, ' ', u.last_name) AS userName
        FROM tbl_board b
        JOIN tbl_users u ON u.user_id = b.create_by
        WHERE b.archive = 0
        ORDER BY b.create_dt ASC
    `
    if (!viewMore) {
        rawQuery += `LIMIT 3`
    }

    const result = await db.query(rawQuery)
    return result[0] ? result : []
}

async function getBoardDetail(boardUuid) {
    let rawQuery = `
        SELECT
            b.board_uuid AS "boardUuid",
            b.board_id AS "boardId",
            b.topic,
            b.detail,
            b.create_dt AS "createDt",
            b.status,
            CONCAT(u.first_name, ' ', u.last_name) AS userName
        FROM tbl_board b
        JOIN tbl_users u ON u.user_id = b.create_by
        WHERE b.board_uuid = $1
    `
    const result = await db.query(rawQuery, [boardUuid])
    return result[0] ? result : []
}




module.exports = {
    createBoard,
    getBoardIdByUuid,
    getBoardList,
    getBoardDetail,
    updateBoard,
}