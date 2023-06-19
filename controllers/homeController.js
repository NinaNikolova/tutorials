const { getAllByDate } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    let view;
    let courses = [];
    if (req.user) {
        courses = await getAllByDate()
        res.render('user-home', {
            title: 'Home Page',
            courses
        })

    } else {
        res.render('guest-home', {
            title: 'Home Page',
            courses
        })
    }

})

module.exports = homeController;