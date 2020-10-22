import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mixin from '@/mixin/mixin.js'
import '@/styles/index.scss' // global css
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import App from './App'
import store from './store'
import router from './router'
import '@/styles/font.css'
import '@/styles/font-ttl.css'
import '@/styles/chiteng.css'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

window['setLoginToken'] = function (data){alert('123213')}

Vue.prototype.resOk = 200
Vue.mixin(mixin)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
