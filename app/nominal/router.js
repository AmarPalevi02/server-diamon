const express = require('express')
const route = express()
const { index, create, actionCreat, update, actionUpdate, actionDelete } = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

route.use(isLoginAdmin)
route.get('/nominal', index)
route.get('/nominal/create', create)
route.post('/nominal/create', actionCreat)
route.get('/nominal/update/:id', update)
route.put('/nominal/update/:id', actionUpdate)
route.delete('/nominal/delete/:id', actionDelete)

module.exports = route