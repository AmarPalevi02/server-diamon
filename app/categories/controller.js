const { createCategory, categoryAll } = require('../services/category')

const index = async (req, res) => {
    try {
        const categories = await categoryAll()
        res.render('admin/category/viewCategory', {
            categories
        });
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res) => {
    try {
        res.render('admin/category/create');
    } catch (error) {
        console.log(error)
    }
}

const actionCreate = async (req, res) => {
    try {
        await createCategory(req)
        res.redirect('/category')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    index,
    create,
    actionCreate
}