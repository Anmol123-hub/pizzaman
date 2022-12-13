const express = require("express")
const cors = require("cors")
const path = require("path")

let mongoose = require("mongoose")
let config = require("./config.json")
let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId
let app = express()
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname+"/public")))

/* To handle the POST data */
app.use(express.urlencoded({ extended: false }));
/* To always fetch data in JSON format */
app.use(express.json())
/* To communicate between servers */
app.use(cors())

/* Creating the model for MongoDB */
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

app.get("/cart",(req,res)=>{
    res.redirect("/")
})
app.get("/admin",(req,res)=>{
    res.redirect("/")
})
app.get("/thankyou",(req,res)=>{
    res.redirect("/")
})
app.get("/data",(req,res)=>{
    Receipt.find().then(dbres=>res.json(dbres))
})

app.post("/users", (req, res) => {
    var a = req.body

    a.map((val)=>{
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
    })
    
});


app.listen(PORT)