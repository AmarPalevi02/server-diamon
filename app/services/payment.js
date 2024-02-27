const Payment = require('../payment/model')

const getAll = async (req, res) => {
   try {
      const result = await Payment.find()

      return result
   } catch (error) {

   }
}

module.exports = {
   getAll
}