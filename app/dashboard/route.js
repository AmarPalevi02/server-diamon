const express = require('express')
const route = express()
const { index } = require('./controller')

route.get('/dashboard', index)

module.exports = route
