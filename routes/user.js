const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsunc')
const User = require('../models/user');
const session = require('express-session')
// const flash = require('connect-flash')
const passport = require('passport');
const { isloggedin } = require('../middleware');
const  UserCont = require('../controllers/user');
const { postLoginUser, logout } = require('../controllers/user');

router.route('/register')
.get(UserCont.registerUser)
    .post(catchAsync(UserCont.postUser))

router.route('/login').get(UserCont.loginUser)
    .post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),UserCont.postLoginUser)

    router.get('/logout',isloggedin,UserCont.logout)
module.exports = router;