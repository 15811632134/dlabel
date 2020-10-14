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
// 打印标签分析
export function local_cloud(query) {
  return request({
    url: `api/v1/print/user_print/${query.id}/local_cloud/`,
    method: 'get',
    params: query
  })
}
// 标签分析-按行业
export function cloudTags(query) {
  return request({
    url: `api/v1/clouddoc/cloud_tags`,
    method: 'get',
    params: query
  })
}
// 标签分析-按标签尺寸
export function tagSizeLocalCloud(query) {
  return request({
    url: `api/v1/clouddoc/cloud_tags/tag_size`,
    method: 'get',
    params: query
  })
}
// 标签分析-按标签内容
export function tagContent(query) {
  return request({
    url: `api/v1/clouddoc/cloud_tags/tag_content`,
    method: 'get',
    params: query
  })
}
// 标签分析-标签内容分析
export function cloudKeywords(query) {
  return request({
    url: `api/v1/clouddoc/cloud_keywords`,
    method: 'get',
    params: query
  })
}
// 云模版分析-搜索统计
export function templateKeywords(query) {
  return request({
    url: `api/v1/stencil/template_keywords`,
    method: 'get',
    params: query
  })
}
// 行业分析-各行业用户数占比
export function industryAnalyze(query) {
  return request({
    url: `api/v1/clouddoc/industry_analyze`,
    method: 'get',
    params: query
  })
}
// 行业分析-行业分类动态配置（查询行业分类列表）
export function industryConfig(query) {
  return request({
    url: 'api/v1/clouddoc/industry_config',
    method: 'get',
    params: query
  })
}
// 行业分析-行业分类动态配置（修改行业分类）
export function setIndustryConfig(query) {
  return request({
    url: 'api/v1/clouddoc/industry_config/1/',
    method: 'put',
    data: qs.stringify(query)
  })
}
// 行业分析-各行业打印量占比
export function industryPrint(query) {
  return request({
    url: 'api/v1/clouddoc/industry_analyze/industry_print',
    method: 'get',
    params: query
  })
}
// 行业分析-各省市行业用户数占比
export function industryCityUser(query) {
  return request({
    url: 'api/v1/clouddoc/industry_analyze/industry_city_user',
    method: 'get',
    params: query
  })
}
// 行业分析-各行业耗材尺寸使用占比
export function industryPrintSize(query) {
  return request({
    url: 'api/v1/clouddoc/industry_analyze/industry_print_size',
    method: 'get',
    params: query
  })
}
// 行业分析-各行业打印机型号使用占比
export function industryPrintType(query) {
  return request({
    url: 'api/v1/clouddoc/industry_analyze/industry_printer_type',
    method: 'get',
    params: query
  })
}
