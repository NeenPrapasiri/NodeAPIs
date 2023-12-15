const db = require('../helper/db')

async function createCommentOnBoard(cooment, boardId, userId) {
    let rawQuery = `
        INSERT INTO
        tbl_board_comment("board_id", "comment", "user_id", "delete_flag")
        VALUES($1, $2, $3, $4)
        RETURNING comment_uuid
    `
    const result = await db.query(rawQuery, [boardId, cooment, userId, 0])
    return result[0] ? true : false
}

async function updateCommentOnBoard(dataUpdate) {
    const { comment, commentUuid } = dataUpdate

    let rawQuery = `
        UPDATE tbl_board_comment
        SET 
            comment = $1,
            update_dt = NOW()
        WHERE
            comment_uuid = $2
        RETURNING comment_uuid
    `
    const result = await db.query(rawQuery, [comment, commentUuid])
    return result[0] ? true : false
}

async function deleteCommentOnBoard(commentUuid) {
    let rawQuery = `
        UPDATE tbl_board_comment
        SET 
            delete_flag = 1,
            update_dt = NOW()
        WHERE
            comment_uuid = $1
        RETURNING comment_uuid
    `
    const result = await db.query(rawQuery, [commentUuid])
    return result[0] ? true : false
}

async function getCommentBoardList(boardId) {
    let rawQuery = `
        SELECT
            bc.comment_uuid AS "commentUuid",
            bc.comment,
            bc.create_dt AS "createDt",
            u.user_uuid AS "userUuid",
            CONCAT(u.first_name, ' ', u.last_name) AS userName
        FROM tbl_board_comment bc
        JOIN tbl_users u ON u.user_id = bc.user_id
        WHERE bc.board_id = $1
            AND bc.delete_flag = 0
    `
    const result = await db.query(rawQuery, [boardId])
    return result[0] ? result : []
}

module.exports = {
    createCommentOnBoard,
    updateCommentOnBoard,
    deleteCommentOnBoard,
    getCommentBoardList
}