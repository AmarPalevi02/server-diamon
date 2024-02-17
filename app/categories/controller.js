const { createCategory, categoryAll, updateCategory } = require('../services/category')
const Category = require('./model')

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

const update = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findOne({ _id: id })

        res.render('admin/category/edit', { category })
    } catch (error) {
        console.log(error)
    }
}

const actionUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        await Category.findOneAndUpdate(
            { _id: id },
            { name }
        )

        res.redirect('/category')
    } catch (error) {

    }
}

module.exports = {
    index,
    create,
    actionCreate,
    update,
    actionUpdate
}