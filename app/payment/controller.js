const Payment = require('./model')
const Bank = require('../bank/model')
const { getAll } = require('../services/payment')

const index = async (req, res) => {
   try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const getAllPayment = await getAll()

      console.log(getAllPayment)

      res.render('admin/payment/viewPayment', {
         getAllPayment,
         alert,
      })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}

const create = async (req, res) => {
   try {
      const banks = await Bank.find()

      res.render('admin/payment/create', {
         banks
      })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}

const actionCreate = async (req, res) => {
   try {
      const { type, banks } = req.body

      const payment = await Payment.create({ type, banks })

      req.flash('alertMessage', `Berhasil Menambahkan Payment Type ${type}`)
      req.flash('alertStatus', 'success')

      console.log(payment)

      res.redirect('/payment', { payment })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}



module.exports = {
   index,
   create,
   actionCreate
}