const express = require('express')
const router = express.Router()

router.use('/', require('./board-route'))
router.use('/', require('./users-route'))

module.exports = router;