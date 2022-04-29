// Import local modules
const database = require("./database");
const utils = require("../utils/utilities");
const routes = require("../routes/routes");

// Require Express, Morgan, and FS
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

function serveHTML(path) {
    app.use(express.static(path));
}

function startListening(port) {
    app.listen(port, () => {
        database.initDatabase();
        console.log(`App listening on port ${port}`);
        console.log("Created database");
    });
    app.use(express.json());
}

function log(flag) {
    console.log(`LOG = ${flag}`);
    if(flag) {
        const accessLog = fs.createWriteStream("./data/log/access.log", { flags: "a" });
        app.use(morgan("combined", { stream: accessLog }));
    }
}

function debug(flag) {
    console.log(`DEBUG = ${flag}`);
    if(flag) {
        routes.endpoints.debug.error(app, "/app/error");
        routes.endpoints.debug.log(app, "/app/log/access");
    }
}

function runEndpoints() {
    routes.endpoints.check(app, "/app");
    routes.endpoints.flip(app, "/app/flip");
    routes.endpoints.flips(app, "/app/flips/:count");
    routes.endpoints.flipPost(app, "/app/flip/coins");
    routes.endpoints.call(app, "/app/flip/call/:call");
    routes.endpoints.callPost(app, "/app/flip/call");
    routes.endpoints.default(app);
}

module.exports = { app, startListening, serveHTML, log, debug, runEndpoints };