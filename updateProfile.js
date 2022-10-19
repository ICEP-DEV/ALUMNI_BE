
const express = require('express');const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

app.use(cors());
app.use(bodyparser.json());
const db = require('../database/database');


router.put('/',(req,res) => {
//update record
//app.put('updateprofile',(req, res) => {

    db.getConnection((err, connection)  => {
        if(err) throw err
        console.log(`connected as alumni_id ${connection.threadId}`)

        const {alumni_id,alumni_name,alumni_surname,alumni_email,alumni_password,faculty} =req.body

        connection.query('UPDATE alumni SET alumni_name = ?,alumni_surname =?,alumni_email =?,faculty =? WHERE alumni_id =?' , [alumni_name,alumni_id,alumni_surname,alumni_email,faculty] , (err, rows) => {
        connection.release() //return the connection to pool
        if(!err) {
            res.send(`alumni with the name: ${alumni_name,alumni_surname} has been updated.`)
        }
        else{
            console.log(err)
        }

        })

    console.log(req.body)

    })
})


         module.exports = router;