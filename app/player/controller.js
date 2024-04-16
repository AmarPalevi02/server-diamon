const Player = require('./model')
const Categories = require('../categories/model')
const Voucher = require('../voucher/model')
const Nominal = require('../nominal/model')
const Payment = require('../payment/model')
const Bank = require('../bank/model')

const { getAll, getDetail } = require('../services/player')

const index = async (req, res, next) => {
   try {
      const lendingpage = await getAll()
      res.status(200).json({
         message: 'success',
         data: { lendingpage }
      })
   } catch (error) {
      console.log(error.message)
   }
}

const detail = async (req, res) => {
   try {
      const detailPage = await getDetail(req)

      if (!detailPage) {
         return res.status(404).json({ message: 'voucher tidak di temukan!' })
      }

      res.status(200).json({
         message: 'success',
         data: { detailPage }
      })
   } catch (error) {
      res.status(500).json(error.message)
   }
}

const category = async (req, res) => {
   try {
      const categori = await Categories.find()

      res.status(200).json({
         status: 'OK',
         data: categori
      })
   } catch (error) {
      res.status(500).json(error.message)
   }
}

const checout = async (req, res) => {
   try {
      const { accountUser, name, voucher, nominal, payment, bank } = req.body

      const res_voucher = await Voucher.findOne({ _id: voucher })
         .select('name category _id thumbnail user')
         .populate('category')
         .populate('user')

      if (!res_voucher) return res.status(404).json({ message: 'vocher tidak di temukan!' })

      const res_nominal = await Nominal.findOne({ _id: nominal })
      if (!res_nominal) return res.status(404).json({ message: 'Nominal tidak di temukan!' })

      const res_payment = await Payment.findOne({ _id: payment })
      if (!res_payment) return res.status(404).json({ message: 'Payment tidak di temukan!' })

      const res_bank = await Bank.findOne({ _id: bank })
      if (!res_bank) return res.status(404).json({ message: 'Bank tidak di temukan!' })

      let tax = (10 / 100) * res_nominal._doc.price
      let value = res_nominal._doc.price - tax

      const payload = {
         historyVoucherTopup: {
            gameName: res_voucher._doc.name,
            category: res_voucher._doc.category ? res_voucher._doc.category.name : '-',
            thumbnail: res_voucher._doc.category.thumbnail,
            coinName: res_nominal._doc.coinName,
            coinQuantity: res_nominal._doc.coinQuantity,
            price: res_nominal._doc.price
         },
         historyPayment: {
            name: res_payment._doc.name,
            type: res_payment._doc.type,
            bankName: res_payment._doc.bankName,
            noRekening: res_payment._doc.noRekening
         },

         name: name,
         accountUser: accountUser,
         tax: tax,
         value: value,
         // player: req.player._id,

         historyUser: {
            name: res_voucher._doc.user?._id,
            phonrNumber: res_voucher._doc.user?.phonrNumber
         },

         category: res_voucher._doc.category?._id,
         user: res_voucher._doc.user?._id,
      }

      res.status(201).json({data: payload})
   } catch (error) {

   }
}

module.exports = {
   index,
   detail,
   category,
   checout
}

