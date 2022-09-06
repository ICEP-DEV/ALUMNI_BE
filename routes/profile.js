const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const session = require('express-session');

app.use(cors());
app.use(bodyparser.json());

const database=require('../database/database');
const cookieParser = require('cookie-parser');

router.get('/profile',(req, res)=>{

return res.status(200).send({Name:req.session.Alumni.alumni_name
  ,Surname:req.session.Alumni.alumni_surname,Email:req.session.Alumni.alumni_email,Id:req.session.Alumni.alumni_id,faculty:req.session.Alumni.faculty });

});

module.exports = router;