
const express = require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const login=require('./login');

app.use(cors());
app.use(bodyparser.json());
const database = require('../database/database');

///get all users except the logged in users
router.get('/get_users', (req, res) => {
    try{
    let userId=req.params.id;
    let sql = `SELECT alumni_id,alumni_name FROM Alumni WHERE alumni_id != '${req.session.Alumni.alumni_id}'`;
    database.getConnection((err, connection)=>{
        if(err) throw err
    connection.query(sql,(err, result)=>{
        connection.release();
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});
    }catch(err){
        res.status(402).send("Something went wrong :"+ err);
    }
});

///send messages
router.post('/send_messages/:receiverId/', (req, res) => {
    
    try{
    let receiverId = req.params.receiverId;
    let senderId =req.session.Alumni.alumni_id;
    let message = req.body.message;
    if (message != null && senderId != receiverId) {
        let sql = `INSERT INTO ChatBox(sender_id,receiver_id,message)
             VALUES('${senderId}','${receiverId}','${message}')`;
        //run the query

        database.getConnection((err, connection)=>{
            if(err) throw err
        connection.query(sql,(err)=>{
            connection.release();
            if (err) return res.status(401).send(+err);
            else {
               return res.send('messages sent');

            }

        });
    });
    } else{
        res.status(405).send("Something is missing :"+ err);
    }
}catch(err){
    res.status(402).send("Something went wrong :"+ err);
}
});

//get messages
router.get('/get_message/:id', (req, res) => {
    try{
    receiverId = req.params.id;
    let sql = `SELECT * FROM ChatBox  WHERE senderId='${req.session.Alumni.alumni_id}' AND receiverId='${receiverId}' 
              OR  senderId='${receiverId}' AND receiverId='${req.session.Alumni.alumni_id}'`;
    //run query
    database.getConnection((err, connection)=>{
        if(err) throw err
    connection.query(sql,(err, result)=>{
        connection.release();
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});
}catch(err){
    res.status(402).send("Something went wrong :"+ err);
}
});

module.exports = router;