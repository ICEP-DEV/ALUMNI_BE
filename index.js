//declaring variables
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const login=require('./routes/login');
const session = require('express-session');


// files
const profile=require('./routes/profile');
const cookieParser = require('cookie-parser');


const app=express();

//instantiating 
app.use(cors());
app.use(express.json());
app.use|(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());


const oneDay = 1000*60*60*24;

app.use(session({
    secret:'thisismysecret_keysadhasdkjasdh.!5tstdfahsxsdjs&*79798981hgfv',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay }
}));

app.use('/',login);
app.use('/view',profile);

//server
app.listen(3000,()=>{console.log('server running............')});