const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = require('./routes/index');
const service = require('./services/git-service')
const header = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

app.use(bodyParser.json());
const myLogger = (req, res, next) => {
  service.check_Directory(result => {
    if (result) {
      next()
    }
  })

}
app.use(myLogger)//เอาไว้ดัก เวลาtest postman 
app.use('/', header, router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Application is running on port " + PORT);
});
