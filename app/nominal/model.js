const mongoose = require('mongoose')
const { model, Schema } = mongoose

const nominalSchema = Schema({
    coinQuantity: {
        type: Number,
        default: 0
    },
    coinName: {
        type: String,
        require: [true, 'Nama Coin Wajib di isi!']
    },
    price: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = model('Nominal', nominalSchema)