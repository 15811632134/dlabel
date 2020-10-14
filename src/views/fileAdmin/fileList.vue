<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-menu">
        <h3 v-if="companys.length>0">全部（{{ companys.length }}）</h3>
        <ul>
          <li
            v-for="(item,index) in companys"
            :class="currentIndex==index?'active':''"
            :key="index"
            class="textLine"
            @click="selectCompany(item.id,index)"
          >{{ item.shortName }}</li>
        </ul>
      </div>
      <div class="app-content">
        <div class="fileBar_box">
          <div v-for="(item,index) in fileTexts" :class="barIndex==index?'active':''" :key="index" class="fileBar_div" @click="selectBarIndex(index)">{{ item }}</div>
        </div>
        <div class=" filesearch filesearch_box">
          <!-- <div class="search">
          <el-input v-model="listQuery.name"  maxlength="20" placeholder="根据文件名搜索" @keyup.native.enter="handleSearch" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
          </el-input>
        </div> -->
          <div class="search searchFlex">
            <div v-show="barIndex==0" class="search-list">
              <span >文件名：</span>
              <el-input v-model="listQuery.name" maxlength="20" placeholder="请输入文件名" @keyup.native.enter="handleSearch" />
            </div>
            <div v-show="barIndex==0" class="search-list size" >
              <span>文件尺寸：</span>
              <el-input v-model="listQuery.width" maxlength="5" placeholder="40mm" @keyup.native.enter="handleSearch" />
              <div style="margin:0px 10px;">*</div>
              <el-input v-model="listQuery.height" placeholder="30mm" maxlength="5" @keyup.native.enter="handleSearch" />
            </div>
            <div class="search-list" >
              <span>创建者：</span>
              <el-input v-model="listQuery.phone" maxlength="20" placeholder="请输入创建者" @keyup.native.enter="handleSearch" />
            </div>
            <div class="search-list" >
              <span>时间：</span>
              <div class="echarts-time" style="marign-bottom:0px;">
                <div style="display:flex">
                  <div class="echarts-date">
                    <el-date-picker
                      v-model="selectDate"
                      :picker-options="pickerOptions"
                      type="daterange"
                      @change="changeDate"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    />
                    <em class="iconfont iconrilix" />
                  </div>
                </div>
              </div>
            </div>

            <div class="search" >
              <div class="search-list searchbtn">
                <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
                <div class="search-reset">
                  <el-button type="primary" @click="resetData"><i class="iconfont iconzhongzhimima" style="margin-right:5px;"/>重置</el-button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div v-show="barIndex==0" class="search">
            <div class="search-list searchbtn">
              <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
              <div class="search-reset">
                <el-button type="primary" @click="resetData"><i class="iconfont iconzhongzhimima" style="margin-right:5px;"/>重置</el-button>
              </div>
            </div>
          </div> -->
        </div>
        <el-table
          v-show="barIndex==0"
          ref="singleTable"
          :data="tableLists.data1"
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
          <el-table-column property="addTime" label="上传平台">
            <template slot-scope="{row}">
              <span>{{ checkEq(row.type)+(row.version?row.version:'') }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="上传时间">
            <template slot-scope="{row}">
              <span>{{ row.addTime | formatDate(row.addTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="下载" placement="top">
                <a class="iconfont iconxiazai" @click="download(row.file)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <i class="iconfont iconwenjianliebiao-chakan" @click="confirmEdit(row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-show="barIndex==1"
          ref="singleTable"
          :data="tableLists.data2"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
          <el-table-column type="index" label="序号" width="80"/>

          <el-table-column property="fileName" label="文件名" />
          <el-table-column label="文件大小">
            <template slot-scope="{row}">{{ parseInt(row.size/1024) }}kb</template>
          </el-table-column>
          <el-table-column property="phone" label="创建者" />
          <el-table-column property="addTime" label="上传平台">
            <template slot-scope="{row}">
              <span>{{ checkEq(row.type)+(row.version?row.version:'') }}</span>
            </template>
          </el-table-column>
          <el-table-column property="createTime" label="上传时间">
            <template slot-scope="{row}">
              <span>{{ row.createTime | formatDate(row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="下载" placement="top">
                <a class="iconfont iconxiazai" @click="download(row.ossFileUrl)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <i class="iconfont iconwenjianliebiao-chakan" @click="confirmEdit(row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-show="barIndex==2"
          ref="singleTable"
          :data="tableLists.data3"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
          <el-table-column type="index" label="序号" width="80"/>
          <el-table-column property="img" label="缩略图">
            <template slot-scope="{row}">
              <div class="thumbnail">
                <img :src="row.ossFileUrl" >
                <div class="edit">
                  <i class="iconfont iconfangdachakan" @click="enlargeImage(row.ossFileUrl)" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="fileName" label="文件名" />
          <el-table-column label="文件尺寸">
            <template slot-scope="{row}">{{ parseInt(row.size/1024) }}kb</template>
          </el-table-column>
          <el-table-column property="phone" label="创建者" />
          <el-table-column property="addTime" label="上传平台">
            <template slot-scope="{row}">
              <span>{{ checkEq(row.type)+(row.version?row.version:'') }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="上传时间">
            <template slot-scope="{row}">
              <span>{{ row.createTime | formatDate(row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="下载" placement="top">
                <a class="iconfont iconxiazai" @click="download(row.ossFileUrl)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <i class="iconfont iconwenjianliebiao-chakan" @click="confirmEdit(row)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-show="barIndex==3"
          ref="singleTable"
          :data="tableLists.data4"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
          <el-table-column type="index" label="序号" width="80"/>
          <el-table-column property="img" label="缩略图">
            <template slot-scope="{row}">
              <div class="thumbnail">
                <img :src="row.ossFileUrl" >
                <div class="edit">
                  <i class="iconfont iconfangdachakan" @click="enlargeImage(row.ossFileUrl)" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="fileName" label="文件名" />
          <el-table-column label="文件尺寸">
            <template slot-scope="{row}">{{ parseInt(row.size/1024) }}kb</template>
          </el-table-column>
          <el-table-column property="phone" label="创建者" />
          <el-table-column property="addTime" label="上传平台">
            <template slot-scope="{row}">
              <span>{{ checkEq(row.type)+(row.version?row.version:'') }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="上传时间">
            <template slot-scope="{row}">
              <span>{{ row.createTime | formatDate(row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="下载" placement="top">
                <a class="iconfont iconxiazai" @click="download(row.ossFileUrl)" />
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
            @size-change="handleSizeChangeFile"
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
          <div style="word-break: break-all;">{{ ruleForm.name||ruleForm.fileName }}</div>
        </el-form-item>
        <el-form-item v-show="barIndex!=1" label="缩略图：" class="backupload" prop="image">
          <img :src="ruleForm[strs[barIndex]]" class="picture" >
        </el-form-item>
        <el-form-item label="文件地址：" prop="name" class="version">
        <div style="word-break: break-all;">{{ ruleForm[strs[barIndex]] }}</div></el-form-item>
        <el-form-item
          label="文件尺寸："
          prop="name"
          class="version"
        >{{ ruleForm.width?ruleForm.width+'*'+ruleForm.height:parseInt(ruleForm.size/1024)+'kb' }}</el-form-item>
        <el-form-item label="上传平台：" prop="name" class="version">{{ checkEq(ruleForm.type)+(ruleForm.version?ruleForm.version:'') }}</el-form-item>
        <el-form-item label="上传时间：" prop="name" class="version">{{ ruleForm.addTime?ruleForm.addTime:ruleForm.createTime| formatDate(ruleForm.addTime||ruleForm.createTime) }}</el-form-item>
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
import { open_company_list, myclouddocList, clouddb_list, cloudlogo_list, cloudbgimage_list } from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if (!time) { return '' }
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    this.apis = [myclouddocList, clouddb_list, cloudlogo_list, cloudbgimage_list]
    return {
      fileTexts: ['标签文件', '标签数据库', '标签图片', '标签背景'],
      barIndex: 0,
      strs: ['img', 'ossFileUrl', 'ossFileUrl', 'ossFileUrl'],
      ruleForm: {},
      eqs: [{ id: 0, name: '其他' }, { id: 1, name: 'Android' }, { id: 2, name: 'IOS' }, { id: 3, name: 'PC' }, { id: 4, name: 'Web' }],
      rules: {},
      isedit: false,
      selectDate: [],
      currentIndex: 0,
      tempData: ['data1', 'data2', 'data3', 'data4'],
      companys: [],
      currentCid: -1,
      listQuery: { pageNo: 1, pageSize: 10, companyId: -1, phone: '', isFile: true }
    }
  },
  computed: {

    checkEq() {
      return function(index) {
        if (!index) { return '' }
        var name = ''
        for (var i = 0; i < this.eqs.length; i++) {
          if (this.eqs[i].id == index) {
            name = this.eqs[i].name
          }
        }
        return name
      }
    }
  },
  created() {
    this.chooseTime('week');
    open_company_list().then(res => {
      this.listapi = myclouddocList
      this.companys = res.data
      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id
        this.getListDataFile(this.listQuery, myclouddocList, this.tempData[this.barIndex])
      }
    })
  },
  methods: {
    changeDate(){
      this.listQuery.startTime = this.selectDate[0]
      this.listQuery.endTime = this.selectDate[1]
      this.handleSearch()
    },
    selectBarIndex(index) {
      this.resetTemp()
      this.barIndex = index
      this.listapi = this.apis[this.barIndex]
      this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
    },
    resetData() {
      this.listQuery.name = ''
      this.listQuery.width = ''
      this.listQuery.height = ''
      this.listQuery.phone = ''
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.handleSearch()
    },
    resetTemp() {
      this.listQuery.name = ''
      this.listQuery.width = ''
      this.listQuery.height = ''
      this.listQuery.phone = ''
      this.listQuery.pageNo = 1
      this.currentpage = 1
      // this.handleSearch()
    },
    selectCompany(id, index) {
      this.listQuery.pageNo = 1
      this.listQuery.pageSize = 10
      this.currentIndex = index
      this.listQuery.companyId = id
      this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
    },
    download(url) {
      location.href = url
    },
    confirmEdit(row) {
      this.isedit = true
      this.isdialog = true
      this.ruleForm = row
    },
    handleSearch() {
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.getListDataFile(
        this.listQuery,
        this.listapi,
        this.tempData[this.barIndex]
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.echarts-time .echarts-date .el-date-editor{
  height: 36px;
}
.echarts-time .echarts-date em{
  top:7px;
}
.signadmin {
    width: 100%;
    display: flex;
    // .app-menu{
    //   max-height: 1495px;
    //   ul{
    //     max-height: 1415px;
    //     /* overflow-y: scroll; */
    //     overflow-y: auto;
    //   }
    // }
    // /deep/.table .el-table__body-wrapper{
    //   min-height: 1200px;
    // }
    .app-content{
      margin-left:30px;
      flex: 1;
      overflow: hidden;
      .fileBar_box{
        z-index: 9;
        display: flex;
        justify-content: flex-start;
        position: relative;
        &>div:nth-child(2){
          opacity: 0.8;
        }
        &>div:nth-child(3){
          opacity: 0.6;
        }
        &>div:nth-child(4){
          opacity: 0.4;
        }
        .fileBar_div{
          padding-left: 23px;
          line-height: 56px;
          width:162px;
          margin-right: 8px;
          cursor: pointer;
          height:56px;
          background:rgba(34,116,229,1);
          border-radius:8px 8px 0px 0px;
          position: relative;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          &.active{
            color:#2274e5;
            background-color: #fff;
          }
          &.active::after{
            content: '';
            width:4px;
            position: absolute;
            left:0px;
            top:16px;
            height:22px;
            background-color: #2274e5;
          }
        }
      }
    }
}
.app-menu{
  margin-top:0px !important;
}
.filesearch_box{
  padding: 32px 0px 0px 24px;
  background-color: #fff;
  justify-content:flex-start;
  position: relative;
  z-index: 10;
  margin-bottom: 6px;
  box-shadow: 0px 0px  2px rgba(229, 229, 229, 1);
  .searchFlex{
    flex-flow: wrap;
    .search-list{
      max-width:400px;
      span{
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
