const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const database=require('./database');


router.post('/alumni',(req, res)=>{
    const alumni_name =req.body.alumni_name;
    const alumni_surname =req.body.alumni_surname;
    const alumni_email =req.body.alumni_email;
    const password =req.body.alumni_password;
    const faculty =req.body.faculty;
   
    console.log(req.body);
      var sql = 'select * from alumni';
      database.query(sql, function(err, result){
          if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
          Object.keys(result).forEach(function(key) {
            var row = result[key];
            
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
              });
              
              readline.question(row.alumni_name, name => {
                console.log(`Hey there ${name}!`);
                
              });
              readline.close();
        });
    }
      });
  });
  
  module.exports = router;