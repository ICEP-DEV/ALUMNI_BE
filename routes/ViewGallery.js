
const express = require('express');const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

app.use(cors());
app.use(bodyparser.json());
const db = require('../database/database');


router.get('/gallery',(req,res)=>{

      // const news_id = req.body.news_id;
        
        db.query('SELECT * FROM gallery,graduationPic,eventPic',(err,rows)=>{
          
         
             if(!err){
                 res.send(rows)
                 }
                 else
                 {
             console.log(err)
                 }
              })
         
         });

         module.exports = router;