const User = require('../user/model')
const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Categories = require('../categories/model')

const index = async (req, res) => {
    try {
        const transactions = await Transaction.countDocuments()
        const voucher = await Voucher.countDocuments()
        const player = await Player.countDocuments()
        const categories = await Categories.countDocuments()

        res.render('admin/dashboard/viewDashboard.ejs', {
            name: req.session.User.name,
            title: 'Halaman Dashboard',
            transactions,
            voucher,
            player,
            categories
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { index }