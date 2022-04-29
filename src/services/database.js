// Verbose mode
"use strict";

// Importing better-sqlite3 and connecting/create db file
const Database = require("better-sqlite3");
const db = new Database("./data/db/log.db");

// Initialize database and create table if doesn't exist
function initDatabase() {
    // const stmt = db.prepare(`SELECT NAME FROM sqlite_master WHERE TYPE='table' AND NAME='accesslog';`);
    const createTable_stmt = `CREATE TABLE IF NOT EXISTS accesslog (
                            remoteaddr TEXT,
                            remoteuser TEXT,
                            time INTEGER,
                            method TEXT,
                            url TEXT,
                            protocol TEXT,
                            httpversion TEXT,
                            status INTEGER,
                            referer TEXT,
                            useragent TEXT
                        );`;
    db.exec(createTable_stmt);
}

// Insert new row into table
function insertRow(logdata) {
    const insert_stmt = `INSERT INTO accesslog (
                        remoteaddr,
                        remoteuser,
                        time,
                        method,
                        url,
                        protocol,
                        httpversion,
                        status,
                        referer,
                        useragent
                    ) VALUES (
                        '${logdata.remoteaddr}',
                        '${logdata.remoteuser}',
                        ${logdata.time},
                        '${logdata.method}',
                        '${logdata.url}',
                        '${logdata.protocol}',
                        '${logdata.httpversion}',
                        ${logdata.status},
                        '${logdata.referer}',
                        '${logdata.useragent}'
                    );`;
    db.exec(insert_stmt);
} 

// Get all rows for download
function getAll() {
    const select_stmt = db.prepare(`SELECT * FROM accesslog`);
    return select_stmt.all();
}

// Export functions
module.exports = { initDatabase, insertRow, getAll };