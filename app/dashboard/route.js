const express = require('express')
const route = express()
const { index } = require('./controller')

const { isLoginAdmin } = require('../middleware/auth')

route.use(isLoginAdmin)
route.get('/dashboard', index)

module.exports = route
