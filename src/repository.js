import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

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

export function userData() {
    return axios.post(`${ BASE_URL }/api/user/data`, {
        'x-access-token': localStorage.getItem('x-access-token'),
    })
                 .then(response => response.data)
                 .catch(() => Promise.reject('Authentication Failed!'));
}

export function getPrivateAnnouncements(username) {
    return axios.post(`${ BASE_URL }/api/announcements/private`, {'x-access-token': localStorage.getItem('x-access-token'), username: username})
        .then(response => response)
        .catch(() => Promise.reject('Error when get private Announcements from database!!'));
}

export function getTotalPrivateAnnouncements(){

    return axios.post(`${ BASE_URL }/api/announcements/private/total`, {'x-access-token': localStorage.getItem('x-access-token')})
        .then(response => response)
        .catch(() => Promise.reject('Error'));
}

export function getPublicAnnouncements() {
  return axios.get(`${ BASE_URL }/api/announcements/public`)
      .then(response => response);
}

export function removeAnnouncement(id) {
  return axios.post(`${ BASE_URL }/api/announcements/remove`, {
    'x-access-token': localStorage.getItem('x-access-token'), id: id,
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

export function updateAnnouncement(announcement_id,title, message) {
    return axios.post(`${ BASE_URL }/api/announcements/private/update`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        title           : title,
        message         : message,
        announcement_id : announcement_id,
    })
        .then(response => response.data)
        .catch(() => Promise.reject('Authentication Failed!'));
}
export function postuserData(data) {
    return axios
        .post(`${BASE_URL}/api/user/post/data`, {'x-access-token': localStorage.getItem('x-access-token'), data: data})
        .then(response => response.message)
        .catch(() => Promise.reject('Authentication Failed!'))
}

export function deleteUserData() {
    return axios
        .post(`${BASE_URL}/api/user/delete/data`, {
            'x-access-token': localStorage.getItem('x-access-token'),
        })
        .then(response => {console.log(response); return response.data})
        .catch(() => Promise.reject('Authentication Failed!'));

}


//mine
export function userDetails(name) {
    return axios
        .post(`${BASE_URL}/api/user/userDetails`, {'x-access-token': localStorage.getItem('x-access-token'), name: name})
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
  return axios.post(`${ BASE_URL }/api/userLevel`, {
    'x-access-token': localStorage.getItem('x-access-token'),
  }).then(response => response.data.userLevel);
}

export function sendEmail(data) {
  return axios.post(`${ BASE_URL }/api/email`, data)
      .then(response => response.data);
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
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Error'));
}

export function createNewMessage(data) {
    return axios.post(`${ BASE_URL }/api/messages/new`,
        {
            'x-access-token': localStorage.getItem('x-access-token'), data,
        })
        .then(response => response.data)
        .catch(() => Promise.reject('Error'));
}

export function getCoaches() {
    return axios.get(`${ BASE_URL }/api/coaches/get`)
        .then(response => response.data);
}
