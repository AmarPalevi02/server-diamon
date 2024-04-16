const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcrypt')

const playerSchema = Schema({
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
   username: {
      type: String,
      require: [true, 'Username harus di isi!'],
      maxLength: [255, "Panjang nama haru 3 - 255 karakter"],
      minLength: [3, "Panjang nama haru 3 - 255 karakter"]
   },
   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
   },
   status: {
      type: String,
      enum: ['Active', 'Non-Active']
   },
   avatar: {
      type: String,
   },
   fileName: {
      type: String
   },
   phoneNumber: {
      type: Number,
      require: [true, "Phone Number harus di isi!"],
      maxLength: [13, "Panjang nama haru 11 - 13 karakter"],
      minLength: [11, "Panjang nama haru 11 - 13 karakter"]
   },
   favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
   }
}, { timestamps: true })

playerSchema.path('email').validate(async function (value) {
   try {
      const count = await this.model('Player').countDocuments({email: value})
      return !count;
   } catch (err) {
      throw err
   }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function(next) {
   this.password = bcrypt.hashSync(this.password, 10)
   next()
})

module.exports = model('Player', playerSchema)