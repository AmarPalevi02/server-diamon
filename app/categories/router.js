const express = require('express')
const route = express()
const { index } = require('./controller')

route.get('/category', index)

module.exports = route
