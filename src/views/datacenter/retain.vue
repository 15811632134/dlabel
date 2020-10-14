<template>
  <div class="app-container">
    <div class="echarts-time">
      <div class="selectPartner" style="margin-right:32px">
        <label>平台：</label>
        <el-select v-model="listQuery.equip" class="filter-item" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </div>
      <div style="display:flex;">
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
        <div class="m_floatL title">留存用户
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>
                <span style="color:#2274e5">留存率：</span><span>某段时间内的新增用户（活跃用户），经过一段时间后，又继续使用应用的比例</span>
              </div>
              <div>
                <span style="color:#2274e5">留存数：</span><span>某段时间内的新增用户（活跃用户），经过一段时间后，又继续使用应用的用户数</span>
              </div>
            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:241px">
            <li :class="listQuery.type==10?'active':''" class="m_floatL" @click="changeRarnType(10)" >新增用户</li>
            <li :class="listQuery.type==11?'active':''" class="m_floatL" @click="changeRarnType(11)" >活跃用户</li>
          </ul>
          <ul class="m_data_ul m_clearLR m_floatL" style="width:190px">
            <li :class="listQuery.range==1?'active':''" class="m_floatL" style="width:63px;" @click="changeRangeType(1)">日</li>
            <li :class="listQuery.range==2?'active':''" class="m_floatL" style="width:63px;" @click="changeRangeType(2)">周</li>
            <li :class="listQuery.range==3?'active':''" class="m_floatL" style="width:63px;" @click="changeRangeType(3)">月</li>
          </ul>
          <ul class="m_data_ul m_clearLR m_floatL" style="width:241px">
            <li :class="listQuery.rate==1?'active':''" class="m_floatL" @click="changeRateType(1)" >留存率</li>
            <li :class="listQuery.rate==2?'active':''" class="m_floatL" @click="changeRateType(2)" >留存数</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle">单位：人</div>
      <ve-line :data="chartData" :extend="extendOperate"/>
    </div>
    <div v-if="counts>0" class="retain_box">
      <el-table
        :data="list.list"
        element-loading-text="Loading"
        border
        class="table"
      >
        <el-table-column
          v-for="(item,index) in counts"
          :key="index"
          width="200px"
          align="right" >
          <template slot="header" slot-scope="scope">
            <div>{{ list&&list.line[scope.$index] }}</div>
          </template>
          <template slot-scope="scope">
            <div v-if="index>1&&listQuery.rate==2&&scope.row.count[index]" :class="scope.row.count[index]&&scope.row.count[index].rate==1?'top1':scope.row.count[index]&&scope.row.count[index].rate>=0.5?'top2':''" class="top_box">
              <div class="top3">{{ scope.row.count[index]&&scope.row.count[index].count }}</div>
              <div class="top4">({{ parseFloat(scope.row.count[index]&&scope.row.count[index].rate * 100).toFixed(2)+'%' }})</div>
            </div>
            <div v-else-if="index>1&&listQuery.rate==1&&scope.row.count[index]":class="scope.row.count[index]&&scope.row.count[index].rate==1?'top1':scope.row.count[index]&&scope.row.count[index].rate>=0.5?'top2':''" class="top_box">
              <div class="top3">{{ parseFloat(scope.row.count[index]&&scope.row.count[index].rate * 100).toFixed(2)+'%' }}</div>
              <div class="top4">({{ scope.row.count[index]&&scope.row.count[index].count }})</div>
            </div>
            <div v-else class="top_box">{{ scope.row.count[index]&&scope.row.count[index].count }}</div>
          </template>
        </el-table-column>
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
import { rentention_list, open_company_list, rentention_total } from '@/api/api'
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
      dateType: '',
      listQuery: { companyId: '', equip: 0, rate: 1, type: 10, range: 1, startTime: '2020-3-1', endTime: '2020-4-14', pageNo: 1, pageSize: 10 },
      exportData: [],
      selectExcelData: [],
      companys: [],
      list: [],
      counts: 0
    }
  },
  created() {
    open_company_list().then(res => {
      this.listapi = rentention_list
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getList()
    })
  },
  methods: {
    indexMethod(index) {
      this.currentIndex = index
      return index
    },
    changeRarnType(type) {
      this.listQuery.type = type
      this.handleChange()
    },
    changeRangeType(type) {
      this.listQuery.range = type
      this.handleChange()
    },
    changeRateType(type) {
      this.listQuery.rate = type
      this.handleChange()
    },
    changeType() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.handleChange()
    },
    getList() {
    //   this.getListDataRetain(
    //   this.listQuery,
    //   rentention_list
    // )
    // this.queryAddUser(this.listQuery, registerList)
      this.screen('week')
    },
    screen(str) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.dateType = str
      this.chooseTime(str)
      // this.getListDataRetain(
      //   this.listQuery,
      //   rentention_list
      // )
      rentention_total(this.listQuery).then(res => {
        if (this.listQuery.type === 10) { res.data.line.splice(0, 0, '新增用户') }
        if (this.listQuery.type === 11) { res.data.line.splice(0, 0, '活跃用户') }
        res.data.line.splice(0, 0, '时间')
        for (var i = 0; i < res.data.list.length; i++) {
          if (this.listQuery.type === 10) {
            res.data.list[i].count.splice(0, 0, { count: res.data.list[i].total, type: 1 })
          }
          if (this.listQuery.type === 11) {
            res.data.list[i].count.splice(0, 0, { count: res.data.list[i].total, type: 1 })
          }
          res.data.list[i].count.splice(0, 0, { count: res.data.list[i].time, type: 1 })
          if (i === 0) {
            this.counts = res.data.list[i].count.length
          }
        }
        this.list = res.data
      })
      this.queryRetain(this.listQuery, rentention_list)
    },
    async queryRetain(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartData.rows = []
        if (!res.data.xAxis) {
          this.chartData.columns = []
          return
        }
        this.chartData.columns = ['日期']
        this.chartAllData.rows = []
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
          const allobj = {}
          for (let j = 0; j < app.length; j++) {
            if (i === 0) {
              this.chartData.columns.push(app[j].name)
            }
            obj['日期'] = dataTime[i]
            obj[app[j].name] = app[j].data[i]

            // obj['PC'] = app[3].data[i]
            // obj['Android'] = app[1].data[i]
            // obj['IOS'] = app[2].data[i]
            // obj['WEB'] = app[4].data[i]
          }
          // allobj['日期'] = dataTime[i]
          // allobj['All'] = app[0].data[i]
          this.chartData.rows.push(obj)
          this.chartAllData.rows.push(allobj)
        }
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      // this.getListDataRetain(
      //   this.listQuery,
      //   rentention_list
      // )
      rentention_total(this.listQuery).then(res => {
        if (this.listQuery.type === 10) { res.data.line.splice(0, 0, '新增用户') }
        if (this.listQuery.type === 11) { res.data.line.splice(0, 0, '活跃用户') }
        res.data.line.splice(0, 0, '时间')
        for (var i = 0; i < res.data.list.length; i++) {
          if (this.listQuery.type === 10) {
            res.data.list[i].count.splice(0, 0, { count: res.data.list[i].total, type: 1 })
          }
          if (this.listQuery.type === 11) {
            res.data.list[i].count.splice(0, 0, { count: res.data.list[i].total, type: 1 })
          }
          res.data.list[i].count.splice(0, 0, { count: res.data.list[i].time, type: 1 })

          if (i === 0) {
            this.counts = res.data.list[i].count.length
          }
        }
        this.list = res.data
      })
      this.queryRetain(this.listQuery, rentention_list)
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
          }
        }).then(action => {})
        return
      }

      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '安卓', 'ios', 'pc', '总计']
        const filterVal = ['time', 'android', 'ios', 'pc', 'total']
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

<style lang="scss" scoped>
</style>
