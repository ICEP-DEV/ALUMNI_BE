const express =require('express');
const bodyparser=require('body-parser');
const cors = require('cors');
const router = express.Router();
const app=express();
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { format } = require('util');
const jwtMiddleware=require('./jwtMiddleware')
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

app.use(cors());
app.use(bodyparser.json());

const database = require('../database/database');



router.post('/',jwtMiddleware, multer.single('image'),(req, res)=>{

try{
  database.getConnection((err, connection)=>{
    if(err) throw err
    const admin = req.decoded;
    const id = admin.admin_id
    if(id){
      if(req.file){
        const blob = bucket.file("alumni_images/"+req.file.originalname);
        console.log("trying to upload...............");
        const blobStream = blob.createWriteStream();
        blobStream.on("finish", ()=> {

            const publicUrl = format(
            'https://storage.cloud.google.com/tutalumni_bucket2/alumni_images/'+req.file.originalname
          );

          var sql = `INSERT INTO gallery(gallery_url,gallery_title,gallery_category,admin_id) VALUES('${publicUrl}','${req.body.gallery_title}','${req.body.gallery_category}','${id}') `;
          connection.query(sql,(err, result)=>{
            connection.release();
            if(err)
            return res.status(200).send("Failed to load data! "+err);
            else{
        
              return res.status(200).send("Image successfully uploaded");
            }
        
        
          });
          
          
        });
        console.log("done");
        blobStream.end(req.file.buffer);

      
      }
    }else{
      res.status(403).send("Unauthorized to to upload image")
    }

  });
/*

  var sql = 'INSERT INTO images(image_name,gallery_id,admin_id) VALUES('+'"'+req.file.originalname+'","'+req.session.Admin.admin_id+'","'+gallery_id+'") ';
database.getConnection((err, connection)=>{
    if(err) throw err
connection.query(sql,(err, result)=>{
    connection.release();
    if(err)
          return res.status(200).send("Failed to load data! "+err);
          else{

            return res.status(200).send("Image successfully uploaded");
          }
  

    });
}); */

}catch(err){

  return res.status(200).send(err);
}

});

module.exports = router;