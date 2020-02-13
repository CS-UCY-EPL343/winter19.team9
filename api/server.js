'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/auth', (req, res) => {
    let user = data.users.find((user) => {
        return user.name === req.body.name && user.password === req.body.password;
    });
    if (user !== undefined && user !== null) {
        // create a token using user name and password valid for 2 hours
        let token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
        let response = { message: 'Token Created, Authentication Successful!', token: token, level: user.level };

        // return the information including token as JSON
        return res.status(200).json(response);

    } else {
        return res.status('409').json('Authentication failed. Admin not found.');
    }
});

app.post('/api/userLevel', middleware, (req, res) => {
    res.json({'userLevel': req.decoded.level});
});

const PORT = process.env.PORT;

app.listen(PORT);
console.log('api running on port ' + PORT + ': ');