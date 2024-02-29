const express = require('express')
const route = express()
const { index, actionSignIn } = require('./controller')

route.get('/', index)
route.post('/', actionSignIn)

module.exports = route