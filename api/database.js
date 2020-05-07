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
      // host    : 'ffndb.mysql.database.azure.com',
      // user    : 'ffn_root@ffndb',
      // password: 'mavroS1234!',
      // database: 'ffndb',
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
    const insert = 'INSERT INTO USERS(Name, Surname, Bdate, Gender, Email, Medical_History, Age,Verify,Token, Membership_ID) values(?,?,?,?,?,?,?,?,?,?)';

    connection.query(insert, [
      data.fname,
      data.lname,
      data.bDate,
      data.gender,
      data.email,
      data.med,
      data.age,
      data.verify,
      data.hash,
      data.med,
    ], function(err, rows) {
      if (err) {

        return reject(err);
      }
      let id = rows.insertId;
      //The data.password must be with aes.
      connection.query(ins, [data.username, data.password, lvl, id],
          function(err) {
            if (err) {
              return reject(err);
            }
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

function getVerified(username) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT U.Verify FROM ACCOUNT A INNER JOIN USERS U ON A.User_ID=U.User_ID WHERE A.username=? ';
    connection.query(sql, [username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });

  });
}


function getStaffData(user) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COALESCE(Owner_ID, Coach_ID) AS AccountID,username, level FROM ACCOUNT WHERE username = ?';
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
  return (result);
}

function postUserData(data) {
  const x = data.imagePreviewUrl;
  let byteString = x.split(',')[1];
  if (x !== '') {
    return new Promise((resolve, reject) => {

      const cryptr = new Crypto('ffn_private_key_!!!!');
      const decryptedPassword = cryptr.decrypt(data.password);

      const sql = 'UPDATE USERS, ACCOUNT, PIC SET  Name = ? , Surname = ? , Email = ?, Medical_History = ?, password = ?, image = X?, Phone_Number = ? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID AND PIC.User_ID = USERS.User_ID';
      connection.query(sql, [
        data.Name,
        data.Surname,
        data.Email,
        data.Medical_History,
        decryptedPassword,
        base64ToHex(byteString),
        data.Phone_Number,
        data.username,
      ], function(err) {
        if (err) {
          return reject(err);
        }
        return resolve('The data were saved successfully!');
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE USERS, ACCOUNT SET  Name = ? , Surname = ? , Email = ? , Medical_History = ? , password = ?, Phone_Number = ? WHERE ACCOUNT.username = ? AND ACCOUNT.User_ID = USERS.User_ID ';
      connection.query(sql,
          [
            data.Name,
            data.Surname,
            data.Email,
            data.Medical_History,
            data.password,
            data.Phone_Number,
            data.username,
          ],
          function(err) {
            if (err) {
              return reject(err);
            }
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
        return reject(err);
      }
      // resolve({id: rows.insertId});
      x = rows[0].User_ID;
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
        return reject(err);
      }
      return resolve('The data were saved successfully!');
    });
  });
}

function unenrollUser(CLASS_ID, User_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM ENROL WHERE CLASS_ID = ? AND User_ID = ?';
    connection.query(sql, [CLASS_ID, User_ID], function(err) {
      if (err) {
        return reject(err);
      }
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
        return reject(err);
      }
      return resolve('The data were saved successfully!');
    });
  });
}

//***************************************************************************************

//fetching the data for the personal training schedule
function getPersonalTraining(User_ID) {
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
    const sql = 'SELECT p.Day, p.Time, p.User_ID, u.Name, u.Surname FROM `PERSONAL_TRAINING` p, USERS u WHERE '
                +
                'p.Coach_ID = ? AND p.User_ID = u.User_ID';
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

    });
  });
}

function getClassSchedule(User_ID) {
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

function getCoachClass(Coach_ID) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.ClassID, c.DayCode, c.TimeCode, c.Name FROM Class c WHERE c.Coach_ID = ?';
    connection.query(sql, [Coach_ID], function(err, rows) {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
}

//coach Info
function getCoachInfo(coach) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Coach_ID, CoachName, Surname FROM `COACH` WHERE Coach_ID = ?';
    connection.query(sql, [coach], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

// Melios
function getMessagesMelios(user) {
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

function deleteNewMessage(msg_id, username) {
  return new Promise((resolve, reject) => {
    const check = 'SELECT AccountID FROM ACCOUNT WHERE username = ?';
    connection.query(check, [username], function(err, res) {
      if (err) {
        return reject(err);
      }
      // Change
      const id = res.length;
      if (id === 0) {
        return reject(err);
      } else {
        const user_id = res[0].AccountID;
        const sql = 'DELETE FROM Messages WHERE Message_ID = ? and (From_ID = ? or FromDeletedID = ?)';
        connection.query(sql, [msg_id, user_id, user_id],
            function(error, rows) {
              if (err) {
                reject(err);
              }
              resolve(rows);
            });
      }
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

function getUser_ID(email) {
  return new Promise((resolve, reject) => {
    const find = `SELECT USERS.User_ID FROM USERS WHERE USERS.Email=?`;
    connection.query(find, [email], function(err, rows) {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows[0]);
      }
    });
  });
}

function updateUser(data) {
  return new Promise((resolve, reject) => {
    //const update = 'UPDATE USERS SET Token =?,activeEpires=? WHERE User_ID = ?';
    const update = 'UPDATE USERS SET Token =? WHERE User_ID = ?';
    connection.query(update, [data.token, data.id.User_ID], function(err) {
      if (err) {
        return reject(err);
      }
    });
  });
}

function resetPassword(data) {
  return new Promise((resolve, reject) => {
    const check = 'SELECT User_ID FROM USERS WHERE Token =?';
    // const check = 'SELECT User_ID,activeExpires FROM USERS WHERE Token =?';
    connection.query(check, [data.token], function(err, res) {
      if (err) {
        return reject(err);
      }
      const id = res.length;
      if (id === 0) {
        return reject(err);
      } else {
        // let epxire = res[0].activeExpires;
        // let today = Date.now();
        // if(expire < today){
        const user_id = res[0].User_ID;
        const update = 'UPDATE ACCOUNT SET password =? WHERE User_ID = ? AND username=?';
        connection.query(update, [data.password, user_id, data.username],
            function(error, rows) {
              if (error) {
                return reject(error);
              }
              if (rows.affectedRows === 0) {
                return reject('Wrong username');
              }
            });
      }
    //  }else{return reject()}
    });
  });
}

function verifyUser(token) {
  return new Promise((resolve, reject) => {
    const select = 'SELECT User_ID FROM USERS WHERE Token = ?';
    connection.query(select, [token.secret], function(err, rows) {
      if (err) {
        return reject(err);
      }
      //fix this code..... here

      const user = rows.length;

      if (user === null) {
        return reject(err);
      } else {
        const user_id = rows[0].User_ID;
        const update = 'UPDATE USERS SET Verify = 1 WHERE Token = ? AND User_ID = ?';
        connection.query(update, [token.secret, user_id], function(err) {
          if (err) {
            return reject(err);
          }
        });
      }
      return resolve(rows);
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

function getAccountID(user) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT a.AccountID FROM ACCOUNT a, USERS u WHERE username = ?  AND a.User_ID = u.User_ID';
    connection.query(sql, [user], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows[0]);
    });
  });
}

function getCoachID(user) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT c.Coach_ID FROM ACCOUNT a, COACH c WHERE username = ?  AND a.Coach_ID = c.Coach_ID';
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
      data.fname,
      data.lname,
      data.bDate,
      data.gender,
      data.email,
    ], function(err, rows) {
      if (err) {
        return reject(err);
      }
      let id = rows.insertId;

      connection.query(
          insertAccount, [
            data.username,
            data.password,
            level,
            id,
          ],
          function(err, rows) {
            if (err) {
              return reject(err);
            }
            return resolve(rows.insertId);
          },
      );
    });
  });
}

function insertNewAdmin(data) {
  return new Promise((resolve, reject) => {
    const level = 'admin';
    const insertAdmin = 'INSERT INTO OWNER(Name, Surname, Bdate, Gender, Email) VALUES (?, ?, ?, ?, ?)';
    const insertAccount = 'INSERT INTO ACCOUNT(username , password, level, Owner_ID) VALUES (?, ?, ?, ?)';


    connection.query(insertAdmin, [
      data.fname,
      data.lname,
      data.bDate,
      data.gender,
      data.email,
    ], function(err, rows) {
      if (err) {
        return reject(err);
      }
      let id = rows.insertId;

      connection.query(
          insertAccount, [
            data.username,
            data.password,
            level,
            id,
          ],
          function(err, rows) {
            if (err) {
              return reject(err);
            }
            return resolve(rows.insertId);
          },
      );
    });
  });
}

function deleteAdminMember(AdminId) {

  return new Promise((resolve, reject) => {
    const sqlUpdateDeletedID = 'INSERT INTO DELETED_ACCOUNT SELECT A.AccountID,O.Name,O.Surname,A.level FROM ACCOUNT A INNER JOIN OWNER O ON A.Owner_ID=O.Owner_ID WHERE A.AccountID=?';
    connection.query(sqlUpdateDeletedID, [AdminId], function(err) {
      if (err) {
        return reject(err);
      }
    });
    updateAdminAnnouncement(AdminId);
    updateStaffMessage(AdminId);
    const sql = 'DELETE A,O FROM OWNER O JOIN ACCOUNT A ON A.Owner_ID = O.Owner_ID WHERE A.AccountID=? ';
    connection.query(sql, [AdminId], function(err) {
      if (err) {
        return reject(err);
      }
      return resolve('Success');
    });
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

function deleteCoachMember(CoachId){

  return new Promise((resolve, reject) => {
    const sqlUpdateDeletedID = 'INSERT INTO DELETED_ACCOUNT SELECT A.AccountID,C.CoachName,C.Surname,A.level FROM ACCOUNT A INNER JOIN COACH C ON A.Coach_ID=C.Coach_ID WHERE A.AccountID=?';
    connection.query(sqlUpdateDeletedID, [CoachId], function(err) {
      if (err) {
        return reject(err);
      }
    });
    updateCoachAnnouncement(CoachId);
    updateStaffMessage(CoachId);
    const sql = 'DELETE A,C FROM COACH C JOIN ACCOUNT A ON A.Coach_ID = C.Coach_ID WHERE A.AccountID=? ';
    connection.query(sql, [CoachId], function(err) {
      if (err) {
        return reject(err);
      }
      return resolve('Success');
    });
  });

}

function updateStaffMessage(AccountID) {
  const sqlUpdateFromMsg = 'UPDATE Messages M SET M.From_ID=NULL,M.FromDeletedID=? WHERE M.From_ID=?';
  connection.query(sqlUpdateFromMsg, [AccountID, AccountID], function(err) {
    if (err) {
      return reject(err);
    }
  });

  const sqlUpdateToMsg = 'UPDATE Messages M SET M.To_ID=NULL,M.ToDeletedID=? WHERE M.To_ID=?';
  connection.query(sqlUpdateToMsg, [AccountID, AccountID], function(err) {
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

function getCountPT(AccountID) {
  return new Promise((resolve, reject) => {
    const sql = 'call countPT(?)';
    connection.query(sql, [AccountID], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

function getCountClasses(AccountID) {
  return new Promise((resolve, reject) => {
    const sql = 'call countClass(?)';
    connection.query(sql, [AccountID], function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

function sameUser(username){
  return new Promise((resolve, reject) => {
    const sql='SELECT COUNT(*) AS "countTotal" FROM ACCOUNT A WHERE A.username=?';
    connection.query(sql, [username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}


function getEvents(username, dayString, dayNumber) {
  const events = [];
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Class.Name, Class.Time, COACH.CoachName, COACH.Surname FROM ACCOUNT INNER JOIN USERS ON ACCOUNT.User_ID=USERS.User_ID INNER JOIN ENROL ON USERS.User_ID=ENROL.User_ID INNER JOIN Class ON ENROL.CLASS_ID=Class.ClassID INNER JOIN COACH ON Class.Coach_ID=COACH.Coach_ID WHERE Class.Day=? AND ACCOUNT.username=?';
    connection.query(sql, [dayString, username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      rows.forEach(r => {
        const time = r.Time.split(':');
        events.push({
          // personal : false,
          timeStart: time[0] + ':' + time[1],
          event    : 'Class ' + r.Name + ' with Coach ' + r.CoachName + ' '
                     + r.Surname,
        });
      });
      const sql = 'SELECT PERSONAL_TRAINING.Time, COACH.CoachName, COACH.Surname FROM ACCOUNT INNER JOIN USERS ON ACCOUNT.User_ID=USERS.User_ID INNER JOIN PERSONAL_TRAINING ON USERS.User_ID=PERSONAL_TRAINING.User_ID INNER JOIN COACH ON PERSONAL_TRAINING.Coach_ID=COACH.Coach_ID WHERE PERSONAL_TRAINING.Day=? AND ACCOUNT.username=?';
      connection.query(sql, [dayNumber, username], function(err, rows) {
        if (err) {
          return reject(err);
        }
        rows.forEach(r => {
          events.push({
            // personal : true,
            timeStart: r.Time + ':00',
            event    : 'Personal Training with Coach ' + r.CoachName + ' '
                       + r.Surname,
          });
        });

        events.sort(function(a, b) {
          const timeA = a.timeStart.split(':');
          const timeB = b.timeStart.split(':');

          if (parseInt(timeA[0]) < parseInt(timeB[0])) {
            return -1;
          } else if (parseInt(timeB[0]) > parseInt(timeA[0])) {
            return 1;
          } else {
            if (parseInt(timeA[1]) < parseInt(timeB[1])) {
              return -1;
            } else if (parseInt(timeA[1]) > parseInt(timeB[1])) {
              return 1;
            }
          }
          return 0;
        });
        return resolve({events});
      });
    });
  });
}

function getEventsTotal(username, dayString, dayNumber) {
  const events = [];
  return new Promise((resolve, reject) => {
    const sql = 'SELECT Class.Name, Class.Time, COACH.CoachName, COACH.Surname FROM ACCOUNT INNER JOIN USERS ON ACCOUNT.User_ID=USERS.User_ID INNER JOIN ENROL ON USERS.User_ID=ENROL.User_ID INNER JOIN Class ON ENROL.CLASS_ID=Class.ClassID INNER JOIN COACH ON Class.Coach_ID=COACH.Coach_ID WHERE Class.Day=? AND ACCOUNT.username=?';
    connection.query(sql, [dayString, username], function(err, rows) {
      if (err) {
        return reject(err);
      }
      rows.forEach(r => {
        const time = r.Time.split(':');
        events.push({
          // personal : false,
          timeStart: time[0] + ':' + time[1],
          event    : 'Class ' + r.Name + ' with Coach ' + r.CoachName + ' '
                     + r.Surname,
        });
      });
      const sql = 'SELECT PERSONAL_TRAINING.Time, COACH.CoachName, COACH.Surname FROM ACCOUNT INNER JOIN USERS ON ACCOUNT.User_ID=USERS.User_ID INNER JOIN PERSONAL_TRAINING ON USERS.User_ID=PERSONAL_TRAINING.User_ID INNER JOIN COACH ON PERSONAL_TRAINING.Coach_ID=COACH.Coach_ID WHERE PERSONAL_TRAINING.Day=? AND ACCOUNT.username=?';
      connection.query(sql, [dayNumber, username], function(err, rows) {
        if (err) {
          return reject(err);
        }
        rows.forEach(r => {
          events.push({
            // personal : true,
            timeStart: r.Time + ':00',
            event    : 'Personal Training with Coach ' + r.CoachName + ' '
                       + r.Surname,
          });
        });
        return resolve({total: events.length});
      });
    });
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
  getPersonalSchedule,
  getUser_ID,
  verifyUser,
  updateUser,
  resetPassword,
  getCountPT,
  getCountClasses,
  getEvents,
  getMessagesMelios,
  getStaffData,
  getCoachInfo,
  getCoachID,
  getCoachClass,
  getEventsTotal,
  deleteNewMessage,
  sameUser,
  getVerified,
  getAccountID
};
