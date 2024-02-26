const express = require('express')
const route = express()
const multer = require('multer')
const os = require('os')
const {
    index,
    create,
    actionCreat,
    update,
    actionUpdate,
    actionDelete,
    actionUpdateStatus
} = require('./controller')

route.get('/voucher', index)
route.get('/voucher/create', create)
route.post('/voucher/create', multer({ dest: os.tmpdir() }).single('image'), actionCreat)
route.get('/voucher/update/:id', update)
route.put('/voucher/update/:id', multer({ dest: os.tmpdir() }).single('image'), actionUpdate)
route.delete('/voucher/delete/:id', actionDelete)
route.put('/voucher/status/:id', actionUpdateStatus)

module.exports = route