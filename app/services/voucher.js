const Voucher = require('../voucher/model')
const path = require('path')
const fs = require('fs')
const config = require('../../configs/configs')

const getAll = async () => {
    try {
        const voucherAll = await Voucher.find()

        return voucherAll
    } catch (error) {
        console.log(error)
    }
}

const createVoucher = async (req, res) => {
    try {
        const {
            name,
            category,
            nominals
        } = req.body

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
                    const voucher = await Voucher.create({
                        name,
                        category,
                        nominals,
                        thumbnail: fileName
                    })

                    req.flash('alertMessage', `Berhasil Tambah Voucher ${name}`)
                    req.flash("alertStatus", "success")

                    return voucher
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                }
            })
        } else {
            const voucher = await Voucher.create({
                name,
                category,
                nominals
            })

            req.flash('alertMessage', `Berhasil Tambah Voucher `)
            req.flash("alertStatus", "success")

            return voucher
        }

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
    }
}

module.exports = {
    getAll,
    createVoucher
}