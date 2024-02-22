const mongoose = require('mongoose')
const { model, Schema } = mongoose

const voucherSchema = Schema({
    name: {
        type: String,
        require: [true, 'Nama game wajib di isi!']
    },
    status: {
        type: String,
        enum: ['Active', 'Non-Active'],
        default: 'Active'
    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Categories'
    },
    nominals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Nominal'
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Vouchers', voucherSchema)