import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '',
  component: Layout,
  // redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      permission: 'dlabel_super_index_second_view',
      title: 'dashboard',
      icon: 'iconshouyebeifen',
      noCache: true,
      affix: true
    }
  }],
  meta: {
    title: '首页',
    icon: 'iconshouyebeifen',
    isIndex: true
  }
},
{
  path: '/datacenter',
  component: Layout,
  children: [

    {
      path: 'newUser',
      component: () => import('@/views/datacenter/newuser'),
      name: 'newUser',
      meta: {
        title: '新增用户',
        permission: 'data_center_new_user_view'
      }
    },
    {
      path: 'activityAnalysis',
      component: () => import('@/views/datacenter/analysis'),
      name: 'activityAnalysis',
      meta: {
        title: '活跃分析',
        permission: 'data_center_user_active_view'
      }
    },
    {
      path: 'startUpData',
      component: () => import('@/views/datacenter/startUpData'),
      name: 'startUpData',
      meta: {
        title: '启动用户',
        permission: 'data_center_load_view'
      }
    },
    {
      path: 'retain',
      component: () => import('@/views/datacenter/retain'),
      name: 'retain',
      meta: {
        title: '用户留存',
        permission: 'data_center_rentention_view'
      }
    },
    {
      path: 'printRecord',
      component: () => import('@/views/datacenter/printrecord'),
      name: 'printRecord',
      meta: {
        title: '打印记录',
        permission: 'data_center_print_record_view'
      }
    },
    {
      path: 'printTimes',
      component: () => import('@/views/datacenter/printtimes'),
      name: 'printTimes',
      meta: {
        title: '打印次数',
        permission: 'data_center_print_count_view'
      }
    },
    {
      path: 'channel',
      component: () => import('@/views/datacenter/channel'),
      name: 'channel',
      meta: {
        title: '渠道分析',
        permission: 'data_center_channel_view'
      }
    },

    {
      path: 'versionData',
      component: () => import('@/views/datacenter/versionData'),
      name: 'versionData',
      meta: {
        title: '版本分布',
        permission: 'data_center_version_view'
      }
    },
    {
      path: 'fileData',
      component: () => import('@/views/datacenter/fileData'),
      name: 'fileData',
      meta: {
        title: '文件统计',
        permission: 'data_center_document_view'
      }
    },
    {
      path: 'regionDistribution',
      component: () => import('@/views/datacenter/region'),
      name: 'regionDistribution',
      meta: {
        title: '地域分布',
        permission: 'data_center_user_area_view'
      }
    },
    {
      path: 'userData',
      component: () => import('@/views/datacenter/userData'),
      name: 'userData',
      meta: {
        title: '用户分析',
        permission: 'data_center_user_analysis_view'
      }
    }, {
      path: 'labelData',
      component: () => import('@/views/datacenter/labelData'),
      name: 'labelData',
      meta: {
        title: '标签分析',
        permission: 'data_center_user_analysis_view'
      }
    }, {
      path: 'industry',
      component: () => import('@/views/datacenter/industry'),
      name: 'industry',
      meta: {
        title: '行业分析',
        permission: 'data_center_user_analysis_view'
      }
    }, {
      path: 'userInfoData',
      component: () => import('@/views/datacenter/userInfoData'),
      name: 'userInfoData',
      hidden: true,
      meta: {
        title: '用户详情',
        permission: 'data_center_user_analysis_view'
      }
    }

  ],
  meta: {
    title: '数据中心',
    icon: 'iconshujufenxibeifen'
  }
},
{
  path: '/material',
  component: Layout,
  children: [
    {
      path: 'templateAdmin',
      component: () => import('@/views/material/templateAdmin'),
      name: 'templateAdmin',
      meta: {
        title: '模板管理',
        permission: 'source_template_manage_view'
      }
    },
    {
      path: 'templateAdminShop',
      component: () => import('@/views/material/templateAdminShop'),
      name: 'templateAdminShop',
      meta: {
        title: '商品模板',
        permission: 'source_shop_template_manage_view'
      }
    }, {
      path: 'templateAdminEditShop',
      component: () => import('@/views/material/templateAdminEditShop'),
      name: 'templateAdminEditShop',
      meta: {
        title: '编辑',
        permission: 'source_template_manage_view'
      },
      hidden: true
    },

    {
      path: 'templateAdminEdit',
      component: () => import('@/views/material/templateAdminEdit'),
      name: 'templateAdminEdit',
      meta: {
        title: '编辑',
        permission: 'source_template_manage_view'
      },
      hidden: true
    },
    {
      path: 'tagBackground',
      component: () => import('@/views/material/tagBackground'),
      name: 'tagBackground',
      meta: {
        title: '背景管理',
        permission: 'source_label_manage_view'
      }
    },
    {
      path: 'signAdmin',
      component: () => import('@/views/material/signAdmin'),
      name: 'signAdmin',
      meta: {
        title: '图标管理',
        permission: 'source_sign_manage_view'
      }
    }, {
      path: 'frameAdmin',
      component: () => import('@/views/material/frameAdmin'),
      name: 'frameAdmin',
      meta: {
        title: '边框管理',
        permission: 'source_frame_manage_view'
      }
    },
    {
      path: 'typefaceAdmin',
      component: () => import('@/views/material/typefaceAdmin'),
      name: 'typefaceAdmin',
      meta: {
        title: '字体管理',
        permission: 'source_font_manage_view'
      }
    }
    // {
    //   path: 'printerList',
    //   component: () => import('@/views/print/printerList'),
    //   name: 'printerList',
    //   meta: {
    //     title: '打印机管理',
    //     permission: 'print_manage_device_view'
    //   }
    // },

    // {
    //   path: 'picTextList',
    //   component: () => import('@/views/print/picTextList'),
    //   name: 'picTextList',
    //   meta: {
    //     title: '图文教程',
    //     permission: 'print_manage_image_text_course_view'
    //   }
    // },
    // {
    //   path: 'videoList',
    //   component: () => import('@/views/print/videoList'),
    //   name: 'videoList',
    //   meta: {
    //     title: '视频教程',
    //     permission: 'print_manage_vedio_course_view'
    //   }
    // }
  ],
  meta: {
    title: '软件管理',
    icon: 'iconsucaiguanlibeifen'
  }
},
{
  path: '/advertAdmin',
  component: Layout,
  children: [
    {
      path: 'startUpImg',
      component: () => import('@/views/advertAdmin/startUpImg'),
      name: 'startUpImg',
      meta: {
        title: '启动页',
        permission: 'advert_manage_start_page_view'
      }
    },

    {
      path: 'wheelImg-index',
      component: () => import('@/views/advertAdmin/wheelImg-index'),
      name: 'wheelImg-index',
      meta: {
        title: '首页',
        permission: 'advert_manage_banner_view'
      }
    }, {
      path: 'wheelImg-my',
      component: () => import('@/views/advertAdmin/wheelImg-my'),
      name: 'wheelImg-my',
      meta: {
        title: '个人中心',
        permission: 'advert_manage_banner_person_view'
      }
    },
    {
      path: 'shopUrl',
      component: () => import('@/views/advertAdmin/shopUrl'),
      name: 'shopUrl',
      meta: {
        title: '软件商城',
        permission: 'advert_manage_mall_url_view'
      }
    },
    {
      path: 'advertData',
      component: () => import('@/views/advertAdmin/advertData'),
      name: 'advertData',
      meta: {
        title: '广告统计',
        permission: 'advert_manage_total_view'
      }
    },
    {
      path: 'approvalAdmin',
      component: () => import('@/views/company/approvalAdmin'),
      name: 'approvalAdmin',
      meta: {
        title: '广告审批',
        permission: 'company_advise_view'
      }
    }

  ],
  meta: {
    title: '广告管理',
    icon: 'iconguanggaoguanli'
  }
}, {
  path: '/user',
  component: Layout,
  redirect: '/user/userManagement',
  children: [
    {
      path: 'fileList',
      component: () => import('@/views/fileAdmin/fileList'),
      name: 'fileList',
      meta: {
        title: '用户文件',
        permission: 'user_manage_document_view'
      }
    },
    {
      path: 'userManagement',
      component: () => import('@/views/user/userManagement'),
      name: 'user',
      meta: {
        title: '用户信息',
        permission: 'user_manage_one_level_view'
      }
    },
    {
      path: 'userInfo',
      component: () => import('@/views/user/userInfo'),
      name: 'userInfo',
      hidden: true,
      meta: {
        title: '用户详情',
        permission: 'user_manage_one_level_view'
      }
    },
    {
      path: 'userFeedback',
      component: () => import('@/views/user/userFeedback'),
      name: 'userFeedback',
      meta: {
        title: '用户反馈',
        permission: 'user_manage_feedback_view'
      }
    }
    // {
    //   path: 'userFeedback_2',
    //   component: () => import('@/views/user/userFeedback_2'),
    //   name: 'userFeedback_2',
    //   meta: {
    //     title: '用户反馈2',
    //     permission: 'user_manage_feedback_view'
    //   }
    // }

  ],
  meta: {
    title: '用户管理',
    icon: 'iconyonghuguanlibeifen'
  }
},
{
  path: '/behaviorAnalysis',
  component: Layout,
  redirect: '/behaviorAnalysis/clickData',
  children: [
    {
      path: 'clickData',
      component: () => import('@/views/behaviorAnalysis/clickData'),
      name: 'clickData',
      meta: {
        title: '点击统计',
        permission: 'user_click_total_view'
      }
    },
    {
      path: 'clickDataSet',
      component: () => import('@/views/behaviorAnalysis/clickDataSet'),
      name: 'clickDataSet',
      meta: {
        title: '配置',
        permission: 'user_click_total_view'
      },
      hidden: true
    }
  ],
  meta: {
    title: '行为分析',
    icon: 'iconhangweifenxi'
  }
},
{
  path: '/firmwareAdmin',
  component: Layout,
  children: [
    {
      path: 'printBrand',
      component: () => import('@/views/firmwareAdmin/printBrand'),
      name: 'printBrand',
      meta: {
        title: '打印机列表',
        permission: 'equipment_brand_view'
      }
    },
    {
      path: 'firmwareUpdate',
      component: () => import('@/views/firmwareAdmin/firmwareUpdate'),
      name: 'firmwareUpdate',
      meta: {
        title: '固件升级',
        permission: 'equipment_upgrade_view'
      }
    },
    {
      path: 'scanPrinterList',
      component: () => import('@/views/print/scanPrinterList'),
      name: 'scanPrinterList',
      meta: {
        title: '扫码新建',
        permission: 'print_manage_scan_create_view'
      }
    }

  ],
  meta: {
    title: '设备管理',
    icon: 'iconshebeiguanli'
  }
},
{
  path: '/notice-admin',
  component: Layout,
  // redirect: '/advert/advertList',
  children: [
    {
      path: 'notice-message',
      component: () => import('@/views/notice-admin/notice-message'),
      name: 'notice-message',
      meta: {
        title: '横幅设置',
        permission: 'message_push_view'
      }
    }

  ],
  meta: {
    title: '推送通知',
    icon: 'icontuisongtongzhi'
  }
},
{
  path: '/expansionList',
  component: Layout,
  redirect: '/memberAdmin/expansionList',
  children: [{
    path: 'expansionList',
    component: () => import('@/views/memberAdmin/expansionList'),
    name: 'expansionList',
    meta: {
      title: '扩容配置',
      permission: 'vip_space_config_view'
    }
  },
  {
    path: 'memberList',
    component: () => import('@/views/memberAdmin/memberList'),
    name: 'memberList',
    meta: {
      title: '会员配置',
      permission: 'vip_config_view'
    }
  },
  {
    path: 'memberAdd',
    component: () => import('@/views/memberAdmin/memberAdd'),
    name: 'memberAdd',
    meta: {
      title: '新增会员配置',
      permission: 'vip_space_config_view'
    },
    hidden: true
  },
  {
    path: 'orderList',
    component: () => import('@/views/memberAdmin/orderList'),
    name: 'orderList',
    meta: {
      title: '订单列表',
      permission: 'vip_list_view'
    }
  },
  {
    path: 'memberData',
    component: () => import('@/views/memberAdmin/memberData'),
    name: 'memberData',
    meta: {
      title: '会员数据',
      permission: 'vip_data_view'
    }
  },
  {
    path: 'saleDate',
    component: () => import('@/views/memberAdmin/saleDate'),
    name: 'saleDate',
    meta: {
      title: '销售清单',
      permission: 'vip_sale_list_view'
    }
  }
  ],
  meta: {
    title: '会员体系',
    icon: 'iconhuiyuan'
  }
},

{
  path: '/versionAdmin',
  component: Layout,
  // redirect: '/advert/advertList',
  children: [
    {
      path: 'PCVersion',
      component: () => import('@/views/versionAdmin/versionAdmin'),
      name: 'PCVersion',
      meta: {
        title: '版本升级',
        permission: 'app_version_manage_view'
      }

    }

  ],
  meta: {
    title: '版本升级',
    icon: 'iconruanjianbanbengengxin'
  }
},
{
  path: '/limit',
  component: Layout,
  // redirect: '/advert/advertList',
  children: [
    {
      path: 'roleLimit',
      component: () => import('@/views/limit/roleLimit'),
      name: 'roleLimit',
      meta: {
        title: '角色管理',
        permission: 'limitAll_view'
      }
      // children: [
      //   {
      //     path: 'permissionAssign',
      //     component: () => import('@/views/limit/permission'),
      //     name: 'permissionAssign',
      //     meta: {
      //       title: '权限分配',
      //       permission: 'permissionAssign_view',
      //       icon: 'iconquanxianfenpei'
      //     }
      //   }
      // ]
    },
    {
      path: 'permissionList',
      component: () => import('@/views/limit/permissionList'),
      name: 'permissionList',
      hidden: true,
      meta: {
        title: '权限分配',
        permission: 'limitAll_view'
      }
    }, {
      path: 'accountLimit',
      component: () => import('@/views/limit/accountLimit'),
      name: 'accountLimit',
      meta: {
        title: '账号管理',
        permission: 'limitAll_view'
      }
    }, {
      path: 'permissionListDefault',
      component: () => import('@/views/limit/permissionListDefault'),
      name: 'permissionListDefault',
      meta: {
        title: '友商默认权限',
        permission: 'company_default_authority_view'
      }
    }, {
      path: 'partnerRoleList',
      component: () => import('@/views/limit/partnerRoleList'),
      name: 'partnerRoleList',
      meta: {
        title: '友商角色列表',
        permission: 'company_role_account_list_two_level_view'
      }
    }, {
      path: 'permissionPartnerListLimit',
      hidden: true,
      component: () => import('@/views/limit/permissionPartnerList'),
      name: 'permissionPartnerListLimit',
      meta: {
        title: '友商权限列表',
        permission: 'company_role_account_list_two_level_view'
      }
    }, {
      path: 'accountLimitPartner',
      component: () => import('@/views/limit/accountLimitPartner'),
      name: 'accountLimitPartner',
      hidden: true,
      meta: {
        title: '友商账号列表',
        permission: 'company_role_account_list_two_level_view'
      }
    }, {
      path: 'recordList',
      component: () => import('@/views/limit/recordList'),
      name: 'recordList',
      meta: {
        title: '操作日志',
        permission: 'sys_operate_log_view'
      }
    }, {
      path: 'recordListFriend',
      component: () => import('@/views/limit/recordListFriend'),
      name: 'recordListFriend',
      meta: {
        title: '友商操作日志',
        permission: 'sys_company_operate_log_view'
      }
    }

  ],
  meta: {
    title: '权限体系',
    icon: 'iconquanxiantixi'
  }
},
{
  path: '/company',
  component: Layout,
  // redirect: '/advert/advertList',
  children: [
    {
      path: 'companyList',
      component: () => import('@/views/company/companyList'),
      name: 'companyList',
      meta: {
        title: '公司审批',
        permission: 'company_apply_reg_view'
      }
    },
    {
      path: 'companyPressEdit',
      component: () => import('@/views/company/companyPressEdit'),
      name: 'companyPressEdit',
      hidden: true,
      meta: {
        title: '公司编辑',
        permission: 'company_manage_view'

      }
    },
    {
      path: 'companyPressList',
      component: () => import('@/views/company/companyPressList'),
      name: 'companyPressList',
      meta: {
        title: '公司管理',
        permission: 'company_manage_view'
      }

    },
    {
      path: 'companyEdit',
      component: () => import('@/views/company/companyEdit'),
      name: 'companyEdit',
      hidden: true,
      meta: {
        title: '公司编辑',
        permission: 'company_apply_reg_view'
      }
    },
    {
      path: 'companyPressInfo',
      component: () => import('@/views/company/companyPressInfo'),
      name: 'companyPressInfo',
      hidden: true,
      meta: {
        title: '公司编辑',
        permission: 'company_manage_view'
      }
    },
    {
      path: 'companyCreate',
      component: () => import('@/views/company/companyCreate'),
      name: 'companyCreate',
      hidden: true,
      meta: {
        title: '新建公司',
        permission: 'company_manage_view'
      }
    }, {
      path: 'permissionPartnerList',
      hidden: true,
      component: () => import('@/views/company/permissionPartnerList'),
      name: 'permissionPartnerList',
      meta: {
        title: '友商权限列表',
        permission: 'company_manage_autority_button'
      }
    }

  ],
  meta: {
    title: '公司管理',
    icon: 'icongongsiguanli'
  }
},

{
  path: '/errorPage',
  component: Layout,
  children: [
    {
      path: '/404',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/errorPage/401'),
      hidden: true
    },
    {
      path: '/403',
      component: () => import('@/views/errorPage/403'),
      hidden: true
    }
  ]
},

// {
//   path: '/print',
//   component: Layout,
//   children: [

//   ],
//   meta: {
//     title: '打印管理',
//     icon: 'icondayinguanli'
//   }
// },

// {
//   path: '/file',
//   component: Layout,
//   children: [
//     // {
//     //   path: 'fileAdmin',
//     //   component: () => import('@/views/fileAdmin/template'),
//     //   name: 'fileAdmin',
//     //   meta: {
//     //     title: '文件管理',
//     //     permission: 'file_manage_list_view'
//     //   }
//     // },

//   ],
//   meta: {
//     title: '文件管理',
//     icon: 'iconwenjianguanli'
//   }
// },

  // {
  //   path: '',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'company',
  //       component: () => import('@/views/company/company'),
  //       name: 'company',
  //       meta: {
  //         title: '公司信息',
  //         permission: 'company_view'
  //       }
  //     }
  //   ],
  //   meta: {
  //     title: '公司信息',
  //     icon: 'icongongsixinxi'
  //   }
  // },

{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
