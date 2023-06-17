const courseController = require('express').Router();

// TODO replace with real controller by assignment
courseController.get('/create', (req, res) => {
    res.render('create', {
        user: req.user
    })
})
courseController.get('/:id/details', (req, res) => {
    res.render('details', {
        user: req.user
    })
})
courseController.get('/:id/edit', (req, res) => {
    res.render('edit', {
        user: req.user
    })
})
courseController.get('/:id/delete', (req, res) => {
   
})

module.exports = courseController;