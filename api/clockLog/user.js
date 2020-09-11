const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const User = require("../../models/user")

passport.use(new LocalStrategy(
    // function(username, password, done) {
    //     User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //     });
    // }
    (username,password,done)=>{
        if(username){
            return done(null,user)
        }
    }
));


router.get('/',(req,res)=>{
    User.find()
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json({docs})
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

router.post('/login',(req,res)=>{
    
    User.findOne({username:req.body.username})
    .then((result)=>{
        res.json(result)
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
        res.status(201).json(result)
        console.log("poop")
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send(
            {error:err}
        )
    })
})

router.delete('/',(req,res)=>{
    
})

module.exports = router