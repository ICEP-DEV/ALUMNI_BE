const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 4000
const profile = require('./routes/updateProfile');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//connnects the news page with the server
app.use('/updateprofile',profile);


//Listen on environment port or 5000
app.listen(port,()=>console.log(`Listen on port ${port}`))