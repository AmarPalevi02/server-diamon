const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = Schema({
   email: {
      type: String,
      require: [true, 'Email harus di isi!']
   },
   password: {
      type: String,
      minLength: [8, 'Panjang password haris lebih dari 8'],
      require: [true, 'Password harus di isi!']
   },
   name: {
      type: String,
      require: [true, 'Nama harus di isi!'],
      maxLength: [255, "Panjang nama haru 3 - 255 karakter"],
      minLength: [3, "Panjang nama haru 3 - 255 karakter"]
   },
   phoneNumber: {
      type: Number,
      require: [true, 'No Telpon harus di isi!']
   },
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'admin'
   },
   status: {
      type: String,
      enum: ['Active', 'Non-Active']
   }
}, { timestamps: true })

module.exports = model('User', userSchema)