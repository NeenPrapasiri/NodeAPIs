const { expressHandler } = require('./express-handler')
const Services = require('../services/board-service')

async function getBoardListHandler(request) {
    const viewMore = request.query.viewMore === 'true' ? true : false
    const result = await Services.getBoardListService(viewMore)
    return result
}

async function getBoardDetailHandler(request) {
    const result = await Services.getBoardDetailService(request.query.boardUuid)
    return result
}

async function createBoardHandler(request) {
    const result = await Services.createBoardService(request.body)
    return result
}

async function updateBoardHandler(request) {
    const result = await Services.updateBoardService(request.body)
    return result
}

async function getCommentBoardHandler(request) {
    const result = await Services.getCommentBoardListService(request.params)
    return result
}

async function createCommentBoardListHandler(request) {
    const result = await Services.createCommentOnBoardService(request.body)
    return result
}

async function updateCommentBoardListHandler(request) {
    const result = await Services.updateCommentOnBoardService(request.body)
    return result
}

async function deleteCommentBoardListHandler(request) {
    const result = await Services.deleteCommentOnBoardService(request.params.boardUuid)
    return result
}

async function getBoardListLogHandler(request) {
    const result = await Services.getBoardListLogService(request.params)
    return result
}

module.exports = {
    getBoardListHandler: expressHandler({
        handler: getBoardListHandler
    }),
    getBoardDetailHandler: expressHandler({
        handler: getBoardDetailHandler
    }),
    createBoardHandler: expressHandler({
        handler: createBoardHandler
    }),
    updateBoardHandler: expressHandler({
        handler: updateBoardHandler
    }),
    getCommentBoardHandler: expressHandler({
        handler: getCommentBoardHandler
    }),
    createCommentBoardListHandler: expressHandler({
        handler: createCommentBoardListHandler
    }),
    updateCommentBoardListHandler: expressHandler({
        handler: updateCommentBoardListHandler
    }),
    deleteCommentBoardListHandler: expressHandler({
        handler: deleteCommentBoardListHandler
    }),
    getBoardListLogHandler: expressHandler({
        handler: getBoardListLogHandler
    }),
}
