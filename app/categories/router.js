const express = require('express')
const route = express()
const { index, create, actionCreate } = require('./controller')

route.get('/category', index)
route.get('/category/create', create)
route.post('/category/create', actionCreate)

module.exports = route
