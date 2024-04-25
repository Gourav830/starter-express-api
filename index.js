if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Campground = require("./models/capmgroung");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
const dbUrl = process.env.DB_URL;
// const dbUrl ='mongodb://127.0.0.1:27017/yelpCamp123';

const userRoutes = require("./routes/user");
const campgroundRoutes = require("./routes/campgorunds");
const reviewsRoutes = require("./routes/review");

async function main() {
  await mongoose.connect(dbUrl);
  console.log("CONNECTION OPEN to mongoose");
}
main().catch((err) => console.log("Error occuredd"));

app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = new MongoStore({
  mongoUrl: dbUrl,
  secret: "thisshouldbeabettersecret!",
  touchAfter: 24 * 60 * 60,
});
store.on("error", function (e) {
  console.log("session stored error", e);
});

const sessionConfig = {
  store,
  name: "yoyoddnfku",
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy (User.authenticate()))
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
// app.get('/fakeUser',async (req,res)=>{
// const user= new user({
//     email:'singlaji1323@gmail.com',
//     username:'singlaji',
// })
// const newUser =await User.register(user,'qwerty');
// res.send(newUser)
// })
app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewsRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 404 } = err;
  if (!err.message) err.message = "oh! No something went wrong!!";
  res.status(statusCode).render("error", { err });
});

app.listen("1323", (req, res) => {
  console.log("Listning On 1323 !#@#");
});
