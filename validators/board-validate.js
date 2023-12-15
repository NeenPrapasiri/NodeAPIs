const { body, validationResult, param } = require('express-validator')
const { failure } = require('../helper/http-response')

const paramsBoardUuidRequest = [
    param('boardUuid')
        .exists().withMessage('boardUuid is required')
        .notEmpty().withMessage('boardUuid must not be empty')
        .isUUID().withMessage('boardUuid is not a UUID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]

const createBoardRequest = [
    body('topic')
        .notEmpty().withMessage('topic is required')
        .isString().withMessage('topic is not string)'),
    body('detail')
        .isString().withMessage('detail is not string)'),
    body('userUuid')
        .notEmpty().withMessage('userUuid must not be empty')
        .isUUID().withMessage('userUuid is not a UUID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]

const updateBoardRequest = [
    body('topic')
        .notEmpty().withMessage('topic is required')
        .isString().withMessage('topic is not string)'),
    body('detail')
        .isString().withMessage('detail is not string)'),
    body('status')
        .notEmpty().withMessage('status is required')
        .isInt().withMessage('status is not a number'),
    body('archive')
        .exists().withMessage('archive is required')
        .isInt().withMessage('archive is not a number'),
    body('boardUuid')
        .exists().withMessage('boardUuid is required')
        .notEmpty().withMessage('boardUuid must not be empty')
        .isUUID().withMessage('boardUuid is not a UUID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]

const getCommentListRequest = [
    param('boardUuid')
        .notEmpty().withMessage('boardUuid must not be empty')
        .isUUID().withMessage('boardUuid is not a UUID'),
    param('userUuid')
        .notEmpty().withMessage('userUuid must not be empty')
        .isUUID().withMessage('userUuid is not a UUID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]

const createCommentOnBoardRequest = [
    body('boardUuid')
        .notEmpty().withMessage('boardUuid must not be empty')
        .isUUID().withMessage('boardUuid is not a UUID'),
    body('userUuid')
        .notEmpty().withMessage('userUuid must not be empty')
        .isUUID().withMessage('userUuid is not a UUID'),
    body('comment')
        .isString().withMessage('comment is not string)'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]


const updateCommentOnBoardRequest = [
    body('commentUuid')
        .notEmpty().withMessage('commentUuid must not be empty')
        .isUUID().withMessage('commentUuid is not a UUID'),
    body('comment')
        .isString().withMessage('comment is not string)'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
]

module.exports = {
    paramsBoardUuidRequest,
    createBoardRequest,
    updateBoardRequest,
    getCommentListRequest,
    createCommentOnBoardRequest,
    updateCommentOnBoardRequest,
}
