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
    let lvl = 'User';
    const ins = 'INSERT INTO ACCOUNT(username,password,level,User_ID) values(?,?,?,?)';
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

function postUserData(data) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE USERS, ACCOUNT SET  Name = ? , Surname = ? , Email = ? , password = ? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID';
    connection.query(sql,
        [data.Name, data.Surname, data.Email, data.password, data.username],
        function(err) {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log('1 record inserted');
          return resolve('The data were saved successfully!');
        });
  });
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

function addPrivateAnnouncement(title, message, level, username) {
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
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Coach_ID ) VALUES ( ? , ? , 1, 1, ? )';
          } else if (level === 'admin') {
            id = rows[0].Owner_ID;
            sql =
                'INSERT INTO ANNOUNCEMENT (Title, Message, isPrivate, isActive, Admin_ID ) VALUES ( ? , ? , 1, 1, ? )';
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
                'UPDATE ANNOUNCEMENT SET Title = ? , Message = ? , isPrivate = 1, isActive = 1 , Coach_ID = ?  WHERE ANNOUNCEMENT_ID = ? ';
          } else if (level === 'admin') {
            id = rows[0].Owner_ID;
            sql =
                'UPDATE ANNOUNCEMENT SET Title = ? , Message = ? , isPrivate = 1, isActive = 1 , Admin_ID = ? WHERE ANNOUNCEMENT_ID = ? ';
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

//mine
function getUserInfo(name) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ACCOUNT a, USERS u, PIC p WHERE u.name = ? and u.User_ID = a.User_ID and p.User_ID = u.User_ID';
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

function get7DaysRemaining(username) {

}

//
// function getCoachID(Name, Day, Time) {
//     return new Promise((resolve, reject) => {
//         // console.log();
//         // const sql = "SELECT DISTINCT c.Coach_ID FROM Class c WHERE c.Name
// = ? AND c.Day = ? AND c.Time = ?"; const sql = "SELECT ca.Coach_ID FROM
// COACH co, Class ca WHERE ca.Name = ? AND ca.Day = ? AND ca.Time = ? AND
// co.Coach_ID = ca.Coach_ID"; connection.query(sql, [Name, Day, Time],
// function (err, rows) { if(err) reject(err); resolve(rows); }); }); }

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
  get7DaysRemaining,
  addPrivateAnnouncement,
  getAllVisitCount,
  getAllUserTypeCount,
  getAdmins,
  checkConnection,
};
