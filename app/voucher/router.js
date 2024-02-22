const express = require('express')
const route = express()
const { index } = require('./controller')

route.get('/voucher', index)

module.exports = route