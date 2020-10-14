<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">
          {{
          generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)

      const first = matched[0]
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !==
          'Dashboard'.toLocaleLowerCase()
      ) {
        matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(
          matched
        )
      }
      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      )
      const templateobj = {
        meta: {
          permission: 'source_template_manage_view',
          title: '模板管理'
        },
        path: '/material/templateAdmin',
        name: 'templateAdmin'
      }
      const limitobj = {
        meta: {
          permission: 'role_manage',
          title: '角色管理'
        },
        path: '/limit/roleLimit',
        name: 'roleLimit'
      }
      const userManagement = {
        meta: {
          title: '用户管理'
        },
        path: '/user/userManagement',
        name: 'userManagement'
      }

      const partnerRoleList = {
        meta: {
          title: '友商角色列表'
        },
        path: '/limit/partnerRoleList',
        name: 'partnerRoleList'
      }
      const companyList = {
        meta: {
          title: '公司审批'
        },
        path: '/company/companyList',
        name: 'companyList'
      }
      const companyPressList = {
        meta: {
          title: '公司管理'
        },
        path: '/company/companyPressList',
        name: 'companyPressList'
      }
      const userManagements = {
        meta: {
          title: '用户分析'
        },
        path: '/datacenter/userData',
        name: 'userData'
      }
      if(this.levelList[1]){
        if (this.levelList[1].name === 'templateAdminEdit') {
          if (this.$route.query.id) {
            this.levelList[1].meta.title = '编辑'
          } else {
            this.levelList[1].meta.title = '添加'
          }
          this.levelList.splice(1, 0, templateobj)
        } else if (this.levelList[1].name === 'permissionAssign') {
          this.levelList.splice(1, 0, limitobj)
        } else if (this.levelList[1].name === 'index_view') {
          this.levelList.pop()
        }else if (this.levelList[1].name === 'userInfoData'&&this.levelList[0].path=='/dashboard') {
          this.levelList.splice(1, 0, userManagements)
        }else if (this.levelList[1].name === 'userInfo') {
          this.levelList.splice(1, 0, userManagement)
        }else if (this.levelList[1].name === 'permissionPartnerListLimit') {
          this.levelList.splice(1, 0, partnerRoleList)
        }else if (this.levelList[1].name === 'companyEdit') {
          this.levelList.splice(1, 0, companyList)
        }else if (this.levelList[1].name === 'companyCreate'||this.levelList[1].name === 'permissionPartnerList'||this.levelList[1].name === 'companyPressInfo'||this.levelList[1].name === 'companyPressEdit') {
          this.levelList.splice(1, 0, companyPressList)
        }
      }
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 40px;
  .no-redirect {
    color: #333;
    cursor: text;
  }
}
</style>
