<template>
  <div class="app-container">
    <ul class="papercard">
      <li>
        <h3>
          日活跃用户
          <span>{{ today }}</span>
        </h3>
        <em>{{ activeList.dayActiveUser }}</em>
        <p>
          昨日：
          <span>
            <i :class="{'active':activeList.dayActivePersent&&activeList.dayActivePersent.indexOf('-')!=-1}"/>
            {{ (activeList.dayActivePersent.replace('-','')*100).toFixed(2) }}%
          </span>
        </p>
      </li>
      <li>
        <h3>
          周活跃用户

        </h3>
        <em>{{ activeList.weekActiveUser }}</em>
        <p>
          上周：
          <span>
            <i :class="{'active':activeList.weekActivePersent&&activeList.weekActivePersent.indexOf('-')!=-1}"/>
            {{ (activeList.weekActivePersent.replace('-','')*100).toFixed(2) }}%
          </span>
        </p>
      </li>
      <li>
        <h3>
          月活跃用户
        </h3>
        <em>{{ activeList.monthActiveUser }}</em>
        <p>
          上月：
          <span>
            <i :class="{'active': activeList.monthActivePersent&&activeList.monthActivePersent.indexOf('-')!=-1}" />
            {{ (activeList.monthActivePersent.replace('-','')*100).toFixed(2) }}%
          </span>
        </p>
      </li>
      <li>
        <h3>
          日活/周活
        </h3>
        <em>{{ (parseFloat(activeList.dayThanWeek)*100).toFixed(2) }}%</em>
        <!-- <p>
          环比：
          <span>
            <i :class="{'active':activeList.yesterdayThanWeek&&activeList.yesterdayThanWeek.indexOf('-')!=-1}"/>
            {{ activeList.yesterdayThanWeek }}%
          </span>
        </p> -->
      </li>
      <li>
        <h3>
          日活/月活
        </h3>
        <em>{{ ( parseFloat(activeList.dayThanMonth)*100).toFixed(2) }}%</em>
        <!-- <p>
          环比：
          <span>
            <i :class="{'active':activeList.yesterdayThanMonth&&activeList.yesterdayThanMonth.indexOf('-')!=-1}"  />
            {{ activeList.yesterdayThanMonth }}%
          </span>
        </p> -->
      </li>
    </ul>
    <div class="echarts-time">
      <div class="selectPartner" style="margin-right:32px;">
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
      <div style="display:flex">
        <div class="echarts-date">
          <el-date-picker
            v-model="time"
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
        <div class="m_floatL title">活跃度分析
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>
                <span style="color:#2274e5">活跃趋势：</span><span>时间区间段每日的活跃趋势图</span>
              </div>
              <div>
                <span style="color:#2274e5">活跃构成：</span><span>活跃用户中新增用户的占比比例</span>
              </div>
              <!-- <div>
                <span style="color:#2274e5">活跃粘度：</span><span>DAU/过去7日活跃用户，DAU/过去30日活跃用户</span>
              </div> -->
              <div>
                <span style="color:#2274e5">周活跃率：</span><span>周活跃用户占截止本周累计用户的比例</span>
              </div>
              <div>
                <span style="color:#2274e5">月活跃率：</span><span>月活跃用户占截止本月累计用户的比例</span>
              </div>
            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:481px">
            <li :class="listQuery.style==1&&dateStyle==1?'active':''" class="m_floatL" @click="changestyleType(1)" >活跃趋势</li>
            <li :class="listQuery.style==2&&dateStyle==1?'active':''" class="m_floatL" @click="changestyleType(2)" >活跃构成</li>
            <!-- <li :class="listQuery.style==3?'active':''" class="m_floatL" @click="changestyleType(3)" >活跃粘度</li> -->
            <li :class="dateStyle==2?'active':''" class="m_floatL" @click="changeCodeType(2)" >周活跃率</li>
            <li :class="dateStyle==3?'active':''" class="m_floatL" @click="changeCodeType(3)" >月活跃率</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle">单位：个</div>
      <ve-line :data="chartData" :extend="extendOperate" :settings="listQuery.style==2||listQuery.style==4?chartSettings:''" />
    </div>
    <!-- <div class="echarts">
      <div class="echarts-title">
        <span>全部用户活跃度分析</span>
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
      <el-table :data="tableList" border>
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
import VeLine from 'v-charts/lib/line.common'
import { activeTotal,activeDetails,activeList, activeDetail, open_company_list } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    this.chartSettings = {
      axisSite: { left: ['PC', 'Android', 'IOS', 'All'] },
      yAxisType: ['percent', 'normal']
    }
    return {
      activeList: [],
      dateType: '',
      dateStyle: 1,
      listQuery: { companyId: '', style: 1, code: 1, startTime: '2019-8-9', endTime: '2019-8-9', pageNo: 1, pageSize: 20 },
      companys: []
    }
  },
  created() {
    open_company_list().then(res => {
      this.listapi = activeDetail
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.chooseTime('week')
      this.getList()
      this.activeTotal()
    })
  },
  methods: {
    changestyleType(type) {
      this.listQuery.style = type
      this.listQuery.code = 1
      this.dateStyle = 1
      this.screen()
    },
    changeCodeType(type) {
      this.listQuery.style = 4
      this.listQuery.code = type
      this.dateStyle = type
      this.screen()
    },
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
      this.screen()
    },
    //  活跃度分析概况
    async activeTotal() {
      const res = await activeTotal()
      if (res.code === 100) {
        this.activeList = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    screen(str) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.dateType = str
      this.getListData(
        this.listQuery,
        activeDetail
      )
      this.getExport()
      this.queryAddUser(
        {
          companyId: this.listQuery.companyId,
          style: this.listQuery.style,
          code: this.listQuery.code,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        },
        activeList
      )
    },
    getExport() {
      var temp = {
        type: this.listQuery.type,
        style: this.listQuery.style,
        code: this.listQuery.code,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      }
      activeDetails(temp).then(res => {
        this.exportData = res.data.list
      })
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.listQuery.startTime = this.time[0]
      this.listQuery.endTime = this.time[1]
      this.getListData(
        this.listQuery,
        activeDetail
      )
      this.getExport()
      this.queryAddUser(
        this.listQuery,
        activeList
      )
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

      // this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '安卓', 'ios', 'pc', '总计']
        const filterVal = ['time', 'android', 'ios', 'pc', 'total']
        console.log(this.selectExcelData)
        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        })
        this.selectExcelData = []
        // this.downloadLoading = false;
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
.papercard {
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  margin: 0;
  padding:0;
  li {
    flex:1;
    position: relative;
    list-style: none;
    width: 290px;
    height: 194px;
    padding: 24px 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 40px 0px 40px;
    margin-bottom:40px;
    margin-right:20px;
    h3 {
      margin: 0;
      font-size: 18px;
      color: #3c3c3c;
      font-weight: normal;
      span {
        font-size: 14px;
        color: #8f8f8f;
        margin-left: 24px;
      }
    }
    em {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: #3c3c3c;
      font-size: 40px;
      font-style: normal;
    }
    p {
      position: absolute;
      bottom: 24px;
      left: 32px;
      margin: 0;
      color: #3c3c3c;
      span {
        i {
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 9px solid #fc5c50;
          margin-right: 13px;
          &.active {
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 9px solid #55CD70;
            border-bottom: none;
          }
        }
      }
    }
    &:hover {
      box-shadow: 2px 10px 48px 0px rgba(224, 231, 236, 1),
        0px 4px 16px 0px rgba(216, 227, 235, 0.5);
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
