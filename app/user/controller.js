
const index = async (req, res) => {
   try {
      res.render('admin/user/viewSignIn')
   } catch (error) {

   }
}

module.exports = {
   index
}