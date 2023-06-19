const { getAllByDate,getRecent } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
 
    let courses = [];
    if (req.user) {
        courses = await getAllByDate()
        res.render('user-home', {
            title: 'Home Page',
            courses,
            
        })

    } else {
        courses = await getRecent()
        res.render('guest-home', {
            title: 'Home Page',
            courses,
            user:req.user
        })
    }

})

module.exports = homeController;