'use strict';
const PORT = process.env.PORT || 8000;

var http = require("http");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
   var indexPath = path.join(__dirname, 'index.html');
   console.log(indexPath);
    res.sendFile(indexPath);
});

app.use("/players", require("./routes/players"));

var server = http.createServer(app);

app.listen(PORT,function(){
console.log(`Server listening on ${PORT}`);
});