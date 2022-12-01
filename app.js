const express = require('express')
const boddParser = require('body-parser')
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const  port = process.env.PORT || 3100;

// files
const events=require('./routes/events');
const admin_login=require('./routes/admin_login');
const login=require('./routes/login');

const  getRegisterAPI = require('./routes/registerAPI');
const viewNews = require('./routes/viewNews');
const viewVacancies = require('./routes/vacancies');
const profile = require('./routes/profile');
const passUpdate=require('./routes/updatePassword');
const chat = require('./routes/chats');
const uploadGallery=require('.routes/uploadImages');
const createNews=require('.routes/createNews');
const updateProfile=require('.routes/updateProfile');
const viewGallery=require('.routes/viewGallery');

const app = express()
//instantiating 
app.use(boddParser.urlencoded({extended:true}))
app.use(boddParser.json())
app.use(cors({"Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"}));
app.use(express.json());
app.use(cookieParser());


const oneDay = 1000*60*60*24;



app.use(session({
    secret:'thisismysecret_keysadhasdkjasdh.!5tstdfahsxsdjs&*79798981hgfv',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay }
}));



//APP.USE Routes declaration middleware
app.use('/api/v1/register',getRegisterAPI);
app.use('/api/v1/login',login);
app.use('/api/v1/viewNews',viewNews);
app.use('/api/v1/viewVacancies',viewVacancies);
app.use('/api/v1/viewProfile',profile);
app.use('/api/v1/send_message',chat);
app.use('/api/v1/',admin_login)
app.use('/api/v1/event',events)
app.use('/api/v1/updatePassword',passUpdate);
app.use('/api/v1/news',createNews);
app.use('/api/v1/viewGallery',viewGallery);
app.use('/api/v1/updateProfile',updateProfile);
app.use('/api/v1/uploadImages,uploadGallery);

//listener
app.listen(port,()=>{
    console.log('the server is running ' +port)
})
