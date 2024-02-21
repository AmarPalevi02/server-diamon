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

    }
}

const create = async (req, res) => {
    try {
        res.render('admin/nominal/create')
    } catch (error) {

    }
}

const actionCreat = async (req, res) => {
    try {
        await createNominal(req)

        res.redirect('/nominal')

    } catch (error) {
        console.log(error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const nominals = await Nominal.findOne({ _id: id })

        res.render('admin/nominal/edit', { nominals })
    } catch (error) {

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

    }
}

module.exports = {
    index,
    create,
    actionCreat,
    update,
    actionUpdate
}