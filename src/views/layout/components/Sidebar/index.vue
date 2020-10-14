<style lang="scss" scoped>
.logoHeader{
  height:50px;
  line-height: 50px;
  font-size:16px;
  font-size:24px;
  padding-top:6px;
  font-weight: bold;
  color:#e5e5e5;
  background-color:rgb(38, 47, 73);

  img{
    margin-top:-5px;
    margin-left:15px;
    vertical-align: middle;
  }
}
</style>
<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logoHeader">
      <img src="static/img/logo.png"  />
      Dlabel
      </div>
    <el-menu
      :default-active="$route.path"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <sidebar-item v-for="(route,index) in permission_routers" :key="index" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
// import { companyList } from '@/api/article'

export default {
  components: { SidebarItem },
  data() {
    return {
      shortname: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'companyInfo',
      'permissionData'

    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {

    for (var i = 0; i < this.permission_routers.length; i++) {
      if (this.permission_routers[i].children && this.permission_routers[i].meta) {
        var tempData = this.permission_routers[i].children
        for (var j = 0; j < tempData.length; j++) {
          if (this.permissionData.indexOf(tempData[j].meta.permission) !== -1) {
            this.permission_routers[i].meta.flag = true
          }
        }
      }
    }
    // companyList().then((res)=>{
    //   this.shortname = res.data.results.short_name
    // })
  }
}
</script>
