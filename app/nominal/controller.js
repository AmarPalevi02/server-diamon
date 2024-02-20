const Nominal = require('./model')
const { getAll, createNominal } = require('../services/nominal')

const index = async (req, res) => {
    try {
        const nominal = await getAll()
        res.render('admin/nominal/viewNominal', { nominal })
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
        const nominal = await createNominal(req)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    index,
    create
}