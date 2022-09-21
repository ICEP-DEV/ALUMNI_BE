//declaring variables
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const session = require('express-session');
const mysqlSession = require('express-mysql-session')(session);

// files
const login=require('./routes/login');
const chats = require('./routes/chats');
const vacancies = require('./routes/view_vacancies');
const rsvp = require('./routes/count_rsvp');
const send_rsvp = require('./routes/send_rsvp');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session');


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
app.use('/send_message',chats);
app.use('/vacancies',vacancies);
app.use('/count_reservation',rsvp);
app.use('/send_rsvps',send_rsvp);

app.get('/logout',(req, res)=>{
    req.session.destroy(function(err){
       if(err){
        return res.status(400).send(err);
       }else{
        return res.status(400).send("destroyed \n"+JSON.stringify(req.session));
       }
    });
});

//server
app.listen(3000,()=>{console.log('server running............')});