<template>
  <div class="app-container">
    <div class="echarts-time">
      <div class="selectPartner" style="margin-right:32px">
        <label>平台：</label>
        <el-select v-model="listQuery.equip" class="filter-item" placeholder="请选择" @change="changeType">
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
        <div class="m_floatL title">渠道列表
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>
                <span style="color:#2274e5">平台：</span><span>有显示某个平台的渠道数据</span>
              </div>
              <div>
                <span style="color:#2274e5">时间：</span><span>没显示某段时间的渠道数据</span>
              </div>
              <div>
                <span style="color:#2274e5">新增用户：</span><span>显示某个平台和时间段的新增用户数量</span>
              </div>
              <div>
                <span style="color:#2274e5">活跃用户：</span><span>显示某个平台和时间段的活跃用户数量</span>
              </div>
              <div>
                <span style="color:#2274e5">启动次数：</span><span>显示某个平台和时间段的启动用户数量</span>
              </div>
            </div>
            <i class="iconfont iconbianzu2 m_style_icon"/>
          </el-tooltip>
        </div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:481px">
            <li :class="listQuery.type==1?'active':''" class="m_floatL" @click="changeChannelType(1)" >新增用户</li>
            <li :class="listQuery.type==2?'active':''" class="m_floatL" @click="changeChannelType(2)" >活跃用户</li>
            <li :class="listQuery.type==3?'active':''" class="m_floatL" @click="changeChannelType(3)" >启动次数</li>
            <li :class="listQuery.type==9?'active':''" class="m_floatL" @click="changeChannelType(9)" >次日留存</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle">单位：个</div>
      <ve-line :data="chartData" :extend="extendOperate"/>
    </div>
    <div class="channel_box">
      <div class="channel_title">
        <span>数据渠道</span>
        <el-tooltip placement="right" popper-class="tooltipStyle">
          <div slot="content" class="tooltipContent">
            <div>
              <span style="color:#2274e5">新增用户：</span><span>首次注册过应用的用户</span>
            </div>
            <div>
              <span style="color:#2274e5">活跃用户：</span><span>启动过应用的用户（去重），启动过一次的用户即视为活跃用户，包括新用户与老用户</span>
            </div>
            <div>
              <span style="color:#2274e5">累计用户(%)：</span><span>截止到现在，注册过应用的所有独立用户</span>
            </div>
          </div>
          <i class="iconfont iconbianzu2 m_style_icon"/>
        </el-tooltip>
      </div>
      <div class="retain_box">
        <el-table :data="tableList" :default-sort = "{prop: 'total', order: 'descending'}" border>
          <el-table-column prop="name" label="渠道名称" />
          <el-table-column prop="register" label="新增" sortable />
          <el-table-column prop="active" label="活跃" sortable />
          <el-table-column label="累计" sortable prop="total" >
            <template slot-scope="scope">
              <div>{{ scope.row.total }}({{ (scope.row.persent*100).toFixed(2)+'%' }})</div>
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
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { channel_list, open_company_list, channel_total } from '@/api/api'
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
      listQuery: { equip: 0, startTime: '2020-4-13', endTime: '2020-4-14', type: 1, pageNo: 1, pageSize: 10 },
      exportData: [],
      selectExcelData: [],
      companys: []
    }
  },
  created() {
    open_company_list().then(res => {
      this.listapi = channel_total
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getList()
    })
  },
  methods: {
    async getListDataChannel(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        this.tableList = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    changeChannelType(type) {
      this.listQuery.type = type
      this.screen('week')
    },
    changeType() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.handleChange()
    },
    getList() {
      this.chooseTime('week')
      this.screen()
      this.getListDataChannel(
        {
          equip: this.listQuery.equip,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        },
        channel_total
      )

      // this.queryAddUser(this.listQuery, channel_list)
    },
    screen(str) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.dateType = str
      this.getListDataChannel(
        {
          equip: this.listQuery.equip,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        },
        channel_total
      )
      var temp = {
        equip: this.listQuery.equip,
        type: this.listQuery.type,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      }
      this.queryRetain(temp, channel_list)
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.getListDataChannel(
        {
          equip: this.listQuery.equip,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        },
        channel_total
      )
      var temp = {
        equip: this.listQuery.equip,
        type: this.listQuery.type,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      }
      this.queryRetain(temp, channel_list)
    },
    async queryRetain(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartData.rows = []

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

          console.log(this.chartData)
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
