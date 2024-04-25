// const passport = require("passport");
const {campgroundSchema,reviewSchema}=require('./schemas');
const  ExpressError = require('./utils/ExpressError');
const Campground = require('./models/capmgroung')
const reviews = require('./models/review')
module.exports.isloggedin = (req,res,next)=>{
if(!req.isAuthenticated()){
req.session.returnTo = req.originalUrl
    req.flash('error','you must be signed in');
    return res.redirect('/login')
}
next();
}

module.exports.validateCampground= (req,res,next)=>{

    const {error} =campgroundSchema.validate(req.body)
    if(error){
        const msg =error.details.map(el=>el.message).join(',')
    throw new ExpressError(msg,400)
    }else{
        next();
    }
    // console.log(error)
}
module.exports.isAuthor =async (req,res,next)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error','you must be signed in to edit')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.isAuthorReviews =async (req,res,next)=>{
    const {id , reviewId} = req.params;
    const review = await reviews.findById(reviewId)
    if(!reviews.author.equals(req.user._id)){
        req.flash('error','You do not have permission to go that ')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.validateReview =(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg =error.details.map(el=>el.message).join(',')
    throw new ExpressError(msg,400)
    }else{
        next();
    }
    }
// if(!req.isAuthenticated()){
//     req.flash('error','you must be signed in');
//     return res.redirect('/login')
// }
