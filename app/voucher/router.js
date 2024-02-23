const express = require('express')
const route = express()
const { index, create } = require('./controller')

route.get('/voucher', index)
route.get('/voucher/create', create)

module.exports = route