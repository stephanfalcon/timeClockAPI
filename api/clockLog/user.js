const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const User = require("../../models/user")

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
        });
    }
));

router.get('/',(req,res)=>{
    User.find()
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json({docs:docs})
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/login',(req,res)=>{
    console.log("this the req.body : " + req.body)
    passport.authenticate("local",{
    s
    })
    User.findOne({username:req.body.username})
    .exec()
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        res.json(err)
    })
});

router.post('/register',(req,res)=>{
    console.log(req.body)

    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        name:req.body.name
    })

    user.save()
    .then(result=>{
        console.log(result)
        res.json({result})
        console.log("poop")
    })
    .catch(err=>{
        console.log(err)
        res.json(
            {error:err}
        )
    })
})

router.post('/delete',(req,res)=>{
    User.deleteOne({_id:req.body._id})
    .exec()
    .then(
        res.json({message:`deleted user id: ${req.body._id}`})
    )
})

module.exports = router