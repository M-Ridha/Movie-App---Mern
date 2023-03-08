const express = require('express')
const app = express()
const cors = require('cors')
const dbConnect = require("./helpers/dbConnect")
const movieRoutes = require('./routes/MovieRoutes')
require('dotenv').config()




app.use(express.json())
app.use(cors())

const port = process.env.PORT || 8080;
dbConnect()

app.use('/api',movieRoutes)




app.listen(port,(err)=>{
    err ? console.log(err) : console.log(`🔊 server is running on http://localhost:${port}`)
})