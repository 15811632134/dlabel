<template>
  <div class="app-container">
    <div class="echarts-time">
      <div style="display:flex">
        <div class="channel">
          <label>平台：</label>
          <el-select v-model="listQuery.equip" placeholder="请选择" @change="queryData">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="selectPartner" style="margin-right:32px">
          <label>商户：</label>
          <el-select v-model="listQuery.companyId" class="filter-item" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.shortName"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div style="display:flex">
        <div class="echarts-date">
          <el-date-picker
            v-model="time"
            :picker-options="pickerOptions"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="queryData"
          />
          <em class="iconfont iconrilix" />
        </div>
      </div>
    </div>
    <div class="printrecord">
      <div class="sizerank">
        <h4>打印尺寸排名</h4>
        <el-table :data="sizeList" style="width: 100%">
          <el-table-column type="index" label="排名" width="80" />
          <el-table-column prop="size" label="尺寸" />
          <el-table-column prop="count" label="人数">
            <template slot="header" slot-scope="scope">
              <span
                :class="{'active' :listQuery.flag === 2}"
                class="number"
                @click="ChangeCount(2, scope.row)"
              >
                人数
                <i />
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="times" label="次数">
            <template slot="header" slot-scope="scope">
              <span
                :class="{'active' :listQuery.flag ===1}"
                class="number"
                @click="ChangeCount(1, scope.row)"
              >
                次数
                <i />
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="printrank">
        <h4>打印机排名</h4>
        <el-table :data="printuseList" style="width: 100%">
          <el-table-column type="index" label="排名" width="80" />
          <el-table-column prop="model" label="型号" />
          <el-table-column prop="count" label="人数">
            <template slot="header" slot-scope="scope">
              <span
                :class="{'active' :printflag ===2}"
                class="number"
                @click="ChangePrint(2, scope.row)"
              >
                人数
                <i />
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="times" label="次数">
            <template slot="header" slot-scope="scope">
              <span
                :class="{'active' :printflag === 1}"
                class="number"
                @click="ChangePrint(1, scope.row)"
              >
                次数
                <i />
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="datatable">

      <div class="table-export">
        <span>数据说明</span>
        <div class="export" @click="handleDownload">
          <i class="iconfont iconxiazai" />导出
        </div>
      </div>
      <el-table :data="tableList" border>
        <el-table-column prop="day" label="日期" />
        <el-table-column prop="printCount" label="打印数量" />
        <el-table-column prop="printTimes" label="打印次数" />
        <el-table-column prop="userCount" label="打印人数" />
        <el-table-column prop="avgCount" label="平均每人打印量" />
      </el-table>
    </div>
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
</template>

<script>
import moment from 'moment'
import VeLine from 'v-charts/lib/line.common'
import {
  totalprintDetail,
  totalprintPrintsize,
  totalprintPrintuse,
  open_company_list,
  totalprintDetails
} from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: 'Android'
        },
        {
          value: '2',
          label: 'IOS'
        },
        {
          value: '3',
          label: 'PC'
        }
        // {
        //   value: '4',
        //   label: 'WEB'
        // }
      ],
      value: '0',
      listQuery: { companyId: '', equip: '0', pageNo: 1, pageSize: 10, flag: 1, startTime: '2019-8-9', endTime: '2019-8-9', type: 7, companyId: '' },
      time: [],
      printflag: 1,
      // 打印尺寸排名
      sizeList: [],
      printuseList: [],
      companys: []
    }
  },
  created() {
    this.listapi = totalprintDetail
    this.listQuery.startTime = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD')
    this.listQuery.endTime = moment().format('YYYY-MM-DD')
    this.time[0] = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD')
    this.time[1] = moment().format('YYYY-MM-DD')
    this.getListData(
      this.listQuery,
      totalprintDetail
    )
    open_company_list().then(res => {
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getExport()
      this.totalprintPrintsize(1)
      this.totalprintPrintuse(1)
    })
  },
  methods: {
    changeType() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.queryData()
    },
    // 打印尺寸排名
    async totalprintPrintsize() {
      const res = await totalprintPrintsize(this.listQuery)
      if (res.code === 100) {
        this.sizeList = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 打印机排名
    async totalprintPrintuse() {
      const res = await totalprintPrintuse(this.listQuery)
      if (res.code === 100) {
        this.printuseList = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    // 表头查询
    ChangeCount(number) {
      this.listQuery.flag = number
      this.totalprintPrintsize()
    },
    ChangePrint(number) {
      this.printflag = number
      this.listQuery.flag = number
      this.totalprintPrintuse()()
    },
    changeDate(val) {
      this.listQuery.startTime = val[0]
      this.listQuery.endTime = val[1]
      this.queryData()
    },
    queryData() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.listQuery.startTime = this.time[0]
      this.listQuery.endTime = this.time[1]
      this.totalprintPrintsize()

      this.getListData(this.listQuery,
        totalprintDetail)
      this.getExport()
      this.totalprintPrintuse()
    },
    getExport() {
      var temp = {
        type: this.listQuery.type,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        flag: this.listQuery.flag,
        companyId: this.listQuery.companyId
      }
      totalprintDetails(temp).then(res => {
        this.exportData = res.data.list
      })
    },
    handleDownload() {
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
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '打印数量', '打印次数', '打印人数', '平均每人打印量']
        const filterVal = ['day', 'printCount', 'printTimes', 'userCount', 'avgCount']
        console.log(this.selectExcelData)

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

<style lang="scss" scoped>
.printrecord {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  .sizerank {
    width: 50%;
    padding-right: 16px;
    box-sizing: border-box;
  }
  .printrank {
    width: 50%;
    box-sizing: border-box;
    padding-left: 16px;
  }
  h4 {
    color: #3c3c3c;
    font-size: 18px;
    font-weight: normal;
  }
}
.channel {
  label {
    color: #3c3c3c;
    font-size: 16px;
    margin-right: 16px;
  }
  .el-select {
    width: 160px;
    margin-right: 32px;
  }
  /deep/ input {
    height: 40px;
    line-height: 40px;
  }
}
.number {
  cursor: pointer;
  i {
    position: relative;
    margin-left: 5px;
    &:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      bottom: 8px;
      border-width: 0 5px 5px;
      border-style: solid;
      border-color: transparent transparent #c3c3c3;
    }
    &:before {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      bottom: 0;
      border-width: 5px 5px 0 5px;
      border-style: solid;
      border-color: #c3c3c3 transparent transparent transparent;
    }
  }
  &.active {
    i {
      &:after {
        border-color: transparent transparent #2274e5;
      }
      &:before {
        border-color: #2274e5 transparent transparent transparent;
      }
    }
  }
}
</style>
