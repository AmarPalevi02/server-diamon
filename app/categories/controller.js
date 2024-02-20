const { createCategory, categoryAll } = require('../services/category')
const Category = require('./model')

const index = async (req, res) => {
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = { message: alertMessage, status: alertStatus }
        const categories = await categoryAll()
        res.render('admin/category/viewCategory', {
            categories,
            alert
        });

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
    }
}

const create = async (req, res) => {
    try {
        res.render('admin/category/create');
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
    }
}

const actionCreate = async (req, res) => {
    try {
        await createCategory(req)
        res.redirect('/category')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params

        const category = await Category.findOne({ _id: id })

        res.render('admin/category/edit', { category })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
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

        req.flash('alertMessage', `Berhasil Update Category ${name}`)
        req.flash("alertStatus", "primary")

        res.redirect('/category')

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
    }
}

const actionDelete = async (req, res) => {
    try {
        const { id } = req.params

        const getOne = await Category.findOne({ _id: id })
        if (getOne) {
            const getOneName = getOne.name

            req.flash('alertMessage', `Berhasil Update Category ${getOneName} `)
            req.flash("alertStatus", "danger")

            await Category.findOneAndDelete({ _id: id })
        }

        res.redirect('/category')

    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', danger)
        res.redirect('/category')
    }
}

module.exports = {
    index,
    create,
    actionCreate,
    update,
    actionUpdate,
    actionDelete
}