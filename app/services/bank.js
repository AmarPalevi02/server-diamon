const Bank = require('../bank/model')

const getAll = async (req, res) => {
   try {
      const result = await Bank.find()

      return result
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

const createBank = async (req, res) => {
   try {
      const {
         name,
         nameBank,
         noRekening
      } = req.body

      const result = await Bank.create({
         name,
         nameBank,
         noRekening
      })

      req.flash('alertMessage', `Berhasil Tambah Bank ${name}`)
      req.flash("alertStatus", "primary")

      return result
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
   }
}

module.exports = {
   getAll,
   createBank
}