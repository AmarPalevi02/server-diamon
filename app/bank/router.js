const express = require('express')
const route = express()
const { index } = require('./controller')

route.get('/bank', index)

module.exports = route