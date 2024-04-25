const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsunc')
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/capmgroung');
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

const {isloggedin,validateCampground,isAuthor} = require('../middleware');
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isloggedin,upload.array('image'),validateCampground,catchAsync(campgrounds.createNew))
// .post(upload.array('image'),(req,res)=>{

//     console.log(req.body,req.files);
//     res.send('IT works')
// })

router.get('/new',isloggedin,campgrounds.new)

router.route('/:id')
.get(catchAsync(campgrounds.show))
.put(isloggedin,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.editCamp))
.delete(isloggedin,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isloggedin,isAuthor,catchAsync(campgrounds.renderEdit))

// router.get('/makeCampground', async (req,res) => {
// const camp = new Campground({ title : 'MY BACKYARD',description: 'sasta version'});
// await camp.save();
// res.send(camp);
// })
module.exports = router;