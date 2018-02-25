"use strict";

let fs = require("fs");

let express = require("express");
let app = express();

app.use(express.static(__dirname + "/static"));

app.get('/*', function(req, res) {
    let url = req.url;
    if(url === "/") {
        url = "/authorization";
    }

    console.log("Get: " + url);
    const arr = url.split("/");
    const pageName = arr[1];
    const pageWay = "static/htmlPages/" + pageName + ".html";

    fs.stat(pageWay, function(err, stat) {
        if(err == null) {
            console.log("Find: OK");
            res.sendfile(pageWay);
        } else {
            console.log("Find: Error");
            res.sendfile("static/notFound.html");
        }
    });
});

let port = process.env.PORT || 5005;
app.listen(port);

console.log("Server works on port " + port);
console.log("---------------------------------------");
