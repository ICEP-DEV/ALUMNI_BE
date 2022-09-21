const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();


app.use(cors());
app.use(bodyparser.json());

const db=require('./database');

router.get('/count_reservation/:id', (req, res) => {
    let event_Id = req.params.id;
    let sql = `SELECT count(event_id)'Reservations',event_id FROM rsvp 
     where event_id ='${event_Id}'`;
     //run query
     db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});
///count reservation by event id
router.get('/count_reservation/:id', (req, res) => {
    let event_Id = req.params.id;
    let sql = `SELECT count(event_id)'Reservations',event_id FROM rsvp 
     where event_id ='${event_Id}'`;
     //run query
     db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});

///get reservation details by event id
router.get('/get_reservation_details/:id', (req, res) => {
    let event_Id = req.params.id;
    let sql = `SELECT rsvp.event_id, alumni.alumni_name, events.event_name 
    FROM rsvp , alumni , events 
    where events.event_id = rsvp.event_id 
    and rsvp.alumni_id = alumni.alumni_id 
    and rsvp.event_id  ='${event_Id}'`;
     //run query
     db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
});

module.exports = router;