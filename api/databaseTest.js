const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'dione.in.cs.ucy.ac.cy',
    user: 'ffndb',
    password: '3dwaxQvnSDPpVjJS',
    database: 'ffndb'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});
connection.query('SELECT * FROM `ACCOUNT` WHERE AccountID = "2"', (err,rows) => {
    if(err) throw err;
    //console.log('Data received from Db:');
    console.log(rows);
});
connection.end();

