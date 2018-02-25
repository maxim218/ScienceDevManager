"use strict";

function generateRandomString() {
    let s = "";
    for(let i = 0; i < 10; i++) {
        const r = Math.random();
        s = s + r.toString();
    }
    let q = s.split(".").join("");
    return q.toString();
}

function getBasicUrl() {
    return "http://localhost:5000/";
}

function sendPost(operation, bodyObj, callback) {
    const url = getBasicUrl() + operation + "/" + generateRandomString();
    const bodyString = JSON.stringify(bodyObj);
    console.log("--------------------------------------");
    console.log("Method: POST");
    console.log("Url: " + url);
    console.log("Body: " + bodyString);
    let r = new XMLHttpRequest();
    r.open("POST", url, true);
    r.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    r.send(bodyString);
    r.onreadystatechange = function()  {
        if(r.readyState === 4 && r.status === 200) {
            const result = r.responseText;
            console.log("Result: " + result);
            console.log("--------------------------------------");
            r = null;
            callback(result);
        }
    }
}

function sendGet(operation, callback) {
    const url = getBasicUrl() + operation + "/" + generateRandomString();
    console.log("--------------------------------------");
    console.log("Method: GET");
    console.log("Url: " + url);
    let r = new XMLHttpRequest();
    r.open("GET", url, true);
    r.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
    r.send(null);
    r.onreadystatechange = function()  {
        if(r.readyState === 4 && r.status === 200) {
            const result = r.responseText;
            console.log("Result: " + result);
            console.log("--------------------------------------");
            r = null;
            callback(result);
        }
    }
}
