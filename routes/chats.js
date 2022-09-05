
const express = require('express');const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();
const login=require('./login');

app.use(cors());
app.use(bodyparser.json());
const db = require('./database');

///get all users
router.get('/get_user/:id', (req, res) => {
    let userId=req.params.id;
    let sql = `SELECT alumni_id,alumni_name FROM alumni WHERE id = '${userId}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});

///send messages
router.post('/send_messages/:receiverId/', (req, res) => {
    
    let receiverId = req.params.receiverId;
    let senderId =req.session.Alumni.alumni_id;
    let message = req.body.message;
    if (message != null && senderId != receiverId) {
        let sql = `INSERT INTO chat_box(senderId,receiverId,message)
             VALUES('${senderId}','${receiverId}','${message}')`;
        //run the query

        db.query(sql, (err, results) => {
            if (err) return res.status(401).send(+err);
            else {
               return res.send('messages sent');

            }

        });
    } else{
        res.sendStatus(401);
    }

});

//get messages
router.get('/get_message/:id', (req, res) => {
    receiverId = req.params.id;
    let sql = `SELECT * FROM chat_box  WHERE senderId='${req.session.Alumni.alumni_id}' AND receiverId='${receiverId}' 
              OR  senderId='${receiverId}' AND receiverId='${req.session.Alumni.alumni_id}'`;
    //run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});

module.exports = router;