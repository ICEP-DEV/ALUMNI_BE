const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const auth = require('./auth');
const JWT= require('jsonwebtoken')
const app=express();
const session = require('express-session');
const jwtMiddleware=require('./jwtMiddleware')

app.use(cors());
app.use(bodyparser.json());

const database=require('../Database/database.js');
const cookieParser = require('cookie-parser');

router.get('/', jwtMiddleware,(req, res)=>{
const user = req.decoded;

    const name = user.alumni_name;
    const id = user.alumni_id
    if (name) {
        res.send({ name: user.alumni_name, id:user.alumni_id,email:user.alumni_email,faculty:user.faculty})
    } else {
        res.status(500)
    }
/*try{ 
  return res.status(200).send({Name:req.session.Alumni.alumni_name
  ,Surname:req.session.Alumni.alumni_surname,Email:req.session.Alumni.alumni_email,Id:req.session.Alumni.alumni_id,faculty:req.session.Alumni.faculty });
}catch(err){
return res.status(404).send("Note!! ,Please Login to view Profile!! \n"+err);
}*/


});

module.exports = router;
