<template>
  <div class="app-container">

    <div class="echarts-time" style="margin-top:32px;">
      <div style="display:flex;">
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
          <div class="equipment_title">
            访客：
          </div>
          <ul class="equipment_ul">
            <li v-for="(item,index) in users" :key="index" :class="userIndex===index?'active':''" @click="changeUser(index)">{{ item }}</li>
          </ul>
        </div>
        <div style="display:flex">
          <div class="equipment_title">
            设备：
          </div>
          <ul class="equipment_ul">
            <li v-for="(item,index) in equipArr" :key="index" :class="currentEquip===index?'active':''" @click="changeEquip(index)">{{ item }}</li>
          </ul>
        </div>
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
        <div>{{ analysisData.showUserCounts }}</div>
        <div>展现人数</div>
      </div>
      <div class="analysis_div">
        <div>{{ analysisData.showTimes }}</div>
        <div>展现量</div>
      </div>
       <div class="analysis_div">
        <div>{{ analysisData.clickTimes }}</div>
        <div>点击次数</div>
      </div>
      <div class="analysis_div">
        <div>{{ analysisData.clickUserCounts?analysisData.clickUserCounts:0 }}</div>
        <div>点击人数</div>
      </div>
      <div class="analysis_div">
        <div>{{ parseFloat(analysisData.clickRate*100).toFixed(2) }}%</div>
        <div>点击率</div>
      </div>
      <div class="analysis_div">
        <div>{{ analysisData.avgRate }}</div>
        <div>平均次数</div>
      </div>
    </div>
    <div class="pieLine_box">
      <div class="echarts-time betweenFlex" >
        <div >
          <label>指标：</label>
          <el-select v-model="listQuery.sort" class="filter-item" placeholder="请选择" @change="changeSort">
            <el-option
              v-for="item in analysisArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <div class="pieLine_div">
        <div class="pie_data">
          <div id="main" style="width: 450px;height:520px;"/>
        </div>
        <div class="line_data" style="margin-top:80px">
          <ve-line :data="chartData" :settings="isPecent?chartSettings:{}" :extend="extendOperate" />
        </div>
      </div>
    </div>
    <div class="datatable">
      <div class="retain_box" style="margin-top:0px">
        <el-table :data="analysisList" border>
          <el-table-column label="入口位置" width="381px">
            <template slot-scope="scope">
              <div class="threeDiv">
                <div>{{ scope.$index+1 }}</div>
                <div class="textLine">{{ scope.row.name }}</div>
                <div>{{ scope.row.equip }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="基础指标" >
            <el-table-column label="展现人数" >
              <template slot-scope="{row}">
                <div>{{ row.showUserCounts }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击人数" >
              <template slot-scope="{row}">
                <div>{{ row.clickUserCounts }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击次数" >
              <template slot-scope="{row}">
                <div>{{ row.clickTimes }}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="展现质量指标" >

            <el-table-column label="展现次数" >
              <template slot-scope="{row}">
                <div>{{ row.showTimes }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击次数" >
              <template slot-scope="{row}">
                <div>{{ row.clickTimes }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击率" >
              <template slot-scope="{row}">
                <div>{{ (row.clickRate*100).toFixed(2)+'%' }}</div>
              </template>
            </el-table-column>

          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
import moment from 'moment'
import VeLine from 'v-charts/lib/line.common'
import { advise_analysis, advise_index_line, advise_index_list, open_company_list, advise_total } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
import echarts from 'echarts'
export default {
  components: {
    VeLine,
    VueUeditorWrap
  },
  mixins: [datacenter],
  data() {
    this.chartSettings = {
      yAxisType: ['percent', 'normal']
    }
    return {
      testIndex: 0,
      msg:'',
      dateType: '',
      myChart: null,
      listQuery: { companyId: '', startTime: '2020-4-10', endTime: '2020-5-6', equip: 0, sort: 1, type: 0 },
      exportData: [],
      selectExcelData: [],
      isPecent: false,
      analysisData: {},
      analysisList: [],
      users: ['全部', '新访客', '老访客'],
      userIndex: 0,
      companys: [],
      currentEquip: 0,
      analysisArr: [{ id: 1, name: '展现量' }, { id: 2, name: '点击人数' }, { id: 4, name: '点击次数' }],
      equipArr: ['全部', '安卓', 'IOS', 'PC'],
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
      registerTotals: {},
      currentDate: '',
      tabltData: [{ name: 'qq', value: 10 }, { name: 'qqe', value: 21 }]
    }
  },
  created() {
    this.extendOperate.legend.type = 'scroll'
    this.chooseTime('week')
    advise_total().then(res => {
      this.analysisData = res.data
    })
    this.currentDate = moment().format('YYYY-MM-DD')


    // vip_register_list(this.listQuery).then(res => {
    //   const dataTime = res.data.xAxis
    //   const app = res.data.items
    //   this.chartData.rows = []

    //   this.chartData.columns = ['日期']
    //   for (let i = 0; i < dataTime.length; i++) {
    //     const obj = {}
    //     for (let j = 0; j < app.length; j++) {
    //       if (i === 0) {
    //         this.chartData.columns.push(app[j].name)
    //       }
    //       obj['日期'] = dataTime[i]
    //       obj[app[j].name] = app[j].data[i]

    //       // obj['PC'] = app[3].data[i]
    //       // obj['Android'] = app[1].data[i]
    //       // obj['IOS'] = app[2].data[i]
    //       // obj['WEB'] = app[4].data[i]
    //     }
    //     // allobj['日期'] = dataTime[i]
    //     // allobj['All'] = app[0].data[i]
    //     this.chartData.rows.push(obj)
    //   }
    // })
    open_company_list().then(res => {
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
    })

    this.initData()

    //  this.chartData = temp
  },
  methods: {
    // 改变平台刷新数据
    changeEquip(index) {
      this.currentEquip = index
      this.listQuery.equip = index
      this.testIndex = 0
      this.initData()
    },
    // 改变访客刷新数据
    changeUser(index) {
      this.userIndex = index
      this.listQuery.type = index
      this.initData()
    },
    initData() {
      this.changeSort()
      advise_index_list({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        type: this.listQuery.type }).then(res => {
        const temp = []
        for (const item in res.data) {
          temp.push({
            name: item,
            avgRate: res.data[item].avgRate,
            clickRate: res.data[item].clickRate,
            clickTimes: res.data[item].clickTimes,
            clickUserCounts: res.data[item].clickUserCounts,
            showTimes: res.data[item].showTimes,
            equip: res.data[item].equip,
            showUserCounts: res.data[item].showUserCounts
          })
        }

        this.analysisList = temp
        console.log(this.analysisList)
        console.log('this.analysisList')
      })
    },
    changeSort() {
      if (this.listQuery.sort === 3 || this.listQuery.sort === 5) { this.isPecent = true } else { this.isPecent = false }
      advise_analysis({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        sort: this.listQuery.sort,
        type: this.listQuery.type }).then(res => {
        var tempData = []
        for (const item in res.data) {
          tempData.push({
            name: item,
            value: res.data[item].count,
            rate: res.data[item].rate
          })
        }

        this.pieData = tempData
        var that = this
        setTimeout(() => {
          this.extendOperatePiec = {
            // title: {
            //   text: '版本分布',
            //   left: 64
            // },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {

              orient: 'vertical',
              type: 'scroll',
              scrollDataIndex: 0,
              top: 310,
              itemGap: 20,
              itemWidth: 10,
              itemHeight: 10,
              bottom: 20,
              data: this.legendData,
              textStyle: {
                color: '#77899c',
                rich: {
                  uname: {
                    width: 130
                  },
                  urate: {
                    width: 100
                  },
                  unum: {
                    // color: '#4ed139',
                    width: 40,
                    align: 'right'
                  }
                }
              },
              formatter: name => {
                var rate = ''
                let temp = ''
                for (let i = 0; i < this.pieData.length; i++) {
                  if (this.pieData[i].name === name) {
                    temp = this.pieData[i].value
                    rate = (this.pieData[i].rate * 100).toFixed(2) + '%'
                  }
                }

                if (name.length > 10) {
                  name = name.substring(0, 10) + '...'
                }
                return `{uname|${name}}{urate|${rate}}{unum|${temp}}`
                // return name + '                 ' + rate + '                 ' + temp
              }
            },
            series: [
              {
                name: '指标分布',
                clockWise: false,
                hoverAnimation: false,
                type: 'pie',
                data: this.pieData,
                radius: ['35%', '50%'],
                center: ['50%', '27%'],
                color: ['#F7EA5F', '#85B8FF', '#96FF75', '#F69A83', '#85FCCD', '#FF5B0A'],
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
          if (this.myChart) { this.myChart.dispose() }
          this.myChart = echarts.init(document.getElementById('main'))
          this.myChart.setOption(this.extendOperatePiec)
        }, 0)
      })
      advise_index_line({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        sort: this.listQuery.sort,
        type: this.listQuery.type }).then(res => {
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
      })
    },
    changeType() {
      this.handleChange()
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.initData()
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
