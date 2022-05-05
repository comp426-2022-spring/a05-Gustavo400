// Importing coin, database, and utils modules
const utils = require("./src/utils/utilities");
const server = require("./src/services/server");

// Require Minimist, Express, Morgan, and FS
const minimist = require("minimist");

// Capture and parse arguments
const argv = minimist(process.argv.slice(2));
const arg_HELP = argv.help || argv.h;
const arg_PORT = argv.port ? parseInt(argv.port) : 5000;
const arg_LOG = argv.log !== "false";
const arg_DEBUG = argv.debug === "true" || argv.debug === true;

// Check for "--help" or "--h" parameters
if(arg_HELP) {
    console.log(utils.helpText);
    process.exit(0);
}

// Serve static HTML
server.serveHTML("./public");

// Start server on specified port
server.startListening(arg_PORT);

// Logging to access.log if "--log=true" *** LOGGING WITH MORGAN NEEDS TO BE STARTED AS SOON AS SERVER RUNS ***
server.log(arg_LOG);

// Debug endpoints only if "--debug" flag is true
server.debug(arg_DEBUG);

// Run all endpoints defined in routes
server.runEndpoints();