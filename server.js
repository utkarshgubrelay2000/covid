var express = require('express');
const app=express()
const path=require('path')
const cors = require("cors")
const mongoose=require('mongoose')
require("dotenv").config({path:"./config/config.env"});
const Routes=require('./routes/router')
const auth=require('./routes/auth')
var HTMLParser = require('node-html-parser');
const bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah !");
});
mongoose.connection.on("error",()=>{
  console.log("error connecting to mongo " ,)
}).catch(err =>{
  console.log("error is",err)
})



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

///Router
/// Server check

// Auth Routers
app.locals.getDate=(date)=>{
  //console.log(date,"date")
return new Date(date).toDateString()
}

app.locals.getTime=(date)=>{
 // console.log(date,"date")
return new Date(date).toLocaleTimeString()
}
app.locals.getTodayDate=(date)=>{
  // console.log(date,"date")
 return new Date().toISOString().substr(0, 10)
 }
 app.use('/',Routes)
 app.use('/',auth)





app.listen(process.env.PORT, () => {
  console.log("running on PORT ",process.env.PORT);
});

module.exports = app;
