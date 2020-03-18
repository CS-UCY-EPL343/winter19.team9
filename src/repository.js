import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function logIn(data) {
    return axios.post(`${BASE_URL}/api/auth`, {
        name: data.username,
        password: data.password,
    }).then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        // noinspection JSCheckFunctionSignatures
        localStorage.setItem('x-access-token-expiration',
            Date.now() + 2 * 60 * 60 * 1000);
        return response.data;
    }).catch(() => Promise.reject('Authentication Failed!'));
}


export function images (file){
    return axios.post('/api/getProfilePic', { emp_id: 5 })
        .then(res => {
            let imageURL = 'data:image/png;base64,' + new Buffer(res.data.profile_pic, 'binary').toString('base64')
        })

}
export function userData() {
    return axios.post(`${BASE_URL}/api/user/data`, {
        'x-access-token': localStorage.getItem('x-access-token'),
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function getSevenDaysRemaining() {
    return axios.post(`${BASE_URL}/api/user/getSevenDaysRemaining`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response)
        .catch(() => Promise.reject('Error when get private Announcements from database!!'));
}

export function getPrivateAnnouncements() {
    return axios.post(`${BASE_URL}/api/announcements/private`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response)
        .catch(() => Promise.reject('Error when get private Announcements from database!!'));
}

export function getPrivateAnnouncementsAdmin(username) {
    return axios.post(`${ BASE_URL }/api/announcements/admin/private`, {'x-access-token': localStorage.getItem('x-access-token'), username: username})
        .then(response => response)
        .catch(() => Promise.reject('Error when get private Announcements from database!!'));
}

export function getTotalPrivateAnnouncements() {
    return axios.post(`${BASE_URL}/api/announcements/private/total`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data)
        .catch(() => Promise.reject('Error'));
}

export function getPublicAnnouncements() {
    return axios.get(`${BASE_URL}/api/announcements/public`)
        .then(response => response);
}

export function getClasses() {
  return axios
      .post(`${BASE_URL}/api/BookClass/ClassName`, {'x-access-token': localStorage.getItem('x-access-token')})
      .then(response => response.data)
      .catch(err => Promise.reject('Authentication Failed!'))
}

export function getClassDay(ClassName) {
  return axios
      .post(`${BASE_URL}/api/BookClass/ClassDay`, {'x-access-token': localStorage.getItem('x-access-token'), ClassName: ClassName})
      .then(response => response.data)
      .catch(err => Promise.reject('Authentication Failed!'))
}

export function getClassTime(ClassName, ClassDay) {
  return axios
      .post(`${BASE_URL}/api/BookClass/ClassTime`, {'x-access-token': localStorage.getItem('x-access-token'), ClassName: ClassName, ClassDay: ClassDay})
      .then(response => response.data)
      .catch(err => Promise.reject('Authentication Failed!'))
}

export function getClassCoach(ClassName, ClassDay, ClassTime) {
  return axios
      .post(`${BASE_URL}/api/BookClass/ClassCoach`, {'x-access-token': localStorage.getItem('x-access-token'), ClassName: ClassName, ClassDay: ClassDay, ClassTime: ClassTime})
      .then(response => response.data)
      .catch(err => Promise.reject('Authentication Failed!'))
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
//         .post(`${BASE_URL}/api/BookClass/CoachID`, {'x-access-token': localStorage.getItem('x-access-token'), ClassName: ClassName, ClassDay: ClassDay, ClassTime: ClassTime})
//         .then(response => response.data)
//         .catch(err => Promise.reject('Authentication Failed!'))
// }

export function getClassID(ClassName, ClassDay, ClassTime, CoachName) {
    return axios
        .post(`${BASE_URL}/api/BookClass/ClassID`, {'x-access-token': localStorage.getItem('x-access-token'), ClassName: ClassName, ClassDay: ClassDay, ClassTime: ClassTime, CoachName: CoachName})
        .then(response => response)
        .catch(err => Promise.reject('Authentication Failed!'))
}

export function removeAnnouncement(id) {
    return axios.post(`${BASE_URL}/api/announcements/remove`, {
        'x-access-token': localStorage.getItem('x-access-token'), id: id,
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function deleteAnnouncement(id) {
    return axios.post(`${BASE_URL}/api/announcements/private/delete`, {
        'x-access-token': localStorage.getItem('x-access-token'), announcement_id: id,
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function addAnnouncement(title, message) {
    return axios.post(`${BASE_URL}/api/announcements/public/add`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        title: title,
        message: message,
    })
        .then(response => response)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function addPrivateAnnouncement(title, message) {
    return axios.post(`${BASE_URL}/api/announcements/private/add`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        title: title,
        message: message,
    })
        .then(response => response)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function updateAnnouncement(announcement_id, title, message) {
    return axios.post(`${BASE_URL}/api/announcements/private/update`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        title: title,
        message: message,
        announcement_id: announcement_id,
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}


export function updateAboutUdVisit(){
    return axios.post(`${BASE_URL}/api/AboutUs/visit/count`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data)
        .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function updateClassesVisit(){
    return axios.post(`${BASE_URL}/api/Classes/visit/count`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data)
        .catch(() => Promise.reject('HomePage Count Failed!!!'));
}

export function updateProfileVisit(){
    return axios.post(`${BASE_URL}/api/profile/visit/count`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data)
        .catch(() => Promise.reject('Profile Count Failed!!!'));
}

export function updateHomePageVisit(){
    return axios.post(`${BASE_URL}/api/homepage/visit/count`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data)
        .catch(() => Promise.reject('HomePage Count Failed!!!'));
}


export function postuserData(data) {
    return axios
        .post(`${BASE_URL}/api/user/post/data`, {'x-access-token': localStorage.getItem('x-access-token'), data: data})
        .then(response => response.message)
        .catch(() => Promise.reject('Authentication Failed!'))
}

export function enrollUser(CLASS_ID, User_ID) {
    return axios
        .post(`${BASE_URL}/api/BookClass/Enroll`, {'x-access-token': localStorage.getItem('x-access-token'), CLASS_ID : CLASS_ID, User_ID : User_ID})
        .then(response => response.message)
        .catch(() => Promise.reject('Authentication Failed!'))
}

export function deleteUserData() {
    return axios
        .post(`${BASE_URL}/api/user/delete/data`, {
            'x-access-token': localStorage.getItem('x-access-token'),
        })
        .then(response => {
            console.log(response);
            return response.data
        })
        .catch(() => Promise.reject('Authentication Failed!'));

}

//for image from database
export function UserPic(name) {
    return axios
        .post(`${BASE_URL}/api/user/UserPic`, {
            'x-access-token': localStorage.getItem('x-access-token'),
            name: name
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'))
}


//mine
export function userDetails(name) {
    return axios
        .post(`${BASE_URL}/api/user/userDetails`, {
            'x-access-token': localStorage.getItem('x-access-token'),
            name: name
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'))
}

export function signUp(data) {
    return axios
        .post(`${BASE_URL}/api/user/insert`, data)
        .then(response => response.data)
        .catch(() => Promise.reject("Sign Up failed."))
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
    return axios.post(`${BASE_URL}/api/userLevel`, {
        'x-access-token': localStorage.getItem('x-access-token'),
    }).then(response => response.data.userLevel);
}

export function sendEmail(data) {
    return axios.post(`${BASE_URL}/api/email`, data)
        .then(response => response.data);
}

export function getMessages() {
    return axios.post(`${BASE_URL}/api/messages/get`, {
        'x-access-token': localStorage.getItem('x-access-token'),
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}

export function getTotalMessages() {
    return axios.post(`${BASE_URL}/api/messages/total`,
        {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response.data.count[0])
        .catch(() => Promise.reject('Error'));
}

export function makeMessagesRead(newMessages) {
    return axios.post(`${BASE_URL}/api/messages/unread`,
        {
            'x-access-token': localStorage.getItem('x-access-token'),
            newMessages: newMessages,
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Error'));
}

export function createNewMessage(data) {
    return axios.post(`${BASE_URL}/api/messages/new`,
        {
            'x-access-token': localStorage.getItem('x-access-token'), data,
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Error'));
}

export function getCoaches() {
    return axios.get(`${BASE_URL}/api/coaches/get`)
        .then(response => response.data);
}
