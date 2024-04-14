const express = require('express')
const route = express()
const { index, detail, category } = require('./controller')

route.get('/players', index)
route.get('/players/detail/:id', detail)
route.get('/category', category)

module.exports = route