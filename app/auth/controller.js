const Player = require('../player/model')
const path = require('path')
const fs = require('fs')
const config = require('../../configs/configs')

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

module.exports = {
   signUp
}