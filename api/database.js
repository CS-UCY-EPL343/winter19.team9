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
        if (err) {
            return err;
        }
        console.log('\x1b[32m%s\x1b[0m', 'Connected to database.');
        connection = conn;
    });
    conn.on('error', function() {
        dbDisconnect();
        return null;
    });
}

function dbDisconnect() {
    if (connection !== null) {
        connection.end();
    }
    console.log('\x1b[31m%s\x1b[0m', 'Error. Database connection closed.');
}

function dbLogIn(username, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM ACCOUNT WHERE username = ? AND password = ?";
        connection.query(sql, [ username, password ], function(err, rows) {
            if(err) return reject(err);
            return resolve(rows[0]);
        });
    });
}

function getUserData(user) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM ACCOUNT,USERS WHERE username = ?  AND ACCOUNT.User_ID = USERS.User_ID";
        connection.query(sql, [ user ], function(err, rows) {
            if(err) return reject(err);
            return resolve(rows[0]);
        });
    });
}
function postUserData(data) {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE USERS,ACCOUNT SET  Name = ? , Surname = ? , Email = ? , password = ? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID";
        connection.query(sql, [ data.Name , data.Surname , data.Email , data.password , data.username ], function(err) {
            if(err) {console.log(err); return reject(err)}
            console.log("1 record inserted");
            return resolve('The data were saved successfully!');
        });
    });
}

function deleteUserData(user) {
    return new Promise((resolve, reject) => {

        const sql = "DELETE a,u FROM USERS u JOIN ACCOUNT a ON a.User_ID = u.User_ID WHERE a.username = ? ";
        connection.query(sql, [ user ] , function(err) {
            if(err) return reject(err);
            console.log("1 record deleted");
            return resolve('Success');
        });
    });
}

function getPublicAnnouncements() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ANNOUNCEMENT_ID, Title, Message FROM `ANNOUNCEMENT` WHERE `isPrivate` = 0';
        connection.query(sql, [], function(err, rows) {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function removeAnnouncement(id) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM `ANNOUNCEMENT` WHERE `ANNOUNCEMENT_ID` = ?';
        connection.query(sql, [id], function(err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

function addAnnouncement(title, message, level, username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM `ACCOUNT` WHERE `username`= ?';
        connection.query(sql, [username],
                         function(err, rows) {
                             if (err) {
                                 return reject(err);
                             }

                             let id, sql;
                             if (level === 'coach') {
                                 id = rows[0].Coach_ID;
                                 sql = "INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Coach_ID ) VALUES ( ? , ? , 0, 1, ? )";
                             } else if (level === 'admin') {
                                 id = rows[0].Owner_ID;
                                 sql = "INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Admin_ID ) VALUES ( ? , ? , 0, 1, ? )";
                             } else {
                                 return reject('Authentication failed');
                             }

                             connection.query(sql, [title, message, id], function(err, rows) {
                                 if (err) {
                                     console.log(err);
                                     return reject(err);
                                 }
                                 resolve({id: rows.insertId});
                             });
                         });
    });
}



//mine
function getUserInfo(name) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM ACCOUNT a, USERS u WHERE u.name = ? and u.User_ID = a.User_ID";
        connection.query(sql, [ name ], function(err, rows) {
            if(err) reject(err);
            resolve(rows);
        });
    });
}


//Testing for fetch

//add method name
module.exports = {
    dbConnect,
    dbDisconnect,
    dbLogIn,
    getUserData,
    postUserData,
    deleteUserData,
    getPublicAnnouncements,
    removeAnnouncement,
    addAnnouncement,
    getUserInfo
};
