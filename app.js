const express = require('express');
var app = express();

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

app.listen(12944, function() {
    console.log("Listening on port 12944...");
});


