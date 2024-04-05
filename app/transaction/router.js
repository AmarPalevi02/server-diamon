const express = require('express')
const route = express()
const { index, actionStatus } = require('./controller')

route.get('/transactions', index)
route.put('/transactions/status/:id', actionStatus)

module.exports = route