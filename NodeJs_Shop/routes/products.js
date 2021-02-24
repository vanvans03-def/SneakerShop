var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const monk = require('monk')

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<1234>@teera.idheo.mongodb.net/<SneakerShop>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
// Connection URL
const url = 'mongodb+srv://admin:asd1234@teera.idheo.mongodb.net/SneakerShop?retryWrites=true&w=majority';

const db = monk(url);
db.then(() => {
  console.log('Connected correctly to server')
})

router.get('/',function(req,res,next){
  res.render("products");
});

router.get('/nike',function(req , res ,next ){
  res.render("nike");
});

router.get('/nike/dior',function(req , res ,next ){
  res.render("dior");
});

router.get('/order',function(req , res ,next ){
  res.render("order");
});

router.post('/nike/dior',[
    check("email","Input your Email").not().isEmpty(),
    check("password","Input your password").not().isEmpty(),
    check("address","Input your address").not().isEmpty(),
    check("address2","Input your address2").not().isEmpty(),
    check("city","Input your city").not().isEmpty(),
    check("state","Input your state").not().isEmpty(),
    check("zip","Input your zip").not().isEmpty()
  ],function(req , res , next){

     const result = validationResult(req);//เก็บข้อความ
     var errors=result.errors;
      if (!result.isEmpty()){
       res.render('dior',{errors:errors});
      }else{
          var ct=db.get('Data');
          ct.insert({
            NikeXDior:req.body.NikeXDior,
            email:req.body.email,
            password:req.body.password,
            address:req.body.address,
            address2:req.body.address2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip
          },function(err,Data){
            if(err){
              res.send(err);
            }else{
              res.location('/nike/dior');
              res.redirect('/nike/dior');

            }

          });
      }
  });


router.get('/nike/blacktoe',function(req , res ,next ){
  res.render("blacktoe");
});
router.post('/nike/blacktoe',[
    check("email","Input your Email").not().isEmpty(),
    check("password","Input your password").not().isEmpty(),
    check("address","Input your address").not().isEmpty(),
    check("address2","Input your address2").not().isEmpty(),
    check("city","Input your city").not().isEmpty(),
    check("state","Input your state").not().isEmpty(),
    check("zip","Input your zip").not().isEmpty()
  ],function(req , res , next){

     const result = validationResult(req);//เก็บข้อความ
     var errors=result.errors;
      if (!result.isEmpty()){
       res.render('blacktoe',{errors:errors});
      }else{
          var ct=db.get('Data');
          ct.insert({
            email:req.body.email,
            password:req.body.password,
            address:req.body.address,
            address2:req.body.address2,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip
          },function(err,Data){
            if(err){
              res.send(err);
            }else{
              res.location('/nike/blacktoe');
              res.redirect('/nike/blacktoe');

            }

          });
      }
  });


router.get('/nike/mocha',function(req , res ,next ){
  res.render("mocha");
});

router.get('/nike/unc',function(req , res ,next ){
  res.render("unc");
});

router.get('/nike/crimson',function(req , res ,next ){
  res.render("crimson");
});

router.get('/nike/gymred',function(req , res ,next ){
  res.render("gymred");
});


router.get('/addidas',function(req , res ,next ){
  res.render("addidas");
});

router.get('/converse',function(req , res ,next ){
  res.render("converse");
});


router.get('/add',function(req , res ,next ){
  res.send('Add Product');
});

router.get('/edit',function(req , res ,next ){
  res.send('edit Product');
});

router.get('/delete',function(req , res ,next ){
  res.send('delete Product');
});



module.exports = router;
