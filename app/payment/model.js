const mongoose = require('mongoose')
const { model, Schema } = mongoose

const paymentSchema = Schema({
   type: {
      type: String,
      require: [true, 'Type Pembayaran harus di isi!']
   },
   status: {
      type: String,
      enum: ['Active', 'Non-Active'],
      default: 'Active'
   },
   banks: [{
      type: mongoose.Types.ObjectId,
      ref: 'Bank'
   }]
})

module.exports = model('Payment', paymentSchema)