const User = require('../user/model')

const index = (req, res) => {
    try {
        console.log('seasson')
        console.log(req.session.User)
        res.render('index', {
            name: req.session.User.name,
            title: 'Halaman Dashboard'
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { index }