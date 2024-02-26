const express = require('express')
const route = express()
const { index, create, actionCreate } = require('./controller')

route.get('/bank', index)
route.get('/bank/create', create)
route.post('/bank/create', actionCreate)

module.exports = route