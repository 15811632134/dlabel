<template>
  <div class="app-wrapper" >
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <!-- <head-nav/> -->
    <div class="main-container">
      <navbar/>
      <!-- <tags-view/> -->
      <app-main/>
      <!-- <div id="footer"><div id='copyright'>
         <div>度点科技</div><a target='_blank' href='http://www.miitbeian.gov.cn/'>粤ICP备12037471号-4</a>
         </div></div> -->
    </div>

  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, HeadNav } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    HeadNav
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  #footer{
    color:#666;
    line-height: 25px;
    position: absolute;
    width:100%;

    bottom: -50px;
    #copyright{
      text-align: center;
      a:hover{
        color:#d53636;
      }
    }
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    // min-width: 1910px;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
