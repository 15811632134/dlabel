import request from '@/utils/request-python'
import qs from 'qs'
// 获取行业
export function industry_type(query) {
  return request({
    url: 'api/v1/user/industry_type/',
    method: 'get',
    params: query
  })
}
// 获取品牌
export function printer_brand(query) {
  return request({
    url: 'api/v1/print/printer_brand/',
    method: 'get',
    params: query
  })
}
// 获取设备
export function printer_brandById(query) {
  return request({
    url: `api/v1/print/printer_brand/${query.id}/`,
    method: 'get'
  })
}
// 获取用户分析
export function print_info(query) {
  return request({
    url: `api/v1/user/print_info/`,
    method: 'get',
    params: query
  })
}
// 获取用户信息
export function print_infoById(query) {
  return request({
    url: `api/v1/user/print_info/${query.id}/`,
    method: 'get',
    params: query
  })
}
// 获取用户设备信息
export function user_sign(query) {
  return request({
    url: `api/v1/print/user_print/`,
    method: 'get',
    params: query
  })
}
// 获取用户打印信息
export function paper_rfid(query) {
  return request({
    url: `api/v1/print/user_print/${query.id}/paper_rfid/`,
    method: 'get',
    params: query
  })
}
// 获取设备信息
export function user_printer(query) {
  return request({
    url: `api/v1/clouddoc/user_printer/?user_id=${query.id}`,
    method: 'get',
    params: query
  })
}
// 获取非RFID
export function paper_unrfid(query) {
  return request({
    url: `api/v1/print/user_print/${query.id}/paper_unrfid/`,
    method: 'get',
    params: query
  })
}
