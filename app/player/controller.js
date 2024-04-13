const Player = require('./model')
const { getAll, getDetail } = require('../services/player')

const index = async (req, res, next) => {
   try {
      // const alertMessage = req.flash('alertMessage')
      // const alertStatus = req.flash('alertStatus')
      // const alert = { message: alertMessage, status: alertStatus }

      const lendingpage = await getAll()
      res.status(200).json({
         message: 'success',
         data: { lendingpage }
      })
   } catch (error) {
      console.log(error.message)
   }
}

const detail = async (req, res) => {
   try {
      const detailPage = await getDetail(req)

      if(!detailPage) {
         return res.status(404).json({message: 'voucher tidak di temukan!'})
       }

      res.status(200).json({
         message: 'success',
         data: { detailPage }
      })
   } catch (error) {
      res.status(500).json(error.message)
   }
}

module.exports = {
   index,
   detail
}

