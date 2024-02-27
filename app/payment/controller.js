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

const update = async (req, res) => {
   try {
      const { id } = req.params

      const banks = await Bank.find()
      const getOnePayment = await Payment.findOne({ _id: id })
         .populate('banks')

      res.render('admin/payment/edit', { getOnePayment, banks })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}

const actionUpdate = async (req, res) => {
   try {
      const { id } = req.params
      const { type, banks } = req.body

      const getOne = await Payment.findOne({ _id: id })

      if (getOne) {
         const getName = getOne.type

         req.flash('alertMessage', `Berhasil Update Payment Type ${getName}`)
         req.flash('alertStatus', 'primary')

         await Payment.findOneAndUpdate(
            { _id: id },
            { type, banks }
         )
      }

      res.redirect('/payment')
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}

const actionDelete = async (req, res) => {
   try {
      const { id } = req.params

      const getOne = await Payment.findOne({ _id: id })

      if (getOne) {
         const getName = getOne.type

         req.flash('alertMessage', `Berhasil Delete Payment Type ${getName}`)
         req.flash('alertStatus', 'danger')

         await Payment.findOneAndDelete({ _id: id })
      }

      res.redirect('/payment')
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
   }
}

module.exports = {
   index,
   create,
   actionCreate,
   update,
   actionUpdate,
   actionDelete
}