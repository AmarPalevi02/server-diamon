const config = require('../../configs/configs')
const jwt = require('jsonwebtoken')
const Player = require('../player/model')

const isLoginAdmin = (req, res, next) => {
   if (req.session.User === null || req.session.User === undefined) {
      req.flash('alertMessage', 'session berahir!')
      req.flash('alertStatus', 'danger')
      res.redirect('/')
   } else {
      next()
   }
}

const isLoginPlayer = async (req, res, next) => {
   try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null

      const data = jwt.verify(token, config.jwtkey)

      const player = await Player.findOne({ _id: data.player.id})
      console.log({player})

      if (!player) {
         throw new Error()
      }

      req.player = player
      req.token = token

      next()
   } catch (error) {
      res.status(401).json({ message: 'Not authorize to access this resource' })
   }
}

module.exports = {
   isLoginAdmin,
   isLoginPlayer
}