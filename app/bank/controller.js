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

const update = async (req, res) => {
   try {
      const { id } = req.params
      const getOne = await Bank.findOne({ _id: id })

      res.render('admin/bank/edit', { getOne })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

const actionUpdate = async (req, res) => {
   try {
      const { id } = req.params
      const {
         name,
         nameBank,
         noRekening } = req.body

      const bank = await Bank.findOneAndUpdate(
         {_id: id},
         {
            name,
            nameBank,
            noRekening
         })

      req.flash('alertMessage', `Berhasil Update Bank ${name}`)
      req.flash("alertStatus", "primary")

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
   actionCreate,
   update,
   actionUpdate
}