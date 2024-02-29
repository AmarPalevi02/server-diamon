const mongoose = require('mongoose')
const { model, Schema } = mongoose

const bankSchema = Schema({
   name: {
      type: String,
      require: [true, 'Nama pemilik harus di isi!']
   },
   nameBank: {
      type: String,
      require: [true, 'Nama Bank harus di isi!']
   },
   noRekening: {
      type: String,
      require: [true, 'Nomor Rekening harus di isi!']
   }
}, { timestamps: true })

module.exports = model('Bank', bankSchema)