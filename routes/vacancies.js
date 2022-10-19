const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const database=require('../Database/database.js');

router.get('/',(req, res)=>{
    var sql = 'select * from Vacancies'; 
    
    database.getConnection((err, connection)=>{
        if(err) throw err
    connection.query(sql,(err, result)=>{
        connection.release();
        if(err)
          return res.status(200).send("Failed to load data from the database!"+err);
          else{
            //if the alumni with the following credentials does not exist throw an error
             if(Object.entries(result).length===0){

                return res.status(200).send("There are no vacancies post yet!");
                
            }else{
                console.log(result);
                return res.status(200).send(result);
            }
        }
    });
    });
});
router.post('/',(req, res)=>{

    //instatiating user variables
    let faculty =req.body.vac_faculty;
 
//retrieve the student if the student exists
var sql = 'select * from vacancies where lower(vac_faculty) ="'+faculty+'" ';
database.query(sql,(err, result, fields)=>{
   
    if(err)
          return res.status(200).send("Failed to load data!"+err);
          else{
                    return res.status(200).send(result);


          }
});

});


module.exports = router;
