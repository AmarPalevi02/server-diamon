const Transaction = require('./model')
const { getAll } = require('../services/transaction')

const index = async (req, res) => {
   try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const transactions = await getAll()
      console.log(transactions)

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

module.exports = {
   index
}