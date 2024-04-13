const Player = require('../player/model')

const signUp = async (req, res, next) => {
   try {
      const { name, email } = req.body

      
   } catch (error) {
      if (error && error.name === "validationError") {
         return res.status(422).json({
            message: error.message,
            faileds: error.errors
         })
      }
   }
   next()
}

module.exports = {
   signUp
}