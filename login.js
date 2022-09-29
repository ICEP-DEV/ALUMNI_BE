const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

const { sign } = require('jsonwebtoken')
app.use(cors());
app.use(bodyparser.json());

const database=require('../database/database');


router.post('/login',(req, res)=>{

    //instatiating user variables
    let email =req.body.email;
    let password=req.body.password;

//retrieve the admin if the admin exists
var sql = 'select * from admin where admin_email ="'+email+'" and admin_password="'+password+'" limit 1';
database.query(sql,(err, result, fields)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
            //if the admin with the following credentials does not exist throw an error
             if(Object.entries(result).length===0){

                return res.status(200).send("An Admin with those  credentials does not exist");
                
            }else{
                
                //if the admin exists save the details to a session 
                Object.keys(result).forEach(function(key){
                    var row = result[key];
                    const jsontoken = sign({ result: result }, "thisismysecret_keysadhasdkjasdh.!5tstdfahsxsdjs&*79798981hgfv",{
                        expiresIn: "2h"
                    });
                    req.session.Admin = {
                        "admin_email": row.admin_email,
                        "admin_id": row.admin_id,
                        "admin_name": row.admin_name,
                        "admin_surname": row.admin_surname,
                        "admin_password": row.admin_password,
                    }

                    
                    console.log(req.session);
                    //code to display on postman
                    return res.status(200).send("Log in was succeful!\n"+JSON.stringify(jsontoken));
           
                }); 
            }

          }
});

});


module.exports = router;