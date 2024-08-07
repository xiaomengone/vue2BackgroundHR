import request from '@/utils/request'

export function login(req) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      mobile: req.userPhone,
      password: req.userPassword
    }
  })
}

export function apiGetUser() {
  return request({
    url: '/sys/profile',
    method: 'Get'
  })
}
export function apiUpatePassword(req) {
  return request({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data: {
      oldPassword: req.oldPassword,
      newPassword: req.newPassword
    }
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
