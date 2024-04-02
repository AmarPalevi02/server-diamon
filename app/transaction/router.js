const express = require('express')
const route = express()
const { index } = require('./controller')

route.get('/transactions', index)

module.exports = route