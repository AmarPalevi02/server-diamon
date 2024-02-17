const mongoose = require('mongoose')
// const { model, Schema } = mongoose

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama category harus di isi!']
    },

}, { timestamps: true })

module.exports = mongoose.model('Categories', categorySchema)