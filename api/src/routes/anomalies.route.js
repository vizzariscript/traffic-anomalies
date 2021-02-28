const express = require('express')
const auth = require('../common/jwt.auth')

const {
    getAll,
    getCsvFile,
} = require('../controllers/anomalies.controller')

const router = express.Router()

router.get('/', auth, getAll)
router.get('/csvfile', auth, getCsvFile)

module.exports = router