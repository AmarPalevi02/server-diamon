const Bank = require('./model')
const { getAll, createBank } = require('../services/bank')

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
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

const create = async (req, res) => {
   try {
      res.render('admin/bank/create')
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

const actionCreate = async (req, res) => {
   try {
      const bank = await createBank(req)

      res.redirect('/bank', { bank })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

module.exports = {
   index,
   create,
   actionCreate
}