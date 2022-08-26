// Importing modules

const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const path = require('path')

//importing routes
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
//creating variables



//ENV FILE CONFIG
dotenv.config();

    mongoose.connect(process.env.MONGO_URL, ).then(()=>{
        console.log('connected to DB')
    }).catch(err =>{
        console.log(err)
    })


app.use(express.json())
//routes
app.use("/api/auth" , authRoute)
app.use("/api/users" , userRoute)
app.use("/api/movies" , movieRoute)
app.use("/api/lists" , listRoute)



app.listen(process.env.PORT || '8000' , ()=>{
    console.log(`Backend server is runnin on ${process.env.PORT}`)
})