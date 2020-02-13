import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export function logIn(data) {
    return axios
        .post(`${ BASE_URL }/api/auth`, {
            name    : data.username,
            password: data.password
        })
        .then(response => {
            localStorage.setItem('x-access-token', response.data.token);
            localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
            return response.data;
        })
        .catch(err => Promise.reject('Authentication Failed!'));
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

export function getUserLevel() {
    return axios
        .post(`${ BASE_URL }/api/userLevel`, { 'x-access-token': localStorage.getItem('x-access-token') })
        .then(response => response.data.userLevel)
}
