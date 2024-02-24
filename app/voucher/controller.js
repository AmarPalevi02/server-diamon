const Voucher = require('./model')
const Categories = require('../categories/model')
const Nominal = require('../nominal/model')
const path = require('path')
const fs = require('fs')
const config = require('../../configs/configs')

const { getAll } = require('../services/voucher')

const index = async (req, res) => {
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = { message: alertMessage, status: alertStatus }

        const vouchers = await getAll()

        res.render('admin/voucher/viewVoucher', {
            vouchers,
            alert
        })
    } catch (error) {

    }
}

const create = async (req, res) => {
    try {
        const category = await Categories.find()
        const nominals = await Nominal.find()

        res.render('admin/voucher/create', {
            category,
            nominals
        })
    } catch (error) {

    }
}

const actionCreat = async (req, res) => {
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
                    const voucher = new Voucher({
                        name,
                        category,
                        nominals,
                        thumbnail: fileName
                    })

                    console.log(voucher)
                    
                    await voucher.save()

                    req.flash('alertMessage', `Berhasil Tambah Voucher ${name}`)
                    req.flash("alertStatus", "success")

                    res.redirect('/voucher')
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                }
            })
        } else {
            const voucher = new Voucher({
                name,
                category,
                nominals
            })

            console.log(voucher)

            await voucher.save()

            req.flash('alertMessage', `Berhasil Tambah Voucher `)
            req.flash("alertStatus", "success")

            res.redirect('/voucher')
        }

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
    }
}

module.exports = {
    index,
    create,
    actionCreat
}