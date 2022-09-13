const mysql =require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

//files
const add=require('./routes/add_alumni');

//instantiating 
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

//go to add_alumni
app.use('/register',add);

app.listen(5000,()=>console.log('Server is running......'));


