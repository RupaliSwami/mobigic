const express= require('express');
const app = express();

const routes = require("./routes");
var bodyParser=require('body-parser');
var session = require('express-session');
const multer = require('multer');
const mysql = require('mysql');



app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.set('views', __dirname + '/views');
app.set('view engine','ejs');


app.use("/", routes);



app.listen(4000,()=>{
	console.log('server is running on port 4000');
});

