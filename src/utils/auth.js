import Cookies from 'js-cookie'

const TokenKey = 'imageG_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(id) {
    return Cookies.set("UserId", id)
}

export function getUserId() {
    return Cookies.get("UserId")
}

