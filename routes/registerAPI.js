const express = require('express')
const mysql = require('mysql')
const getRegisterAPI = express.Router();

const pool = require('../Database/database.js');

getRegisterAPI.post('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO Alumni SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Successfully  Registerd`)
        } else {
            console.log(err)
        }
          })
    })
});

module.exports = getRegisterAPI;
