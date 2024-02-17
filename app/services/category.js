const Category = require('../categories/model')

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
    createCategory
}