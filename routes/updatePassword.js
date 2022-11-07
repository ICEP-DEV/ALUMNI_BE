const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyparser.json());

const database=require('../database/database');

router.get('/',(req,res)=>{
    console.log(req.body.session);
})

router.put('/',(req, res)=>{

    //instatiating user variables
    const password =req.session.Alumni.alumni_password;
    const entered_password =req.body.entered_password;
    const new_password =req.body.new_password;
    const re_password =req.body.re_enter_password;

    console.log(password,entered_password)
if(password === entered_password){
//retrieve the student if the student exists
let sql = "UPDATE ALUMNI SET alumni_password = ? where alumni_id = ?";
console.log(req.session.Alumni.alumni_id);
let data = [new_password,req.session.Alumni.alumni_id];

database.getConnection((err, connection)=>{
    if(err) throw err
connection.query(sql, data,(err, result)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
                    return res.status(200).send("Password updated");

          }
});

});
}else{
    return res.status(401).send("You entered the wrong password"); 
}
});

module.exports = router;