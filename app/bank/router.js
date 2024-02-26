const express = require('express')
const route = express()
const { index, create, actionCreate, update, actionUpdate, actionDelete } = require('./controller')

route.get('/bank', index)
route.get('/bank/create', create)
route.post('/bank/create', actionCreate)
route.get('/bank/update/:id', update)
route.put('/bank/update/:id', actionUpdate)
route.delete('/bank/delete/:id', actionDelete)

module.exports = route