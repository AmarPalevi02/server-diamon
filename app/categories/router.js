const express = require('express')
const route = express()
const { index, create, actionCreate, update, actionUpdate, actionDelete } = require('./controller')

route.get('/category', index)
route.get('/category/create', create)
route.post('/category/create', actionCreate)
route.get('/category/update/:id', update)
route.put('/category/update/:id', actionUpdate)
route.delete('/category/delete/:id', actionDelete)

module.exports = route
