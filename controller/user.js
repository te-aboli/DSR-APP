var axios = require('axios') ;
const express = require('express');
const router = express.Router();

var Register = function(req  ,res,next)
{
  console.log("Im here");
  axios({
            method: 'post',
            url: 'http://localhost:8080/User/api/RegisterUser',
            headers: {
                'Authorization': 'basic 1M78Y6766C746H138A5T420B1O8T5C5R39M' },
            data: {
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password
            },
           
          }).then((response) =>
          {//
            console.log(response);  
            res.redirect('login');
          })
}


var login = function(req, res, next)
{

    console.log("Im here");
    axios({
              method: 'post',
              url: 'http://localhost:8080/User/api/UserLogin',
              headers: {
                  'Authorization': 'basic 1M78Y6766C746H138A5T420B1O8T5C5R39M' },
              data: {
                  Email: req.body.Email,
                  Password: req.body.Password
              },
             
            }).then((response) =>
            {//
              console.log(response);  
              res.redirect('addDSR/'+response.data);
            })
}

var addDSR = function(id,req,res,next)
{
  axios({
    method: 'post',
    url: 'http://localhost:8080/DSR/api/addDSR/'+id,
    headers: {
        'Authorization': 'basic 1M78Y6766C746H138A5T420B1O8T5C5R39M' },
    data: {
      TaskName: req.body.TaskName,
      TaskDesc: req.body.TaskDesc,
      ReportingManager: req.body.ReportingManager,
      Projectname: req.body.ProjectName,
      CreatedBy: req.body.CreatedBy,
      CreateDate: req.body.CreateDate,
      Status: req.body.Status,
      Userid: id
    },
   
  }).then((response) =>
  {
    console.log(response);  
    res.redirect('/user/displayDSR/'+id);
  })

}

var DisplayDSR = function(id,req, res)
{
    console.log("in display"+id);
    axios({
      method: 'get',
      url: 'http://localhost:8080/DSR/api/DisplayDSR'+id,
      headers: {
          'Authorization': 'basic 1M78Y6766C746H138A5T420B1O8T5C5R39M' },
     
    }).then((response) =>
    {
      console.log(response);  
      res.redirect('DisplayDSR/'+id ,{docs: response.data});
    })

}



module.exports = {
  Register:Register,
  login: login,
  addDSR: addDSR,
  DisplayDSR:DisplayDSR

}