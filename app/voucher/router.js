const express = require('express')
const route = express()
const multer = require('multer')
const os = require('os')
const { index, create, actionCreat } = require('./controller')

route.get('/voucher', index)
route.get('/voucher/create', create)
route.post('/voucher/create', multer({dest: os.tmpdir()}).single('image'), actionCreat)

module.exports = route