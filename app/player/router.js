const express = require('express')
const route = express()
const { index, detail, category, checout } = require('./controller')

route.get('/players', index)
route.get('/players/detail/:id', detail)
route.get('/category', category)
route.post('/checkout', checout)
module.exports = route