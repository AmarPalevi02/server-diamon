const express = require('express')
const route = express()
const { index, detail, category, checout } = require('./controller')
const { isLoginPlayer } = require('../middleware/auth')

route.get('/players', index)
route.get('/players/detail/:id', detail)
route.get('/category', category)
route.post('/checkout', isLoginPlayer, checout)
module.exports = route