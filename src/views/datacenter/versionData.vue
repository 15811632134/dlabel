<style lang="scss" scoped>
.table {
  background-color: #fff !important;
}
.versionData {
  // background-color: #fff;
  padding: 32px 40px;
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      width: 108px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(60, 60, 60, 1);
      line-height: 25px;
    }
    .right {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      display: flex;
      line-height: 40px;
    }
  }
  .content {
    margin-top: 24px;
    display: flex;
    justify-content: flex-start;
    .tableData {
      width: 860px;
    }
    .chartData {
      flex: 1;
    }
  }
}
</style>
<template>
  <div class="versionData">
    <div class="echarts-time">
      <div class="selectPartner" style="margin-right:32px">
        <label>平台：</label>
        <el-select
          v-model="listQuery.equip"
          class="filter-item"
          placeholder="请选择"
          @change="changeEq"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
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
            @change="changeEq"
          />
          <em class="iconfont iconrilix" />
        </div>
      </div>
    </div>
    <div class="m_echarts_box">
      <div class="echarts-title m_clearLR">
        <div class="m_floatL title">
          Top版本
          <el-tooltip placement="right" popper-class="tooltipStyle">
            <div slot="content" class="tooltipContent">
              <div>趋势图展示累计用户排名Top10版本的变化趋势</div>
              <div>
                <span style="color:#2274e5">新增用户：</span>
                <span>第一次启动应用的用户（以设备为判断标准）。</span>
              </div>
              <div>
                <span style="color:#2274e5">活跃用户：</span>
                <span>启动过应用的用户（去重），启动过一次的用户即视为活跃用户，包括新用户与老用户。</span>
              </div>
              <div>
                <span style="color:#2274e5">启动次数：</span>
                <span>打开应用视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动。</span>
              </div>
            </div>
          <i class="iconfont iconbianzu2 m_style_icon"/></el-tooltip>
        </div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:361px">
            <li
              :class="listQuery.type==1?'active':''"
              class="m_floatL"
              @click="changeVersionType(1)"
            >新增用户</li>
            <li
              :class="listQuery.type==2?'active':''"
              class="m_floatL"
              @click="changeVersionType(2)"
            >活跃用户</li>
            <li
              :class="listQuery.type==3?'active':''"
              class="m_floatL"
              @click="changeVersionType(3)"
            >启动次数</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle">单位：人</div>
      <ve-line :data="chartDataLine" :extend="extendOperateLine" />
    </div>
    <div class="m_echarts_box" style="margin-top:32px;">
      <div class="left ">版本分布</div>
      <!-- <div class="right">
        <div style="margin-right:16px">平台:</div>
        <el-select v-model="currentEq" class="filter-item" placeholder="请选择" @change="changeEq">
          <el-option v-for="item in eqList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div> -->
      <div class="content">
        <div class="tableData">
          <el-table
            ref="singleTable"
            :data="tableList"
            highlight-current-row
            style="width: 860px"
            class="table"
          >
            <el-table-column property="version" label="版本号" />
            <el-table-column label="占比">
              <template slot-scope="{row}">
                <div>
                  <span>{{ (row.percent*100).toFixed(2)+'%' }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column property="createTime" label="人数">
              <template slot-scope="{row}">
                <div>
                  <span>{{ row.count }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="chartData">
          <!-- <ve-ring :data="chartData" :extend="extendOperate"></ve-ring> -->
          <div id="main" style="width: 600px;height:400px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import echarts from 'echarts'
import moment from 'moment'
import { version_data_list, version_total } from '@/api/api'
import VeRing from 'v-charts/lib/ring.common'
export default {
  components: {
    VeRing,
    VeLine
  },
  data() {
    return {
      selectDate: [],
      tableList: [],
      options: [
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
      currentEq: 3,
      chartDataLine: {
        columns: ['日期', 'PC', 'Android', 'IOS'],
        rows: []
      },
      extendOperateLine: {
        legend: {
          left: 'left',
          top: 'bottom',
          itemWidth: 32,
          itemGap: 48
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 40,
          top: 30,
          containLabel: true
        },
        yAxis: {
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(33,148,246,0.2)'
            }
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#ffffff'
            }
          }
        }
      },
      eqList: [
        { id: 1, name: 'Android端' },
        { id: 2, name: 'IOS端' },
        { id: 3, name: 'PC端' }
      ],
      dateType: '',
      listQuery: {
        type: 1,
        startTime: '2020-4-01',
        endTime: '2020-4-14',
        equip: 1
      },
      exportData: [],
      selectExcelData: [],
      companys: [],
      extendOperate: {},
      chartData: {
        columns: ['日期', '访问用户'],
        rows: []
      },
      legendData: [],
      tabltData: []
    }
  },
  created() {
    this.listQuery.endTime = moment().format('YYYY-MM-DD')
    this.listQuery.startTime = moment().subtract(7, 'days').format('YYYY-MM-DD')
    this.selectDate = [this.listQuery.startTime, this.listQuery.endTime]
    this.changeEq()
  },
  methods: {
    changeVersionType(type) {
      this.listQuery.type = type
      this.changeEq()
    },
    changeType() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeEq()
    },
    async queryRetain(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartDataLine.rows = []

        this.chartDataLine.columns = ['日期']
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
          for (let j = 0; j < app.length; j++) {
            if(j>9)
              break
            if (i === 0) {
              this.chartDataLine.columns.push(app[j].name)
            }
            obj['日期'] = dataTime[i]
            obj[app[j].name] = app[j].data[i]
          }
          this.chartDataLine.rows.push(obj)
        }
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    changeTime() {
      this.startTime = this.selectDate[0]
      this.endTime = this.selectDate[1]
      this.listQuery.startTime = this.selectDate[0]
      this.listQuery.endTime = this.selectDate[1]
      this.selectDate = [this.startTime, this.endTime]
    },
    changeEq() {
      // version_total(this.listQuery).then(res => {
      // })
      this.changeTime()
      this.queryRetain(this.listQuery, version_total)
      version_data_list({ equip: this.listQuery.equip }).then(res => {
        this.tableList = res.data
        var temp = {
          columns: ['版本', '新增人数'],
          rows: []
        }
        var legend = [], table = []
        for (var item in this.tableList) {
          var data = {}
          legend.push(this.tableList[item].version)
          table.push({
            name: this.tableList[item].version,
            value: this.tableList[item].count
          })
          data['版本'] = this.tableList[item].version
          data['新增人数'] = this.tableList[item].count
          temp.rows.push(data)
        }
        this.tabltData = table
        this.legendData = legend
        var that = this
        setTimeout(() => {
          this.extendOperate = {
            title: {
              text: '版本分布',
              left: 64
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 50,
              itemGap: 20,
              bottom: 20,
              data: this.legendData,
              formatter: name => {
                let temp = ''
                for (let i = 0; i < this.tabltData.length; i++) {
                  if (this.tabltData[i].name === name) {
                    temp = this.tabltData[i].value
                  }
                }
                return name + ' -- ' + temp
              }
            },
            series: [
              {
                name: '版本分布',
                type: 'pie',
                data: this.tabltData,
                radius: [100, 150],
                center: ['45%', '50%'],
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }
          console.log(this.tabltData)
          console.log('this.tabltData')
          var myChart = echarts.init(document.getElementById('main'))
          myChart.setOption(this.extendOperate)
        }, 0)
        //  this.chartData = temp
      })
    }
  }
}
</script>

