const validator = require('validator');
const {body, validationResult} =require('express-validator')
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');
const { isGuest } = require('../middlewares/guards');
const authController = require('express').Router();


authController.get('/register', isGuest(), (req, res) => {
    res.render('register', {
        title: "Register Page"
    })
})
authController.post('/register', isGuest(),

body('username')
.isLength({min: 5}).withMessage('Username must be at least 5 characters long')
.isAlphanumeric().withMessage('Username may contains only latin letters and digits'),

body('password')
.isLength({min: 5}).withMessage('Password must be at least 5 characters long')
.isAlphanumeric().withMessage('Password may contains only latin letters and digits'),

async (req, res) => {
   
    try {
        const {errors } = validationResult(req);
        if(errors.length> 0 ){
            throw errors;
        }
        if (req.body.username == "" || req.body.password == "") {
            throw new Error('All fields are required')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
        // if (regex.test(req.body.password ) == false) {
        //     throw new Error('Passwords should be only latin letters and digits')
        // }
        if (req.body.password.length < 5) {
            throw new Error('Password must be at least 5 characters long')
        }
        const token = await register(req.body.username, req.body.password);

        res.cookie('token', token, { httpOnly: true })
        res.redirect('/') 
    } catch (error) {

        const errors = parseError(error)
        res.render('register', {
            title: "Register Page",
            errors,
            body: {
                username: req.body.username
            }
        })
    }

})

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: "Login Page"
    })
})
authController.post('/login', isGuest(), async (req, res) => {
    try {
        if (req.body.username == "" || req.body.password == "") {
            throw new Error('All fields are required')
        }

        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token, { httpOnly: true })
        res.redirect('/') 

    } catch (error) {
        const errors = parseError(error);
        
        res.render('login', {
            title: 'Login Page',
            errors,
            body: { username: req.body.username }
        })
    }
})
authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
})
module.exports = authController;