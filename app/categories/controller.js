const index = (req, res) => {
    try {
        res.render('admin/category/viewCategory', { title: 'Express' });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { index }