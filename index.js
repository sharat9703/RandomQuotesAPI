const express = require("express");
const cors = require("cors");
let app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
app.use(cors());

const URI = process.env.URI;

mongoose.connect(URI).then(()=>{
    console.log("Connected to MongoDB!");
    app.listen(8000,()=>{
        console.log("app is listening on port number 8000");
    })
}).catch((err)=>{
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send("Hello! API");
});
app.get('/quotes', async(req,res)=>{
   try {
    let coll = mongoose.connection.db.collection('RandQuotes');
    let data =await coll.find({}).toArray();
    res.send(data[Math.ceil(Math.random()*data.length)]);
    
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}); 
 
