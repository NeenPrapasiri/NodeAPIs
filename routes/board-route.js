const express = require('express')
const router = express.Router()

const { AuthMiddleware } = require('../middleware/auth-middleware')
const validateBoardRequest = require('../validators/board-validate')
const boardController = require('../controllers/board-controller')

router.get('/board-list', AuthMiddleware, boardController.getBoardListHandler)
router.get('/board-detail/:boardUuid', AuthMiddleware, validateBoardRequest.paramsBoardUuidRequest, boardController.getBoardDetailHandler)
router.post('/board', validateBoardRequest.createBoardRequest, boardController.createBoardHandler)
router.patch('/board', AuthMiddleware, validateBoardRequest.updateBoardRequest, boardController.updateBoardHandler)
router.get('/comment-board-list/:boardUuid/:userUuid', AuthMiddleware, validateBoardRequest.getCommentListRequest, boardController.getCommentBoardHandler)
router.post('/comment-board', AuthMiddleware, validateBoardRequest.createCommentOnBoardRequest, boardController.createCommentBoardListHandler)
router.patch('/comment-board', AuthMiddleware, validateBoardRequest.updateCommentOnBoardRequest, boardController.updateCommentBoardListHandler)
router.delete('/comment-board/:boardUuid', AuthMiddleware, validateBoardRequest.paramsBoardUuidRequest, boardController.deleteCommentBoardListHandler)
router.get('/board-list-log/:boardUuid', AuthMiddleware, validateBoardRequest.paramsBoardUuidRequest, boardController.getBoardListLogHandler)

module.exports = router