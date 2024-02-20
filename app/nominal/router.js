const express = require('express')
const route = express()
const { index, create } = require('./controller')

route.get('/nominal', index)
route.get('/nominal/create', create)

module.exports = route