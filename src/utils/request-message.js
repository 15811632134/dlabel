import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: 'http://120.77.45.112:9705' // url = base url + request url
  // baseURL: 'https://dlabeladminsapi.ctaiot.com' // url = base url + request url
  // baseURL: 'http://120.77.45.112:9107', // url = base url + request url
  // baseURL: 'http://192.168.1.33:9107', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // console.log(config)
      // if (config.url.indexOf('upload_file.json') !== -1) {
      //   config.headers.fileType = config.url.split('fileType=')[1]
      // }
      config.headers.common.accessToken = getToken()
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response)
    const res = response.data
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 100) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }

      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    var message = ''
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '授权超时,请重新登录!'
          setTimeout(() => {
            removeToken()
            window.location.reload()
          }, 2000)

        case 503:
          message = '授权超时,请重新登录!'
          setTimeout(() => {
            removeToken()
            window.location.reload()
          }, 2000)
      }
    }
    console.log(error)
    console.log('err' + error) // for debug
    if (!message) {
      message = error.message
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
