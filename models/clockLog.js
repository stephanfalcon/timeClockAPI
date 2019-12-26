const mongoose = require("mongoose")

const clockLogSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    clockInTime:{
        type:String,
        required:true
    },
    clockOutTime:{
        type:String,
        required:true
    },
    timePassed:{
        type:String,
        required:true
    },
    note:String

})

module.exports = mongoose.model("clockLog", clockLogSchema)