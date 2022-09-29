const mysql=require('mysql2');

var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'alumni_db',
});

db.connect((err)=>{
    if(!err)
    console.log("DB connection accepted");
    else
    console.log("DB connection failed \n Error:"+JSON.stringify(err,undefined, 2));
});

module.exports=db;