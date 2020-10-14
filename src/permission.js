import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
let flag = false
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      try {
        // get user info
        if (flag) { next() }
        flag = true
        store.dispatch('getPermissionData').then(async(res) => {
          flag = false
          store.dispatch('GenerateRoutes', { roles: ['admin'] }).then(() => { // 根据roles权限生成可访问的路由表
            if (!res || res.length <= 0) {
              next({ path: '/403', replace: true })
            } else if (to.name && res.indexOf(to.meta.permission) === -1 && to.path !== '/') {
              // if(to.path=='/'){
              //   next({ path: '/'})
              // }else
              next({ path: '/401', replace: true })
            } else { next() }
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
          next()
        })
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
      // }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
