const isLoginAdmin = (req, res, next) => {
   if (req.session.User === null || req.session.User === undefined) {
      req.flash('alertMessage', 'session berahir!')
      req.flash('alertStatus', 'danger')
      res.redirect('/')
   } else {
      next()
   }
}

module.exports = {
   isLoginAdmin
}