const { create, deleteById, getAllByDate, getById, edit } = require('../services/courseService');
const { parseError } = require('../util/parser');


const courseController = require('express').Router();

// TODO replace with real controller by assignment
courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create page',
        user: req.user
    })
})
courseController.post('/create', async (req, res) => {
    // In an Express.js application, req.body is a property of the request object (req). It is used to access the data sent in the body of an HTTP POST, PUT, or PATCH request.
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.user._id
    }
    try {
        await create(course);
        res.redirect('/')
    } catch (error) {
        const errors = parseError(error)
        res.render('create', {
            title: 'Create Page',
            errors,
            body: course
        })
    }

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