import request from '@/utils/request'
import qs from 'qs'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/v1/login/',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/v1/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function login(data) {
  return request({
    url: '/api/login/login.json',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

