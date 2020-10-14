<template>
  <div class="app-container">
    <div class="signadmin">
    <div class="app-menu">
      <h3>全部（{{companys.length}}）</h3>
      <ul>
        <li v-for="(item,index) in companys" :class="currentIndex==index?'active':''" :key="index" class="textLine" @click="selectCompany(item.id,index)">{{item.shortName}}</li>
      </ul>
    </div>
    <div class="app-content">
      <div class=" filesearch">
      <!-- <div class="search">
        <el-input v-model="listQuery.name"  maxlength="20" placeholder="根据文件名搜索" @keyup.native.enter="handleSearch" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div> -->
      <div class="search searchFlex">
      <div class="search-list">
        <span style="width:56px;margin-right:18px;">文件名：</span>
        <el-input v-model="listQuery.name"  maxlength="20" placeholder="请输入文件名" />
      </div>
      <div class="search-list size">
        <span style="width:70px;margin-left:56px;margin-right:18px;">文件尺寸：</span>
        <el-input v-model="listQuery.width" maxlength="5" placeholder="40mm" />
        <div style="margin:0px 10px;">*</div>
        <el-input v-model="listQuery.height" placeholder="30mm"  maxlength="5" />
      </div>
      <div class="search-list" >
        <span style="width:56px;margin-left:74px;margin-right:18px;">创建者：</span>
        <el-input v-model="listQuery.phone"  maxlength="20" placeholder="请输入创建者" />
      </div>


    </div>
    <div class="search">
        <div class="search-list searchbtn">
        <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
        <div class="search-reset">
          <el-button type="primary" @click="resetTemp"><i class="iconfont iconzhongzhimima" style="margin-right:5px;"></i>重置</el-button>
        </div>
      </div>
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
      <el-table-column property="img" label="缩略图">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.img" >
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.img)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="文件名" />
      <el-table-column label="文件尺寸">
        <template slot-scope="{row}">{{ row.width }}*{{ row.height }}</template>
      </el-table-column>
      <el-table-column property="phone" label="创建者" />
      <el-table-column property="addTime" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.addTime | formatDate(row.addTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a :href="row.file" class="iconfont iconxiazai" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="查看" placement="top">
            <i class="iconfont iconwenjianliebiao-chakan" @click="confirmEdit(row)" />
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
        <el-form-item label="文件地址：" prop="name" class="version">
          <div style="word-break: break-all;">{{ ruleForm.file }}</div></el-form-item>
        <el-form-item
          label="文件尺寸："
          prop="name"
          class="version"
        >{{ ruleForm.width }}*{{ ruleForm.height }}</el-form-item>
        <el-form-item label="上传时间：" prop="name" class="version">{{ ruleForm.addTime | formatDate(ruleForm.addTime) }}</el-form-item>
        <el-form-item label="创建者：" prop="name" class="version">
          <span>{{ ruleForm.phone }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import { myclouddocList ,open_company_list} from '@/api/api'
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
      companys:[],
      currentCid:-1,
      listQuery:{ pageNo: 1, pageSize: 10,companyId:-1,name:'',width:'',height:'',phone:''}
    }
  },
  computed: {},
  created() {
    open_company_list().then(res=>{
      this.listapi = myclouddocList
      this.companys = res.data

      if(this.companys.length>0){
        this.listQuery.companyId = this.companys[0].id
        this.getListData(this.listQuery, myclouddocList)
      }
    })
  },
  methods: {
    resetTemp() {
      this.listQuery.name = ''
      this.listQuery.width = ''
      this.listQuery.height = ''
      this.listQuery.phone = ''
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.handleSearch()
    },
    selectCompany(id,index){
      this.listQuery.pageNo = 1
      this.currentIndex = index
      this.listQuery.companyId = id
      this.getListData(this.listQuery, myclouddocList)
    },
    confirmEdit(row) {
      this.isedit = true
      this.isdialog = true
      this.ruleForm = row
    },
    handleSearch() {
        this.getListData(
          this.listQuery,
          myclouddocList
        )

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.signadmin {
    width: 100%;
    display: flex;
    .app-content{
      margin-left:30px;
      flex: 1;
      overflow: hidden;
    }
}
.app-menu{
  margin-top:0px !important;
}
.filesearch{
  justify-content:flex-start;

  .searchFlex{

    .search-list{
      span{
        // width:90px !important;
        text-align: left;
      }
    }
    .size{
      .el-input{
        width:120px;
      }
    }
  }
}
.search{
  .searchbtn{
    margin-left:0px !important;
  }
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #C3C3C3;
}
</style>
