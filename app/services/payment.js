const Payment = require('../payment/model')

const getAll = async (req, res) => {
   try {
      const result = await Payment.find()
         .populate('banks')

      return result
   } catch (error) {

   }
}

module.exports = {
   getAll
}