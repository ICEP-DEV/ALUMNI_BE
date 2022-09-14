//declaring variables
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const login=require('./routes/login');
const event = require('./routes/ViewEvent');

// files
const profile=require('./routes/profile');

const app=express();

//instantiating 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());




app.use('/view',event);
app.use('/view',profile);

//server
app.listen(3000,()=>{console.log('server running............')});