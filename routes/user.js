var express = require('express');
var router = express.Router();
var axios = require('axios');
var path = require('path');
var passport = require('passport');
let ejs = require('ejs');
var userobj = require('../controller/user');
const user = require('../controller/user');

router.get('/RegisterUser', function(req,res)
{
    res.render('Register');
});
router.post('/RegisterUser', function(req,res){
    
    userobj.Register(req,res);
})

router.get('/login', function(req, res)
{
    res.render('Login');
});
router.post('/login', function(req,res)
{
    
    userobj.login(req,res);
});

router.post('/dashboard:id', function(req,res)
{
    var id = req.params.id;
    res.render('dashboard',{id:id});
})
router.get('/dashboard/:id', function(req,res)
{
    var id = req.params.id;
    res.render('dashboard', {uid:id});

})
router.get('/addDSR/:id',function(req,res)
{
    res.render('addDSR');
})
router.post('/addDSR/:id', function(req,res)
{
    var id = req.params.id;
    userobj.addDSR(id,req,res);
})
router.get('/DisplayDSR/:id' , function(req,res)
{
    var userid= req.params.id;
    console.log(userid);
    userobj.DisplayDSR(userid, req,res);

});

router.get('/logout', function(req, res)
{
    userobj.Logout(req, res);
})



module.exports = router;