const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review=require('./review');
const user = require('./user');

const CampgroundSchema = new Schema({
    title: String,
    image:[
        {url:String,
        filename :String
        }
    ],
    price: Number,
    description : String,
    location : String,
    author:{
    type:Schema.Types.ObjectId,
    ref : user
    },
    reviews:[
{
    type:Schema.Types.ObjectId,
    ref:'Review'
}
    ]
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

module.exports = mongoose.model('Campground',CampgroundSchema);