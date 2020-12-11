// var express = require('express');
// var app = express();
// var mysql = require("mysql");
// var port = process.env.port || 1337;

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'test'
// });
// // 
// app.post("/addData", function (request, response) {


//   response.header("Access-Control-Allow-Origin", "*");
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Accept"
//   );
//   response.header("Content-Type", "application/json");

//   var postData =  request.body;
//   console.log(request.body);
//   // var info = request.body.infotxt;
//   // var ans = request.body.selectedfruit;
//   connection.connect(function (err) {
//     if (err) throw err;
//     let INSERTQuery =
//                   "INSERT INTO colorandfruit(enteredInfo, bestAnswer) VALUES ( "+
//                   info +
//                   "," +
//                   ans +")";
//     connection.query(INSERTQuery, function (error, results, fields) {
//       if (error) throw error;
//       response.end(JSON.stringify(results));
//     });
//     console.log('You are now connected with mysql database...')
//   });
// });

// app.listen(port, function () {
//   var datetime = new Date();
//   var message = "Server runnning on Port:- " + port + "Started at :- " + datetime;
//   console.log(message);
// });


var mysql = require("mysql");
var express = require('express')
var bodyParser = require('body-parser') ;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/addData', (req, res) => {
    console.log(req.body);
     
    var info = req.body.infotxt;
    var ans = req.body.selectedfruit; 
    console.log(info, ans);  

      connection.connect(function (err) {
    if (err) throw err;
    let INSERTQuery =
                  "INSERT INTO colorandfruit(enteredInfo, bestAnswer) VALUES ( "+'"'+
                  info+'"' +
                  ","+'"' +
                  ans+'"' +")";
                  console.log("Query:", INSERTQuery)
    connection.query(INSERTQuery, function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    });
    console.log('You are now connected with mysql database...')
  });

    return res.send(req.body);
})


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`app runing in port ${PORT}`)
})