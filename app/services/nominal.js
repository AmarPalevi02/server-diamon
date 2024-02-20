const Nominal = require('../nominal/model')

const getAll = async () => {
    try {
        const result = await Nominal.find()

        return result
    } catch (error) {
        console.log(error)
    }
}

const createNominal = async (req) => {
    try {
        const { coinQuantity, coinName, price } = req.body

        const result = await Nominal.create({
            coinQuantity,
            coinName,
            price
        })

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll,
    createNominal
}