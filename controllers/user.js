const User = require('../models/user');

module.exports.registerUser =(req,res)=>{
    res.render('user/register')
    }

module.exports.postUser =async (req,res,next)=>{
    // res.send(req.body)
    try{
    const {email,username,password} = req.body;
    const user = new User({email,username})
        const registerUser = await User.register(user,password);
        req.login(registerUser,err=>{
    if(err){return next(err)}
    req.flash('success','Welcome to YELPCAMP')
    res.redirect('/campgrounds')
        })
        // console.log(registerUser);
    }catch(e){
    req.flash('error',e.message);
    res.redirect('/register')
    }
    }

module.exports.loginUser =(req,res)=>{
    res.render('user/login')
}
module.exports.postLoginUser = (req, res) => {
    req.flash('success', 'Welcome Back !');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // delete req.session.returnTo;
    res.redirect(redirectUrl);
}
module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
if(err){return next(err)}
    });
    req.flash('success','Logged you out')
    res.redirect('/campgrounds')
}