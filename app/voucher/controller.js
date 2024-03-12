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
            alert,
            name: req.session.User.name,
            title: 'Halaman Voucher'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
    }
}

const create = async (req, res) => {
    try {
        const category = await Categories.find()
        const nominals = await Nominal.find()

        res.render('admin/voucher/create', {
            category,
            nominals,
            name: req.session.User.name,
            title: 'Halaman Voucher'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
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

                    await voucher.save()

                    req.flash('alertMessage', `Berhasil Tambah Voucher ${name}`)
                    req.flash("alertStatus", "success")

                    res.redirect('/voucher')
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/voucher')
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
        res.redirect('/voucher')
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Categories.find()
        const nominals = await Nominal.find()
        const vouchers = await Voucher.findOne({ _id: id })
            .populate('category')
            .populate('nominals')

        res.render('admin/voucher/edit', {
            vouchers,
            nominals,
            category,
            name: req.session.User.name,
            title: 'Halaman Voucher'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
    }
}

const actionUpdate = async (req, res) => {
    try {
        const { id } = req.params
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
                    const vouchers = await Voucher.findOne({ _id: id })

                    let currentImage = `${config.rootPath}/public/uploads/${vouchers.thumbnail}`

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage)
                    }

                    await vouchers.findOneAndUpdate(
                        { _id: id },
                        {
                            name,
                            category,
                            nominals,
                            thumbnail: fileName
                        }
                    )

                    req.flash('alertMessage', `Berhasil Update Voucher ${name}`)
                    req.flash("alertStatus", "success")

                    res.redirect('/voucher')
                } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/voucher')
                }
            })
        } else {
            await Voucher.findOneAndUpdate(
                { _id: id },
                {
                    name,
                    category,
                    nominals
                }
            )

            req.flash('alertMessage', `Berhasil Update Voucher ${name} `)
            req.flash("alertStatus", "success")

            res.redirect('/voucher')
        }

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
    }
}

const actionDelete = async (req, res) => {
    try {
        const { id } = req.params
        const getOne = await Voucher.findOne({ _id: id })

        if (getOne) {
            const voucherName = getOne.name

            req.flash('alertMessage', `Berhasil Delete ${voucherName}`)
            req.flash('alertStatus', 'danger')

            await Voucher.findOneAndDelete({ _id: id })
        }
        res.redirect('/voucher')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
    }
}

const actionUpdateStatus = async (req, res) => {
    try {
        const { id } = req.params

        let voucers = await Voucher.findOne({ _id: id })

        let status = voucers.status === 'Active' ? 'Non-Active' : "Active"

        if (voucers) {
            const getOneName = voucers.name

            voucers = await Voucher.findOneAndUpdate(
                { _id: id },
                { status }
            )

            req.flash('alertMessage', `Berhasil Update Status ${getOneName}`)
            req.flash('alertStatus', 'success')
        }

        res.redirect('/voucher')

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
    }
}

module.exports = {
    index,
    create,
    actionCreat,
    update,
    actionUpdate,
    actionDelete,
    actionUpdateStatus
}