const express = require("express")
const cors = require("cors")
const path = require("path")

let mongoose = require("mongoose")
let config = require("./config.json")
let errorHandler = require("./utils").errorHandler
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
let fs = require('fs')
let app = express()
const PORT = process.env.PORT || 5000
console.log(PORT)


app.use(express.static(path.join(__dirname+"/public")))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())


let Receipt = mongoose.model("Receipt",Schema({
    id : ObjectId,
    num : Number,
    idd : Number,
    quantity:Number,
    name:String,
    desc:String,
    price:Number,
    img:String
    
}))

const string_mongo = `mongodb+srv://${config.username}:${config.password}@cluster0.t0n6iqu.mongodb.net/${config.dbname}?retryWrites=true&w=majority`
mongoose.connect(string_mongo).then((res)=>console.log("Connected"))
.catch((err)=>console.log("Error",err))

app.get("/data",(req,res)=>{
    Receipt.find().then(dbres=>res.json(dbres))
    // res.send()
})

app.post("/users", (req, res) => {
    var a = req.body
    //  console.log(typeof req.body[0].id)

    a.map((val)=>{
        // console.log(val.id)
        let hero = new Receipt({
        num : Number(val.num),
        idd : Number(val.id),
        quantity:String(val.quantity),
        name:String(val.name),
        desc:String(val.desc),
        price:String(val.price),
        img:String(val.img)
        })
        hero.save()
        // console.log("DB updated")
    })
    
});


app.listen(PORT)