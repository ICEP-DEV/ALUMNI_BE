const mysql=require('mysql2');

var db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'alumni_db',
});



module.exports=db;