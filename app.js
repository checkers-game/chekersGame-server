const express = require("express");
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require('./routers/user-router')


const connect = async () => {
    return mongoose
      .connect(
        'mongodb+srv://j0n1ssd7:30ehhO6kXGsPm9hJ@cluster0.3fo4vwg.mongodb.net/shalom'
      )   
      .then(() => console.log(` 🍃 mongo-db connected`))
      .catch(console.log)
  }
  connect()
  app.use(cors())
  app.use(express.json());
  app.use("/api",userRouter)
  app.listen(process.env.port,()=> {console.log("Login successfully")})



