const express = require("express")
const ClockLog = require("../../models/clockLog")
const mongoose = require("mongoose")
const router = express.Router()

router.get("/",(req,res)=>{
    ClockLog.find()
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

router.post("/",(req,res)=>{
    const clockLog = new ClockLog({
        _id: new mongoose.Types.ObjectId(),
        clockInTime:req.body.clockInTime,
        clockOutTime:req.body.clockOutTime,
        timePassed:req.body.timePassed,
        date:req.body.date,
        note:req.body.note
    })
    clockLog.save()
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

router.delete("/:Id",(req,res)=>{
    ClockLog.deleteOne({_id:req.params.Id})
    .exec()
    .then(
        res.status(200).json({
            message:`log ${req.params.orderId} has been deleted`
        })
    )
    .catch(err =>{
        res.status(500).json({
            error:error
        })
    })
})

module.exports = router 