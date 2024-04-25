const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsunc')
const Review =require('../models/review')

const Campground = require('../models/capmgroung');
const ExpressError = require('../utils/ExpressError');
const {reviewSchema}=require('../schemas');
const {validateReview,isloggedin} =require('../middleware');
const { CreateReview, DeleteReview } = require('../controllers/review');



router.post('/',isloggedin,validateReview,catchAsync(CreateReview))

    router.delete('/:reviewId',isloggedin,catchAsync(DeleteReview))
    module.exports = router;
