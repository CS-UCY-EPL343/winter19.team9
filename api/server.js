'use strict';

const db = require('./database');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/auth', (req, res) => {
    // let user = data.users.find((user) => {
    //     return user.name === req.body.name && user.password === req.body.password;
    // });
    db.dbLogIn(req.body.name, req.body.password)
      .then(user => {
          if (!user) {
              return res.status('404').json('Authentication failed. User not found.');
          }
          // create a token using user name and password valid for 2 hours
          let token = jwt.sign({ username: user.username, level: user.level },
                               process.env.JWT_SECRET, { expiresIn: '2h' });
          let response = { message: 'Token Created, Authentication Successful!', token: token, level: user.level };

          // return the information including token as JSON
          return res.status(200).json(response);
      })
      .catch(err => res.status(409).json(err));
});

app.post('/api/userLevel', middleware, (req, res) => {
    res.json({ 'userLevel': req.decoded.level });
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log('Running on port: ' + PORT);
    db.dbConnect();
});

setInterval(() => server.getConnections(
    (err, connections) => console.log(`${ connections } connections currently open`)
), 1000);

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    console.log('Database closed');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}