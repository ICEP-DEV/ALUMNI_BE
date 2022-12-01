const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const mysql=require('mysql2');
const router = express.Router();
const app=express();

const jwtMiddleware=require('./jwtMiddleware')
app.use(cors());
app.use(bodyparser.json());

const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { format } = require('util');

//setting up file name and other things
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits :{
    fileSize: 100*1024*1024,
  },
});



//destination (store here)


let projectID = "tut-alumni-359613";
let keyFileName = "mykey.json";

const storage = new Storage({
  projectID,
  keyFileName,
});
const bucket = storage.bucket("tutalumni_bucket2");
const database=require('../database/database');


router.put('/',jwtMiddleware,multer.single('image'),(req, res)=>{
    const user = req.decoded;

    

    const id = user.alumni_id
    if (id) {
        //instatiating user variables
        
        const name =req.body.alumni_name;
        const surname=req.body.alumni_surname;
        const email =req.body.alumni_email;

       
        if(name!=null||surname!=null||email!=null){
        //retrieve the student if the student exists
       
        console.log(id);
        

        database.getConnection((err, connection)=>{
            if(req.file){
                const blob = bucket.file("alumni_picture/"+req.file.originalname);
                console.log("trying to upload...............");
                const blobStream = blob.createWriteStream();
                blobStream.on("finish", ()=> {
        
                    const publicUrl = format(
                    'https://storage.cloud.google.com/tutalumni_bucket2/alumni_picture/'+req.file.originalname
                  );
                  let sql = `UPDATE alumni SET alumni_name = ? ,alumni_surname= ?, alumni_email=?, profile_picture=? where alumni_id = ?`;
                    let data = [name,surname,email,publicUrl,id];
                  if(err) throw err
                  connection.query(sql,data,(err, result)=>{
                    
                      if(err)
                          return res.status(200).send("Failed to load data!"+err);
                          else{
                              console.log("updated")
                                      return res.status(200).send("Profile updated");
                                      
                          }
                  });
                  
                  
                });
                console.log("done");
                blobStream.end(req.file.buffer);
        
              
              
            }else{
              res.status(403).send("Unauthorized to to to change profile")
            }
           

        });
        
    } else {
        res.status(500)
       }   }
});

module.exports = router;