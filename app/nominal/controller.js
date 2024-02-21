const Nominal = require('./model')
const { getAll, createNominal } = require('../services/nominal')

const index = async (req, res) => {
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = { message: alertMessage, status: alertStatus }

        const nominals = await getAll()

        res.render('admin/nominal/viewNominal', {
            nominals,
            alert
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/nominal')
    }
}

const create = async (req, res) => {
    try {
        res.render('admin/nominal/create')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/nominal')
    }
}

const actionCreat = async (req, res) => {
    try {
        await createNominal(req)

        res.redirect('/nominal')

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/nominal')
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const nominals = await Nominal.findOne({ _id: id })

        res.render('admin/nominal/edit', { nominals })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/nominal')
    }
}

const actionUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const { coinQuantity, coinName, price } = req.body

        await Nominal.findOneAndUpdate(
            { _id: id },
            {
                coinQuantity,
                coinName,
                price
            }
        )

        req.flash('alertMessage', `Berhasil Update Nominal ${coinName}`)
        req.flash('alertStatus', "primary")

        res.redirect('/nominal')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/nominal')
    }
}

const actionDelete = async (req, res) => {
    try {
        const { id } = req.params

        const getOne = await Nominal.findOne({ _id: id })

        if (getOne) {
            const nominalName = getOne.coinName

            req.flash('alertMessage', `Berhasil Delete Nominal ${nominalName}`)
            req.flash('alertStatus', "danger")

            await Nominal.findOneAndDelete({ _id: id })
        }
        res.redirect('/nominal')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', "danger")
        res.redirect('/nominal')
    }
}

module.exports = {
    index,
    create,
    actionCreat,
    update,
    actionUpdate,
    actionDelete
}