const mysql = require('mysql');

let connection = null; // Global

function dbConnect() {
    if(connection !== null) return;
    const conn = mysql.createConnection({
        host: 'dione.in.cs.ucy.ac.cy',
        user: 'ffndb',
        password: '3dwaxQvnSDPpVjJS',
        database: 'ffndb'
    });
    conn.connect((err) => {
        if (err) return err;
        console.log('Connected to database.');
        connection = conn;
    });
    conn.on('error', function() {
        dbDisconnect();
    });
}

function dbDisconnect() {
    if (connection !== null)
        connection.end();
    console.log('Connection closed.');
}

module.exports = {
    dbConnect,
    dbDisconnect
};
