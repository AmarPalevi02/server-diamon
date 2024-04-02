const mongoose = require('mongoose')
const { model, Schema } = mongoose

const transactionSchema = Schema({
   historyVoucherTopUp: {
      gameName: { type: String, require: [true, 'nama game wajib di isi!'] },
      category: { type: String, require: [true, 'Category harus di isi!'] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, 'Coin Name harus di isi!'] },
      coinQuantity: { type: String, require: [true, 'Coint Quantity harus di isi!'] },
      price: { type: Number }
   },
   historyPayment: {
      name: { type: String, require: [true, 'Nama harus di isi!'] },
      type: { type: String, require: [true, 'Type pembayaran wajib di isi!'] },
      bankName: { type: String, require: [true, 'Nama Bank harus di isi!'] },
      noRekening: { type: String, require: [true, 'Nama Bank harus di isi!'] }
   },

   name:{
      type: String,
      require: [true, 'Nama harus di isi!'],
      maxLength: [255, "Panjang nama haru 3 - 255 karakter"],
      minLength: [3, "Panjang nama haru 3 - 255 karakter"]
   },

   accountUser : {
      type: String,
      maxLength: [255, "Panjang nama haru 3 - 255 karakter"],
      minLength: [3, "Panjang nama haru 3 - 255 karakter"]
   },

   tax: {
      type: Number,
      default: 0
   },

   value: {
      type: Number,
      default: 0
   },

   status: {
      type: String,
      enum : ["Pendding", "Succes", "Failed"],
      default: "Pendding"
   },

   player: {
      type: mongoose.Types.ObjectId,
      ref: 'Player'
   },

   historyUser: {
      name: {type: String, require: [true, 'Nama Player harus di isi!']},
      phonrNumber: {
         type: String,
         require: [true, "Phone Number harus di isi!"],
         maxLength: [13, "Panjang nama haru 11 - 13 karakter"],
         minLength: [11, "Panjang nama haru 11 - 13 karakter"]
      }
   },

   category: {
      type: mongoose.Types.ObjectId,
      ref: 'Categories'
   },

   user: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   }
})

module.exports = model('Transaction', transactionSchema)