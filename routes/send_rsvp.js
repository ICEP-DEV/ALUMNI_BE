const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const nodemailer=require('nodemailer');
const app=express();


app.use(cors());
app.use(bodyparser.json());

const db=require('./database');
const { response } = require('express');
let transporter=nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:"tutalumni22@gmail.com",
        pass:"gsmaslufvspdavvo"
    }
})
//get  all users
router.get('/get_alumni', (req, res) => {
    let = message=req.body.message;
    let subject = req.body.subject;
    
    let sql = `SELECT alumni_name,alumni_surname,alumni_email FROM alumni  `;
    //run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            
            result.map(user => {
                const mailOptions = {
                    from: 'tutalumni22@gmail.com',
                    to: user.alumni_email,
                    subject: subject, // Any subject
                    text: message // Any message
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        
                        console.log(info)   
                        res.status(201).send(info);
                    }
                })
               
         })
        };
    });
});

module.exports = router;