import Cookies from 'js-cookie'
import { eqList , picPlaceList ,templateCategoryEn, templateCategory ,fontCategory ,iconCategory ,companyList} from '@/api/article'
const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'zh',
    size: Cookies.get('size') || 'medium',
    eqList:[],
    picPlaceList:[],
    tempcategoryList:[],
    fontcategoryList:[],
    tempcategoryListEn:[],
    iconcategoryList:[],
    companyInfo:{},
    printerCategory:[]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_EQLIST: (state, eqList) => {
      state.eqList = eqList
    },
    SET_TEMPCATEGORYLIST: (state, tempcategoryList) => {
      state.tempcategoryList = tempcategoryList
    },
    SET_FONTCATEGORYLIST: (state, fontcategoryList) => {
      state.fontcategoryList = fontcategoryList
    },
    SET_ICONCATEGORYLIST: (state, iconcategoryList) => {
      state.iconcategoryList = iconcategoryList
    },
    SET_PICPLACE: (state, picPlaceList) => {
      state.picPlaceList = picPlaceList
    },
    SET_COMPANYINFO: (state, companyInfo) => {
      state.companyInfo = companyInfo
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    SET_TEMPCATEGORYLISTEN: (state, tempcategoryListEn) => {
      state.tempcategoryListEn = tempcategoryListEn
    },
    SET_PRINTERCATEGORY: (state, printerCategory) => {
      state.printerCategory = printerCategory
    },
  },
  actions: {
    setCompanyInfo({ commit }) {
      companyList().then(res=>{
        commit('SET_COMPANYINFO',res.data.results)
      })
    },
    setTempCategoryListEn({ commit }) {
      templateCategoryEn().then(res=>{
        commit('SET_TEMPCATEGORYLISTEN',res.data.results)
      })
    },
    // setPrinterCategory({ commit }) {
    //   printerCategory().then(res=>{
    //     console.log(res)
    //     commit('SET_TEMPCATEGORYLISTEN',res.data.results)
    //   })
    // },
    setTempCategoryList({ commit }) {
      templateCategory().then(res=>{
        commit('SET_TEMPCATEGORYLIST',res.data.results)
      })
    },
    setIconCategoryList({ commit }) {
      iconCategory().then(res=>{
        commit('SET_ICONCATEGORYLIST',res.data.results)
      })
    },
    setFontCategoryList({ commit }) {
      fontCategory().then(res=>{
        commit('SET_FONTCATEGORYLIST',res.data.results)
      })
    },
    setEqList({ commit }) {
      eqList().then(res=>{
        commit('SET_EQLIST',res.data)
      })

    },
    setPicPlaceList({ commit }) {
      picPlaceList().then(res=>{
        commit('SET_PICPLACE',res.data)
      })

    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({ commit }, size) {
      commit('SET_SIZE', size)
    }
  }
}

export default app
