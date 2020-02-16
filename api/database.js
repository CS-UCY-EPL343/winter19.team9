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

function dbLogIn(username, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM ACCOUNT WHERE username = ? AND password = ?";
        connection.query(sql, [ username, password ], function(err, rows) {
            if(err) reject(err);
            resolve(rows[0]);
        });
    })
}

function getUserData(user) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM ACCOUNT WHERE username = ?";
        connection.query(sql, [ user ], function(err, rows) {
            if(err) reject(err);
            resolve(rows[0]);
        });
    });
}

module.exports = {
    dbConnect,
    dbDisconnect,
    dbLogIn,
    getUserData
};
