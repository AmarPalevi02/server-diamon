const express = require('express')
const route = express()
const { index, create, actionCreate, update, actionUpdate} = require('./controller')

route.get('/payment', index)
route.get('/payment/create', create)
route.post('/payment/create', actionCreate)
route.get('/payment/update/:id', update)
route.put('/payment/update/:id', actionUpdate)
route.delete('/payment/delete/id')

module.exports = route