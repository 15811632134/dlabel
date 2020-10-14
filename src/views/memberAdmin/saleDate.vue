<template>
  <div class="app-container">
    <div class="newUser_box">
      <div class="m_clearLR newUser_div newUser_child">
        <div class="m_floatL">
          <div class="column_01">今年收入</div>
          <!-- <div class="column_02">{{ currentDate }}</div> -->
        </div>
        <div v-if="overview.thisYearPrice||overview.thisYearPrice==0" class="m_floatR column_data_sale"><span>¥</span>{{ overview.thisYearPrice }}</div>
      </div>
      <div class="m_clearLR newUser_div ">
        <div class="m_floatL">
          <div class="column_t_01">总收入（今日）</div>
          <div class="column_date">昨日：{{ overview.yesterdayAllPrice }}</div>
        </div>
        <div class="m_floatR column_data_sale "><span>¥</span>{{ overview.todayAllPrice }}</div>
      </div>
      <div class="m_clearLR newUser_div">
        <div class="m_floatL">
          <div class="column_t_01">会员收入（今日）</div>
          <div class="column_date">昨日：{{overview.yesterdayMemPrice}}</div>
        </div>
        <div class="m_floatR column_data_sale "><span>¥</span>{{overview.todayMemPrice}}</div>
      </div>
      <div class="m_clearLR newUser_div">
        <div class="m_floatL">
          <div class="column_t_01">扩容收入（今日）</div>
          <div class="column_date">昨日：{{ overview.yesterdayPrice }}</div>
        </div>
        <div class="m_floatR column_data_sale"><span>¥</span>{{ overview.todaySpacePrice }}</div>
      </div>
    </div>
    <div class="echarts-time betweenFlex" >
      <div >
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
    <div class="analysis_box">
      <div class="analysis_div">
        <div><span style="font-size:22px">¥</span>{{ analysisData.allPrice }}</div>
        <div>总收入</div>
      </div>
      <div class="analysis_div">
        <div><span style="font-size:22px">¥</span>{{analysisData.memPrice}}</div>
        <div>会员收入</div>
      </div>
      <div class="analysis_div">
        <div>{{ (analysisData.memPercent*100).toFixed(2)+'%' }}</div>
        <div>会员占比</div>
      </div>
      <div class="analysis_div">
        <div><span style="font-size:22px">¥</span>{{ analysisData.spacePrice }}</div>
        <div>扩容收入</div>
      </div>
      <div class="analysis_div">
        <div>{{ (analysisData.spacePercent*100).toFixed(2)+'%' }}</div>
        <div>扩容占比</div>
      </div>
    </div>
    <div class="pieLine_box">
      <!-- <div class="echarts-time betweenFlex" >
        <div >
          <label>指标：</label>
          <el-select v-model="listQuery.companyId" class="filter-item" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in targetArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div> -->
      <div class="pieLine_div">
        <div class="pie_data" style="margin-left:-20px">
          <div class="pie-data-title">
            <div>平台</div>
            <div>占比</div>
            <div>总收入</div>
          </div>
          <div id="main" style="width: 450px;height:520px;"/>
        </div>
        <div class="line_data">
          <ve-line :data="chartData" :extend="extendOperate" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import VeLine from 'v-charts/lib/line.common'
import { getSalePriceStatisticsByCompanyId, open_company_list, getSalePriceStatistics } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
import echarts from 'echarts'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      dateType: '',
      listQuery: { companyId: '', startTime: '2020-4-10', endTime: '2020-5-11', timeRange: 5 },
      exportData: [],
      selectExcelData: [],
      companys: [],
      registerTotals: {},
      analysisData: {},
      overview: {},
      targetArr: [{ id: '', name: '总收入' }, { id: 0, name: '扩容收入' }, { id: 1, name: '扩容占比' }],
      equipArr: ['全部', 'Android', 'IOS', 'PC', '', '其他'],
      pieData: [],
      calcTotal: 0,
      // currentDate: '',
      tabltData: [{ name: 'qq', value: 10 }, { name: 'qqe', value: 21 }]
    }
  },
  created() {
    // this.currentDate = moment().format('YYYY-MM-DD')
    this.chooseTime('week')
    this.initData()
    open_company_list().then(res => {
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getList()
    })

    //  this.chartData = temp
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
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.initData()
    },
    initData() {
      getSalePriceStatistics().then(res => {
        this.overview = res.data
      })
      getSalePriceStatisticsByCompanyId(this.listQuery).then(res => {
        this.analysisData = res.data
        this.chartData.rows = []
        this.chartData.columns = ['日期', '全部', 'Android', 'PC', '其他']
        for (const item in res.data.androidDayMapList) {
          const obj = {}
          obj['日期'] = item
          obj['全部'] = res.data.allDayMapList[item]
          obj['Android'] = res.data.androidDayMapList[item]
          obj['PC'] = res.data.pcDayMapList[item]
          obj['其他'] = res.data.otherDayMapList[item]
          this.chartData.rows.push(obj)
        }
        var tempData = []
        for (const item in res.data.equipMap) {
          if (res.data.equipMap[item].equip === 0) {
            this.calcTotal = res.data.equipMap[item].pay_price
          } else {
            tempData.push({
              name: this.equipArr[res.data.equipMap[item].equip],
              value: res.data.equipMap[item].pay_price
            })
          }
        }
        this.pieData = tempData
        var that = this
        setTimeout(() => {
          this.extendOperatePie = {
            // title: {
            //   text: '版本分布',
            //   left: 64
            // },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              top: 350,
              itemGap: 20,
              itemWidth: 10,
              itemHeight: 10,
              bottom: 20,
              data: this.legendData,
              formatter: name => {
                let temp = ''
                for (let i = 0; i < this.pieData.length; i++) {
                  if (this.pieData[i].name === name) {
                    temp = this.pieData[i].value
                  }
                }
                if (name === '全部') {
                  name = name + '            '
                } else if (name === '其他') {
                  name = name + '             '
                } else if (name === 'PC') {
                  name = name + '               '
                } else if (name === 'Android') {
                  name = name + '      '
                }
                var rate = (((temp / this.calcTotal) * 100).toFixed(2) + '%')
                if (rate.length === 5) {
                  rate = rate + '          '
                } else if (rate.length === 6) {
                  rate = rate + '        '
                } else if (rate.length === 7) {
                  rate = rate + '      '
                }
                return name + '                 ' + rate + '                 ' + temp
              }
            },
            series: [
              {
                name: '销售指标',
                clockWise: false,
                hoverAnimation: false,
                type: 'pie',
                data: this.pieData,
                radius: ['35%', '50%'],
                center: ['50%', '27%'],
                color: ['#5364F2', '#F9924E', '#BE93FA', '#40CF03'],
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
          var myChart = echarts.init(document.getElementById('main'))
          myChart.setOption(this.extendOperatePie)
        }, 0)
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
        const tHeader = ['日期', '安卓', 'ios', 'pc', '总计']
        const filterVal = ['time', 'android', 'ios', 'pc', 'total']
        console.log(this.selectExcelData)

        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list',
          styleFun: function(ws) { // 自定义样式
            for (const item in ws) {
              switch (item) {
                case '!merges':
                  break
                case '!ref':
                  break
                case 'A1':
                  ws['A1'].s = {
                    font: {
                      sz: 13,
                      bold: true,
                      color: {
                        rgb: 'FFFFAA00'
                      }
                    },
                    alignment: {
                      horizontal: 'center',
                      vertical: 'center'
                    }
                  }
                  break
                default:
                  ws[item].s = {
                    font: {
                      sz: 13,
                      bold: true
                    },
                    alignment: {
                      horizontal: 'center',
                      vertical: 'center'
                    }
                  }
              }
            }
          }
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
