
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
var path = require('path');
var fs = require('fs')
var request = require('request')

const axios = require('axios');

var dotenv = require('dotenv');
dotenv.config();

const {Base64} = require('js-base64');

var usersDBURL = process.env.CLOUDANT_URL
const username = process.env.CLOUDANT_USERNAME
const password = process.env.CLOUDANT_PASSWORD

//Base64 Encoded username password creates authkey
var authKeyEncode = Base64.encode(`${username}:${password}`)

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

var port = process.env.PORT || 8080

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})


//======Utility Functions

function formatGeneralResponse(response){

  return response.data

}

function formatErrorResponse(error){
  if (error.response) {
    // Server error response
    console.log("Error Response")
    return {"response": error}
  } else if (error.request) {
    // No response from server
    console.log("Error Request")
    return {"response": error}
  } else {
    // Some other error
    console.log("Error Message")
    return {"response": error}
  }
  
}


//====API Functions====//

//GET Session by ID
app.get('/getWorlds', function (req, res) {

  axios({
    method: 'get',
    url: `${usersDBURL}/worlds/_all_docs`,
    headers: {'Authorization': `Basic ${authKeyEncode}`}
  })
  .then(response => {
    res.send(formatGeneralResponse(response))
  })
  .catch(function (error){
    console.log('ERROR OCCURRED!')
    console.log(error)
    res.send(formatErrorResponse(error))
  })

})


//Get World
app.post('/getWorld', function (req, res) {

  var worldName = req.body.worldName

  axios({
    method: 'get',
    url: `${usersDBURL}/worlds/${worldName}`,
    headers: {'Authorization': `Basic ${authKeyEncode}`}
  })
  .then(response => {
    res.send(formatGeneralResponse(response))
  })
  .catch(function (error){
    console.log('ERROR OCCURRED!')
    console.log(error)
    res.send(formatErrorResponse(error))
  })

})

//Create World
app.post('/createWorld', function (req, res) {

  var newWorldTemplateData = req.body.newWorldTemplateData

  axios({
    method: 'post',
    url: `${usersDBURL}/worlds`,
    headers: {'Authorization': `Basic ${authKeyEncode}`},
    data: newWorldTemplateData
  })
  .then(response => {
    res.send(formatGeneralResponse(response))
  })
  .catch(function (error){
    console.log('ERROR OCCURRED!')
    console.log(error)
    res.send(formatErrorResponse(error))
  })

})

//Update Jelly Bean Count
app.post('/updateJellyBeanCount', function (req, res) {

  var updatedWorldData = req.body.updatedWorldData

  axios({
    method: 'put',
    url: `${usersDBURL}/worlds/${updatedWorldData["_id"]}`,
    headers: {'Authorization': `Basic ${authKeyEncode}`},
    data: updatedWorldData
  })
  .then(response => {
    res.send(formatGeneralResponse(response))
  })
  .catch(function (error){
    console.log('ERROR OCCURRED!')
    console.log(error)
    res.send(formatErrorResponse(error))
  })

})

//DELETE World
app.post('/deleteWorld', function (req, res) {

  var worldName = req.body.worldName
  var rev = req.body.rev

  axios({
    method: 'delete',
    url: `${usersDBURL}/worlds/${worldName}?rev=${rev}`,
    headers: {'Authorization': `Basic ${authKeyEncode}`},
  })
  .then(response => {
    res.send(formatGeneralResponse(response))
  })
  .catch(function (error){
    console.log('ERROR OCCURRED!')
    console.log(error)
    res.send(formatErrorResponse(error))
  })

})

