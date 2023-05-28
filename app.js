const express = require("express");
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routers/user-router')
//const port = process.env.PORT || 5001;


const connect = async () => {
    return mongoose
      .connect(
        'mongodb+srv://j0n1ssd7:30ehhO6kXGsPm9hJ@cluster0.3fo4vwg.mongodb.net/shalom'
      )   
      .then(() => console.log(` 🍃 mongo-db connected`))
      .catch(console.log)
  }


  connect()
  app.use(express.json());
  app.use("/api",userRouter)
  app.listen(process.env.port,()=> {console.log("Login successfully")})



