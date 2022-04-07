const express = require('express');
const router = express.Router();
const db = require('./database/Connection.js');
const multer= require('multer');

const {check, validationResult}=require('express-validator');


router.get('/',function(req,res){
   res.render('login');
});


router.post('/signin',function(req,res){                    

   var name= req.body.userid;
   var email = req.body.email;
   var password = req.body.password;

   var sql=`insert into userlogin(name,email,password)values('${name}','${email}','${password}')`;

   db.query(sql,function(err,results){
       if(err) throw err;
       res.render('login',{results:message});
      
   });
});


router.post('/login', function(request, response){

   var email = request.body.email;
   var password = request.body.password;
   if (email && password) {
      db.query('SELECT * FROM userlogin WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
         if (results.length > 0) {
            request.session.loggedin = true;
            request.session.email = email;
            response.redirect('/home');
         }else{
               response.send( 'Incorrect Username and/or Password!');
         }        
         response.end();
      });
   }
   else {
      response.send('Please enter Username and Password!');
      response.end();
   }
});

//router.get('/create',function(req,res){
//   res.render('home');
//});

router.get('/home',function(req,res){

    res.redirect('/show');
    });

    var storage = multer.diskStorage({
      destination : function(req,file,cb){
         cb(null,__dirname+'/public');
     },
     filename: function(req,file,cb){
         const ext = file.mimetype.split('/')[1];
         cb(null, file.originalname);
   }
});


var upload = multer({ storage: storage });


router.get('/create',function(req,res){
   res.render('home');
});


router.post('/upload', upload.single('file'), (req, res, next)=>{
   const file = req.file
   console.log(file);
 
   if (!file) {
     const error = new Error('Please upload a file')
     error.httpStatusCode = 400
     return next(error)
   }else{
      var sql = "INSERT INTO `userfile`(`filename`, `destination`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.destination+"', '"+req.file.size+"')";
  
                 var query = db.query(sql, function(err, result){
                    console.log('inserted data');
                 });
         message = "Successfully! uploaded";
         res.redirect('/show');
         }
  });
       

  router.get('/show',function(req,res){

   var sql="select * from userfile";
   
    db.query(sql,function(err,results){
     if(err) throw err;
          
        res.render('show',{userfile:results});
   }); 
      
 });




router.get('/delete/:id',function(req,res){
   var id=req.params.id;
   var sql=`delete from userfile where id='${id}'`;

   db.query(sql,function(err,results){
      if(err) throw err;

      res.redirect('/show');
   });    
});


module.exports = router;


