import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3
let tt = null
function hrefReload(e){
  location.href = e.currentTarget.getAttribute('href')+'?t='+new Date().getTime()
}
export default {
  watch: {
    $route(route) {

      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('closeSideBar', { withoutAnimation: false })
      }
      setTimeout(() => {
        console.log(document.querySelector('.router-link-active'))
        document.querySelector('.router-link-active').removeEventListener('click',hrefReload)
        document.querySelector('.router-link-active').addEventListener('click',hrefReload)
      }, 0);
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
