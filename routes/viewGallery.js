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

async function makeBucketPublic() {
    await storage.bucket(tutalumni_bucket2).makePublic();
  
    console.log(`Bucket ${tutalumni_bucket2} is now publicly readable`);
  }
  
  

router.get('/',(req, res,next)=>{

try{
  database.getConnection((err, connection)=>{

    var sql = `select * from gallery `;
          connection.query(sql,(err, result)=>{
            connection.release();
            if(err)
            return res.status(200).send("Failed to load data! "+err);
            else{
                makeBucketPublic().catch(console.error);
              return res.status(200).send(result);
              
            }
        
        
          });
          
    
   /* var stream = bucket.file("alumni_images/e9e587ae-fdb7-4a5c-8bc2-ddee772aadeb.jpg").createReadStream();
    stream.pipe(res);
    stream.on('data', function (data) {
      res.write(data);
    });
    stream.on('error', function (err) {
      console.log('error reading stream', err);
    });
    stream.on('end', function () {
      res.set({
        "Content-Disposition": 'attachment; "',
        "Content-Type": 'image/jpg'
      });
      res.end();
    });*/
   

  });


}catch(err){

  return res.status(400).send(err);
}

});

module.exports = router;