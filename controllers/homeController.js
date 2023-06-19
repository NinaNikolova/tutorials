const { getAllByDate,getRecent } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
 
    let courses = [];
   
    console.log(req.query)
    if (req.user) {
         // search : method get in form we can see in URL like req.query --> ?search=express
        courses = await getAllByDate(req.query.search)
        res.render('user-home', {
            title: 'Home Page',
            courses,
            search:req.query.search
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