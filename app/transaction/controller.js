const Transaction = require('./model')
const { getAll } = require('../services/transaction')

const index = async (req, res) => {
   try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const transactions = await getAll()

      res.render('admin/transaction/viewTransaction', {
         transactions,
         alert,
         name: req.session.User.name,
         title: 'Halaman Transaction'
      })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
   }
}

const actionStatus = async (req, res) => {
   try {
      const { id } = req.params
      const { status } = req.query

      await Transaction.findByIdAndUpdate({ _id: id }, {status})
      
      req.flash('alertMessage', `Berhasil Update status ${status}`)
      req.flash('alertStatus', 'success')
      res.redirect('/transactions')
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
   }
}

module.exports = {
   index,
   actionStatus
}