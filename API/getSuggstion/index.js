var express = require('express');
var app = express();
var mysql = require("mysql");
var port = process.env.port || 1337;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

app.get("/product", function (request, response) {
  let info = '"'+request.query.info+'"';
  console.log(info);
  connection.connect(function (err,res) {
    if (err) {
      console.log(err);
    }

    let selectQuery = 'select bestAnswer from colorandfruit where enteredinfo='+info;
    console.log(selectQuery);
    connection.query(selectQuery, function (error, results) {
      if (error) throw error;

      console.log(Object.values(results));
      response.send(results);

    });
    console.log('You are now connected with mysql database...')
  })
  
});

app.listen(port, function () {
  var datetime = new Date();
  var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
  console.log(message);
});