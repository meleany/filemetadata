// File Metadata Microservice by Yasmin Melean 27/04/2017
// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
// This Microservice uses Node.js and Express.
var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer({dest: './uploads/'});
var PORT = process.env.PORT || 3000;

// npm install pug in order to use Pug, Express loads the module internally using:
app.set("view engine", "pug");
app.set("views", __dirname+ "/static");

app.get("/", function(request, response){
  response.render("index.pug");
});

// Accepts a single file with the name fielename. The single file will be stored in req.file.
// When I submit something, I will receive the file size in bytes within the JSON response.
app.post("/", upload.single("filename"), function(request, response){
  response.send({"size": request.file.size});
});

// Starts a server and listens in PORT connection
// The default routing is 0.0.0.0 represented by :: in IPv6
var server = app.listen(PORT, function(){
  var host = server.address().address;
  if(host == "::"){ host = "0.0.0.0"}
  var port = server.address().port;
  console.log("File Metadata Microservice running at http://%s:%s", host, port);
});