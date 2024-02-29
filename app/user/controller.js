const User = require('./model')
const bcrypt = require('bcrypt');

const index = async (req, res) => {
   try {
      const alertMessage = req.flash('alertMessage')
      const alertStatus = req.flash('alertStatus')
      const alert = { message: alertMessage, status: alertStatus }
      res.render('admin/user/viewSignIn', { alert })
   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
   }
}

const actionSignIn = async (req, res) => {
   try {
      const { email, password } = req.body

      const check = await User.findOne({ email: email })

      if (check) {
         if (check.status === 'Active') {
            const checkPassword = await bcrypt.compare(password, check.password)
            if(checkPassword){
               res.redirect('/dashboard')
            } else {
               req.flash('alertMessage', 'Password tidak di temukan!')
               req.flash('alertStatus', 'danger')
               res.redirect('/')
            }
         } else {
            req.flash('alertMessage', 'Mohon maaf status belim Active!')
            req.flash('alertStatus', 'danger')
            res.redirect('/')
         }
      } else {
         req.flash('alertMessage', 'Email tidak di temukan!')
         req.flash('alertStatus', 'danger')
         res.redirect('/')
      }

   } catch (error) {
      req.flash('alertMessage', `${error.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
   }
}

module.exports = {
   index,
   actionSignIn
}