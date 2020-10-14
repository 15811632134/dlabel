<template>
  <div class="app-container">
    <div class="app-menu">
      <h3>全部（{{partnerArr.length}}）</h3>
      <ul>
        <li :class="currentIndex==index?'active':''" class="textLine" v-for="(item,index) in partnerArr" :key="index" @click="selectCompany(item.companyId,index)">{{item.shortName}}（{{item.roleCount}}）</li>

      </ul>
    </div>
    <div class="app-content">
      <div class="filter-container filesearch">
      <div class="search">
        <el-input v-model="listQuery.name" maxlength="20" placeholder="搜索相关关键词" @keyup.native.enter="handleSearch" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>
    </div>
      <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column property="name" label="角色名称" />
      <el-table-column property="staffCount" label="账号数" class="accnumber">
        <template slot-scope="{row}">
          <a @click="toAccountList(row.roleId)" class="accnumber">{{ row.staffCount }}</a>
        </template>
      </el-table-column>
      <el-table-column label="友商">
        <template slot-scope="{row}">
          <span>{{row.fullName }}</span>
        </template>
      </el-table-column>
      <el-table-column property="addTime" label="更新时间">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | formatDate('') }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="权限查看" placement="top">
            <i class="iconfont iconchakanquanxian" v-if="permissionData.indexOf('company_role_list_executable')!=-1" @click="confirmEdit(row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
      <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    </div>
    <el-dialog :visible.sync="isdialog" title="查看" class="dialog" width="600px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文件名：" prop="name" class="version">
          <span>{{ ruleForm.name }}</span>
        </el-form-item>
        <el-form-item label="缩略图：" class="backupload" prop="image">
          <img :src="ruleForm.img" class="picture" >
        </el-form-item>
        <el-form-item label="文件地址：" prop="name" class="version">{{ ruleForm.file }}</el-form-item>
        <el-form-item
          label="文件尺寸："
          prop="name"
          class="version"
        >{{ ruleForm.width }}*{{ ruleForm.height }}</el-form-item>
        <el-form-item label="上传时间：" prop="name" class="version">{{ ruleForm.addTime | formatDate(ruleForm.addTime) }}</el-form-item>
        <el-form-item label="最后登录时间" prop="name" class="version">
          <span>{{ ruleForm.lastLogin| formatDate('') }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isEnlarge" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" >
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { company_role_list ,getDlabelSysRoleList , all_company_roles_total,
  get_company_role_autorty_by_role_id} from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      // 是否编辑
      isedit: false,
      currentIndex:0,
      selectId:1,
      roles:[],
      companys:[],
      partnerArr:[],
      allCount:0,
      listQuery:{ page_no: 1, page_size: 10,company_id:-1,name:'' }
    }
  },
  computed: {
    getRoles(){
      return function(roleId){
        for(var i = 0 ; i < this.roles.length ; i++){
          if(this.roles[i].id == roleId){
            return this.roles[i].name
          }
        }
        return '无角色'
      }
    },...mapGetters([
      'permissionData'

    ])

  },
  created() {
    all_company_roles_total().then(res=>{
      this.partnerArr = res.data.detail
      this.allCount = res.data.total_role_count
      this.listapi = company_role_list
      if(this.partnerArr.length>0){
        this.listQuery.company_id = this.partnerArr[0].companyId
        this.getListDataLx(this.listQuery, company_role_list)
      }
    })

  },
  methods: {
    toAccountList(id){
      if(this.permissionData.indexOf('company_account_list_executable')!=-1)
        this.$router.push({name:'accountLimitPartner',query:{r:id}})
    },
    selectCompany(id,index){
      this.listQuery.page_no = 1
      this.currentpage = 1
      this.currentIndex = index
      this.listQuery.company_id = id
      this.getListDataLx(this.listQuery, company_role_list)
    },
    confirmEdit(row) {
      this.$router.push({name:'permissionPartnerListLimit',query:{t:row.roleId}})
    },
    handleSearch() {
        this.getListDataLx(
          this.listQuery,
          company_role_list
        )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filesearch{
  justify-content: flex-end;
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #C3C3C3;
}
</style>
