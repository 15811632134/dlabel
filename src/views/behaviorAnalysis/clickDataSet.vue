<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-content">
        <div class="fileBar_box">
          <div v-for="(item,index) in fileTexts" :class="barIndex==index?'active':''" :key="index" class="fileBar_div" @click="selectBarIndex(index)">{{ item }}</div>
        </div>
        <div class="filesearch filesearch_box">
          <div class="search searchFlex" style="justify-content: space-between;">
            <div class="search-list size">
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
            <div class="search" >
              <div class="search-list searchbtn">
                <el-button type="primary" class="m_search" @click="saveSet">保存</el-button>
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
          <el-table-column property="addTime" label="是否显示">
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#2274e5"
                  inactive-color="#ddd"
                />
              </div>
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
          <el-table-column property="addTime" label="是否显示">
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#2274e5"
                  inactive-color="#ddd"
                />
              </div>
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
          <el-table-column property="addTime" label="是否显示">
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#2274e5"
                  inactive-color="#ddd"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import { dataPoint_getTablesByPage, updateStatus } from '@/api/api'
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
    this.apis = [dataPoint_getTablesByPage, dataPoint_getTablesByPage, dataPoint_getTablesByPage]
    return {
      fileTexts: ['PC端', 'Android端', 'IOS端'],
      barIndex: 0,
      ruleForm: { equip: 1, description: '' },
      eqs: [{ id: 0, name: '其他' }, { id: 1, name: 'Android' }, { id: 2, name: 'IOS' }, { id: 3, name: 'PC' }, { id: 4, name: 'Web' }],
      rules: {},
      isdialog: true,
      isFocus: false,
      selectDate: [],
      modular: [{ id: 1, name: '标签管理页' }, { id: 2, name: '编辑页' }, { id: 3, name: '登录' }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isedit: false,
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
      listQuery: { pageNo: 1, pageSize: 10, mainModule: 1,equip:3 ,isFile:true}
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
    this.listapi = dataPoint_getTablesByPage
    this.getListDataFile(this.listQuery, dataPoint_getTablesByPage, this.tempData[this.barIndex])
  },
  methods: {
    saveSet() {
      var tempData = []
      var showIds = []
      var flaseIds = []
      tempData = this.barIndex === 0 ? this.tableLists.data1 : this.barIndex === 1 ? this.tableLists.data2 : this.tableLists.data3
      for (var i = 0; i < tempData.length; i++) {
        if (tempData[i].status === 1) {
          showIds.push(tempData[i].id)
        } else {
          flaseIds.push(tempData[i].id)
        }
      }
      updateStatus({ openIds: showIds.join(','), closeIds: flaseIds.join(','),equip:this.listQuery.equip }).then(res => {
        this.$message.success('保存成功')
      })
    },
    initData(e){
      this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
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
