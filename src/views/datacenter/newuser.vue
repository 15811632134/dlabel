<template>
  <div class="app-container">
    <div class="newUser_box">
      <div class="m_clearLR newUser_div newUser_child">
        <div class="m_floatL">
          <div class="column_01">总用户数</div>
          <div class="column_02">{{ currentDate }}</div>
        </div>
        <div v-if="registerTotals.ALL" class="m_floatR column_data">{{ (registerTotals.ALL/10000).toFixed(4) }}万</div>
      </div>
      <div class="m_clearLR newUser_div ">
        <div class="m_floatL">
          <div class="column_t_01">电脑端</div>
          <!-- <div class="column_date">昨日：222</div> -->
        </div>
        <div class="m_floatR column_data ">{{ registerTotals.PC }}</div>
      </div>
      <div class="m_clearLR newUser_div">
        <div class="m_floatL">
          <div class="column_t_01">安卓端</div>
          <!-- <div class="column_date">昨日：2222</div> -->
        </div>
        <div class="m_floatR column_data ">{{ registerTotals.AD }}</div>
      </div>
      <div class="m_clearLR newUser_div">
        <div class="m_floatL">
          <div class="column_t_01">苹果端</div>
          <!-- <div class="column_date">昨日：2222</div> -->
        </div>
        <div class="m_floatR column_data">{{ registerTotals.IOS }}</div>
      </div>
    </div>
    <div class="echarts-time">
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
      <div style="display:flex;">
        <!-- <ul>
          <li :class="dateType=='week'?'active':''" @click="screen('week')">一星期</li>
          <li :class="dateType=='month'?'active':''" @click="screen('month')">一个月</li>
          <li :class="dateType=='threemonth'?'active':''" @click="screen('threemonth')">三个月</li>
        </ul> -->
        <div class="echarts-date">
          <el-date-picker
            v-model="selectDate"
            :picker-options="pickerOptions"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="handleChange"
          />
          <em class="iconfont iconrilix" />
        </div>
      </div>
    </div>
    <div class="m_echarts_box">
      <div class="echarts-title m_clearLR">
        <div class="m_floatL title">新增用户
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>
                <span style="color:#2274e5">新增用户：</span><span>新注册的用户数</span>
              </div>
              <div>
                <span style="color:#2274e5">商户</span><span>指定显示某个友商新增用户数</span>
              </div>

            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
      </div>
      <div class="unitTitle">单位：个</div>
      <ve-line :data="chartData" :extend="extendOperate" />
    </div>
    <!-- <div class="echarts">
      <div class="echarts-title">
        <span>全部新增用户</span>
      </div>
      <ve-line :data="chartAllData" :extend="extendOperate"/>
    </div> -->
    <div class="datatable">
      <div class="table-export">
        <span>数据说明</span>
        <div class="export" @click="handleDownload">
          <i class="iconfont iconxiazai" />导出
        </div>
      </div>
      <el-table :data="tableList" border >
        <el-table-column prop="time" label="日期" />
        <el-table-column prop="pc" label="PC" />
        <el-table-column prop="android" label="Android" />
        <el-table-column prop="ios" label="iOS" />
        <!-- <el-table-column prop="web" label="WEB" /> -->
        <el-table-column prop="total" label="总计" />
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
import { registerDetail, registerDetails,registerList, open_company_list, register_total } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      dateType: '',
      listQuery: { companyId: '', startTime: '2019-8-9', endTime: '2019-8-9', type: 1, pageNo: 1, pageSize: 10 },
      exportData: [],
      selectExcelData: [],
      companys: [],
      registerTotals: {},
      currentDate: ''
    }
  },
  created() {
    this.currentDate = moment().format('YYYY-MM-DD')
    register_total().then(res => {
      this.registerTotals = res.data
    })
    open_company_list().then(res => {
      this.listapi = registerDetail
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getList()
    })
  },
  methods: {
    changeType() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.handleChange()
    },
    getList() {
    //   this.getListData(
    //   this.listQuery,
    //   registerDetail
    // )
    // this.queryAddUser(this.listQuery, registerList)
      this.screen('week')
    },
    screen(str) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.dateType = str
      this.chooseTime(str)
      this.getListData(
        this.listQuery,
        registerDetail
      )
      var temp = {
        type: this.listQuery.type,
        companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      }
      registerDetails(temp).then(res => {
        this.exportData = res.data.list
      })
      this.queryAddUser(this.listQuery, registerList)
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.getListData(
        this.listQuery,
        registerDetail
      )
      var temp = {
        type: this.listQuery.type,
        companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      }
      registerDetails(this.listQuery).then(res => {
        this.exportData = res.data.list
      })
      this.queryAddUser(this.listQuery, registerList)
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
        const tHeader = ['日期', '安卓', 'ios', 'pc', '总计', '总计', '总计', '总计']
        const filterVal = ['time', 'android', 'ios', 'pc', 'total', 'total', 'total', 'total']
        console.log(this.selectExcelData)
        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
          // styleFun: function(ws) { // 自定义样式
          //   for (const item in ws) {
          //     switch (item) {
          //       case '!merges':
          //         break
          //       case '!ref':
          //         break
          //       case 'A1':
          //         ws['A1'].s = {
          //           font: {
          //             sz: 13,
          //             bold: true,
          //             color: {
          //               rgb: 'FFFFAA00'
          //             }
          //           },
          //           alignment: {
          //             horizontal: 'center',
          //             vertical: 'center'
          //           }
          //         }
          //         break
          //       default:
          //         ws[item].s = {
          //           font: {
          //             sz: 13,
          //             bold: true
          //           },
          //           alignment: {
          //             horizontal: 'center',
          //             vertical: 'center'
          //           }
          //         }
          //     }
          //   }
          // }
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
</style>
