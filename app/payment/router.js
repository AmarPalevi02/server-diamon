const express = require('express')
const route = express()
const { index, create, actionCreate } = require('./controller')

route.get('/payment', index)
route.get('/payment/create', create)
route.post('/payment/create', actionCreate)
route.put('/payment/update/:id')
route.delete('/payment/delete/id')

module.exports = route