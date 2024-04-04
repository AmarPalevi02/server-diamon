const Transaction = require('../transaction/model')

const getAll = async () => {
   try {
      const result = await Transaction.find()
         // .populate('player')

      return result
   } catch (error) {
      console.log(error)
   }
}

module.exports = {
   getAll
}