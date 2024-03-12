const express = require('express')
const route = express()
const { index, actionSignIn, actionLogout } = require('./controller')

route.get('/', index)
route.post('/', actionSignIn)
route.get('/logout', actionLogout)

module.exports = route