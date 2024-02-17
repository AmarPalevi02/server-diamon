const Category = require('../categories/model')

const categoryAll = async () => {
    try {
        const result = await Category.find()

        return result
    } catch (error) {
        console.log(error)
    }
}

const createCategory = async (req) => {
    try {
        const { name } = req.body

        const result = await Category.create({ name })

        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCategory,
    categoryAll
}