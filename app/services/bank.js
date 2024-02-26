const Bank = require('../bank/model')

const getAll = async (req, res) => {
   try {
      const result = await Bank.find()

      return result
   } catch (error) {

   }
}

module.exports = {
   getAll
}