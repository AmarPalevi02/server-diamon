const express = require('express')
const route = express()
const multer = require('multer')
const os = require('os')

const { signUp, signIn } = require('./controller')

route.post('/signup',multer({ dest: os.tmpdir() }).single('image'), signUp)
route.post('/signin', signIn)

module.exports = route