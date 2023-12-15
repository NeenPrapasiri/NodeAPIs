const express = require('express')
const router = express.Router()
const { createTokenMiddleware } = require('../middleware/auth-middleware')

router.post("/login", createTokenMiddleware);

module.exports = router;