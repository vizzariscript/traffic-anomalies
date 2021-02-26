const express = require('express')

const {
    getAll,
    getCsvFile,
} = require('../controllers/anomalies.controller')

const router = express.Router()

router.get('/', getAll)
router.get('/csvfile', getCsvFile)

module.exports = router