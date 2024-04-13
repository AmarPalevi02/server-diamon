const express = require('express')
const route = express()
const { index, detail } = require('./controller')

route.get('/players', index)
route.get('/players/detail/:id', detail)

module.exports = route