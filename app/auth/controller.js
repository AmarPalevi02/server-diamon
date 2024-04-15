const Player = require('../player/model')
const path = require('path')
const fs = require('fs')
const config = require('../../configs/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res, next) => {
   try {
      const payload = req.body

      if (req.file) {
         let temp_path = req.file.path
         let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
         let fileName = req.file.filename + '.' + originalExt
         let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`)

         const src = fs.createReadStream(temp_path)
         const des = fs.createWriteStream(target_path)

         src.pipe(des)

         src.on('end', async () => {
            try {
               const player = new Player({
                  ...payload,
                  avatar: fileName
               })

               await player.save()

               delete player._doc.password

               res.status(201).json({ data: player })

            } catch (error) {
               if (error && error.name === "validationError") {
                  return res.status(422).json({
                     error: 1,
                     message: error.message,
                     faileds: error.errors
                  })
               }
            }
         })
      } else {
         let player = new Player(payload)

         await player.save()

         delete player._doc.password

         res.status(201).json({ data: player })
      }

   } catch (error) {
      if (error && error.name === "validationError") {
         return res.status(422).json({
            error: 1,
            message: error.message,
            faileds: error.errors
         })
      }
   }
   next()
}

const signIn = async (req, res, next) => {
   const { email, password } = req.body

   try {
      const player = await Player.findOne({ email: email })

      if (!player) return res.status(403).json({ message: 'email tidak terdaftar!' })

      const checkPassword = await bcrypt.compareSync(password, player.password)

      if (!checkPassword) return res.status(403).json({ message: 'password salah!' })

      const token = jwt.sign({
         player: {
            id: player.id,
            username: player.username,
            email: player.email,
            phoneNumber: player.phoneNumber,
            avatar: player.avatar,
            name: player.name
         }
      }, config.jwtkey)

      res.status(200).json({
         message: 'OK',
         data: { token }
      })
   } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
   }

}

module.exports = {
   signUp,
   signIn
}