import Cookies from 'js-cookie'

const TokenKey = 'access-token'
const usernameKey = 'usernameKey'
const rolekey='rolekey';

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token, expireIn) {
    return Cookies.set(TokenKey, token, {
        expires: expireIn
    })
}

export function setRole(role) {
    return Cookies.set(rolekey, role)
}

export function getRole() {
    return Cookies.get(rolekey);
}



export function setUsername(username) {
    return Cookies.set(usernameKey, username)
}

export function getUsername() {
    return Cookies.get(usernameKey)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function removeRole() {
    return Cookies.remove(rolekey)
}

export function removeUsername() {
    return Cookies.remove(usernameKey);
}

