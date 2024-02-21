const express = require('express')
const route = express()
const { index, create, actionCreat, update } = require('./controller')

route.get('/nominal', index)
route.get('/nominal/create', create)
route.post('/nominal/create', actionCreat)
route.get('/nominal/update/:id', update)

module.exports = route