const mysql=require('mysql2');

const db= mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'alumni_db',
    })
//check connection to db

module.exports=db;