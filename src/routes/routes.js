const coin = require("../services/coin");
const database = require("../services/database");
const utils = require("../utils/utilities");

const endpoints = {
    // /app/ Check endpoint
    check: (app, path) => {
        app.get(path, (req, res) => {
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.writeHead( res.statusCode, {"Content-Type": "text/plain"});
            res.end(`${res.statusCode} ${res.statusMessage}`);
            database.insertRow(utils.fondle(req, res));
        });
    },
    // /app/flip/ Single flip endpoint
    flip: (app, path) => {
        app.get(path, (req, res) => {
            const result = {"flip": coin.coinFlip()};
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.set({"Content-Type": "text/json"});
            res.json(result);
            database.insertRow(utils.fondle(req, res));
        });
    },
    // /app/flips/:count Multi-flip endpoint
    flips: (app, path) => {
        app.get(path, (req, res) => {
            // Capture number parameter
            const count = parseInt(req.params.count);
            // Flip and count multiple
            const raw = coin.coinFlips(count);
            const summary = coin.countFlips(raw);
            // Collect results
            const result = {"raw": raw, "summary": summary};
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.set({"Content-Type": "text/json"});
            res.json(result);
            database.insertRow(utils.fondle(req, res));
        });
    },
    // /app/flip/call/:call Flip and call endpoint
    call: (app, path) => {
        app.get(path, (req, res) => {
            // Get call from parameter and flip a coin
            const call = req.params.call;
            const result = coin.flipACoin(call);
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.set({"Content-Type": "text/json"});
            res.json(result);
            database.insertRow(utils.fondle(req, res));
        });        
    },
    // Default response for any other request
    default: (app) => {
        app.use(function(req, res) {
            res.status(404).send('404 NOT FOUND');
            database.insertRow(utils.fondle(req, res));
        });
    },
    // Debug specific endpoints
    debug: {
        // /app/error
        error: (app, path) => {
            app.get(path, (req, res) => {
                database.insertRow(utils.fondle(req, res));
                throw new Error("Error test successful");
            })
        },
        // /app/log/access
        log: (app, path) => {
            app.get(path, (req, res) => {
                const result = database.getAll();
                res.statusCode = 200;
                res.statusMessage = "OK";
                res.set({"Content-Type": "text/json"});
                res.json(result);
                database.insertRow(utils.fondle(req, res));
            })
        }
    }
}

module.exports = { endpoints }