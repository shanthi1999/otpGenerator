const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://user:user@cluster0.uacni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{useUnifiedTopology:true,useFindAndModify:false, useNewUrlParser:true,useCreateIndex: true})
const connectDB = mongoose.connection;
connectDB.on('open',()=>{
    console.log("DB connected")
})

app.use(express.json());

app.listen(PORT,()=>{
    console.log("port listenting")
})

app.use("/api/routes",routes);