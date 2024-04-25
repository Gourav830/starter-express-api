const mongoose = require("mongoose");
const Campground = require("../models/capmgroung");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/yelpCamp123");
  console.log("CONNECTION OPEN to mongoose");
}

main().catch((err) => console.log("Error occured"));

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const iimg = [
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684102/YelpCamp/ygy1udefcxc6yd5hjysv.png",
    filename: "YelpCamp/ygy1udefcxc6yd5hjysv",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684102/YelpCamp/u2rjhs3vsug8tpynilcz.webp",
    filename: "YelpCamp/u2rjhs3vsug8tpynilcz",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684112/YelpCamp/oaprrwgswz7p2butjulm.jpg",
    filename: "YelpCamp/oaprrwgswz7p2butjulm",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684112/YelpCamp/vui0vuskf7dwybtfwlw9.jpg",
    filename: "YelpCamp/vui0vuskf7dwybtfwlw9",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684114/YelpCamp/b5bvzdhlwasbthzuldfb.jpg",
    filename: "YelpCamp/b5bvzdhlwasbthzuldfb",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684117/YelpCamp/lplsrmryyobn8dsfogy3.jpg",
    filename: "YelpCamp/lplsrmryyobn8dsfogy3",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684116/YelpCamp/tt68scobh0uuaartayuk.jpg",
    filename: "YelpCamp/tt68scobh0uuaartayuk",
  },
  {
    url: "https://res.cloudinary.com/dgluxbumn/image/upload/v1711684117/YelpCamp/i7ha9spnsrw307wyldlj.jpg",
    filename: "YelpCamp/i7ha9spnsrw307wyldlj",
  },
];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const price = Math.floor(Math.random() * 40);
    const random1000 = Math.floor(Math.random() * 1000);
    const newCamp = new Campground({
      author: "65f55c7241b4d7ea3ad98eec",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "This is the auto generated camp-ground",
      price,
      image: iimg[i % iimg.length],
    });
    await newCamp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("EXITING....");
});
