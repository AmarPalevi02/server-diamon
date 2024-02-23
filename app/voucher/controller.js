const Voucher = require('./model')
const { getAll } = require('../services/voucher')

const index = async (req, res) => {
    try {
        const vouchers = await getAll()

        res.render('admin/voucher/viewVoucher', {
            vouchers
        })
    } catch (error) {

    }
}

const create = async (req, res) => {
    try {
        res.render('admin/voucher/create')
    } catch (error) {

    }
}

module.exports = {
    index,
    create
}