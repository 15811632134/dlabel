import { constantRouterMap } from '@/router'
import { getDlabelSysAuthorityListByAccount, get_system_authority } from '@/api/api'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
let permissionDataStr = []
function calcDataToStr(data) {
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].homeUrl) {
        permissionDataStr.push(data[i].homeUrl)
      }
      if (data[i].sons && data[i].sons.length > 0) {
        data[i].fatherFlag = []
        calcDataToStr(data[i].sons)
      }
    }
  } else {
    if (data.homeUrl) {
      permissionDataStr.push(data[i].homeUrl)
    }
  }
}
const permission = {
  state: {
    permissionData: [],
    routers: [],
    addRouters: [],
    userName: '',
    logo: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers
    },
    SET_PERMISSIONDATA: (state, permissionData) => {
      state.permissionData = permissionData
    },
    SET_USERNAME: (state, name) => {
      state.userName = name
    },
    SET_LOGO: (state, logo) => {
      state.logo = logo
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = constantRouterMap
        } else {
          accessedRouters = filterAsyncRouter(constantRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    getPermissionData({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDlabelSysAuthorityListByAccount().then(res => {
          permissionDataStr = []
          commit('SET_PERMISSIONDATA', [])

          var data = res.data.listLabelSysAuthority
          commit('SET_USERNAME', res.data.staff.account)
          // commit('SET_LOGO', res.data.mallCompany.logoImage&&res.data.mallCompany.logoImage.sourceUrl)
          if (res.data.staff.accountType === 1) {
            permissionDataStr.push('limitAll_view')
          }
          if (data) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].homeUrl) {
                permissionDataStr.push(data[i].homeUrl)
              }
              if (data[i].sons && data[i].sons.length > 0) {
                calcDataToStr(data[i].sons)
              } else {
                if (data[i].homeUrl) {
                  permissionDataStr.push(data[i].homeUrl)
                }
              }
            }
          }
          //  permissionDataStr =["limitAll_view", "company_role_account_list_one_level_view", "company_role_account_list_two_level_view", "company_role_list_executable", "company_account_list_executable", "company_view", "company_apply_reg_view", "company_apply_search_executable", "company_apply_edit_executable", "company_apply_detail_executable", "company_apply_enable_executable", "company_apply_success_executable", "company_apply_refuse_executable", "company_apply_select_executable", "company_manage_view", "company_manage_add_executable", "company_manage_save_executable", "company_manage_detail_executable", "company_manage_enable_executable", "company_manage_reset_pwd_executable", "company_manage_down_qrcode_executable", "company_manage_copy_url_executable", "company_manage_select_executable", "company_manage_autority_button", "user_manage_view", "user_manage_one_level_view", "user_manage_search_executable", "user_manage_detail_executable", "user_manage_feedback_view", "user_manage_feedback_detail_executable", "user_manage_feedback_select_executable", "print_manage_view", "print_manage_device_view", "print_manage_add_executable", "print_manage_edit_executable", "print_manage_delete_executable", "print_manage_scan_create_view", "print_manage_scan_create_executable", "print_manage_scan_edit_executable", "print_manage_scan_delete_executable", "print_manage_scan_select_executable", "print_manage_image_text_course_view", "print_manage_image_text_course_add_executable", "print_manage_image_text_course_edit_executable", "print_manage_image_text_course_delete_executable", "print_manage_vedio_course_view", "print_manage_vedio_course_add_executable", "print_manage_vedio_course_edit_executable", "print_manage_vedio_course_delete_executable", "source_manage_view", "source_template_manage_view", "source_label_manage_view", "source_sign_manage_view", "source_font_manage_view", "source_frame_manage_view", "data_center_manage_view", "data_center_new_user_view", "data_center_print_count_view", "data_center_print_record_view", "data_center_user_active_view", "data_center_user_area_view", "advert_manage_view", "advert_manage_start_page_view", "advert_manage_start_page_add_executable", "advert_manage_start_page_edit_executable", "advert_manage_start_page_delete_executable", "advert_manage_banner_view", "advert_manage_banner_add_executable", "advert_manage_banner_edit_executable", "advert_manage_banner_delete_executable", "advert_manage_banner_enable_executable", "advert_manage_mall_url_view", "advert_manage_mall_url_add_executable", "advert_manage_mall_url_edit_executable", "advert_manage_mall_url_delete_executable", "advert_manage_mall_url_enable_executable", "app_version_manage_view", "app_pc_version_manage_view", "app_pc_version_manage_add_executable", "app_pc_version_manage_edit_executable", "app_pc_version_manage_delete_executable", "app_android_version_manage_view", "app_android_version_manage_add_executable", "app_android_version_manage_edit_executable", "app_android_version_manage_delete_executable", "app_ios_version_manage_view", "app_ios_version_manage_add_executable", "app_ios_version_manage_edit_executable", "app_ios_version_manage_delete_executable", "file_manage_view", "file_manage_list_view", "dlabel_super_index_first_view", "dlabel_super_index_second_view"]
          commit('SET_PERMISSIONDATA', permissionDataStr)
          resolve(permissionDataStr)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
