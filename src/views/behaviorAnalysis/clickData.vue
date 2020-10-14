<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-menu">
        <h3>全部（{{ companys.length }}）</h3>
        <ul>
          <li v-for="(item,index) in companys" :class="currentIndex==index?'active':''" :key="index" class="textLine" @click="selectCompany(item.id,index)">{{ item.shortName }}</li>
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
            <div class="search-list size" >
              <span >主模块：</span>
              <el-select
                v-model="listQuery.mainModule"
                filterable
                placeholder="请选择"
                style="width:320px"
                @change="initData"
              >
                <el-option
                  v-for="item in modular"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="search-list" style="margin-right:34px">
              <span>日期：</span>
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
          <div style="display:flex;">
            <div class="search">
              <div class="search-list searchbtn" @click="toSet">
                <div class="search-item">
                  <img src="@/assets/img/set.png" > <span style="margin-left:12px;">配置</span>
                </div>
              </div>
            </div>
            <div class="search" style="margin-left:12px;" @click="handleDownload">
              <div class="search-list searchbtn">
                <div class="search-item">
                  <i class="iconfont icondaochu" style="margin-right:5px;"/><span>导出</span>
                </div>
              </div>
            </div>
          </div>
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
          <el-table-column property="addTime" label="主模块">
            <template slot-scope="{row}">
              <span>{{ row.mainModule==1?'标签管理页':row.mainModule==2?'编辑页':'登录' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能模块">
            <template slot-scope="{row}">
              <span>{{ row.funcModuleName }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能说明">
            <template slot-scope="{row}">
              <span>{{ row.dataDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击次数">
            <template slot-scope="{row}">
              <span>{{ row.map.num }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击人数">
            <template slot-scope="{row}">
              <span>{{ row.map.userNum }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="占比">
            <template slot-scope="{row}">
              <span>{{row.map.percent}}</span>
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
          <el-table-column property="addTime" label="主模块">
            <template slot-scope="{row}">
              <span>{{ row.mainModule==1?'标签管理页':row.mainModule==2?'编辑页':'登录' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能模块">
            <template slot-scope="{row}">
              <span>{{ row.funcModuleName }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能说明">
            <template slot-scope="{row}">
              <span>{{ row.dataDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击次数">
            <template slot-scope="{row}">
              <span>{{ row.map.num }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击人数">
            <template slot-scope="{row}">
              <span>{{ row.map.userNum }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="占比">
            <template slot-scope="{row}">
              <span>{{row.map.percent}}</span>
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
          <el-table-column property="addTime" label="主模块">
            <template slot-scope="{row}">
              <span>{{ row.mainModule==1?'标签管理页':row.mainModule==2?'编辑页':'登录' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能模块">
            <template slot-scope="{row}">
              <span>{{ row.funcModuleName }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="功能说明">
            <template slot-scope="{row}">
              <span>{{ row.dataDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击次数">
            <template slot-scope="{row}">
              <span>{{ row.map.num }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="点击人数">
            <template slot-scope="{row}">
              <span>{{ row.map.userNum }}</span>
            </template>
          </el-table-column>
          <el-table-column property="addTime" label="占比">
            <template slot-scope="{row}">
              <span>{{row.map.percent}}</span>
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
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import { open_company_list, dataPoint_getDataByPage } from '@/api/api'
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
    this.apis = [dataPoint_getDataByPage, dataPoint_getDataByPage, dataPoint_getDataByPage]
    return {
      fileTexts: ['PC端', 'Android端', 'IOS端'],
      barIndex: 0,
      ruleForm: { equip: 1, description: '' },
      eqs: [{ id: 0, name: '其他' }, { id: 1, name: 'Android' }, { id: 2, name: 'IOS' }, { id: 3, name: 'PC' }, { id: 4, name: 'Web' }],
      rules: {},
      isdialog: true,
      isFocus: false,
      selectDate: [],
      modular: [{ id: '', name: '全部' },{ id: 1, name: '标签管理页' }, { id: 2, name: '编辑页' }, { id: 3, name: '登录' }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isedit: false,
      exportData: [],
      selectExcelData: [],
      buyTypes: [{ id: 1, name: '扩容' }, { id: 2, name: '会员' }],
      options: [
        {
          id: 0,
          label: '全部'
        },
        {
          id: 1,
          label: 'Android'
        },
        {
          id: 2,
          label: 'IOS'
        },
        {
          id: 3,
          label: 'PC'
        }
      ],
      currentIndex: 0,
      tempData: ['data1', 'data2', 'data3'],
      companys: [],
      currentCid: -1,
      listQuery: { pageNo: 1, pageSize: 10, companyId: -1, mainModule: '', equip: 3, isFile: true, startTime: '2020-4-20', endTime: '2020-5-6' }
    }
  },
  computed: {
    checkEq() {
      return function(index) {
        if (!index) { return '' }
        var name = ''
        for (var i = 0; i < this.eqs.length; i++) {
          if (this.eqs[i].id === index) {
            name = this.eqs[i].name
          }
        }
        return name
      }
    }
  },
  created() {
    this.initDate() // 初始化日期
    open_company_list().then(res => {
      this.listapi = dataPoint_getDataByPage
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id
        this.initData()
      }
    })
  },
  methods: {
    changeDate(){
      this.listQuery.startTime = this.selectDate[0]
      this.listQuery.endTime = this.selectDate[1]
      this.handleSearch()
    },
    toSet() {
      this.$router.push({ name: 'clickDataSet' })
    },
    initData() {
      this.getListDataFile(this.listQuery, dataPoint_getDataByPage, this.tempData[this.barIndex])
    },
    resetData() {
      this.listQuery.mainModule = 1
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.chooseTime('week')
      this.initData()
    },
    initDate() {
      this.selectDate[0] = moment()
        .subtract(6, 'days')
        .format('YYYY-MM-DD')
      this.selectDate[1] = moment().format('YYYY-MM-DD')
      this.listQuery.startTime = moment()
        .subtract(6, 'days')
        .format('YYYY-MM-DD')
      this.listQuery.endTime = moment().format('YYYY-MM-DD')
    },
    selectBarIndex(index) {
      this.listQuery.equip = index === 0 ? 3 : index === 1 ? 1 : 2
      this.resetTemp()
      this.barIndex = index
      this.listapi = this.apis[this.barIndex]
      this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
    },
    resetTemp() {
      this.listQuery.pageNo = 1
      this.currentpage = 1
    },
    selectCompany(id, index) {
      this.listQuery.pageNo = 1

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
    },
    handleDownload() {
      this.exportData = JSON.parse(JSON.stringify(this.tableLists[this.tempData[this.barIndex]]))
      if (this.exportData.length <= 0) {
        this.$message.error('不能导出空数据!')
        return
      }
      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '您确定要导出所有数据吗')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              done()
              this.selectExcelData = this.exportData
              this.handleDownload()
            } else {
              done()
            }
            instance.confirmButtonLoading = false
            console.log(done)
          }
        }).then(action => {})
        return
      }

      this.downloadLoading = true

      for(var i = 0 ; i < this.selectExcelData.length ; i ++){
        this.selectExcelData[i].mainModule==1?'标签管理页':this.selectExcelData[i].mainModule==2?'编辑页':'登录'
        this.selectExcelData[i].num=this.selectExcelData[i].map.num
        this.selectExcelData[i].userNum=this.selectExcelData[i].map.userNum
        this.selectExcelData[i].percent=this.selectExcelData[i].map.percent
      }
      console.log(this.selectExcelData)
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['主模块', '功能模块', '功能说明', '点击次数', '点击人数', '占比']
        const filterVal = ['mainModule', 'funcModuleName', 'dataDesc', 'num', 'userNum', 'percent']

        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        })
        this.selectExcelData = []
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            // eslint-disable-next-line no-undef
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
            opacity: 1;
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
