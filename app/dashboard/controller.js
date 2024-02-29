const User = require('../user/model')

const index = (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { index }