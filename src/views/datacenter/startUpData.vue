<template>
  <div class="app-container">
    <ul class="papercard">
      <li>
        <h3>
          累计只启动一次用户

        </h3>
        <em style="margin-top:10px;">{{ activeList.totalCount }}</em>
      </li>
      <li>
        <h3>
          累计只启动一次用户比例
        </h3>
        <em style="margin-top:10px;">{{ (parseFloat(activeList.totalRate)*100).toFixed(2) }}%</em>
      </li>
      <li>
        <h3>
          近期只启动一次用户
        </h3>
        <em style="margin-top:10px;">{{ activeList.recentCount }}</em>
      </li>
      <li>
        <h3>
          近期只启动一次用户比例
        </h3>
        <em style="margin-top:10px;">{{ ( parseFloat(activeList.recentRate)*100).toFixed(2) }}%</em>
      </li>
    </ul>
    <div class="echarts-time">
      <div style="display:flex">
        <div class="selectPartner" style="margin-right:32px;">
          <label>平台：</label>
          <el-select
            v-model="listQuery.equip"
            class="filter-item"
            placeholder="请选择"
            @change="handleChange"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </div>
        <div class="channel">
          <label>版本：</label>
          <el-select v-model="listQuery.version" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in versions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </div>

      <div style="display:flex">
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
        <div class="m_floatL title">只启动一次
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>
                <span style="color:#2274e5">只启动一次用户：</span><span>用户仅在安装日启动，在后续时间（次2日~次90日）内均无启动行为的用户。该指标可以反映出新增用户的质量以及与应用的匹配度</span>
              </div>
              <div>
                <span style="color:#2274e5">累计只启动一次用户：</span><span>截止至上上周六的新增安装用户对应的只启动一次的用户总数（每周三更新）</span>
              </div>
              <div>
                <span style="color:#2274e5">累计只启动一次用户比例：</span><span>截止至上上周六的新增安装用户对应的只启动一次的用户占比（每周三更新）</span>
              </div>
              <div>
                <span style="color:#2274e5">近期只启动一次用户：</span><span>90天前至30天前的新增安装对应的只启动一次用户总数</span>
              </div>
              <div>
                <span style="color:#2274e5">近期只启动一次比例：</span><span>90天前至30天前的新增安装对应的只启动一次用户占时段内总安装的比例</span>
              </div>
            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
      </div>
      <div class="unitTitle">单位：次数</div>
      <ve-line :data="chartData" :extend="extendOperate" />
    </div>
    <div class="m_echarts_box" style="margin-top:32px">
      <div class="echarts-title m_clearLR">
        <div class="m_floatL title">启动次数
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>距离今天越近的日期只启动一次用户比</div>
              <div>
                <span style="color:#2274e5">启动次数：</span><span>打开应用视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动。</span>
              </div>
              <div>
                <span style="color:#2274e5">启动次数占比：</span><span>某日/周/月的启动次数占所选时间段总启动次数的比例。</span>
              </div>
              <div>
                按天、周或月查看数据可进行版本、平台的交叉筛选。周区间定义为周日至次周周六。按周（按月）显示时，界面上用每周的周日（每个月的第一日）来代表该周（该月）
              </div>
            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
      </div>
      <div class="unitTitle">单位：次数</div>
      <ve-line :data="chartDataCS" :extend="extendOperate" />
    </div>
    <div class="datatable" style="min-height:300px;">
      <div class="table-export">
        <span style="color:#2274e5;cursor: pointer;" @click="openHiddenData">隐藏明细数据<i style="margin-left:5px" class="el-icon-arrow-down"/></span>
        <div class="export" @click="handleDownload">
          <i class="iconfont iconxiazai" />导出
        </div>
      </div>
      <div v-show="openHidden" class="retain_box" style="margin-top:0px">
        <el-table :data="tableList" border>
          <el-table-column prop="time" label="日期" />
          <el-table-column prop="count" label="启动次数" />
          <el-table-column prop="rate" label="启动次数占比" >
            <template slot-scope="scope">
              <div>{{ (scope.row.rate*100).toFixed(2)+'%' }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { loadtimes_total, loadtimes_list, loadtimes_detail, open_company_list, loadtimes_lists, loadtimes_version_list } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      activeList: {},
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
      listQuery: { equip: 0, version: '全部', startTime: '2020-4-13', endTime: '2020-4-15' },
      companys: [],
      openHidden: true,
      versions: [],
      chartDataCS: {
        columns: [],
        rows: []
      }
    }
  },
  created() {
    loadtimes_version_list({
      equip: this.listQuery.equip,
      startTime: this.listQuery.startTime,
      endTime: this.listQuery.endTime }).then(res => {
      this.versions = res.data
      this.versions.splice(0, 0, '全部')
      open_company_list().then(res => {
        // this.listapi = activeDetail
        this.companys = res.data
        this.companys.splice(0, 0, { id: '', shortName: '全部' })
        this.getList()
        this.activeTotal()
      })
    })
  },
  methods: {
    openHiddenData() {
      this.openHidden = !this.openHidden
    },
    queryData() {
      this.screen()
    },
    changestyleType(type) {
      this.listQuery.style = type
      this.screen('week')
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
      this.chooseTime('week')
      this.screen()
    },
    //  活跃度分析概况
    async activeTotal() {
      const res = await loadtimes_total()
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
    screen() {
      // this.getListData(
      //   this.listQuery,
      //   activeDetail
      // )
      // this.chooseTime(str)
      loadtimes_detail({ startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        this.tableList = res.data
      })
      this.getExport()
      // this.queryAddUser(
      //   { equip: this.listQuery.equip, version: this.listQuery.version === '全部' ? '' : this.listQuery.version, startTime: this.listQuery.startTime, endTime: this.listQuery.endTime },
      //   loadtimes_lists
      // )
      loadtimes_lists({ equip: this.listQuery.equip,
        version: this.listQuery.version === '全部' ? '' : this.listQuery.version,
        startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartData.rows = []

        this.chartData.columns = ['日期']
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
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
        }
      })

      loadtimes_list({ equip: this.listQuery.equip,
        version: this.listQuery.version === '全部' ? '' : this.listQuery.version,
        startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartDataCS.rows = []

        this.chartDataCS.columns = ['日期']
        this.chartAllData.rows = []
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
          for (let j = 0; j < app.length; j++) {
            if (i === 0) {
              this.chartDataCS.columns.push(app[j].name)
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
          this.chartDataCS.rows.push(obj)
        }
      })
    },
    getExport() {
      loadtimes_detail({ startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        this.exportData = res.data
      })
    },
    handleChange() {
      // this.currentpage = 1
      // this.listQuery.pageNo = 1
      this.changeTime()
      loadtimes_detail({ startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        this.tableList = res.data
      })
      loadtimes_lists({ equip: this.listQuery.equip,
        version: this.listQuery.version === '全部' ? '' : this.listQuery.version,
        startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartData.rows = []

        this.chartData.columns = ['日期']
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
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
        }
      })
      loadtimes_list({ equip: this.listQuery.equip,
        version: this.listQuery.version === '全部' ? '' : this.listQuery.version,
        startTime: this.listQuery.startTime, endTime: this.listQuery.endTime }).then(res => {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartDataCS.rows = []

        this.chartDataCS.columns = ['日期']
        this.chartAllData.rows = []
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
          for (let j = 0; j < app.length; j++) {
            if (i === 0) {
              this.chartDataCS.columns.push(app[j].name)
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
          this.chartDataCS.rows.push(obj)
        }
      })
      this.getExport()
      // this.queryAddUser(
      //   { equip: this.listQuery.equip, version: this.listQuery.version === '全部' ? '' : this.listQuery.version, startTime: this.listQuery.startTime, endTime: this.listQuery.endTime },
      //   loadtimes_lists
      // )
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

      // this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '启动次数', '启动次数占比']
        const filterVal = ['time', 'count', 'rate']
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
    position: relative;
    list-style: none;
    width: 290px;
    height: 194px;
    padding: 24px 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 40px 0px 40px;
    margin-bottom:40px;
    margin-right:20px;
    width:365px;
height:156px;
background:rgba(255,255,255,1);
box-shadow:2px 10px 48px 0px rgba(224,231,236,1),0px 4px 16px 0px rgba(216,227,235,0.5);
border-radius:0px 40px 0px 40px;
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
