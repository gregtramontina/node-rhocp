const mysql = require("mysql");
const express = require('express');
var app = express();

//Startup
if (!(process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_DATABASE && process.env.DB_HOST)) {
    throw "These 3 parameters must be specified as environmet variables: DB_USER, DB_PWD, DB_NAME, and DB_HOST";
}

let dbProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

class DbMediator {
    static getItems(callback) {
        let conn = mysql.createConnection(dbProperties);
        conn.connect(function (err) {
            if (err) throw err;
            conn.query("SELECT * FROM items;", function (err, result, fields) {
                if (err) throw err;
                if (callback) {
                    callback(result);
                }
            });
        });
    }
}

app.get("/", function(req, res) {
    console.log("Route / reached.")
    res.status(200).send(
        {
            api: "GPI",
            version: "1.0.0"
        }
    );
    console.log("Response sent.");
});

app.get("/health", function(req, res) {
    console.log("Route /health reached.");
    res.status(200).send(
        {
            api: "GPI",
            version: "1.0.0",
            healthStatus: "OK"
        }
    );
    console.log("Response sent.");
});

app.get("/ready", function(req, res) {
    console.log("Route /ready reached.");
    res.status(200).send(
        {
            api: "GPI",
            version: "1.0.0",
            readyStatus: "OK"
        }
    );
    console.log("Response sent.");
});

app.get("/items", function(req, res) {
    console.log("Route /items reached.");
    let r = DbMediator.getItems(function (result) {
        let rp = {
            api: "GPI",
            version: "1.0.0",
            requestStatus: "OK" ,
            data: result || {}
        }
        res.send(rp);
        console.log("Response sent.");    
    });
});

app.listen(12944, function() {
    console.log("Listening on port 12944...");
});


