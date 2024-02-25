const Voucher = require('../voucher/model')

const getAll = async () => {
    try {
        const voucherAll = await Voucher.find()
            .populate('category')
            .populate('nominals')
        return voucherAll
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll
}