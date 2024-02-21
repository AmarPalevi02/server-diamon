const Category = require('../categories/model')

const categoryAll = async () => {
    try {
        const nominals = await Category.find()

        return nominals
    } catch (error) {
        console.log(error)
    }
}

const createCategory = async (req) => {
    try {
        const { name } = req.body

        const result = await Category.create({ name })
        req.flash('alertMessage', `Berhasil Tambah Category ${name}`)
        req.flash("alertStatus", "primary")

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCategory,
    categoryAll
}