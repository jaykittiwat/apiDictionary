const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = require('./routes/index');
const service = require('./services/git-service')
const header =(req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
 /* res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );*/
  next();
};


app.use(bodyParser.json());
const myLogger =  (req, res, next) => {
 service.check_Directory(result=>{
 if(result){
  next()
 }
 })
 
}
app.use(myLogger)//เอาไว้ดัก เวลาtest postman 
app.use('/',header, router);


const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log("Application is running on port " + PORT);
});
