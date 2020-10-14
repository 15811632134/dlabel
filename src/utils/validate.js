/**
 * Created by jiachenpan on 16/11/18.
 */
const regphone = /^1(3|4|5|6|7|8|9)\d{9}$/ // 验证手机号码
const regNumberLetter = /^\S*([a-zA-Z]+\S*[0-9]+|[0-9]+\S*[a-zA-Z]+)\S*$/ // 8-20位字母加数字
const regName = /[^\s\\/:\*\?\"<>\|](\x20|[^\s\\/:\*\?\"<>\|])*[^\s\\/:\*\?\"<>\|\.]{1,50}$/
const regUrl = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
const regUrlVideo = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])/
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
// 验证手机号码
export const validateTelphone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手机号码不能为空'))
  } else if (!regphone.test(value)) {
    callback(new Error('请输入正确的11数的手机号码'))
  } else {
    callback()
  }
}
// 验证账户8到20位字母加数字
export const validateAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error('账户名不能为空'))
  } else if (!regNumberLetter.test(value)) {
    callback(new Error('请输入正确的账户名'))
  } else {
    callback()
  }
}
// 验证输入名称规则
export const validateName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入名称'))
  } else if (!regName.test(value)) {
    callback(new Error('请输入正确名称（长度2~20个字符 ）'))
  } else {
    callback()
  }
}
export const validateNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error('该值不能为空'))
  } else if (value>5||value<2) {
    callback(new Error('数值2-5之间'))
  } else {
    callback()
  }
}

export const validateCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入统一社会信用代码'))
  } else if (value.length<18) {
    callback(new Error('请输入18位统一社会信用代码'))
  } else {
    callback()
  }
}
// 判断url合法性
export const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入url链接'))
  } else if (!regUrl.test(value)) {
    callback(new Error('请输入正确url链接'))
  } else {
    callback()
  }
}
export const validateUrlVideo = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入url链接'))
  } else if (!regUrlVideo.test(value)) {
    callback(new Error('请输入正确url链接'))
  } else {
    callback()
  }
}

