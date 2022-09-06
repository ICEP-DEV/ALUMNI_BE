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

//retrieve the student if the student exists
var sql = 'select * from alumni where alumni_email ="'+email+'" and alumni_password="'+password+'" limit 1';
database.query(sql,(err, result, fields)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
            //if the alumni with the following credentials does not exist throw an error
             if(Object.entries(result).length===0){

                return res.status(200).send("An Alumni with those  credentials does not exist");
                
            }else{
                
                //if the alumni exists save the details to a session 
                Object.keys(result).forEach(function(key){
                    var row = result[key];
                    const jsontoken = sign({ result: result }, "thisismysecret_keysadhasdkjasdh.!5tstdfahsxsdjs&*79798981hgfv",{
                        expiresIn: "2h"
                    });
                    req.session.Alumni = {
                        "alumni_email": row.alumni_email,
                        "alumni_id": row.alumni_id,
                        "alumni_name": row.alumni_name,
                        "alumni_surname": row.alumni_surname,
                        "alumni_password": row.alumni_password,
                         "faculty": row.faculty
                    }

                    
                    console.log(req.session);
                    //code to display on postman
                    return res.status(200).send("Log in was succeful!");
           
                }); 
            }

          }
});

});


module.exports = router;