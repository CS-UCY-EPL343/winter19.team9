
'use strict';

const db = require('./database');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const creds = require('./config');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const dotenv = require('dotenv');
dotenv.config();

const transport = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};
const transporter = nodemailer.createTransport(transport);

// noinspection JSUnresolvedFunction
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else if (success) {
    console.log('\x1b[32m%s\x1b[0m', 'Server is ready to take messages');
  }
});

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

exports.handler = ((req, res) => {
    res.set({ 'Access-Control-Allow-Origin': '*' }).sendStatus(200)
})

// noinspection JSUnresolvedFunction
app.post('/api/email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const content = `Name: ${ name } \nEmail: ${ email } \nPhone: ${ phone } \nMessage: ${ message } `;

  const mail = {
    from   : email,
    to     : creds.EMAIL,
    subject: 'Fitness Factory Nicosia - Contact Request',
    text   : content,
  };

  // Send email from user
  transporter.sendMail(mail, (err) => {
    if (err) {
      res.status(400).json({
        status: 'fail',
      });
    } else {
      res.status(200).json({
        status: 'success',
      });

      // Send response email
      transporter.sendMail({
        from       : creds.EMAIL,
        to         : email,
        subject    : 'Fitness Factory Nicosia - Submission was successful',
        text       : ``
                     +
                     `Form details\nName: ${ name }\nEmail: ${ email }\nMessage: ${ message }`,
        html       : `<p>Thank you for contacting us! We'll get back to you ASAP!</p><br>
                      <p><strong>Form details</strong><br>Name: ${ name }<br>Email: ${ email }<br>Phone: ${ phone }<br>Message: ${ message }</p>
                      <img style="width:250px; margin: 0 auto; display: block;"  src="cid:ea4a40c0-bc9d-4a50-ab26-d3031eba602c" alt="FFN-logo"/>`,
        attachments: [
          {
            filename: 'fitnessFactoryLogo-min.png',
            path    : './fitnessFactoryLogo-min.png',
            cid     : 'ea4a40c0-bc9d-4a50-ab26-d3031eba602c',
          },
        ],
      }, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('\x1b[32m%s\x1b[0m', 'Message sent: ' + info.response);
        }
      });
    }
  });
});

// noinspection JSUnresolvedFunction
app.post('/api/reset-password', (req, res) => {
    const email = req.body.email;
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    db.getUser_ID(req.body.email)
        .then((user) => {
            if (user === null) {
                console.error('email not in database');
                res.status(400).status('email not in db');
            } else {
                const crypto = require('crypto');
                const token = crypto.randomBytes(10).toString('hex');
                const data = {
                    token: token,
                    id   : user,
                };
                db.updateUser(data);

                // const content = `Email: ${email}\nThe secret token is: ${token}\n`;

                const mail = {
                    from   : creds.EMAIL,
                    to     : email,
                    subject: 'Reset your password',
                    html   : `<h1>Forgot your password?</h1>
              <p>Click on the link below to <a style="display:block; background-color: red; width: 20%; text-align:center;color:white; text-decoration: none;" href='http://localhost:3000/resetPassword/${ token }'>reset your password</a></p>`,
                };
                transporter.sendMail(mail, (err) => {
                    if (err) {
                        res.status(400).json({
                            status: 'fail',
                        });
                    } else {
                        res.status(200).json({
                            status: 'success',
                        });
                    }
                });
            }
        });
});
/******************************/
/*******Reset Password*********/
/******************************/
// noinspection JSUnresolvedFunction
app.post('/api/resetPassword/:id', (req, res) => {
    if (req.body.token === '') {
        res.status(400).send('error');
    } else {
        db.resetPassword(req.body)
            .then(() => {
                res.send('Success reset.');
            })
            .catch(() => {
                res.send('Failed to reset.');
            });
    }
});
/****************************************************/
/**************** Email verification ****************/
/****************************************************/

// noinspection JSUnresolvedFunction
app.post('/api/verifyEmail/:id', (req, res) => {

    if (req.body.hash === '') {
        res.status(400).send('error');
    } else {
        db.verifyUser(req.body)
            .then(() => {
                res.send('Success verify.');
            })
            .catch(() => {
                res.send('Failed to verify.');
            });
    }
});
// noinspection JSUnresolvedFunction
app.post('/api/auth', (req, res) => {
  // console.log(req.body);
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

// noinspection JSUnresolvedFunction
app.post('/api/userLevel', middleware, (req, res) => {
  res.json({'userLevel': req.decoded.level});
});

// noinspection JSUnresolvedFunction
app.post('/api/user/data', middleware, (req, res) => {
  db.getUserData(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(401).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/user/isVerified', middleware, (req, res) => {
        db.getVerified(req.decoded.username).then(data => {
            if (data) {
                return res.status(200).json(data);
            } else {
                return res.status(409).json('Authentication failed. User not found.');
            }
        }).catch(err => res.status(401).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/staff/data', middleware, (req, res) => {
    db.getStaffData(req.decoded.username).then(data => {
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(409).json('Authentication failed. Staff member not found.');
        }
    }).catch(err => res.status(401).json(err));
});

// noinspection JSUnresolvedFunction
app.get('/api/user/type/count', (req, res) => {
  db.getAllUserTypeCount().then(response => {
    res.status(200).json({
      types: response,
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.get('/api/user/count', (req, res) => {
  db.getUserCount().then(response => {
    res.status(200).json({count: response});
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.get('/api/page/visits/count', (req, res) => {
  db.getPageVisitsCount().then(response => {
    res.status(200).json({count: response});
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.get('/api/visit/count', (req, res) => {
  db.getAllVisitCount().then(response => {
    res.status(200).json({
      visits: response,
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.get('/api/enroll/count', (req, res) => {
  db.getEnrollCount().then(response => {
    res.status(200).json({count: response});
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/logged/visit/count', middleware, (req, res) => {
  db.updateLoggedInVisit().then(() => {
    res.status(200).json({
      message: 'Update About Us visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/AboutUs/visit/count', (req, res) => {
  db.updateAboutUsVisit().then(() => {
    res.status(200).json({
      message: 'Update About Us visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/Classes/visit/count', (req, res) => {
  db.updateClassesVisit().then(() => {
    res.status(200).json({
      message: 'Update Classes Visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/homepage/visit/count', (req, res) => {
  db.updateHomePageVisit().then(() => {
    res.status(200).json({
      message: 'Update Home Page Visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/profile/visit/count', middleware, (req, res) => {
  db.updateProfileVisit(req.decoded.level).then(() => {
    res.status(200).json({
      message: 'Update Profile Visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/dashboard/visit/count', middleware, (req, res) => {
  db.updateDashboardVisit().then(() => {
    res.status(200).json({
      message: 'Update Dashboard Visit',
    });
  }).catch(() => res.status(404).json('Not Found'));
});

/****************************************************
 *                                                   *
 * Getting the private announcements from the database   *
 *                                                   *
 ***************************************************/

// noinspection JSUnresolvedFunction
app.post('/api/announcements/private', middleware, (req, res) => {
  db.getPrivateAnnouncements(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json({announcements: data});
    } else {
      return res.status(409).json('No data found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/admin/private', middleware, (req, res) => {
  db.getPrivateAnnouncements(req.body.username).then(data => {
    if (data) {
      return res.status(200).json({announcements: data});
    } else {
      return res.status(409).json('No data found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/private/total', middleware, (req, res) => {
  db.getTotalAnnouncements(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json({TotalAnnouncement: data});
    } else {
      return res.status(409).json('No data found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/announcements/public', (req, res) => {
  db.getPublicAnnouncements().then(data => {
    if (data) {
      return res.status(200).json({announcements: data});
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/private/update', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.updateAnnouncement(req.body.announcement_id, req.body.title,
      req.body.message, req.decoded.level,
      req.decoded.username).then(response => {
    console.log(response);
    res.status(200).json({
      message        : 'Announcement updated successfully',
      ANNOUNCEMENT_ID: response.ANNOUNCEMENT_ID,
    });
  }).catch(() => res.status(404).json('Not Found'));
});
// noinspection JSUnresolvedFunction
app.post('/api/getProfilePic', middleware, (req, res) => {
  // noinspection JSUnresolvedFunction
  db.profileimage(req.body.emp_id).then(profile => {
    res.json({success: true, data: profile});
  }).catch(() => {
    console.log('in error :: /api/getProfilePic');
  });
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/public/add', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.addAnnouncement(req.body.title, req.body.message, req.decoded.level,
      req.decoded.username).then(response => res.status(200).json({
    message        : 'Announcement inserted successfully',
    ANNOUNCEMENT_ID: response.id,
  })).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/private/add', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.addPrivateAnnouncement(req.body.title, req.body.message, req.body.username,
      req.decoded.level,
      req.decoded.username).then(response => {
    console.log(response);
    res.status(200).json({
      message        : 'Announcement inserted successfully',
      ANNOUNCEMENT_ID: response.id,
    });
  }).catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/remove', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.removeAnnouncement(req.body.id)
      .then(
          res.status(204).json({message: 'Announcement deleted successfully'}))
      .catch(() => res.status(404).json('Not Found'));
});

// noinspection JSUnresolvedFunction
app.post('/api/announcements/private/delete', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(401).json({message: 'Authentication failed'});
  }
  db.deleteAnnouncement(req.body.announcement_id)
      .then(
          res.status(204).json({message: 'Announcement deleted successfully'}))
      .catch(() => res.status(404).json('Not Found'));
});

/*************************************************************************/
// noinspection JSUnresolvedFunction
app.post('/api/user/post/data', middleware, (req, res) => {

  db.postUserData(req.body.data)
      .then(response => res.status(200).json({message: response}))
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/Enroll', middleware, (req, res) => {
  db.enrollUser(req.body.CLASS_ID, req.body.User_ID)
      .then(response => res.status(200).json({message: response}))
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/Unenroll', middleware, (req, res) => {
  db.unenrollUser(req.body.CLASS_ID, req.body.User_ID)
      .then(response => res.status(200).json({message: response}))
      .catch(err => res.status(409).json(err));
});
/*************************************************************************/
/*************************************************************************/
// noinspection JSUnresolvedFunction
app.post('/api/user/delete/data', middleware, (req, res) => {
  db.deleteUserData(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});
/*************************************************************************/

// noinspection JSUnresolvedFunction
app.post('/api/user/insert', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const token = req.body.hash;
  const content = `Name: ${ fname } ${ lname }\n Email: ${ email }`;
  db.dbSignUp(req.body)
      // .then(response => res.status(200).json({message: response}))
      // .catch(err => res.status(409).json(err));
      .then(() => {
        const mail = {
          from   : creds.EMAIL,
          to     : email,
          subject: 'Fitness Factory- Please Verify Your Account',
          text   : content,
          html   : `
                       <a style="display:block; background-color: red; width: 20%; text-align:center;color:white; text-decoration: none;" href="http://localhost:3000/verifyEmail/${ token }">Verify your Account</a>`,
        };
        transporter.sendMail(mail, (err) => {
          if (err) {
            res.status(400).json({
              status: 'fail',
            });
          } else {
            res.status(200).json({
              status: 'success',
            });
          }
        });
      });
});

// noinspection JSUnresolvedFunction
/*******************************Insert new Coach/Admin****************************/
// noinspection JSUnresolvedFunction
app.post('/api/coach/insert', (req, res) => {
  db.insertNewCoach(req.body)
      .then(response => res.status(200).json({Account_ID: response}))
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/admin/insert', (req, res) => {
  db.insertNewAdmin(req.body)
      .then(response => res.status(200).json({Account_ID: response}))
      .catch(err => res.status(409).json(err));
});

/**************************************************************************/

// noinspection JSUnresolvedFunction
/*******************************Delete staff member***********************/
// noinspection JSUnresolvedFunction
app.post('/api/admin/delete', (req, res) => {
  db.deleteAdminMember(req.body.AdminId)
      .then(response => res.status(200).json({message: response}))
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post(
    '/api/coach/delete', (req, res) => {
      db.deleteCoachMember(req.body.CoachID)
          .then(response => res.status(200).json({message: response}))
          .catch(err => res.status(409).json(err));
    });
// noinspection JSUnresolvedFunction
app.post('/api/coach/countPT', (req, res) => {
  db.getCountPT(req.body.AccountID).then(data => {
    if (data) {
      return res.status(200).json({count: data});
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/same/username',(req, res) => {
    db.sameUser(req.body.username)
        .then(data => {
            if (data) {
                return res.status(200).json({count: data});
            } else {

                return res.status(409).json('Authentication failed. User not found.');
            }
        }).catch(err => res.status(409).json(err));
});


// noinspection JSUnresolvedFunction
app.post('/api/coach/countClasses', (req, res) => {
  db.getCountClasses(req.body.AccountID).then(data => {
    if (data) {
      return res.status(200).json({count: data});
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

/************************************************************************/
//fetching the data for the personal training schedule
// noinspection JSUnresolvedFunction
app.post('/api/user/getPersonalTraining', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(409).json('Authentication failed.');
  }
  db.getPersonalTraining(req.body.User_ID).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/user/getPersonalSchedule', middleware, (req, res) => {
  db.getPersonalSchedule(req.body.User_ID).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/user/getClassSchedule', middleware, (req, res) => {

  db.getClassSchedule(req.body.User_ID)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

//fetching the data for the coach's training schedule
// noinspection JSUnresolvedFunction
app.post('/api/coach/getCoachTraining', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(409).json('Authentication failed.');
  }
  db.getCoachTraining(req.body.Coach_ID)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/user/getCoachClasses', middleware, (req, res) => {

  db.getCoachClass(req.body.Coach_ID)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

//fetch pic
// noinspection JSUnresolvedFunction
app.post('/api/user/userPic', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(409).json('Authentication failed.');
  }
  db.userPic(req.body.User_ID)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// mine
// noinspection JSUnresolvedFunction
app.post('/api/user/userDetails', middleware, (req, res) => {
  if (req.decoded.level === 'user') {
    return res.status(409).json('Authentication failed.');
  }
  db.getUserInfo(req.body.name).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassName', middleware, (req, res) => {
  db.getClasses().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassNames', middleware, (req, res) => {
  db.getClassName(req.body.ClassID)
      .then(data => {
        if (data) {
          return res.status(200).json(data.Name);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassDay', middleware, (req, res) => {
  db.getClassDay(req.body.ClassName).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassTime', middleware, (req, res) => {
  db.getClassTime(req.body.ClassName, req.body.ClassDay).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

//insert to PersonalTraining
// noinspection JSUnresolvedFunction
app.post('/api/insert/PersonalTraining', middleware, (req, res) => {
  db.insertPT(req.body.data).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

//delete Personal Training
// noinspection JSUnresolvedFunction
app.post('/api/delete/PersonalTraining', middleware, (req, res) => {
  db.deletePT(req.body.data)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// fetcing coaches for personal training
// noinspection JSUnresolvedFunction
app.post('/api/bookTraining/allCoaches', middleware, (req, res) => {
  db.getAllCoaches().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassCoach', middleware, (req, res) => {
  db.getClassCoach(req.body.ClassName, req.body.ClassDay, req.body.ClassTime)
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/BookClass/UserID', middleware, (req, res) => {
  db.getUserID(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(401).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/CoachSchedule/CoachID', middleware, (req, res) => {
  db.getCoachID(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(401).json(err));
});

// app.post('/api/BookClass/CoachID', middleware, (req, res) => {
//     db.getCoachID(req.body.ClassName, req.body.ClassDay, req.body.ClassTime)
//         .then(data => {
//             if (data) {
//                 return res.status(200).json(data)
//             } else {
//                 return res.status(409).json('Authentication failed. User not
// found.'); } }) .catch(err => res.status(409).json(err)); });
// noinspection JSUnresolvedFunction
app.post('/api/BookClass/ClassID', middleware, (req, res) => {
  db.getClassID(req.body.ClassName, req.body.ClassDay, req.body.ClassTime,
      req.body.CoachName).then(data => {
    if (data) {
      return res.status(200).json({ClassID: data});
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// coach info
// noinspection JSUnresolvedFunction
app.post('/api/coach/getInfo', middleware, (req, res) => {
  db.getCoachInfo(req.body.coachID).then(data => {
    if (data) {
      return res.status(200).json({messages: data});
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// Melios
// noinspection JSUnresolvedFunction
app.post('/api/messages/get2', middleware, (req, res) => {

  if (req.username === '') {
    return res.status(409).json('Authentication failed. User not found.');
  } else {
    db.getMessagesMelios(req.body.username).then(data => {
      if (data) {
        return res.status(200).json({messages: data});
      } else {

        return res.status(409).json('Authentication failed. User not found.');
      }
    }).catch(err => res.status(409).json(err));
  }
});

/***********************************************/
// noinspection JSUnresolvedFunction
app.post('/api/messages/get', middleware, (req, res) => {
  db.getMessages(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json({messages: data});
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/messages/total', middleware, (req, res) => {
  db.getMessagesCount(req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json({count: data});
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/messages/unread', middleware, (req, res) => {
  db.makeMessagesRead(req.body.newMessages).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/messages/new', middleware, (req, res) => {
  db.createNewMessage(req.body.data, req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {

      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/messages/delete', middleware, (req, res) => {
  db.deleteNewMessage(req.body.id, req.decoded.username).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.get('/api/coaches/get', (req, res) => {
  db.getCoaches().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/admins/get', (req, res) => {
  db.getAdmins().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/server/connections', (req, res) => {
  if (!connections) {
    return res.status(404).json('Not found.');
  }
  return res.status(200).json({connections: connections.length});
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/pie/gender', (req, res) => {
  db.getGenderChart().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/pie/enroll', (req, res) => {
  db.getClassDaysChart().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/pie/personal', (req, res) => {
  db.getPersonalDaysChart().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/bar/age', (req, res) => {
  db.getAgeRange().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/line/coaches/week-work', (req, res) => {
  db.getCoachesDayWork().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

// noinspection JSUnresolvedFunction
app.get('/api/chart/line/coaches/personal-work', (req, res) => {
  db.getCoachesPersonalWork().then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json('Not found.');
    }
  });
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log('Running on port: ' + PORT);
  startDatabaseConnection(0).then();
});

// noinspection JSUnresolvedFunction
app.post('/api/events/get', middleware, (req, res) => {
  const day = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(
      new Date());
  db.getEvents(req.decoded.username, day, new Date().getDay()).then(data => {
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(409).json('Authentication failed. User not found.');
    }
  }).catch(err => res.status(409).json(err));
});

// noinspection JSUnresolvedFunction
app.post('/api/events/total', middleware, (req, res) => {
  const day = new Intl.DateTimeFormat('en-GB', {weekday: 'long'}).format(
      new Date());
  db.getEventsTotal(req.decoded.username, day, new Date().getDay())
      .then(data => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(409).json('Authentication failed. User not found.');
        }
      })
      .catch(err => res.status(409).json(err));
});

// noinspection JSStringConcatenationToES6Template
process.on('SIGTERM', shutDown);
// noinspection JSStringConcatenationToES6Template
process.on('SIGINT', shutDown);

let connections = [];
let connectionsInterval, checkConnectionInterval;

async function startDatabaseConnection(callCount) {
  await db.dbConnect().then(() => {
    connectionsInterval = setInterval(() => server.getConnections(
        (err, connections) => console.log(
            `${ connections } connections currently open`),
    ), 1000);
    checkConnectionInterval =
        setInterval(() => db.checkConnection().catch(() => {
          clearInterval(connectionsInterval);
          startDatabaseConnection(0);
          clearInterval(checkConnectionInterval);
        }), 10000);
  }).catch(() => {
    if (callCount >= 12) {  // 2 minutes keep alive
      shutDown();
    }
    console.log('\x1b[31m%s\x1b[0m', 'Cant connect to database. Retrying...');
    setTimeout(() => startDatabaseConnection(callCount + 1), 10000);
  });
}

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections =
      connections.filter(curr => curr !== connection));
});

function shutDown() {
  clearInterval(connectionsInterval);
  clearInterval(checkConnectionInterval);
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