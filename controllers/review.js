const Campground = require('../models/capmgroung');
const Review =require('../models/review')
module.exports.CreateReview =async (req,res)=>{
    const {id} = req.params

        const newReview = await Campground.findById(id)
        const review = new Review(req.body.review);
        review.author =req.user._id;
        newReview.reviews.push(review);
        await review.save();
        await newReview.save();
        req.flash('success',`successfully posted the review `)
        res.redirect(`/campgrounds/${newReview._id}`);

    }
module.exports.DeleteReview =async (req,res)=>{
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})

    await Review.findByIdAndDelete(reviewId);
    req.flash('success',`successfully deleted the review `)
    res.redirect(`/campgrounds/${id}`)
}