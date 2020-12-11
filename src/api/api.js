import request from '@/utils/request'
import qs from 'qs'
// 添加/修改角色
export function saveDlabelSysRole(query) {
  return request({
    url: 'api/system/add_role.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 角色列表
export function getDlabelSysRolePage(query) {
  return request({
    url: 'api/system/role_list.json',
    method: 'get',
    params: query
  })
}
// 角色列表
export function saveDlabelSysRoleUpdate(query) {
  return request({
    url: 'api/system/role_edit_save.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 删除角色
export function updateSysRoleStatus(query) {
  return request({
    url: 'api/sysRole/updateSysRoleStatus.json',
    method: 'get',
    params: query
  })
}
// 账号列表
export function getSysUserPage(query) {
  return request({
    url: 'api/system/staff_list.json',
    method: 'get',
    params: query
  })
}
// 获取随机密码
export function getRandomPwd(query) {
  return request({
    url: 'api/dlabel_sysuser/get_random_pwd.json',
    method: 'get',
    params: query
  })
}
// 修改密码
export function updatePwd(query) {
  return request({
    url: 'api/dlabel_sysuser/update_pwd.json',
    method: 'get',
    params: query
  })
}
// 重置密码
export function resetPwd(query) {
  return request({
    url: 'api/dlabel_sysuser/reset_pwd.json',
    method: 'get',
    params: query
  })
}
// 启用的角色列表
export function getDlabelSysRoleList(query) {
  return request({
    url: 'api/system/get_valid_role_list.json',
    method: 'get',
    params: query
  })
}
export function templatebackgroundTotal(params) {
  return request({
    url: 'api/templatebackground/total.json',
    method: 'get',
    params
  })
}
export function templatetypeAllList(query) {
  return request({
    url: 'api/templatetype/all/list.json',
    method: 'get',
    params: query
  })
}

// 添加/修改账号
export function saveSysUser(query) {
  return request({
    url: 'api/system/add_staff.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 发送验证码
export function getCode(query) {
  return request({
    url: 'api/apply/send_mobile_sms_code_reg.json',
    method: 'get',
    params: query
  })
}

export function myclouddocList(query) {
  return request({
    url: 'api/myclouddoc/doc_list.json',
    method: 'get',
    params: query
  })
}

// 获取打印机列表信息
export function getPrinterList(query) {
  return request({
    url: 'api/printer/list.json',
    method: 'get',
    params: query
  })
}

// 新增打印机列表信息
export function PrinterInsert(query) {
  return request({
    url: 'api/printer/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 修改打印机列表信息
export function PrinterUpdate(query) {
  return request({
    url: 'api/printer/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 删除打印机列表信息
export function PrinterDelete(query) {
  return request({
    url: `api/printer/delete/${query.id}`,
    method: 'delete'
  })
}
// 删除打印机列表信息
export function PrinterSelect(query) {
  return request({
    url: 'api/printer/select.json',
    method: 'get',
    params: query
  })
}
// 公共的图片上传
export function upload_firmware_image(query, config) {
  return request({
    url: 'api/printer_brand_firmware/upload_firmware_image.json',
    method: 'post',
    data: query,
    // headers: {
    //   fileType: number
    // },
    onUploadProgress: config
  })
}
// 批量上传DDL
export function upload_ddl(query, config) {
  return request({
    url: 'api/api/upload/upload_ddl.json',
    method: 'post',
    data: query,
    headers: {
      fileType: 2
    },
    onUploadProgress: config
  })
}

// 品牌LOGO
export function upload_brand_image(query, config) {
  return request({
    url: `api/printer_brand/upload_brand_image.json`,
    method: 'post',
    data: query,
    // headers: {
    //   fileType: number
    // },
    onUploadProgress: config
  })
}
// 公共的单文件上传
export function upload_firmware_package(query, config) {
  return request({
    url: 'api/printer_brand_firmware/upload_firmware_package.json',
    method: 'post',
    data: query,
    // headers: {
    //   fileType: number
    // },
    onUploadProgress: config
  })
}

// 公共的单文件上传
export function uploadPic(query, number, config) {
  return request({
    url: 'api/api/upload/upload_pic.json',
    method: 'post',
    data: query,
    headers: {
      fileType: number
    },
    onUploadProgress: config
  })
}
// 公共的多文件上传
export function uploadPics(query) {
  return request({
    url: 'api/api/upload/upload_pics.json',
    method: 'post',
    data: query,
    headers: {
      fileType: 5
    }
  })
}
// 公共的多文件上传背景
export function uploadPicsBack(query) {
  return request({
    url: 'api/api/upload/upload_pics.json',
    method: 'post',
    data: query,
    headers: {
      fileType: 3
    }
  })
}
// 获取系统模板列表信息
export function templateList(data) {
  return request({
    url: 'api/templatesystem/list.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 更新系统模板信息
export function templateUpdate(query) {
  return request({
    url: 'api/templatesystem/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}

// 删除系统模板信息
export function templateDelete(query) {
  return request({
    url: 'api/templatesystem/delete/' + query.id,
    method: 'post'
  })
}

// 删除系统模板信息
export function templateSelect(query) {
  return request({
    url: 'api/templatesystem/select/' + query,
    method: 'get'
  })
}

// 新增系统模板信息
export function templateInsert(query) {
  return request({
    url: 'api/templatesystem/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function templatetypeInsert(query) {
  return request({
    url: 'api/templatetype/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function templatebackgroundInsert(query) {
  return request({
    url: 'api/templatebackground/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function templatebackgroundList(query) {
  return request({
    url: 'api/templatebackground/list.json',
    method: 'get',
    params: query
  })
}

// 更新系统模板分类信息
export function templatebackgroundUpdate(query) {
  return request({
    url: `api/templatebackground/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}

export function templatetypeList(query) {
  return request({
    url: 'api/templatetype/list.json',
    method: 'get',
    params: query
  })
}

export function templatetypeListAll(query) {
  return request({
    url: 'api/templatetype/all/list.json',
    method: 'get',
    params: query
  })
}

// 获取扫码新建打印机列表信息
export function scannewprinterList(query) {
  return request({
    url: 'api/scannewprinter/list.json',
    method: 'get',
    params: query
  })
}

// 修改打印机列表信息
export function scannewprinterUpdate(query) {
  return request({
    url: 'api/scannewprinter/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}

// 删除打印机列表信息
export function scannewprinterDelete(query) {
  return request({
    url: `api/scannewprinter/delete/${query.id}`,
    method: 'delete'
  })
}

// 新建打印机列表信息
export function scannewprinterInsert(query) {
  return request({
    url: 'api/scannewprinter/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 获取字体列表信息
export function fontList(query) {
  return request({
    url: 'api/fonts/list.json',
    method: 'get',
    params: query
  })
}

// 获取标志列表信息
export function iconList(query) {
  return request({
    url: 'api/icon/list.json',
    method: 'get',
    params: query
  })
}

export function version_list(query) {
  return request({
    url: 'api/version/version_list.json',
    method: 'get',
    params: query
  })
}

// 修改标志列表信息
export function iconUpdate(query) {
  return request({
    url: 'api/icon/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}

// 批量新建标志列表信息
export function iconInserts(query) {
  return request({
    url: 'api/icon/inserts.json',
    method: 'post',
    data: query
  })
}

// 删除标志列表信息
export function iconDelete(query) {
  return request({
    url: 'api/icon/delete/' + query.id,
    method: 'post'
  })
}

export function iconDeletes(query) {
  return request({
    url: 'api/icon/deletes.json',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(query)
  })
}

// 获取标志分类列表信息
export function icontypeList(query) {
  return request({
    url: 'api/icontype/list.json',
    method: 'get',
    params: query
  })
}

// 修改标志分类信息
export function icontypeUpdate(query) {
  return request({
    url: `api/icontype/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}

// 新增标志分类信息
export function icontypeInsert(query) {
  return request({
    url: 'api/icontype/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 新增标志分类信息
export function icontypeInserts(query) {
  return request({
    url: 'api/icontype/inserts.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 删除标志分类信息
export function icontypeDelete(query) {
  return request({
    url: `api/icontype/delete/${query.id}`,
    method: 'post'
  })
}
// 新建边框管理列表信息
export function iconInsert(query) {
  return request({
    url: 'api/icon/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 获取边框管理列表信息
export function frameList(query) {
  return request({
    url: 'api/frame/list.json',
    method: 'get',
    params: query
  })
}

// 修改边框管理列表信息
export function frameUpdate(query) {
  return request({
    url: 'api/frame/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}

// 删除边框管理列表信息
export function frameDelete(query) {
  return request({
    url: `api/frame/delete/${query.id}`,
    method: 'post'
  })
}

// 新建边框管理列表信息
export function frameInsert(query) {
  return request({
    url: 'api/frame/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 新增用户指标说明
export function registerDetail(query) {
  return request({
    url: 'api/register/detail.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 新增用户指标说明导出
export function registerDetails(query) {
  return request({
    url: 'api/register/details.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 新增用户数据趋势
export function registerList(query) {
  return request({
    url: 'api/register/list.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 数据汇总
export function registerSummary(query) {
  return request({
    url: 'api/register/summary.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 打印次数指标说明
export function printtimesDetail(query) {
  return request({
    url: 'api/printtimes/detail.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印次数指标说明(导出)
export function printtimesDetails(query) {
  return request({
    url: 'api/printtimes/details.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印次数数据趋势
export function printtimesList(query) {
  return request({
    url: 'api/printtimes/list.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function startpageList(query) {
  return request({
    url: 'api/startpage/lists.json',
    method: 'get',
    params: query
  })
}

export function startpageInsert(query) {
  return request({
    url: 'api/startpage/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function startpageDelete(query) {
  return request({
    url: '/api/startpage/delete/' + query,
    method: 'delete'
  })
}

export function startpageUpdate(data) {
  return request({
    url: '/api/startpage/update/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}

export function wheelList(query) {
  return request({
    url: 'api/slideimg/list.json',
    method: 'get',
    params: query
  })
}

export function wheelInsert(query) {
  return request({
    url: 'api/slideimg/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function wheelDelete(query) {
  return request({
    url: '/api/slideimg/delete/' + query,
    method: 'delete'
  })
}

export function wheelUpdate(data) {
  return request({
    url: '/api/slideimg/update/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}

export function protocolList(query) {
  return request({
    url: 'api/protocol/list.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function templatetypeUpdate(query) {
  return request({
    url: `api/templatetype/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}

export function protocolInsert(query) {
  return request({
    url: 'api/protocol/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function company_staff_list(query) {
  return request({
    url: 'api/system/company_staff_list.json',
    method: 'get',
    params: query
  })
}

export function protocolDelete(query) {
  return request({
    url: `api/protocol/delete/${query.id}`,
    method: 'post',
    data: qs.stringify(query)
  })
}

export function protocolUpdate(data) {
  return request({
    url: '/api/protocol/update/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}

export function courseList(query) {
  return request({
    url: 'api/course/list.json',
    method: 'get',
    params: query
  })
}

export function courseInsert(query) {
  return request({
    url: 'api/course/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function courseDelete(query) {
  return request({
    url: '/api/course/delete/' + query,
    method: 'post'
  })
}

export function courseUpdate(data) {
  return request({
    url: '/api/course/update/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}

export function indexList(query) {
  return request({
    url: 'api/index/total.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function indexLineList(query) {
  return request({
    url: 'api/index/list.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

export function industryLineList(query) {
  return request({
    url: 'api/index/industry.json',
    method: 'get',
    params: query
  })
}
export function totallLineList(query) {
  return request({
    url: 'api/index/totallist.json',
    method: 'get',
    params: query
  })
}

// 获取字体列表信息
export function fontsList(query) {
  return request({
    url: 'api/fonts/list.json',
    method: 'get',
    params: query
  })
}
// 修改字体列表信息
export function fontsUpdate(query) {
  return request({
    url: `api/fonts/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 删除字体列表信息
export function fontsDelete(query) {
  return request({
    url: `api/fonts/delete/${query.id}`,
    method: 'delete'
  })
}
// 新建字体列表信息
export function fontsInsert(query) {
  return request({
    url: 'api/fonts/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function getDlabelSysAuthorityListByAccount(data) {
  return request({
    url: '/api/system/get_role_authority.json',
    method: 'get',
    params: data
  })
}
export function get_role_info(data) {
  return request({
    url: '/api/system/get_role_info.json',
    method: 'get',
    params: data
  })
}
export function get_role_authority_by_role_id(data) {
  return request({
    url: '/api/system/get_role_authority_by_role_id.json',
    method: 'get',
    params: data
  })
}
export function role_authority_deploy_save(data) {
  return request({
    url: '/api/system/role_authority_deploy_save.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function create_company(data) {
  return request({
    url: '/api/manage/create_company.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 打印机记录指标说明
export function totalprintDetail(query) {
  return request({
    url: 'api/totalprint/detail.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印机记录指标说明导出
export function totalprintDetails(query) {
  return request({
    url: 'api/totalprint/details.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印尺寸统计-打印人数
export function totalprintPrintsize(query) {
  return request({
    url: 'api/totalprint/printsize.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印机统计
export function totalprintPrintuse(query) {
  return request({
    url: 'api/totalprint/printuse.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印机记录指标说明
export function activeTotal(params) {
  return request({
    url: 'api/edit/total.json',
    method: 'get',
    params
  })
}
// 打印尺寸统计-打印人数
export function activeList(query) {
  return request({
    url: 'api/edit/lists.json',
    method: 'post',
    data: qs.stringify(query)
  })
}


// 数据汇总
export function editSummary(query) {
  return request({
    url: 'api/edit/summary.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 活跃统计
export function activeDetail(query) {
  return request({
    url: 'api/edit/detail.json',
    method: 'post',
    data: qs.stringify(query)
  })
}


// 活跃统计（导出）
export function activeDetails(query) {
  return request({
    url: 'api/edit/details.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function regionlocationList(params) {
  return request({
    url: 'api/regionlocation/list.json',
    method: 'post',
    data: qs.stringify(params)
  })
}
export function get_system_authority(params) {
  return request({
    url: 'api/system/get_system_authority.json',
    method: 'get',
    params: params
  })
}
// 地域分布指标
export function regionlocationLocation(params) {
  return request({
    url: 'api/regionlocation/location.json',
    method: 'get',
    params
  })
}
// 公司列表
export function getPressCompanyByPage(data) {
  return request({
    url: '/api/manage/company_list.json',
    method: 'get',
    params: data
  })
}


export function get_company_info_by_company_code(data) {
  return request({
    url: '/api/manage/get_company_info_by_company_code.json',
    method: 'get',
    params: data
  })
}
// 公司列表
export function getCompanyByPage(data) {
  return request({
    url: '/api/apply_manage/company_apply_list.json',
    method: 'get',
    params: data
  })
}

export function getCompanyInfo(data) {
  return request({
    url: '/api/manage/get_company_info_by_company_code.json',
    method: 'get',
    params: data
  })
}
export function printer_brand_list(data) {
  return request({
    url: '/api/printer_brand/list.json',
    method: 'get',
    params: data
  })
}
// 有固件升级的打印机品牌列表
export function printer_brand_firmware_brand_list(data) {
  return request({
    url: '/api/printer_brand_firmware/brand_list.json',
    method: 'get',
    params: data
  })
}
export function printer_brand_add(data) {
  return request({
    url: '/api/printer_brand/add.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function printer_brand_delete(data) {
  return request({
    url: '/api/printer_brand/delete.json',
    method: 'get',
    params: data
  })
}
export function printer_brand_update(data) {
  return request({
    url: '/api/printer_brand/update.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function printer_brand_type_list(data) {
  return request({
    url: '/api/printer_brand_type/list.json',
    method: 'get',
    params: data
  })
}
export function create_order(data) {
  return request({
    url: '/api/order/create_order.json',
    method: 'get',
    params: data
  })
}
// 校验密码
export function check_password(data) {
  return request({
    url: '/api/login/check_password.json',
    method: 'get',
    params: data
  })
}
// 退款
export function refund(data) {
  return request({
    url: '/api/refund/refund.json',
    method: 'get',
    params: data
  })
}



export function printer_brand_type_add(data) {
  return request({
    url: '/api/printer_brand_type/add.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function printer_brand_type_update(data) {
  return request({
    url: '/api/printer_brand_type/update.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function printer_brand_type_delete(data) {
  return request({
    url: '/api/printer_brand_type/delete.json',
    method: 'get',
    params: data
  })
}
export function add_or_update_firmware(data) {
  return request({
    url: '/api/printer_brand_firmware/add_or_update_firmware.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function printer_brand_firmware_delete(data) {
  return request({
    url: '/api/printer_brand_firmware/delete.json',
    method: 'get',
    params: data
  })
}
export function printer_brand_firmware_list(data) {
  return request({
    url: '/api/printer_brand_firmware/list.json',
    method: 'get',
    params: data
  })
}
export function myclouddoc_list(data) {
  return request({
    url: '/api/myclouddoc/list.json',
    method: 'get',
    params: data
  })
}
export function clouddb_list(data) {
  return request({
    url: '/api/clouddb/list.json',
    method: 'get',
    params: data
  })
}
export function cloudlogo_list(data) {
  return request({
    url: '/api/cloudlogo/list.json',
    method: 'get',
    params: data
  })
}
export function cloudbgimage_list(data) {
  return request({
    url: '/api/cloudbgimage/list.json',
    method: 'get',
    params: data
  })
}

export function version_data_list(data) {
  return request({
    url: '/api/version/list.json',
    method: 'get',
    params: data
  })
}
export function dlabeldatadocument_list(data) {
  return request({
    url: '/api/dlabeldatadocument/list.json',
    method: 'get',
    params: data
  })
}

export function update_company_info_by_company_code_revise(data) {
  return request({
    url: '/api/manage/update_company_info_by_company_code_revise.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function saveCompanyBase(data) {
  return request({
    url: '/api/manage/update_company_info_by_company_code.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function create_company_revise(data) {
  return request({
    url: '/api/manage/create_company_revise.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 拒绝通过
export function company_apply_refuse_save(data) {
  return request({
    url: '/api/apply_manage/company_apply_refuse_save.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 审批通过
export function company_apply_success_save(data) {
  return request({
    url: '/api/apply_manage/company_apply_success_save.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function user_list(data) {
  return request({
    url: '/api/user/user_list.json',
    method: 'get',
    params: data
  })
}

export function authority_list(data) {
  return request({
    url: '/api/system/get_default_company_authority.json',
    method: 'get',
    params: data
  })
}
export function user_info(data) {
  return request({
    url: '/api/user/user_info.json',
    method: 'get',
    params: data
  })
}
export function feedback_list(data) {
  return request({
    url: '/api/feedback/feedback_list.json',
    method: 'get',
    params: data
  })
}
export function export_feedback_list(data) {
  return request({
    url: '/api/feedback/export_feedback_list.json',
    method: 'get',
    params: data
  })
}
export function feedback_detail(data) {
  return request({
    url: '/api/feedback/feedback_detail.json',
    method: 'get',
    params: data
  })
}
export function feedback_insert(data) {
  return request({
    url: '/api/feedback/insert.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function feedbacklog_insert(data) {
  return request({
    url: '/api/feedbacklog/insert.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function sysoperatelog_list(data) {
  return request({
    url: '/api/sysoperatelog/list.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function feedbacklog_export_list(data) {
  return request({
    url: '/api/feedback/export_list.json',
    method: 'get',
    params: data
  })
}
export function feedbackNewList(data) {
  return request({
    url: '/api/feedback/list.json',
    method: 'get',
    params: data
  })
}
export function feedbacklog_list(data) {
  return request({
    url: '/api/feedbacklog/list.json',
    method: 'get',
    params: data
  })
}

export function feedback_reply(data) {
  return request({
    url: '/api/feedback/reply.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function feedback_reply_list(data) {
  return request({
    url: '/api/feedback/reply_list.json',
    method: 'get',
    params: data
  })
}

export function handler_list(data) {
  return request({
    url: '/api/feedback/handler_list.json',
    method: 'get',
    params: data
  })
}
export function company_default_role_save(data) {
  return request({
    url: '/api/system/company_default_role_save.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function company_role_list(data) {
  return request({
    url: '/api/system/company_role_list.json',
    method: 'get',
    params: data
  })
}
export function all_company_roles_total(data) {
  return request({
    url: '/api/system/all_company_roles_total.json',
    method: 'get',
    params: data
  })
}
export function versionSave(data) {
  return request({
    url: '/api/version/save.json',
    method: 'get',

    params: data
  })
}
//获取公司
export function open_company_list(data) {
  return request({
    url: '/api/user/company_lists.json',
    method: 'get',
    params: data
  })
}
//获取公司(获取数量)
export function open_company_lists(data) {
  return request({
    url: '/api/user/company_list.json',
    method: 'get',
    params: data
  })
}
export function get_company_role_autorty_by_role_id(data) {
  return request({
    url: '/api/system/get_company_role_autorty_by_role_id.json',
    method: 'get',
    params: data
  })
}
export function generate_company_password(data) {
  return request({
    url: '/api/manage/generate_company_password.json',
    method: 'get',
    params: data
  })
}
export function get_random_pwd(data) {
  return request({
    url: '/api/system/get_random_pwd.json',
    method: 'get',
    params: data
  })
}
export function reset_pwd(data) {
  return request({
    url: '/api/system/reset_pwd.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function enable_company_save(data) {
  return request({
    url: '/api/manage/enable_company_save.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function versionDelete(data) {
  return request({
    url: '/api/version/delete.json',
    method: 'get',
    params: data
  })
}
export function systemReset_company_pwd(data) {
  return request({
    url: '/api/system/reset_company_pwd.json',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除系统模板分类信息
export function templatebackgroundDelete(query) {
  return request({
    url: `api/templatebackground/delete/${query.id}`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 查询轮播图列表信息(区分公司)
export function slideimgList(query) {
  return request({
    url: 'api/slideimg/lists.json',
    method: 'get',
    params: query
  })
}
// 修改轮播图信息
export function slideimgUpdate(query) {
  return request({
    url: `api/slideimg/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 删除轮播图信息
export function slideimgDelete(query) {
  return request({
    url: `api/slideimg/delete/${query.id}`,
    method: 'delete'
  })
}
// 新增轮播图信息
export function slideimgInsert(query) {
  return request({
    url: 'api/slideimg/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}


// 查询轮播图列表信息(区分公司)-个人中心
export function slideimg_personList(query) {
  return request({
    url: 'api/slideimg_person/lists.json',
    method: 'get',
    params: query
  })
}
// 修改轮播图信息-个人中心
export function slideimg_personUpdate(query) {
  return request({
    url: `api/slideimg_person/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 删除轮播图信息-个人中心
export function slideimg_personDelete(query) {
  return request({
    url: `api/slideimg_person/delete/${query.id}`,
    method: 'delete'
  })
}
// 新增轮播图信息-个人中心
export function slideimg_personInsert(query) {
  return request({
    url: 'api/slideimg_person/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function get_company_role_detail(query) {
  return request({
    url: 'api/system/get_company_role_detail.json',
    method: 'get',
    params: query
  })
}
export function company_default_role_save_by_company_role_id(query) {
  return request({
    url: 'api/system/company_default_role_save_by_company_role_id.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function role_delete(query) {
  return request({
    url: 'api/system/role_delete.json',
    method: 'get',
    params: query
  })
}
export function templatetypeDelete(query) {
  return request({
    url: `api/templatetype/delete/${query.id}`,
    method: 'post',
    data: qs.stringify(query)
  })
}
export function templatesystemSelect(query) {
  return request({
    url: `api/templatesystem/select/${query.id}`,
    method: 'get'
  })
}
export function staff_delete(query) {
  return request({
    url: `api/system/staff_delete.json`,
    method: 'get',
    params: query
  })
}
// 用户留存接口
export function rentention_list(query) {
  return request({
    url: `api/rentention/list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
export function rentention_total(query) {
  return request({
    url: `api/rentention/totals.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
export function channel_list(query) {
  return request({
    url: `api/channel/list.json`,
    method: 'get',
    params: query
  })
}
export function version_total(query) {
  return request({
    url: `api/version/total.json`,
    method: 'get',
    params: query
  })
}
export function channel_total(query) {
  return request({
    url: `api/channel/total.json`,
    method: 'get',
    params: query
  })
}
export function loadtimes_total(query) {
  return request({
    url: `api/loadtimes/total.json`,
    method: 'get',
    params: query
  })
}

// 只启动一次
export function loadtimes_lists(query) {
  return request({
    url: `api/loadtimes/lists.json`,
    method: 'get',
    params: query
  })
}
// 启动版本
export function loadtimes_version_list(query) {
  return request({
    url: `api/loadtimes/version_list.json`,
    method: 'get',
    params: query
  })
}
// 启动次数
export function loadtimes_list(query) {
  return request({
    url: `api/loadtimes/list.json`,
    method: 'get',
    params: query
  })
}
// 启动明细
export function loadtimes_detail(query) {
  return request({
    url: `api/loadtimes/detail.json`,
    method: 'get',
    params: query
  })
}
// 启动明细(导出)
export function loadtimes_details(query) {
  return request({
    url: `api/loadtimes/details.json`,
    method: 'get',
    params: query
  })
}
// 新增用户概览
export function register_total(query) {
  return request({
    url: `api/register/total.json`,
    method: 'post',
    data: query
  })
}
// 新增用户概览
export function ad_update(query) {
  return request({
    url: `api/ad/update/` + query.id,
    method: 'post',
    data: qs.stringify(query)
  })
}

// 查询广告列表信息
export function ad_list(query) {
  return request({
    url: `api/ad/list.json`,
    method: 'get',
    params: query
  })
}
// 新增主分类
export function extend_insert(query) {
  return request({
    url: `api/extend/insert.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 获取主分类
export function extend_list(query) {
  return request({
    url: `api/extend/list.json`,
    method: 'get',
    params: query
  })
}
// 获取主分类
export function extend_lists(query) {
  return request({
    url: `api/extend/lists.json`,
    method: 'get',
    params: query
  })
}
// 新增扩容子分类
export function extend_inserts(query) {
  return request({
    url: `api/extend/inserts.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 修改扩容分类
export function extend_update(query) {
  return request({
    url: `api/extend/update.json`,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 扩容删除
export function extend_delete(query) {
  return request({
    url: `api/extend/delete/${query.id}`,
    method: 'delete'
  })
}
// 修改扩容子分类
export function extend_updates(query) {
  return request({
    url: `api/extend/updates.json`,
    method: 'put',
    data: qs.stringify(query)
  })
}
// 会员概览
export function vip_total(query) {
  return request({
    url: `api/vip/total.json`,
    method: 'get',
    params: query
  })
}
// 会员趋势
export function vip_register_list(query) {
  return request({
    url: `api/vip/register_list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 会员趋势
export function dataPoint_getDataByPage(query) {
  return request({
    url: `api/dataPoint/getDataByPage.json`,
    method: 'get',
    params: query
  })
}
// 数据配置列表
export function dataPoint_getTablesByPage(query) {
  return request({
    url: `api/dataPoint/getTablesByPage.json`,
    method: 'get',
    params: query
  })
}
// 销售清单概览
export function getSalePriceStatistics(query) {
  return request({
    url: `api/order/statistics/getSalePriceStatistics.json`,
    method: 'get',
    params: query
  })
}
// 销售清单统计
export function getSalePriceStatisticsByCompanyId(query) {
  return request({
    url: `api/order/statistics/getSalePriceStatisticsByCompanyId.json`,
    method: 'get',
    params: query
  })
}
// 数据漏斗
export function vip_data_list(query) {
  return request({
    url: `api/vip/data_list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 入口分析
export function analysis_list(query) {
  return request({
    url: `api/vip/analysis_list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 扩容订单(全部)
export function all_order_page(query) {
  return request({
    url: `api/order/all_order_page.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(已支付)
export function payed_order_page(query) {
  return request({
    url: `api/order/payed_order_page.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(未支付)
export function unpay_user_page(query) {
  return request({
    url: `api/order/unpay_user_page.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(流失客户)
export function loss_user_page(query) {
  return request({
    url: `api/order/loss_user_page.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(全部)导出
export function export_all_order(query) {
  return request({
    url: `api/order/export_all_order.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(已支付)导出
export function export_payed_order(query) {
  return request({
    url: `api/order/export_payed_order.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(未支付)导出
export function export_unpay_user(query) {
  return request({
    url: `api/order/export_unpay_user.json`,
    method: 'get',
    params: query
  })
}
// 扩容订单(流失)导出
export function export_loss_user(query) {
  return request({
    url: `api/order/export_loss_user.json`,
    method: 'get',
    params: query
  })
}
// 指标（饼图）
export function index_pie(query) {
  return request({
    url: `api/vip/index_pie.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 指标（折线图）
export function index_line(query) {
  return request({
    url: `api/vip/index_line.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 指标（列表）
export function index_list(query) {
  return request({
    url: `api/vip/index_list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 广告卡片统计
export function advise_total(query) {
  return request({
    url: `api/advise/total.json`,
    method: 'get',
    params: query
  })
}
// 指标（饼图）
export function advise_analysis(query) {
  return request({
    url: `api/advise/analysis.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 指标（折线图）
export function advise_index_line(query) {
  return request({
    url: `api/advise/index_line.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 指标（折线图）
export function advise_index_list(query) {
  return request({
    url: `api/advise/index_list.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 回访（未支付）
export function return_visit(query) {
  return request({
    url: `api/order/return_visit.json`,
    method: 'get',
    params: query
  })
}
// 回访（流失）
export function return_visit_loss(query) {
  return request({
    url: `api/order/return_visit_loss.json`,
    method: 'get',
    params: query
  })
}
// 保存配置
export function updateStatus(query) {
  return request({
    url: `api/dataPoint/updateStatus.json`,
    method: 'get',
    params: query
  })
}
// 获取会员套餐列表
export function get_vip_list(query) {
  return request({
    url: `api/vipconfig/get_vip_list.json`,
    method: 'get',
    params: query
  })
}
// 新增套餐配置的时候，获取会员套餐功能菜单权限项(功能类，协作类，身份类)
export function get_vip_func_menu(query) {
  return request({
    url: `api/vipconfig/get_vip_func_menu.json`,
    method: 'get',
    params: query
  })
}
// 新增或修改vip套餐
export function add_or_update_vip_config(query) {
  return request({
    url: `api/vipconfig/add_or_update_vip_config.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 编辑套餐配置的时候，获取会员套餐功能菜单权限项(功能类，协作类，身份类)
export function get_vip_info_by_id(query) {
  return request({
    url: `api/vipconfig/get_vip_info_by_id.json`,
    method: 'get',
    params: query
  })
}
// 删除vip套餐
export function del_vip_info_by_id(query) {
  return request({
    url: `api/vipconfig/del_vip_info_by_id.json`,
    method: 'get',
    params: query
  })
}
// 获取订单列表的所有列
export function get_order_fields(query) {
  return request({
    url: `api/order/get_order_fields.json`,
    method: 'get',
    params: query
  })
}
// 获取订单列表的所有列
export function templatetypeSort(query) {
  return request({
    url: `api/templatetype/update/sort.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 新增系统模板信息(批量)
export function templatesystemInserts(query) {
  return request({
    url: `api/templatesystem/inserts.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 保存用户的自定义显示订单列
export function save_order_fields(query) {
  return request({
    url: `api/order/save_order_fields.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 重置旧密码
export function reset_old_pwd(query) {
  return request({
    url: `api/system/reset_old_pwd.json`,
    method: 'get',
    params: query
  })
}

// 区间增长趋势
export function dlabeldatadocumentInterval(query) {
  return request({
    url: `api/dlabeldatadocument/interval.json`,
    method: 'get',
    params: query
  })
}
// 区间趋势
export function dlabeldatadocumentTrend(query) {
  return request({
    url: `api/dlabeldatadocument/trend.json`,
    method: 'get',
    params: query
  })
}
// 上传走势
export function dlabeldatadocumentUpload_trend(query) {
  return request({
    url: `api/dlabeldatadocument/upload_trend.json`,
    method: 'get',
    params: query
  })
}


// 获取扫码新建打印机列表信息
export function scanList(data) {
  return request({
    url: '/api/scan/list.json',
    method: 'get',
    params: data
  })
}
// 修改扫码新建打印机信息
export function scanUpdate(data) {
  return request({
    url: '/api/scan/update.json',
    method: 'put',
    data: qs.stringify(data)
  })
}
// 数量区间占比
export function dlabeldatadocumentInterval_rate(query) {
  return request({
    url: `api/dlabeldatadocument/interval_rate.json`,
    method: 'get',
    params: query
  })
}
// 上传数量统计
export function dlabeldatadocumentUpload_total(query) {
  return request({
    url: `api/dlabeldatadocument/upload_total.json`,
    method: 'get',
    params: query
  })
}

// 新增系统背景分类
export function templatebackgroundTypeInsert(query) {
  return request({
    url: `api/templatebackgroundType/insert.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}

// 修改系统背景信息
export function templatebackgroundTypeUpdate(query) {
  return request({
    url: `api/templatebackgroundType/update.json`,
    method: 'put',
    params: query
  })
}

// 获取系统背景分类列表信息
export function templatebackgroundTypeList(query) {
  return request({
    url: `api/templatebackgroundType/list.json`,
    method: 'get',
    params: query
  })
}
// 友商系统日志列表
export function companyoperatelogList(query) {
  return request({
    url: `api/companyoperatelog/list.json`,
    method: 'get',
    params: query
  })
}
// 删除系统背景信息
export function templatebackgroundTypeDelete(query) {
  return request({
    url: `api/templatebackgroundType/delete/${query.id}`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 打印机列表排序
export function printer_brandSort(query) {
  return request({
    url: `api/printer_brand/sort.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}

// 新增商品系统模板信息(批量)
export function shoptemplatesystemInserts(query) {
  return request({
    url: `api/shoptemplatesystem/inserts.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}
// 批量上传DDL
export function shopupload_ddl(query, config) {
  return request({
    url: 'api/api/upload/upload_ddl.json',
    method: 'post',
    data: query,
    headers: {
      fileType: 28
    },
    onUploadProgress: config
  })
}
// 商品模板排序
export function shoptemplatetypeSort(query) {
  return request({
    url: `api/shoptemplatetype/update/sort.json`,
    method: 'post',
    data: qs.stringify(query)
  })
}

// 获取商品系统模板列表信息
export function shoptemplateList(data) {
  return request({
    url: 'api/shoptemplatesystem/list.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function shoptemplatetypeAllList(query) {
  return request({
    url: 'api/shoptemplatetype/all/list.json',
    method: 'get',
    params: query
  })
}

export function shoptemplatetypeDelete(query) {
  return request({
    url: `api/shoptemplatetype/delete/${query.id}`,
    method: 'post',
    data: qs.stringify(query)
  })
}

// 删除系统模板信息
export function shoptemplateDelete(query) {
  return request({
    url: 'api/shoptemplatesystem/delete/' + query.id,
    method: 'post'
  })
}

export function shoptemplatetypeInsert(query) {
  return request({
    url: 'api/shoptemplatetype/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
export function shoptemplatetypeUpdate(query) {
  return request({
    url: `api/shoptemplatetype/update/${query.id}`,
    method: 'put',
    data: qs.stringify(query)
  })
}
export function shoptemplatetypeList(query) {
  return request({
    url: 'api/shoptemplatetype/list.json',
    method: 'get',
    params: query
  })
}

export function templatebackgroundTypeSort(query) {
  return request({
    url: 'api/templatebackgroundType/sort.json',
    method: 'post',
    data: qs.stringify(query)
  })
}



// 新增商品系统模板信息
export function shoptemplateInsert(query) {
  return request({
    url: 'api/shoptemplatesystem/insert.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 更新系统模板信息
export function shoptemplateUpdate(query) {
  return request({
    url: 'api/shoptemplatesystem/update/' + query.id,
    method: 'put',
    data: qs.stringify(query)
  })
}

export function shoptemplatebackgroundList(query) {
  return request({
    url: 'api/shoptemplatebackground/list.json',
    method: 'get',
    params: query
  })
}
export function shoptemplatebackgroundTotal(params) {
  return request({
    url: 'api/shoptemplatebackground/total.json',
    method: 'get',
    params
  })
}
export function shoptemplatesystemSelect(query) {
  return request({
    url: `api/shoptemplatesystem/select/${query.id}`,
    method: 'get'
  })
}




// 获取意见反馈列表的所有列
export function getFeedFields(query) {
  return request({
    url: 'api/feedback/getFeedFields.json',
    method: 'get',
    params: query
  })
}

// 保存用户的自定义显示意见反馈列
export function savefeedFields(query) {
  return request({
    url: 'api/feedback/savefeedFields.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 修改打印机列表排序
export function printer_brand_typeupdatesort(query) {
  return request({
    url: 'api/printer_brand_type/update/sort.json',
    method: 'post',
    data: qs.stringify(query)
  })
}
// 新增模板信息(批量)
export function templatebackgroundInserts(query) {
  return request({
    url: 'api/templatebackground/inserts.json',
    method: 'post',
    data: qs.stringify(query)
  })
}

// 获取国际化手机区号
export function getCountryCode(query) {
  return request({
    url: 'api/country/code.json',
    method: 'get',
    params: query
  })
}
// 校验手机号
export function check_phone(query) {
  return request({
    url: 'api/user/check_phone.json',
    method: 'get',
    params: query
  })
}

// 修改顺序
export function icontypeSort(data) {
  return request({
    url: '/api/icontype/update/sort.json',
    method: 'post',
    data: qs.stringify(data)
  })
}
