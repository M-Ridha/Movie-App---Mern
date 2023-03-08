const mongoose = require("mongoose")
require('dotenv').config()
const URI = process.env.DB_URI



const dbConnect = () => {
    /* mongoose.set('strictQuery', false); 
    mongoose.connect(URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },err =>{
        if (err) throw err
        console.log('connected to MongoDB !!')
    }) */

    mongoose.set('strictQuery',false)
    const connectionParams = {useNewUrlParser: true}
    mongoose.connect(URI,connectionParams)
    
    mongoose.connection.on("connected",()=>{
        console.log("🔊 Connected to DataBase sucessfully")
    })

    mongoose.connection.on('error',(err)=>{
        console.log(`Error while connecting to DataBase : ${err}`)
    })

    mongoose.connection.on("disconnected",()=>{
        console.log("DataBase connection disconnected")
    })
}


module.exports = dbConnect