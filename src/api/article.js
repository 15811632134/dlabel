import request from '@/utils/request'

export function carouselList(query) {

  return request({
    url: 'api/label/slideimg/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}

export function updateSwitch(query) {
  return request({
    url: '/api/v1/partner/slideshow/ '+query+'/action/',
    method: 'post'
  })
}
//启用关闭广告
export function updateAdvertSwitch(query) {
  return request({
    url: '/api/v1/partner/animation/ '+query+'/action/',
    method: 'post'
  })
}

export function addCarousel(query) {
  return request({
    url: '/api/label/slideimg/insert',
    method: 'post',
    data: query
  })
}
// 轮播图删除接口
export function deleteCarousel(id) {
  return request({
    url: '/api/label/slideimg/delete/ '+id,
    method: 'delete'
  })
}

export function updateCarousel(query,id) {
  return request({
    url: '/api/label/slideimg/update/'+id,
    method: 'put',
    data: query
  })
}

export function videoTutorialsList(query) {

  return request({
    url: 'api/label/videocourse/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}


export function addVideoTutorials(query) {
  return request({
    url: '/api/label/videocourse/insert',
    method: 'post',
    data: query
  })
}
// 轮播图删除接口
export function deleteVideoTutorials(id) {
  return request({
    url: '/api/label/videocourse/delete/ '+id,
    method: 'delete'
  })
}

export function updateVideoTutorials(query,id) {
  return request({
    url: '/api/label/videocourse/update/'+id,
    method: 'put',
    data: query
  })
}



export function imageTutorialsList(query) {

  return request({
    url: 'api/label/picturecourse/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}


export function addImageTutorials(query) {
  return request({
    url: '/api/label/picturecourse/insert',
    method: 'post',
    data: query
  })
}
// 轮播图删除接口
export function deleteImageTutorials(id) {
  return request({
    url: '/api/label/picturecourse/delete/ '+id,
    method: 'delete'
  })
}

export function updateImageTutorials(query,id) {
  return request({
    url: '/api/label/picturecourse/update/'+id,
    method: 'put',
    data: query
  })
}




export function picPlaceList(query) {

  return request({
    url: '/api/v1/partner/picture_place/',
    method: 'get',
    params: query
  })
}

export function eqList(query) {

  return request({
    url: '/api/v1/partner/platform/',
    method: 'get',
    params: query
  })
}
//启动广告查询
export function advertlList(query) {

  return request({
    url: 'api/label/startpage/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}

//启动广告编辑
export function updateAdvert(query,id) {

  return request({
    url: '/api/label/startpage/update/'+id,
    method: 'put',
    data: query
  })
}
//启动广告删除
export function deleteAdvert(id) {
  return request({
    url: '/api/label/startpage/delete/ '+id,
    method: 'delete'
  })
}

//启动广告添加
export function addAdvert(query) {
  return request({
    url: '/api/label/startpage/insert',
    method: 'post',
    data: query
  })
}

//模板查询(英文)
export function templateListEn(query) {

  return request({
    url: '/api/v1/partner/template/?type=2',
    method: 'get',
    params: query
  })
}

//模板查询
export function templateList(query) {

  return request({
    url: '/api/v1/partner/template/?type=1',
    method: 'get',
    params: query
  })
}


//模板添加(英文)
export function addTemplateEn(query) {
  return request({
    url: '/api/v1/partner/template/',
    method: 'post',
    data: query
  })
}

//模板编辑(英文)
export function updateTemplateEn(query,id) {

  return request({
    url: '/api/v1/partner/template/'+id+'/',
    method: 'put',
    data: query
  })
}

//模板删除(英文)
export function deleteTemplateEn(id) {

  return request({
    url: '/api/v1/partner/template/'+id+'/?type=2',
    method: 'delete'
  })
}



//模板添加
export function addTemplate(query) {
  return request({
    url: '/api/v1/partner/template/',
    method: 'post',
    data: query
  })
}

//模板编辑
export function updateTemplate(query,id) {

  return request({
    url: '/api/v1/partner/template/'+id+'/',
    method: 'put',
    data: query
  })
}

//模板删除
export function deleteTemplate(id) {

  return request({
    url: '/api/v1/partner/template/'+id+'/?type=1',
    method: 'delete'
  })
}

//模板分类查询(英文)
export function templateCategoryEn(query) {

  return request({
    url: '/api/v1/partner/templatecategory/?type=2',
    method: 'get',
    params: query
  })
}

//模板分类查询
export function templateCategory(query) {

  return request({
    url: '/api/v1/partner/templatecategory/?type=1',
    method: 'get',
    params: query
  })
}


//背景模板查询
export function backgroundList(query) {

  return request({
    url: '/api/v1/dlabel/template_background/',
    method: 'get',
    params: query
  })
}


//背景模板添加
export function addBackground(query) {
  return request({
    url: '/api/v1/dlabel/template_background/',
    method: 'post',
    data: query
  })
}

//背景模板编辑
export function updateBackground(query,id) {

  return request({
    url: '/api/v1/dlabel/template_background/'+id+'/',
    method: 'put',
    data: query
  })
}

//背景模板删除
export function deleteBackground(id) {

  return request({
    url: '/api/v1/dlabel/template_background/'+id+'/',
    method: 'delete'
  })
}

//安卓版本查询
export function vesionList(query) {
  return request({
    url: '/api/label/productversion/select/page/'+query.page+'/'+query.page_size+'?type='+query.type,
    method: 'get'
  })
}

//安卓版本添加
export function addVesion(query) {
  return request({
    url: '/api/label/productversion/insert',
    method: 'post',
    data: query
  })
}

//安卓版本编辑
export function updateVesion(query,id) {
  return request({
    url: '/api/label/productversion/update/'+id+'/',
    method: 'put',
    data: query
  })
}

//安卓版本删除
export function deleteVesion(id) {
  return request({
    url: '/api/label/productversion/delete/'+id,
    method: 'delete'
  })
}


//IOS版本查询
export function vesionListI(query) {
  return request({
    url: '/api/v1/ios/version/',
    method: 'get',
    params: query
  })
}

//IOS版本添加
export function addVesionI(query) {
  return request({
    url: '/api/v1/ios/version/',
    method: 'post',
    data: query
  })
}

//IOS版本编辑
export function updateVesionI(query,id) {
  return request({
    url: '/api/v1/ios/version/'+id+'/',
    method: 'put',
    data: query
  })
}

//IOS版本删除
export function deleteVesionI(id) {
  return request({
    url: '/api/v1/ios/version/'+id+'/',
    method: 'delete'
  })
}

//PC端版本查询
export function vesionListP(query) {
  return request({
    url: '/api/pc/version/',
    method: 'get',
    params: query
  })
}

//PC端版本添加
export function addVesionP(query) {
  return request({
    url: '/api/pc/version/',
    method: 'post',
    data: query
  })
}

//PC端版本编辑
export function updateVesionP(query,id) {
  return request({
    url: '/api/pc/version/'+id+'/',
    method: 'put',
    data: query
  })
}

//PC端版本删除
export function deleteVesionP(id) {
  return request({
    url: '/api/pc/version/'+id+'/',
    method: 'delete'
  })
}


//打印机列表查询
export function printerList(query) {
  return request({
    url: '/api/label/printer/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}

//打印机列表添加
export function addPrinter(query) {
  return request({
    url: '/api/label/printer/insert',
    method: 'post',
    data: query
  })
}

//打印机列表编辑
export function updatePrinter(query,id) {
  return request({
    url: '/api/label/printer/update/'+id+'/',
    method: 'put',
    data: query
  })
}

//打印机列表删除
export function deletePrinter(id) {

  return request({
    url: '/api/label/printer/delete/'+id+'/',
    method: 'delete'
  })
}

//打印机列表分类查询
// export function printerCategory(query) {

//   return request({
//     url: '/api/print_list/',
//     method: 'get',
//     params: query
//   })
// }


//打印机列表查询
export function scanPrinterList(query) {
  return request({
    url: '/api/label/scannewlabel/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
    params: query
  })
}

//打印机列表添加
export function addScanPrinter(query) {
  return request({
    url: '/api/label/scannewlabel/insert',
    method: 'post',
    data: query
  })
}

//打印机列表编辑
export function updateScanPrinter(query,id) {
  return request({
    url: '/api/label/scannewlabel/update/'+id+'/',
    method: 'put',
    data: query
  })
}

//打印机列表删除
export function deleteScanPrinter(id) {

  return request({
    url: '/api/label/scannewlabel/delete/'+id+'/',
    method: 'delete'
  })
}



//字体查询
export function fontList(query) {
  return request({
    url: '/api/v1/partner/fonts/',
    method: 'get',
    params: query
  })
}

//字体添加
export function addFont(query) {
  return request({
    url: '/api/v1/partner/fonts/',
    method: 'post',
    data: query
  })
}

//字体编辑
export function updateFont(query,id) {
  return request({
    url: '/api/v1/partner/fonts/'+id+'/',
    method: 'put',
    data: query
  })
}

//字体删除
export function deleteFont(id) {

  return request({
    url: '/api/v1/partner/fonts/'+id+'/',
    method: 'delete'
  })
}

//字体分类查询
export function fontCategory(query) {

  return request({
    url: '/api/v1/partner/fontcategory/',
    method: 'get',
    params: query
  })
}



//图标查询
export function iconList(query) {
  return request({
    url: '/api/v1/partner/picture/',
    method: 'get',
    params: query
  })
}

//图标添加
export function addIcon(query) {
  return request({
    url: '/api/v1/partner/picture/',
    method: 'post',
    data: query
  })
}

//图标编辑
export function updateIcon(query,id) {
  return request({
    url: '/api/v1/partner/picture/'+id+'/',
    method: 'put',
    data: query
  })
}

//图标删除
export function deleteIcon(id) {
  return request({
    url: '/api/v1/partner/picture/'+id+'/',
    method: 'delete'
  })
}

//图标分类查询
export function iconCategory(query) {

  return request({
    url: '/api/v1/partner/trade/',
    method: 'get',
    params: query
  })
}

//商城数据查询
export function shopLinkList(query) {

  return request({
    url: '/api/label/shoplink/select/page/'+query.page+'/'+query.page_size,
    method: 'get'
  })
}
//商城数据编辑
export function updateShopLink(query,id) {
  return request({
    url:'/api/label/shoplink/update/'+id,
    method: 'put',
    data: query
  })
}
//商城数据添加
export function addShopLink(query) {
  return request({
    url: '/api/label/shoplink/insert',
    method: 'post',
    data: query
  })
}
//商城数据删除
export function deleteShopLink(id) {
  return request({
    url: '/api/label/shoplink/delete/ '+ id,
    method: 'delete'
  })
}

//关于我们查询
export function aboutList(query) {

  return request({
    url: 'api/label/company/select/page/'+query.page+'/'+query.page_size,
    method: 'get',
  })
}
//关于我们编辑
export function updateAbout(query,id) {
  return request({
    url: '/api/label/company/update/'+id,
    method: 'put',
    data: query
  })
}
//关于我们添加
export function addAbout(query) {
  return request({
    url: 'api/label/company/insert',
    method: 'post',
    data: query
  })
}
//关于我们删除
export function deleteAbout(id) {
  return request({
    url: '/api/label/company/delete/ '+id,
    method: 'delete'
  })
}

//公司信息查询
export function companyList(query) {
  return request({
    url: '/api/v1/partner/Company/',
    method: 'get'
  })
}

//个人资料查询
export function userInfo(query) {
  return request({
    url: '/api/v1/partner/person/1/',
    method: 'get'
  })
}
//修改头像
export function updateFile(query) {
  return request({
    url:'/api/v1/partner/person/1/',
    method: 'put',
    data: query
  })
}
//个人资料修改
export function userInfoPut(query) {
  return request({
    url: '/api/v1/partner/person/1/',
    method: 'patch',
    data:query
  })
}
//修改密码
export function updatePwd(query) {
  return request({
    url: '/api/v1/partner/alterPassword/1/reset/',
    method: 'put',
    data: query
  })
}

//我的用户查询
export function usersInfo(query) {
  return request({
    url: '/api/v1/partner/Company/users/',
    method: 'get',
    params: query
  })
}
//用户数据删除
export function deleteUsersInfo(query) {
  return request({
    url: '/api/v1/partner/Company/'+query+'/Users/ ',
    method: 'post'
  })
}

//用户活跃查询
export function userVisitor(query) {
  return request({
    url: '/api/v1/partner/active/',
    method: 'get',
    params: query
  })
}

//用户行业查询
export function tradeLineVisitor(query) {
  return request({
    url: '/api/v1/partner/active/trade/',
    method: 'get'
  })
}

//用户活跃查询
export function userLineVisitor(query) {
  return request({
    url: '/api/v1/partner/active/trends/',
    method: 'post',
    data: query
  })
}

//用户安装查询
export function userInstallVisitor(query) {
  return request({
    url: '/api/v1/partner/active/getinstall/?device='+query.device+'&last-date='+query['last-date']+'&start-date='+query['start-date']+'',
    method: 'get',
    data: query
  })
}

//用户平台分步查询
export function userPieVisitor(query) {
  return request({
    url: '/api/v1/partner/active/platform/',
    method: 'get'
  })
}

//用户分步查询
export function userMapVisitor(query) {
  return request({
    url: '/api/v1/partner/active/usermap/',
    method: 'get'
  })
}
export function fetchList(query) {
  return request({
    url: '/api/v1/article/list',
    method: 'get',
    params: query
  })
}
export function fetchPv(pv) {
  return request({
    url: '/api/v1/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/api/v1/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/api/v1/article/update',
    method: 'post',
    data
  })
}
