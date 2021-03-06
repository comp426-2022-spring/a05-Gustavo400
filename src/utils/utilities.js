// This directory contains general utilities that you can use as helper functions throughout other scripts

const helpText = 
`server.js [options]

--port          Set the port number for the server to listen on. Must be an integer
              	between 1 and 65535.

--debug         If set to true, creates endpoints /app/log/access/ which returns
              	a JSON access log from the database and /app/error which throws 
              	an error with the message "Error test successful." Defaults to 
                false.

--log           If set to false, no log files are written. Defaults to true.
                Logs are always written to database.

--help          Return this message and exit.`;

function fondle(req, res) {
    const logdata = {
        "remoteaddr": req.ip,
        "remoteuser": req.user,
        "time": Date.now(),
        "method": req.method,
        "url": req.url,
        "protocol": req.protocol,
        "httpversion": req.httpVersion,
        "status": res.statusCode,
        "referer": req.headers['referer'],
        "useragent": req.headers['user-agent']
    }
    return logdata;
}

module.exports = { helpText, fondle };