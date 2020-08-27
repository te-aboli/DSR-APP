var axios = require('axios') ;
const express = require('express');
const router = express.Router();
var path = require('path');
const { token } = require('morgan');
const { response } = require('../app');
const session = require('express-session');
const e = require('express');

var Register = function(req ,res, next)
{
  console.log("Im here");
  axios({
            method: 'post',
            url: 'http://localhost:8080/api/users',
            data: {
             user: {

              
                name: req.body.Name,
                email: req.body.Email,
                password: req.body.Password
              }
            },
           
          }).then((response) =>
          {
            console.log(response);  
            res.redirect('login');
          }).catch(e)
          {
            
            res.redirect('login');
          }
}


var login = function(req, res, next)
{

    console.log("Im here in login");
    axios({
              method: 'post',
              url: 'http://localhost:8080/api/users/login',
              data: {
                user: {
                  email: req.body.Email,
                  password: req.body.Password
                }
              },
             
            }).then((response) =>
            {
              console.log("success"); 
               
               //var sess = req.session.email;
               //console.log(sess);
              //console.log( req.session(session.email));
                res.redirect('addDSR/'+response.data.user._id);
             
            })
}

var addDSR = function(id,req,res,next)
{

  console.log(id);
  // axios({
  //   method:'get',
  //   url: 'http://localhost:8080/api/users/current',
  //   headers: {
  //       'Authorization': 'Token ' + token },
  // }).then((response) =>
  // {
  //   console.log(response.data.user._id);
  //   var id = response.data.user._id;
  //   //res.send(response);
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/DSR/api/addDSR/'+id,
      headers: {
          'Authorization': 'basic 1M78Y6766C746H138A5T420B1O8T5C5R39M' },
      data: {
        TaskName: req.body.TaskName,
        TaskDesc: req.body.TaskDesc,
        ReportingManager: req.body.ReportingManager,
        ProjectName: req.body.ProjectName,
        CreatedBy: req.body.CreatedBy,
        CreateDate: req.body.CreateDate,
        Status: req.body.Status,
        Userid: id
      },
     
    }).then((response) =>
    {
     // console.log(response);  
      res.redirect('/user/displayDSR/'+response.data.Userid);
    })
 

}

var  DisplayDSR = function(id,req, res)
{
  
    console.log("in display token:"+id);
      axios({
        method: 'get',
        url: 'http://localhost:8080/api/DSR/api/DisplayDSR/'+id,
       
      }).then((response) =>
      {
        res.render('DisplayDSR' ,{docs: response.data});
      });
    }
     



var Logout = function(req, res){

axios({
method: 'get',
url: 'http://localhost:8080/api/users/logout',
}).then((response) =>
{
res.redirect('login');
});
}




module.exports = {
  Register:Register,
  login: login,
  addDSR: addDSR,
  DisplayDSR:DisplayDSR,
  Logout: Logout

}