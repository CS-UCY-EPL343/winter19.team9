import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// const BASE_URL = 'http://10.16.22.15:5000';  // For Android use your IPv4

export function logIn(data) {
  return axios.post(`${ BASE_URL }/api/auth`, {
    name    : data.username,
    password: data.password,
  }).then(response => {
    localStorage.setItem('x-access-token', response.data.token);
    // noinspection JSCheckFunctionSignatures
    localStorage.setItem('x-access-token-expiration',
        Date.now() + 2 * 60 * 60 * 1000);
    return response.data;
  }).catch(() => Promise.reject('Authentication Failed!'));
}

// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols
export function images(file) {
  return axios.post('/api/getProfilePic', {emp_id: 5}).then(res => {
    // noinspection JSUnusedLocalSymbols,JSUnresolvedVariable
    let imageURL = 'data:image/png;base64,' + new Buffer(res.data.profile_pic,
        'binary').toString('base64');
    console.log(imageURL);
  });

}

export function userData() {
  return axios.post(`${ BASE_URL }/api/user/data`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getPrivateAnnouncements() {
  return axios.post(`${ BASE_URL }/api/announcements/private`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response)
      .catch(() => Promise.reject(
          'Error when get private Announcements from database!!'));
}

export function getPrivateAnnouncementsAdmin(username) {
  return axios.post(`${ BASE_URL }/api/announcements/admin/private`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    username        : username,
  }).then(response => response).catch(() => Promise.reject(
      'Error when get private Announcements from database!!'));
}

export function getTotalPrivateAnnouncements() {
  return axios.post(`${ BASE_URL }/api/announcements/private/total`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Error'));
}

export function getPublicAnnouncements() {
  return axios.get(`${ BASE_URL }/api/announcements/public`)
      .then(response => response);
}

export function getDayCode() {
  return axios
      .post(`${ BASE_URL }/api/BookClass/ClassDayCode`,
          {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getTimeCode() {
  return axios
      .post(`${ BASE_URL }/api/BookClass/ClassTimeCode`,
          {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getClasses() {
  return axios.post(`${ BASE_URL }/api/BookClass/ClassName`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getClassName(ClassID) {
  return axios
      .post(`${ BASE_URL }/api/BookClass/ClassNames`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        ClassID         : ClassID,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getClassDay(ClassName) {
  return axios.post(`${ BASE_URL }/api/BookClass/ClassDay`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    ClassName       : ClassName,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getClassTime(ClassName, ClassDay) {
  return axios.post(`${ BASE_URL }/api/BookClass/ClassTime`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    ClassName       : ClassName,
    ClassDay        : ClassDay,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getClassCoach(ClassName, ClassDay, ClassTime) {
  return axios.post(`${ BASE_URL }/api/BookClass/ClassCoach`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    ClassName       : ClassName,
    ClassDay        : ClassDay,
    ClassTime       : ClassTime,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getUserID() {
  return axios.post(`${ BASE_URL }/api/BookClass/UserID`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed user!'));
}

// export function getCoachID(ClassName, ClassDay, ClassTime) {
//     return axios
//         .post(`${BASE_URL}/api/BookClass/CoachID`, {'x-access-token':
// localStorage.getItem('x-access-token'), ClassName: ClassName, ClassDay:
// ClassDay, ClassTime: ClassTime}) .then(response => response.data) .catch(err
// => Promise.reject('Authentication Failed!')) }

export function getClassID(ClassName, ClassDay, ClassTime, CoachName) {
  return axios.post(`${ BASE_URL }/api/BookClass/ClassID`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    ClassName       : ClassName,
    ClassDay        : ClassDay,
    ClassTime       : ClassTime,
    CoachName       : CoachName,
  })
      .then(response => response)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function removeAnnouncement(id) {
  return axios.post(`${ BASE_URL }/api/announcements/remove`, {
    'x-access-token': localStorage.getItem('x-access-token'), id: id,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function deleteAnnouncement(id) {
  return axios.post(`${ BASE_URL }/api/announcements/private/delete`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    announcement_id : id,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function addAnnouncement(title, message) {
  return axios.post(`${ BASE_URL }/api/announcements/public/add`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    title           : title,
    message         : message,
  })
      .then(response => response)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function addPrivateAnnouncement(title, message, username) {
  return axios.post(`${ BASE_URL }/api/announcements/private/add`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    title           : title,
    message         : message,
    username        : username,
  })
      .then(response => response)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function updateAnnouncement(announcement_id, title, message) {
  return axios.post(`${ BASE_URL }/api/announcements/private/update`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    title           : title,
    message         : message,
    announcement_id : announcement_id,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function allUsersCount() {
  return axios.get(`${ BASE_URL }/api/user/type/count`)
      .then(response => response.data)
      .catch(() => Promise.reject('Failed!!!'));
}

export function getUserCount() {
  return axios.get(`${ BASE_URL }/api/user/count`)
      .then(response => response.data.count[0].count);
}

export function getEnrollCount() {
  return axios.get(`${ BASE_URL }/api/enroll/count`)
      .then(response => response.data.count[0].count);
}

export function getPageVisits() {
  return axios.get(`${ BASE_URL }/api/page/visits/count`)
      .then(response => response.data.count[0].count);
}

export function allVisitCount() {
  return axios.get(`${ BASE_URL }/api/visit/count`)
      .then(response => response.data)
      .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function loggedInVisit() {
  return axios.post(`${ BASE_URL }/api/logged/visit/count`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => {});
}

export function updateAboutUsVisit() {
  return axios.post(`${ BASE_URL }/api/AboutUs/visit/count`)
      .then(response => response.data)
      .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function updateClassesVisit() {
  return axios.post(`${ BASE_URL }/api/Classes/visit/count`)
      .then(response => response.data)
      .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function updateProfileVisit() {
  return axios.post(`${ BASE_URL }/api/profile/visit/count`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Profile Count Failed!!!'));
}

export function updateDashboardVisit() {
  return axios.post(`${ BASE_URL }/api/dashboard/visit/count`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(() => Promise.reject('Profile Count Failed!!!'));
}

export function updateHomePageVisit() {
  return axios.post(`${ BASE_URL }/api/homepage/visit/count`)
      .then(response => response.data)
      .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function insertCoach(data) {
  return axios.post(`${ BASE_URL }/api/coach/insert`, data)
      .then(response => response.data)
      .catch(() => Promise.reject('insert coach failed.'));
}

export function insertAdmin(data) {
  return axios.post(`${ BASE_URL }/api/admin/insert`, data)
      .then(response => response.data)
      .catch(() => Promise.reject('Insert Admin failed.'));
}

export function deleteAdmin(AdminId) {
  return axios.post(`${ BASE_URL }/api/admin/delete`, {AdminId: AdminId})
      .then(response => response.data)
      .catch(() => Promise.reject('Delete Admin Failed.'));
}

export function deleteCoach(CoachID) {
  return axios.post(`${ BASE_URL }/api/coach/delete`, {CoachID: CoachID})
      .then(response => response.data)
      .catch(() => Promise.reject('Delete Coach Failed.'));
}


export function countPT(AccountID){
  return axios.post(`${ BASE_URL }/api/coach/countPT`,
      {AccountID : AccountID})
      .then(response => response.data.count[0])
      .catch(() => Promise.reject('Error'));

}

export function countClasses(AccountID){
  return axios.post(`${ BASE_URL }/api/coach/countClasses`,
      {AccountID : AccountID})
      .then(response => response.data.count[0])
      .catch(() => Promise.reject('Error'));
}

export function postuserData(data) {
  // noinspection JSUnresolvedVariable
  return axios.post(`${ BASE_URL }/api/user/post/data`,
      {'x-access-token': localStorage.getItem('x-access-token'), data: data})
      .then(response => response.message)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function enrollUser(CLASS_ID, User_ID) {
  // noinspection JSUnresolvedVariable
  return axios.post(`${ BASE_URL }/api/BookClass/Enroll`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    CLASS_ID        : CLASS_ID,
    User_ID         : User_ID,
  })
      .then(response => response.message)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function unenrollUser(CLASS_ID, User_ID) {
  // noinspection JSUnresolvedVariable
  return axios
      .post(`${ BASE_URL }/api/BookClass/Unenroll`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        CLASS_ID        : CLASS_ID,
        User_ID         : User_ID,
      })
      .then(response => response.message)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function deleteUserData() {
  return axios.post(`${ BASE_URL }/api/user/delete/data`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  }).then(response => {
    console.log(response);
    return response.data;
  }).catch(() => Promise.reject('Authentication Failed!'));

}

//insert into personal training
export function insertPT(data) {
  return axios
      .post(`${ BASE_URL }/api/insert/PersonalTraining`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        data            : data,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//delete from personal training
export function deletePT(data) {
  return axios
      .post(`${ BASE_URL }/api/delete/PersonalTraining`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        data            : data,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//for coaches for personal training
export function getAllCoaches() {
  return axios.post(`${ BASE_URL }/api/bookTraining/allCoaches`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//for image from database
// noinspection JSUnusedGlobalSymbols
export function UserPic(name) {
  return axios.post(`${ BASE_URL }/api/user/UserPic`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    name            : name,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//fetching the data for the personal training schedule
export function getPersonalTraining(User_ID) {
  return axios.post(`${ BASE_URL }/api/user/getPersonalTraining`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    User_ID         : User_ID,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getPersonalSchedule(User_ID) {
  return axios.post(`${ BASE_URL }/api/user/getPersonalSchedule`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    User_ID         : User_ID,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//Gets the class schedule of the user with the given User_ID
export function getClassSchedule(User_ID) {
  return axios
      .post(`${ BASE_URL }/api/user/getClassSchedule`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        User_ID         : User_ID,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//fetching the data for the personal training schedule
export function getCoachTraining(Coach_ID) {
  return axios
      .post(`${ BASE_URL }/api/coach/getCoachTraining`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        Coach_ID        : Coach_ID,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//fetch pic
export function userPic(User_ID) {
  return axios
      .post(`${ BASE_URL }/api/user/userPic`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        User_ID         : User_ID,
      })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

//mine
export function userDetails(name) {
  return axios.post(`${ BASE_URL }/api/user/userDetails`, {
    'x-access-token': localStorage.getItem('x-access-token'),
    name            : name,
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function signUp(data) {
  return axios.post(`${ BASE_URL }/api/user/insert`, data)
      .then(response => response.data)
      .catch(() => Promise.reject('Sign Up failed.'));
}

export function logOut() {
  localStorage.removeItem('x-access-token');
  localStorage.removeItem('x-access-token-expiration');
}

export function isAuthenticated() {
  return (
      localStorage.getItem('x-access-token') &&
      localStorage.getItem('x-access-token-expiration') > Date.now()
  );
}

// noinspection JSUnusedGlobalSymbols
export function hasPermissionFor(user) {
  if (!localStorage.getItem('x-access-token') ||
      !localStorage.getItem('x-access-token-expiration') > Date.now()) {
    return false;
  }

  return getUserLevel().then(level => {
    if (level === 'admin') {
      return true;
    } else if (level === 'coach' && (
        user === 'coach' || user === 'user')) {
      return true;
    } else {
      return level === 'user' && user === 'user';
    }
  });
}

export function getUserLevel() {
  return axios.post(`${ BASE_URL }/api/userLevel`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  }).then(response => response.data.userLevel);
}

export function lastVerify(data){
    return axios
        .post(`${BASE_URL}/verifyEmail/:id`, data)
        .then(response => response.data)
        .catch(() => Promise.reject("Verification failed."))
}
export function newPassword(data){
    return axios.post(`${BASE_URL}/reset-password`,data)
        .then(response => response.data);
}
export function resetPass(data){
    return axios.post(`${BASE_URL}/resetPassword/:id`,data)
        .then(response => response.data)
        .catch(() => Promise.reject('Failed to reset Password'))
}

export function sendEmail(data) {
  return axios.post(`${ BASE_URL }/api/email`, data)
      .then(response => response.data)
      .catch(error => error);
}

export function getMessages() {
  return axios.post(`${ BASE_URL }/api/messages/get`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  })
      .then(response => response.data)
      .catch(() => Promise.reject('Authentication Failed!'));
}

export function getTotalMessages() {
  return axios.post(`${ BASE_URL }/api/messages/total`,
      {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data.count[0])
      .catch(() => Promise.reject('Error'));
}

export function makeMessagesRead(newMessages) {
  return axios.post(`${ BASE_URL }/api/messages/unread`,
      {
        'x-access-token': localStorage.getItem('x-access-token'),
        newMessages     : newMessages,
      }).then(response => response.data).catch(() => Promise.reject('Error'));
}

export function createNewMessage(data) {
  return axios.post(`${ BASE_URL }/api/messages/new`,
      {
        'x-access-token': localStorage.getItem('x-access-token'), data,
      }).then(response => response.data).catch(() => Promise.reject('Error'));
}

export function getCoaches() {
  return axios.get(`${ BASE_URL }/api/coaches/get`)
      .then(response => response.data);
}

export function getAdmins() {
  return axios.get(`${ BASE_URL }/api/admins/get`)
      .then(response => response.data);
}

export function getServerConnections() {
  return axios.get(`${ BASE_URL }/api/server/connections`)
      .then(response => response.data.connections);
}

export function getGenderChart() {
  return axios.get(`${ BASE_URL }/api/chart/pie/gender`)
      .then(response => response.data);
}

export function getClassDaysChart() {
  return axios.get(`${ BASE_URL }/api/chart/pie/enroll`)
      .then(response => response.data);
}

export function getPersonalDaysChart() {
  return axios.get(`${ BASE_URL }/api/chart/pie/personal`)
      .then(response => response.data);
}

export function getAgeRange() {
  return axios.get(`${ BASE_URL }/api/chart/bar/age`)
      .then(response => response.data[0][0]);
}

export function getCoachesDayWork() {
  return axios.get(`${ BASE_URL }/api/chart/line/coaches/week-work`)
      .then(response => response.data[0]);
}

export function getCoachesPersonalWork() {
  return axios.get(`${ BASE_URL }/api/chart/line/coaches/personal-work`)
      .then(response => response.data[0]);
}

export function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
                             + // domain name
                             '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4)
                             // address
                             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and
                             // path
                             '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                             '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}