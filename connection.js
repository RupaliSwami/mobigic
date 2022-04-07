

const mysql = require('mysql');
const multer = require('multer');


const db = mysql.createConnection({

	host:'localhost',
	user:'root',
	password: '',
	database: 'node',
	port: '3307'
});


db.connect((err)=>{
	if(err) console.log(err);
	console.log("database is connected..");
});





module.exports = db;