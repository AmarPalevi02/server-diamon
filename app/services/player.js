const Vouchers = require('../voucher/model')

const getAll = async (req, res) => {
   try {
      const result = await Vouchers.find()
         .populate('category')
         .select('_id ,name, status, category, thumbnail')
      return result
   } catch (error) {
      console.log(error.message)
   }
}

const getDetail = async (req, res) => {
   try {
      const { id } = req.params

      const result = await Vouchers.findOne({_id: id})
         .populate('category')
         .populate('nominals')
         .populate('user', '_id, phoneNumber')

      
      return result

   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   getAll,
   getDetail
}