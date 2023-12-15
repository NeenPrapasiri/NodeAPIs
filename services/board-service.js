const { success, failure } = require('../helper/http-response')
const boardData = require('../data/board-data')
const boardLogData = require('../data/board-log-data')
const commentBoard = require('../data/comment-board')
const usersData = require('../data/users-data')


async function getBoardListService(viewMore) {
    try {
        const boardList = await boardData.getBoardList(viewMore)
        if (boardList.length == 0) return success([], 'getBoardListService success')

        return success(boardList, 'Get Board List Success')
    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function getBoardDetailService(boardUuid) {
    try {
        const boardDetail = await boardData.getBoardDetail(boardUuid)
        if (boardDetail.length == 0) return success([], 'Get Board Detail Success')

        return success(boardDetail, 'Get Board Detail Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function createBoardService(bodyData) {
    try {
        const { userUuid } = bodyData
        const userId = await usersData.getUserIdbyUuid(userUuid)
        if (!userId) return failure(404, null, 'user not found')

        const inserted = await boardData.createBoard(bodyData, userId)
        if (!inserted) return failure(400, null, 'Failed to insert data into the database')

        return success([], 'Create Board Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function updateBoardService(bodyData) {
    try {
        const beforeUpdate = await boardData.getBoardDetail(bodyData.boardUuid)
        if (!beforeUpdate) return failure(404, null, 'board uuid not found ')
        await boardLogData.createBoardLog(beforeUpdate[0])

        const updated = await boardData.updateBoard(bodyData)
        if (!updated) return failure(404, null, 'board uuid not found ')

        return success([], 'Update Board Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function getCommentBoardListService(queryData) {
    try {
        const { boardUuid, userUuid } = queryData
        const boardId = await boardData.getBoardIdByUuid(boardUuid)
        if (!boardId) return failure(404, null, 'board uuid not found ')

        const commentList = await commentBoard.getCommentBoardList(boardId)
        const result = commentList.map((item) => ({
            comment: item.comment,
            commentOwner: item.userUuid === userUuid ? true : false,
            createDt: item.createDt,
            commentUuid: item.commentUuid

        }));
        return success(result, 'get comment list Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function createCommentOnBoardService(bodyData) {
    try {
        const { comment, boardUuid, userUuid } = bodyData
        const userId = await usersData.getUserIdbyUuid(userUuid)
        if (!userId) return failure(404, null, 'user not found')

        const boardId = await boardData.getBoardIdByUuid(boardUuid)
        if (!boardId) return failure(404, null, 'board uuid not found ')

        const inserted = await commentBoard.createCommentOnBoard(comment, boardId, userId)
        if (!inserted) return failure(400, null, 'Failed to insert data into the database')

        return success([], 'Create comment on board Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}


async function updateCommentOnBoardService(bodyData) {
    try {
        const updated = await commentBoard.updateCommentOnBoard(bodyData)
        if (!updated) return failure(404, null, 'comment uuid not found ')

        return success([], 'Update comment on board Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function deleteCommentOnBoardService(boardUuid) {
    try {
        const updated = await commentBoard.deleteCommentOnBoard(boardUuid)
        if (!updated) return failure(404, null, 'board uuid not found ')

        return success([], 'Delete comment on board Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

async function getBoardListLogService(queryData) {
    try {
        const { boardUuid } = queryData
        const boardId = await boardData.getBoardIdByUuid(boardUuid)
        if (!boardId) return failure(404, null, 'board uuid not found ')

        const logList = await boardLogData.geBoardListLog(boardId)
        return success(logList, 'Get board log list Success')

    } catch (error) {
        return failure(500, error, 'internal error')
    }
}

module.exports = {
    getBoardListService,
    getBoardDetailService,
    createBoardService,
    updateBoardService,
    getCommentBoardListService,
    createCommentOnBoardService,
    updateCommentOnBoardService,
    deleteCommentOnBoardService,
    getBoardListLogService,
}
