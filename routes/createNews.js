const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const jwtMiddleware=require('./jwtMiddleware')

app.use(cors());
app.use(bodyparser.json());

const db=require('../Database/database');

router.post('/create_news',jwtMiddleware,(req,res) => {
    const admin = req.decoded;
    const id =admin.admin_id
    console.log(id)
    if(id){
        let title=req.body.news_title;
        let description=req.body.news_description;
          
        let sql = `INSERT INTO newsfeed (news_title,news_description,admin_id)
        VALUES('${title}','${description}','${id}')`;
    //run the query


        db.query(sql,(err,results) => {
            if(err){
                return res.status(401)
            }else {
                return res.status(201).send({message:'news created successfully'});
            }
        })

    }else{
        res.sendStatus(403).send("Unauthorized to create news")
    }
    
});

/*router.put('/update_news/:id',jwtMiddleware,(req,res)=>{
    const admin = req.decoded;
    const id = admin.admin_id
    if(id){
        ///sql query
        let sql=`UPDATE newsfeed SET 
                news_title = '${req.body.news_title}',news_description='${req.body.news_description}',admin_id='${id}'
                WHERE news_id = '${req.params.id}'`;
                //run query
                
                db.query(sql,(err,result)=>{
                    if(err) throw err;
                    else{
                        res.sendStatus(200).send("data updated");

                    }
                });
    } else{
        res.sendStatus(403).send("Unauthorized to update news")
    }
});*/


module.exports = router;