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
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.post('/api/auth', (req, res) => {
  db.dbLogIn(req.body.name, req.body.password).then(user => {
    if (!user) {
      return res.status('409').json('Authentication failed. User not found.');
    }
    // create a token using user name and password valid for 2 hours
    let token = jwt.sign({username: user.username, level: user.level},
        process.env.JWT_SECRET, {expiresIn: '2h'});
    let response = {
      message: 'Token Created, Authentication Successful!',
      token  : token,
      level  : user.level,
    };

    // return the information including token as JSON
    return res.status(200).json(response);
  }).catch(err => res.status(409).json(err));
});

app.post('/api/userLevel', middleware, (req, res) => {
  res.json({'userLevel': req.decoded.level});
});

app.post('/api/user/data', middleware, (req, res) => {
  db.getUserData(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).
          json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(401).json(err));
});

app.get('/api/announcements/public', (req, res) => {
  db.getPublicAnnouncements().then(data => {
    if (data) {
      return res.status(200).json({announcements: data});
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

app.post('/api/announcements/public/add', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.addAnnouncement(req.body.title, req.body.message, req.decoded.level,
      req.decoded.username).
      then(response => res.status(200).
          json({
            message        : 'Announcement inserted successfully',
            ANNOUNCEMENT_ID: response.id,
          })).
      catch(() => res.status(404).json('Not Found'));
});

app.post('/api/announcements/remove', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.removeAnnouncement(req.body.id).
      then(res.status(204).
          json({message: 'Announcement deleted successfully'})).
      catch(() => res.status(404).json('Not Found'));
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log('Running on port: ' + PORT);
  if (db.dbConnect() === null) {
    shutDown();
  }
});

setInterval(() => server.getConnections(
    (err, connections) => console.log(
        `${ connections } connections currently open`),
), 1000);
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

let connections = [];

// app.post('/api/announcement/getAll', (req, res) => {
//     let announcement = connections[0].query('SELECT AN.TIMESTAMP\t, C.Name ,
// C.Surname , AN.Text\n' + 'FROM ACCOUNT A, ANNOUNCEMENT AN, COACH C\n' +
// 'WHERE A.username='+req.username+' AND AN.User_ID=A.User_ID AND
// C.Coach_ID=AN.Coach_ID'); return announcement; });

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections =
      connections.filter(curr => curr !== connection));
});

function shutDown() {
  console.log('\x1b[33m%s\x1b[0m',
      'Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('\x1b[33m%s\x1b[0m', 'Closed out remaining connections');
    process.exit(0);
  });
  console.log('\x1b[31m%s\x1b[0m', 'Database closed');
  setTimeout(() => {
    console.error('\x1b[31m%s\x1b[0m',
        'Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}