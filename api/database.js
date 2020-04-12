const mysql = require('mysql');

let connection = null; // Global

function dbConnect() {
  let conn;
  return new Promise((resolve, reject) => {
    if (connection !== null) {
      return reject();
    }
    conn = mysql.createConnection({
      host    : 'dione.in.cs.ucy.ac.cy',
      user    : 'ffndb',
      password: '3dwaxQvnSDPpVjJS',
      database: 'ffndb',
    });

    conn.connect((err) => {
      if (err) {
        return reject(err);
      }
      console.log('\x1b[32m%s\x1b[0m', 'Connected to database.');
      connection = conn;
      return resolve();
    });

    conn.on('error', function() {
      dbDisconnect();
      return reject();
    });
  });
}

function checkConnection() {
  return new Promise((resolve, reject) => {
    return connection ? resolve() : reject();
  });
}

function dbDisconnect() {
  if (connection !== null) {
    connection.end();
    connection = null;
  }
  console.log('\x1b[31m%s\x1b[0m', 'Error. Database connection closed.');
}

function dbLogIn(username, password) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ACCOUNT WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });
  });
}

function dbSignUp(data) {
  return new Promise((resolve, reject) => {
    let lvl = 'user';
    const ins = 'INSERT INTO ACCOUNT(username, password, level, User_ID) values(?,?,?,?)';
    const insert = 'INSERT INTO USERS(Name, Surname, Bdate, Gender, Email, Medical_History, Age, Membership_ID) values(?,?,?,?,?,?,?,?)';

    connection.query(insert, [
      data.fname,
      data.lname,
      data.bDate,
      data.gender,
      data.email,
      data.med,
      data.age,
      data.med,
    ], function(err, rows) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      let id = rows.insertId;
      console.log('User created');

      connection.query(ins, [data.username, data.password, lvl, id],
          function(err) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            console.log('User inserted');
            return resolve('The user account was inserted successfully');
          });

      return resolve('User created successfully!');
    });
  });
}

function getUserData(user) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ACCOUNT,USERS,PIC WHERE username = ?  AND ACCOUNT.User_ID = USERS.User_ID  AND PIC.User_ID = USERS.User_ID';
    connection.query(sql, [user], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });
  });
}

function base64ToHex(str) {
  let atob = require('atob');
  const raw = atob(str);
  let result = '';
  // noinspection JSUnresolvedVariable
  for (let i = 0; i < raw.length; i++) {
    // noinspection JSUnresolvedFunction
    let hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  //console.log('0x' + result);
  return (result);
}

function postUserData(data) {
  const x = data.imagePreviewUrl;
  ///console.log(x);
  let byteString = x.split(',')[1];
  if (x !== '') {
    return new Promise((resolve, reject) => {

      const sql = 'UPDATE USERS, ACCOUNT, PIC SET  Name = ? , Surname = ? , Email = ? , password = ?, image = X? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID AND PIC.User_ID = USERS.User_ID';
      connection.query(sql, [
        data.Name,
        data.Surname,
        data.Email,
        data.password,
        base64ToHex(byteString),
        data.username,
      ], function(err) {
        // console.log(as);
        if (err) {
          console.log(err);
          return reject(err);
        }
        //console.log("1 record inserted");
        return resolve('The data were saved successfully!');
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE USERS, ACCOUNT SET  Name = ? , Surname = ? , Email = ? , password = ? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID ';
      connection.query(sql,
          [data.Name, data.Surname, data.Email, data.password, data.username],
          function(err) {
            // console.log(as);
            if (err) {
              console.log(err);
              return reject(err);
            }
            // console.log("1 record inserted");
            return resolve('The data were saved successfully!');
          });
    });
  }
}

function deleteUserData(user) {
  return new Promise((resolve, reject) => {

    const sql = 'DELETE a,u FROM USERS u JOIN ACCOUNT a ON a.User_ID = u.User_ID WHERE a.username = ? ';
    connection.query(sql, [user], function(err) {
      if (err) {
        return reject(err);
      }
      console.log('1 record deleted');
      return resolve('Success');
    });
  });
}

function getTotalAnnouncements(username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS "Count" FROM ACCOUNT A, ANNOUNCEMENT AN LEFT JOIN COACH C ON C.Coach_ID=AN.Coach_ID LEFT JOIN OWNER O ON O.Owner_ID=AN.Admin_ID WHERE A.username= ? AND AN.User_ID=A.User_ID AND isActive = 1 AND isPrivate = 1 ';
    connection.query(sql, [username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows[0]);
    });
  });
}

function getPrivateAnnouncements(username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT AN.ANNOUNCEMENT_ID, AN.Title , AN.Message,AN.TIMESTAMP FROM ACCOUNT A, ANNOUNCEMENT AN LEFT JOIN COACH C ON C.Coach_ID=AN.Coach_ID LEFT JOIN OWNER O ON O.Owner_ID=AN.Admin_ID WHERE A.username= ? AND AN.User_ID=A.User_ID AND isActive = 1 AND isPrivate = 1 ';
    connection.query(sql, [username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
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

function deleteAnnouncement(id) {
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
            sql =
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Coach_ID ) VALUES ( ? , ? , 0, 1, ? )';
          } else if (level === 'admin') {
            // noinspection JSUnresolvedVariable
            id = rows[0].Owner_ID;
            sql =
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Admin_ID ) VALUES ( ? , ? , 0, 1, ? )';
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

function addPrivateAnnouncement(title, message, uname, level, username) {
  return new Promise((resolve, reject) => {
    let x;
    const userid = 'SELECT * FROM `ACCOUNT` WHERE `username`= ?';
    connection.query(userid, [uname], function(err, rows) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve({id: rows.insertId});
      x = rows[0].User_ID;
      //console.log(x);
    });

    const sql = 'SELECT * FROM `ACCOUNT` WHERE `username`= ?';
    connection.query(sql, [username],
        function(err, rows) {
          if (err) {
            return reject(err);
          }

          let id, sql;

          if (level === 'coach') {
            id = rows[0].Coach_ID;

            sql =
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive,User_ID, Coach_ID ) VALUES ( ? , ? , 1, 1, ? ,? )';
          } else if (level === 'admin') {
            // noinspection JSUnresolvedVariable
            id = rows[0].Owner_ID;
            sql =
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive,User_ID,Admin_ID ) VALUES ( ? , ? , 1, 1, ? ,? )';
          } else {
            return reject('Authentication failed');
          }

          connection.query(sql, [title, message, x, id], function(err, rows) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            resolve({id: rows.insertId});
            //resolve({ANNOUNCEMENT_ID: ann_id});
          });
        });
  });
}

function updateAnnouncement(announcement_id, title, message, level, username) {
  return new Promise((resolve, reject) => {

    const sql = 'SELECT * FROM `ACCOUNT`, ANNOUNCEMENT WHERE `username`= ? ';
    connection.query(sql, [username],
        function(err, rows) {
          if (err) {
            return reject(err);
          }

          let id, sql, ann_id = announcement_id;

          // let timestamp = '2020-02-18 18:40:38';

          if (level === 'coach') {
            id = rows[0].Coach_ID;
            sql =
                'UPDATE ANNOUNCEMENT SET Title = ? , Message = ? , TIMESTAMP = now(), isPrivate = 1, isActive = 1 , Coach_ID = ?  WHERE ANNOUNCEMENT_ID = ? ';
          } else if (level === 'admin') {
            // noinspection JSUnresolvedVariable
            id = rows[0].Owner_ID;
            sql =
                'UPDATE ANNOUNCEMENT SET Title = ? , Message = ? , TIMESTAMP = now(), isPrivate = 1, isActive = 1 , Admin_ID = ? WHERE ANNOUNCEMENT_ID = ? ';
          } else {
            return reject('Authentication failed');
          }

          connection.query(sql, [title, message, id, ann_id], function(err) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            resolve({ANNOUNCEMENT_ID: ann_id});
          });
        });
  });
}

function enrollUser(CLASS_ID, User_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO ENROL (CLASS_ID, User_ID) VALUES ( ? , ? )';
    connection.query(sql, [CLASS_ID, User_ID], function(err) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('1 record inserted');
      return resolve('The data were saved successfully!');
    });
  });
}

function unenrollUser(CLASS_ID, User_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ENROL WHERE CLASS_ID = ? AND User_ID = ?';
    connection.query(sql, [CLASS_ID, User_ID], function(err) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('Unenrolled from class successfully');
      return resolve('The data were saved successfully!');
    });
  });
}

//******************************************************************************************

function addClassCodes(DayCode, TimeCode, CLASS_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE Class SET DayCode = ?, TimeCode = ? WHERE CLASS_ID = ?';
    connection.query(sql, [DayCode, TimeCode, CLASS_ID], function(err) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('1 record inserted');
      return resolve('The data were saved successfully!');
    });
  });
}

//***************************************************************************************

//fetching the data for the personal training schedule
function getPersonalTraining(User_ID) {
  // console.log("Testing 1234: " + User_ID);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT p.Day, p.Time, p.Coach_ID FROM `PERSONAL_TRAINING` p WHERE p.User_ID = ? ';
    connection.query(sql, [User_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getPersonalSchedule(User_ID) {
  // console.log("Testing 1234: " + User_ID);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT p.Day, p.Time, p.Coach_ID, c.CoachName, c.Surname FROM `PERSONAL_TRAINING` p, `COACH` c WHERE p.User_ID = ? AND c.Coach_ID = p.Coach_ID';
    connection.query(sql, [User_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

//fetching the data for the coach's training schedule
function getCoachTraining(Coach_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT p.Day, p.Time FROM `PERSONAL_TRAINING` p WHERE p.Coach_ID = ? ';
    connection.query(sql, [Coach_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

}

//mine
function userPic(User_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT p.image FROM PIC p WHERE p.User_ID = ?';
    // const sql = 'SELECT * FROM ACCOUNT a, USERS u, PIC p WHERE u.name = ?
    // and u.User_ID = a.User_ID and p.User_ID = u.User_ID';
    connection.query(sql, [User_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
      // console.log(rows);
    });
  });
}

function getClassSchedule(User_ID) {
  // console.log("Testing 1234: " + User_ID);
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.ClassID, c.DayCode, c.TimeCode, c.Name FROM Class c, ENROL e WHERE e.User_ID = ? AND c.ClassID = e.CLASS_ID';
    connection.query(sql, [User_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

}

//mine
function getUserInfo(name) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ACCOUNT a, USERS u WHERE u.name = ? and u.User_ID = a.User_ID';
    // const sql = 'SELECT * FROM ACCOUNT a, USERS u, PIC p WHERE u.name = ?
    // and u.User_ID = a.User_ID and p.User_ID = u.User_ID';
    connection.query(sql, [name], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getMessages(user) {
  return new Promise((resolve, reject) => {
    const sql = 'call getMessages(?)';
    connection.query(sql, [user], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

function getMessagesCount(user) {
  return new Promise((resolve, reject) => {
    const sql = 'call getUnreadMessagesCount(?)';
    connection.query(sql, [user], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });
  });
}

function makeMessagesRead(ids) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE Messages SET hasSeen=1 WHERE Messages.Message_ID IN (?)';
    connection.query(sql, [ids], function(err) {
      if (err) {
        return reject(err);
      }
      return resolve('Success');
    });
  });
}

function createNewMessage(data, username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ACCOUNT.AccountID FROM `ACCOUNT` WHERE `ACCOUNT`.`username` = ?';
    connection.query(sql, [username], function(err, rows) {
      if (err || rows[0] === undefined) {
        return reject(err);
      }
      // noinspection JSUnresolvedVariable
      const fromId = rows[0].AccountID;
      const sql = 'INSERT INTO Messages(Title, Message, From_ID, To_ID) VALUES (?, ?, ?, ?)';
      connection.query(sql, [data.title, data.message, fromId, data.contact],
          function(err, rows) {
            if (err) {
              return reject(err);
            }
            const newMsgId = rows.insertId;
            const sql = 'call getMessage(?)';
            connection.query(sql, [newMsgId],
                function(err, rows) {
                  if (err) {
                    return reject(err);
                  }
                  return resolve(rows[0]);
                });
          });
    });
  });
}

function getAllCoaches() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Coach_ID, CoachName, Surname FROM `COACH` c WHERE 1';
    connection.query(sql, [], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

//insert to PersonalTraining
function insertPT(data) {
  return new Promise((resolve, reject) => {
    // console.log((data.day));
    const sql = 'INSERT INTO `PERSONAL_TRAINING` (`PT_ID`, `Day`, `Time`, `Coach_ID`, `User_ID`) VALUES (NULL, ?, ?, ?, ?);';
    connection.query(sql,
        [(data.day), (data.time), (data.Coach_ID), (data.User_ID)],
        function(err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
  });
}

//delete from PersonalTraining
function deletePT(data) {
  return new Promise((resolve, reject) => {
    // console.log((data.day));
    const sql = 'DELETE FROM `PERSONAL_TRAINING` WHERE `PERSONAL_TRAINING`.`Day` = ? and `PERSONAL_TRAINING`.`Time` = ? and `PERSONAL_TRAINING`.`Coach_ID` = ? and `PERSONAL_TRAINING`.`User_ID` = ? ';
    connection.query(sql,
        [(data.day), (data.time), (data.Coach_ID), (data.User_ID)],
        function(err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
  });
}

// for personal training
function getCoaches() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ACCOUNT.AccountID, ACCOUNT.level, ACCOUNT.username, COACH.* FROM ACCOUNT JOIN COACH ON ACCOUNT.Coach_ID=COACH.Coach_ID';
    connection.query(sql, [], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getAdmins() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ACCOUNT.AccountID, ACCOUNT.level, ACCOUNT.username, OWNER.* FROM ACCOUNT JOIN OWNER ON ACCOUNT.Owner_ID=OWNER.Owner_ID';
    connection.query(sql, [], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

//add method name
function getClasses() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT c.Name FROM Class c';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClassName(ClassID) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Name FROM Class WHERE ClassID = ?';
    connection.query(sql, [ClassID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows[0]);
    });
  });
}

function getClassDay(Name) {
  return new Promise((resolve, reject) => {
    // console.log(Name);
    const sql = 'SELECT DISTINCT c.Day FROM Class c WHERE c.Name = ?';
    connection.query(sql, [Name], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClassTime(Name, Day) {
  return new Promise((resolve, reject) => {
    // console.log();
    const sql = 'SELECT DISTINCT c.Time FROM Class c WHERE c.Name = ? AND c.Day = ?';
    connection.query(sql, [Name, Day], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClassCoach(Name, Day, Time) {
  return new Promise((resolve, reject) => {
    // console.log();
    // const sql = "SELECT DISTINCT c.Coach_ID FROM Class c WHERE c.Name = ?
    // AND c.Day = ? AND c.Time = ?";
    const sql = 'SELECT co.CoachName FROM COACH co, Class ca WHERE ca.Name = ? AND ca.Day = ? AND ca.Time = ? AND co.Coach_ID = ca.Coach_ID';
    connection.query(sql, [Name, Day, Time], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getUserID(user) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT u.User_ID FROM ACCOUNT a, USERS u WHERE username = ?  AND a.User_ID = u.User_ID';
    connection.query(sql, [user], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });
  });
}

function getClassID(Name, Day, Time, CoachName) {
  return new Promise((resolve, reject) => {
    // console.log();
    // const sql = "SELECT DISTINCT c.Coach_ID FROM Class c WHERE c.Name = ?
    // AND c.Day = ? AND c.Time = ?";
    const sql = 'SELECT ca.ClassID FROM COACH co, Class ca WHERE ca.Name = ? AND ca.Day = ? AND ca.Time = ? AND co.CoachName = ? AND co.Coach_ID = ca.Coach_ID';
    connection.query(sql, [Name, Day, Time, CoachName], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows[0]);
    });
  });
}

function getAllVisitCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM `PageVisit`';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getAllUserTypeCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT level, COUNT(*) AS "count" FROM `ACCOUNT` GROUP BY level';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getUserCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS "count" FROM `USERS`';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getPageVisitsCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT (SUM(HOME_PAGE) + SUM(CLASSES) + SUM(ABOUT_US) + SUM(PROFILE_USER) + SUM(PROFILE_COACH) + SUM(PROFILE_ADMIN) + SUM(ADMIN_DASHBOARD)) AS "count" FROM `PageVisit`';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getEnrollCount() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS "count" FROM `ENROL`';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getGenderChart() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS "count" FROM `USERS` GROUP BY `Gender` ORDER BY Gender ASC';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getClassDaysChart() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Class.Day, COUNT(*) AS "count" FROM `ENROL` JOIN `Class` ON `ENROL`.`CLASS_ID` = `Class`.`ClassID` GROUP BY `Class`.`Day`';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getPersonalDaysChart() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT PERSONAL_TRAINING.Day, COUNT(*) AS "count" FROM `PERSONAL_TRAINING` GROUP BY `PERSONAL_TRAINING`.`Day` ORDER BY `PERSONAL_TRAINING`.`Day` ASC';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function updateLoggedInVisit() {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE PageVisit Set LOGGED_IN=LOGGED_IN+1';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);

    });
  });
}

function updateAboutUsVisit() {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE PageVisit Set ABOUT_US=ABOUT_US+1';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);

    });
  });
}

function updateHomePageVisit() {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE PageVisit Set HOME_PAGE=HOME_PAGE+1';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);

    });
  });
}

function updateProfileVisit(userType) {
  console.log(userType);
  return new Promise((resolve, reject) => {
    let sql;
    if (userType === 'user') {
      sql = 'UPDATE PageVisit Set PROFILE_USER=PROFILE_USER+1';
    } else if (userType === 'coach') {
      sql = 'UPDATE PageVisit Set PROFILE_COACH=PROFILE_COACH+1';
    } else if (userType === 'admin') {
      sql = 'UPDATE PageVisit Set PROFILE_ADMIN=PROFILE_ADMIN+1';
    } else {
      reject('Unknown user type');
    }
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function updateDashboardVisit() {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE PageVisit Set ADMIN_DASHBOARD=ADMIN_DASHBOARD+1';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function updateClassesVisit() {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE PageVisit Set CLASSES=CLASSES+1';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getAgeRange() {
  return new Promise((resolve, reject) => {
    const sql = 'CALL getAgeRange()';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getCoachesDayWork() {
  return new Promise((resolve, reject) => {
    const sql = 'CALL getCoachesDayWork()';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function getCoachesPersonalWork() {
  return new Promise((resolve, reject) => {
    const sql = 'CALL getCoachesPersonalWork()';
    connection.query(sql, function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

function insertNewCoach(data) {
  return new Promise((resolve, reject) => {
    const level = 'coach';
    const insertCoach = 'INSERT INTO COACH(CoachName, Surname, Bdate, Gender, Email) VALUES (?, ?, ?, ?, ?)';
    const insertAccount = 'INSERT INTO ACCOUNT(username , password, level, Coach_ID) VALUES (?, ?, ?, ?)';
    connection.query(insertCoach, [
      data.firstName,
      data.LastName,
      data.bDate,
      data.gender,
      data.email,
    ], function(err, rows) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      let id = rows.insertId;
      console.log('Coach created');

      connection.query(
          insertAccount, [
            data.username,
            data.password,
            level,
            id,
          ],
          function(err) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            console.log('Coach inserted');
            return resolve('The coach account was inserted successfully');
          },
      );
      return resolve('Coach created successfully!');
    });
  });
}

function insertNewAdmin(data) {
  return new Promise((resolve, reject) => {
    const level = 'admin';
    const insertAdmin = 'INSERT INTO OWNER(Name, Surname, Bdate, Gender, Email) VALUES (?, ?, ?, ?, ?)';
    const insertAccount = 'INSERT INTO ACCOUNT(username , password, level, Owner_ID) VALUES (?, ?, ?, ?)';
    connection.query(insertAdmin, [
      data.firstName,
      data.LastName,
      data.bDate,
      data.gender,
      data.email,
    ], function(err, rows) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      let id = rows.insertId;
      console.log('Admin created');

      connection.query(
          insertAccount, [
            data.username,
            data.password,
            level,
            id,
          ],
          function(err) {
            if (err) {
              console.log(err);
              return reject(err);
            }
            console.log('Admin inserted');
            return resolve('The admin account was inserted successfully');
          },
      );
      return resolve('Admin created successfully!');
    });
  });
}

function deleteAdminMember(AdminId) {

  return new Promise((resolve, reject) => {
    updateAdminAnnouncement(AdminId);
    updateAdminMessage(AdminId);
    const sql = 'DELETE A,O FROM OWNER O JOIN ACCOUNT A ON A.Owner_ID = O.Owner_ID WHERE A.AccountID=? ';
    connection.query(sql, [AdminId], function(err) {
      if (err) {
        return reject(err);
      }
      return resolve('Success');
    });
  });
}

function updateAdminMessage(AccountID) {
  const sqlFromMessage = 'UPDATE Messages M JOIN ACCOUNT AC ON AC.AccountID=M.From_ID SET M.From_ID=97  WHERE AC.AccountID=?';
  connection.query(sqlFromMessage, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
  const sqlToMessage = 'UPDATE Messages M JOIN ACCOUNT AC ON AC.AccountID=M.To_ID SET M.To_ID=97  WHERE AC.AccountID=?';
  connection.query(sqlToMessage, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

function updateAdminAnnouncement(AccountID) {
  const sql = 'UPDATE ANNOUNCEMENT A JOIN ACCOUNT AC ON AC.Owner_ID=A.Admin_ID SET A.Admin_ID=10  WHERE AC.AccountID=?';
  connection.query(sql, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

function deleteCoachMember(CoachId) {

  return new Promise((resolve, reject) => {
    updateCoachMessage(CoachId);
    updateCoachAnnouncement(CoachId);
    updateCoachClass(CoachId);
    updateCoachPersonalTraining(CoachId);
    const sql = 'DELETE A,C FROM COACH C JOIN ACCOUNT A ON A.Coach_ID = C.Coach_ID WHERE A.AccountID=? ';
    connection.query(sql, [CoachId], function(err) {
      if (err) {
        return reject(err);
      }
      console.log('1 record deleted');
      return resolve('Success');
    });
  });

}

function updateCoachMessage(AccountID) {
  const sqlFromMessage = 'UPDATE Messages M JOIN ACCOUNT AC ON AC.AccountID=M.From_ID SET M.From_ID=73  WHERE AC.AccountID=?';
  connection.query(sqlFromMessage, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
  const sqlToMessage = 'UPDATE Messages M JOIN ACCOUNT AC ON AC.AccountID=M.To_ID SET M.To_ID=73  WHERE AC.AccountID=?';
  connection.query(sqlToMessage, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

function updateCoachAnnouncement(AccountID) {
  const sql = 'UPDATE ANNOUNCEMENT A JOIN ACCOUNT AC ON AC.Coach_ID=A.Coach_ID SET A.Coach_ID=3  WHERE AC.AccountID=?';
  connection.query(sql, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

function updateCoachClass(AccountID) {
  const sql = 'UPDATE Class C JOIN ACCOUNT AC ON AC.Coach_ID=C.Coach_ID SET C.Coach_ID=3  WHERE AC.AccountID=?';
  connection.query(sql, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

function updateCoachPersonalTraining(AccountID) {
  const sql = 'UPDATE PERSONAL_TRAINING P JOIN ACCOUNT AC ON AC.Coach_ID=P.Coach_ID SET P.Coach_ID=3  WHERE AC.AccountID=?';
  connection.query(sql, [AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
  dbConnect,
  dbDisconnect,
  dbSignUp,
  dbLogIn,
  getUserData,
  postUserData,
  deleteUserData,
  getPublicAnnouncements,
  getPrivateAnnouncements,
  removeAnnouncement,
  addAnnouncement,
  getTotalAnnouncements,
  getUserInfo,
  getClassDay,
  getClasses,
  getClassTime,
  getClassCoach,
  getUserID,
  getClassID,
  enrollUser,
  getMessages,
  getMessagesCount,
  makeMessagesRead,
  getCoaches,
  createNewMessage,
  updateAnnouncement,
  deleteAnnouncement,
  updateLoggedInVisit,
  updateHomePageVisit,
  updateProfileVisit,
  updateClassesVisit,
  updateAboutUsVisit,
  updateDashboardVisit,
  addPrivateAnnouncement,
  getAllVisitCount,
  getAllUserTypeCount,
  getAdmins,
  checkConnection,
  getPersonalTraining,
  base64ToHex,
  getAllCoaches,
  insertPT,
  getUserCount,
  getPageVisitsCount,
  getEnrollCount,
  getGenderChart,
  getClassDaysChart,
  getPersonalDaysChart,
  getAgeRange,
  getCoachesDayWork,
  getCoachesPersonalWork,
  deletePT,
  getCoachTraining,
  userPic,
  getClassSchedule,
  addClassCodes,
  unenrollUser,
  deleteAdminMember,
  insertNewAdmin,
  insertNewCoach,
  deleteCoachMember,
  getClassName,
  getPersonalSchedule
};
