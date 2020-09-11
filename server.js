const express = require("express")
const app = express()
const clockLogRouter = require("./api/clockLog/clockLog")
const user = require("./api/clockLog/user")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")


mongoose.connect(`mongodb+srv://stephan:fzymx2525@node-api-hk3o8.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3001

app.use("/clocklog",clockLogRouter)
app.use("/user", user)


app.use((req,res,next)=>{
    const error = new Error("no valid routes")
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})