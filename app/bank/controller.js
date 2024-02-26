const Bank = require('./model')
const { getAll } = require('../services/bank')

const index = async (req, res) => {
   try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')

      const alert = { message: alertMessage, status: alertStatus }

      const bank = await getAll()

      res.render('admin/bank/viewBank', {
         bank,
         alert
      })
   } catch (error) {

   }
}

module.exports = {
   index
}