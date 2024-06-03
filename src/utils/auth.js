import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setHeadPortrait(headPortrait) {
  return sessionStorage.setItem('headPortrait', headPortrait)
}
export function getHeadPortrait(headPortrait) {
  return sessionStorage.getItem('headPortrait')
}
