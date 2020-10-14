<template>
  <div class="app-container">
    <div class="app-menu">
      <h3 v-if="companys.length>0">全部（{{ companys[0].count }}）</h3>
        <ul>
          <li
            v-for="(item,index) in companys"
            :class="currentIndex==index?'active':''"
            :key="index"
            v-show="index>0"
            class="textLine"
            @click="selectCompany(item.id,index)"
          >{{ item.shortName }}({{item.count}})</li>
        </ul>
    </div>
    <div class="app-content">
      <div v-if="permissionData.indexOf('user_manage_search_executable')!=-1" class="filter-container filesearch">
        <div class="search m_search">
          <el-input v-model="listQuery.keyword" maxlength="20" placeholder="根据手机号搜索" class="input-with-select" @keyup.native.enter="handleSearch">
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
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column property="companyName" label="所属友商" />
        <el-table-column property="nickName" label="用户名" />
        <el-table-column property="phone" label="手机号码" />
        <el-table-column property="addTime" label="注册时间">
          <template slot-scope="{row}">
            <span>{{ row.createTime | formatDate('') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column property="equip" label="注册渠道" /> -->
        <el-table-column label="注册来源">
          <template slot-scope="{row}">
            <span>{{ equipArr[row.firstEquip] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近使用版本">
          <template slot-scope="{row}">
            <span>{{ row.equip==1?'Android'+row.dlabelAndroidVersion:row.equip==2?'IOS'+row.dlabelIosVersion:'PC'+row.dlabelPcVersion }}</span>
          </template>
        </el-table-column>

        <el-table-column property="last_login" label="最后登录时间">
          <template slot-scope="{row}">
            <span>{{ row.lastLogin | formatDate('') }}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" width="200">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <i v-if="permissionData.indexOf('user_manage_detail_executable')!=-1" class="iconfont iconwenjianliebiao-chakan" @click="confirmEdit(row)" />
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
          @size-change="handleSizeChange($event, listQuery)"
          @current-change="handleCurrentChange($event, listQuery)"
        />
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="isdialog" title="查看" class="dialog" width="600px">
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
import { mapGetters } from 'vuex'
import { user_list, open_company_lists } from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if (time) { return moment(time).format('YYYY-MM-DD HH:mm:ss') }
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      equipArr: ['', 'Android端', 'IOS端', 'PC端', 'Web端'],
      currentIndex: 0,
      // 是否编辑
      isedit: false,
      selectId: 0,
      total: 0,
      companys: [],
      listQuery: { page_no: 1, page_size: 10, companyId: -1, keyword: '' }
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'
    ])
  },
  created() {
    open_company_lists().then(res => {
      this.total = res.data.length
      res.data.splice(0, 0, { companyId: '', shortName: '全部',count:res.attachment })
      this.companys = res.data
      this.listapi = user_list

      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id
        this.getListDataLx({ page_no: 1, page_size: 10, companyId: this.companys[0].id, keyword: this.keywords }, user_list)
      }
    })
  },
  methods: {
    selectCompany(id, index) {
      this.listQuery.page_no = 1
      this.currentIndex = index
      this.listQuery.companyId = id
      this.getListDataLx(this.listQuery, user_list)
    },
    confirmEdit(row) {
      this.$router.push({ name: 'userInfo', query: { id: row.id }})
    },
    handleSearch() {
      this.listQuery.page_no = 1
      this.currentpage = 1
      this.getListDataLx(
        this.listQuery,
        user_list
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
  display: flex;
}
.app-content{
  margin-left:29px;
  overflow: hidden;
  flex: 1;
}
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
