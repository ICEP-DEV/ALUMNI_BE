const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

app.use(cors());
app.use(bodyparser.json());

const database=require('../database/database');

router.get('/',(req, res)=>{

//retrieve the student if the student exists


try{
  
var sql = 'select r.rsvp_id,r.admin_id,r.alumni_id,a.alumni_name from RSVP r, Alumni a where a.alumni_id=r.alumni_id ';

database.getConnection((err, connection)=>{
  if(err) throw err
connection.query(sql,(err, result)=>{
  connection.release();

    if(err)
          return res.status(200).send("Failed to  get data  from the database !/n"+err);
          else{
            //if the alumni with the following credentials does not exist throw an error
             if(Object.entries(result).length===0){

                return res.status(200).send("No Rsvps");
                
            }else{
                    //code to display on postman
                    return res.status(200).send(result);
           
                
            }

          }
        });
});
}catch(err){


}

});

module.exports = router;