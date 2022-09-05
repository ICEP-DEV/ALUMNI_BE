const mysql=require('mysql2');

const db=mysql.createConnection({
    "host":"localhost",
    "user":"root",
  "password":"",
    "database":"chatsdb"
});

//check connection to db
db.connect((err)=>{
    if(err) throw err;
    else{
        console.log('Connected to db....');

    };
});

module.exports=db;