<template>
  <div class="app-container">
    <div class="memberData_headers">
      <div class="memberData_box active">
        <div class="memberData_top">
          <div class="title">总付费数</div>
          <div class="value">总用户数：{{ overview.total }}</div>
        </div>
        <div class="memberData_content">
          {{ overview.payTotal }}
        </div>
        <div class="memberData_footer">
          全部占比:{{ parseFloat(overview.totalRate*100).toFixed(2) }}%
        </div>
      </div>
      <div class="memberData_box ">
        <div class="memberData_top">
          <div class="title">会员用户数</div>
        </div>
        <div class="memberData_content">
          0
        </div>
        <div class="memberData_footer">
          全部占比:0%
        </div>
      </div>
      <div class="memberData_box ">
        <div class="memberData_top">
          <div class="title">扩容用户数</div>
        </div>
        <div class="memberData_content">
          {{ overview.extend }}
        </div>
        <div class="memberData_footer">
          全部占比: {{ parseFloat(overview.extendRate*100).toFixed(2) }}%
        </div>
      </div>
      <div class="memberData_box ">
        <div class="memberData_top">
          <div class="title">扩容+会员用户数</div>
        </div>
        <div class="memberData_content">
          {{ overview.extend }}
        </div>
        <div class="memberData_footer">
          全部占比:{{ parseFloat(overview.extendRate*100).toFixed(2) }}%
        </div>
      </div>
      <div class="memberData_box ">
        <div class="memberData_top">
          <div class="title">流失用户数</div>
        </div>
        <div class="memberData_content">
          {{ overview.loss }}
        </div>
        <div class="memberData_footer">
          全部占比:{{ parseFloat(overview.lossRate*100).toFixed(2) }}%
        </div>
      </div>
    </div>
    <div class="echarts-title m_clearLR">
      <div class="m_floatL title">数据趋势

        <el-tooltip placement="right" popper-class="tooltipStyle">
          <div slot="content" class="tooltipContent">
            <div>
              <span style="color:#2274e5">新增趋势：</span><span>显示会员新增和流失数据。</span>
            </div>
            <div>
              <span style="color:#2274e5">数据漏斗：</span><span>显示付费转化率。</span>
            </div>
            <div>
              <span style="color:#2274e5">入口分析：</span><span>：显示入口转化数据。</span>
            </div>
          </div>
          <i class="iconfont iconbianzu2 m_style_icon"/>
        </el-tooltip>
      </div>
    </div>
    <div class="echarts-time" style="margin-top:12px;">
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
    <div class="funnel_box">
      <div class="m_echarts_box" style="width:1100px">
        <div class="echarts-title m_clearLR">
          <div class="m_floatL title">新增趋势
            <!-- <el-tooltip placement="right" popper-class="tooltipStyle">
              <div slot="content" class="tooltipContent">
                <div>
                  <span style="color:#2274e5">新增用户：</span><span>新注册的用户数</span>
                </div>
                <div>
                  <span style="color:#2274e5">商户</span><span>指定显示某个友商新增用户数</span>
                </div>

              </div>
              <i class="iconfont iconbianzu2 m_style_icon"/>
            </el-tooltip> -->
          </div>
        </div>
        <div class="unitTitle">单位：个</div>
        <ve-line :data="chartData" :extend="extendOperate" />
      </div>
      <div class="funnel_right">
        <div class="funnel_header">
          <div class="title">数据漏斗</div>
          <div class="type">
            <label>类型：</label>
            <el-select v-model="listQueryFunnel.style" class="filter-item" placeholder="请选择" @change="changeType">
              <el-option
                v-for="(item,index) in styles"
                :key="index+1"
                :label="item"
                :value="index+1"
              />
            </el-select>
          </div>
        </div>
        <div class="totalConversion">
          <div class="left">
            <div>总转化率</div>
            <div>{{ parseFloat(funnelData.totalRate*100).toFixed(2) }}%</div>
          </div>
          <div class="right" style="margin-left:16px;">
            <!-- <ve-ring :data="chartData" :extend="extendOperate"></ve-ring> -->
            <div id="main_0" style="width: 50px;height:50px;"/>
          </div>
        </div>
        <div class="conversionStati">
          <div class="stati_content">
            <img src="@/assets/img/funnel.png" alt="">
            <img class="funnel_01" src="@/assets/img/funnel_01.png" alt="">
            <img class="funnel_02" src="@/assets/img/funnel_02.png" alt="">
            <img class="funnel_03" src="@/assets/img/funnel_03.png" alt="">
            <div class="top_01">
              <div>展现{{ styles[listQueryFunnel.style-1] }}</div>
              <div>{{ funnelData.showTimes }}</div>
            </div>
            <div class="top_02">
              <div>点击{{ styles[listQueryFunnel.style-1] }}</div>
              <div>{{ funnelData.visitTimes }}</div>
            </div>
            <div class="top_03">
              <div>购买{{ styles[listQueryFunnel.style-1] }}</div>
              <div>{{ funnelData.buyTimes }}</div>
            </div>
            <div class="top_04 m_tran50">
              <div>成交量</div>
              <div>{{ funnelData.successTimes }}</div>
            </div>
          </div>
          <div class="conversion_right">
            <div class="conversion_div">
              <div class="left">
                <!-- <ve-ring :data="chartData" :extend="extendOperate"></ve-ring> -->
                <div id="main_01" style="width: 50px;height:50px;"/>
              </div>
              <div class="right">
                <div>转化率</div>
                <div>{{ parseFloat(funnelData.showRate*100).toFixed(2) }}%</div>
              </div>
            </div>
            <div class="conversion_div">
              <div class="left">
                <!-- <ve-ring :data="chartData" :extend="extendOperate"></ve-ring> -->
                <div id="main_02" style="width: 50px;height:50px;"/>
              </div>
              <div class="right">
                <div>转化率</div>
                <div>{{ parseFloat(funnelData.visitRate*100).toFixed(2) }}%</div>
              </div>
            </div>
            <div class="conversion_div">
              <div class="left">
                <!-- <ve-ring :data="chartData" :extend="extendOperate"></ve-ring> -->
                <div id="main_03" style="width: 50px;height:50px;"/>
              </div>
              <div class="right">
                <div>转化率</div>
                <div>{{ parseFloat(funnelData.buyRate*100).toFixed(2) }}%</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!-- <div class="echarts">
      <div class="echarts-title">
        <span>全部新增用户</span>
      </div>
      <ve-line :data="chartAllData" :extend="extendOperate"/>
    </div> -->
    <div class="analysis_title">
      入口分析
    </div>
    <div class="analysis_box">
      <div class="analysis_div">
        <div>{{ analysisData.showTimes }}</div>
        <div>展现量</div>
      </div>
      <div class="analysis_div">
        <div>{{ analysisData.clickUserCounts }}</div>
        <div>点击人数</div>
      </div>
      <div class="analysis_div">
        <div>{{ parseFloat(analysisData.clickRate*100).toFixed(2) }}%</div>
        <div>点击率</div>
      </div>
      <div class="analysis_div">
        <div>{{ analysisData.clickTimes }}</div>
        <div>点击次数</div>
      </div>
      <div class="analysis_div">
        <div>{{ parseFloat(analysisData.bounceRate*100).toFixed(2) }}%</div>
        <div>跳出率</div>
      </div>
      <div class="analysis_div">
        <div>{{ showTime(analysisData.avgStayTime) }}</div>
        <div>平均访问时长</div>
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
          <ve-line :data="chartDataSort" :extend="extendOperate" :settings="isPecent?chartSettings:''"/>
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
            <el-table-column label="展现量" >
              <template slot-scope="{row}">
                <div>{{ row.showTimes }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击人数" >
              <template slot-scope="{row}">
                <div>{{ row.clickUser }}</div>
              </template>
            </el-table-column>
            <el-table-column label="点击率" >
              <template slot-scope="{row}">
                <div>{{ (row.clickRate*100).toFixed(2)+'%' }}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="展现质量指标" >
            <el-table-column label="点击次数" >
              <template slot-scope="{row}">
                <div>{{ row.clickTime }}</div>
              </template>
            </el-table-column>
            <el-table-column label="跳出率" >
              <template slot-scope="{row}">
                <div>{{ (row.bounceRate*100).toFixed(2)+'%' }}</div>
              </template>
            </el-table-column>
            <el-table-column label="付款人数" >
              <template slot-scope="{row}">
                <div>{{ row.payCount }}</div>
              </template>
            </el-table-column>
            <el-table-column label="平均访问时长" >
              <template slot-scope="{row}">
                <div>{{ showTime(row.avgTime) }}</div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import VeLine from 'v-charts/lib/line.common'
import { registerDetail, registerList, index_pie, index_list, index_line, analysis_list, vip_data_list, open_company_list, register_total, vip_total, vip_register_list } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
import echarts from 'echarts'
export default {
  components: {
    VeLine
  },
  filters: {
    filterAvg(time) {
      if (!time) { return '' }
      return moment(time).format('HH:mm:ss')
    }
  },
  mixins: [datacenter],
  data() {
    this.chartSettings = {
      yAxisType: ['percent', 'normal']
    }
    return {
      dateType: '',
      targetArr: [{ id: '', name: '总收入' }, { id: 0, name: '扩容收入' }, { id: 1, name: '扩容占比' }],
      listQueryFunnel: { companyId: '', startTime: '2020-4-10', endTime: '2020-5-6', equip: 0, style: 1 },
      listQuery: { companyId: '', startTime: '2020-4-10', endTime: '2020-5-6', equip: 0, sort: 1 },
      exportData: [],
      selectExcelData: [],
      analysisList: [],
      isPecent: false,
      companys: [],
      chartDataSort: {
        columns: ['日期', 'PC', 'Android', 'IOS', 'All'],
        rows: []
      },
      equipArr: ['全部', 'PC', '安卓'],
      equipArrObj: [{ id: 0, name: '全部' }, { id: 3, name: 'PC' }, { id: 1, name: '安卓' }],
      equipArrtest: ['全部', 'Android', 'IOS', 'PC', '', '其他'],
      analysisData: {},
      typeArr: ['启动图', '我的页面', '轮播图', '个人资料', '云文档', '保存'],
      overview: {},
      analysisArr: [{ id: 1, name: '展现量' }, { id: 2, name: '点击人数' }, { id: 4, name: '点击次数' }],
      extendOperatePiec: {},
      pieData: [],
      currentEquip: 0,
      funnelData: {},
      styles: ['次数', '人数'],
      registerTotals: {},
      currentDate: '',
      tabltData: [{ name: 'qq', value: 10 }, { name: 'qqe', value: 21 }]
    }
  },
  created() {
    this.chooseTime('week')
    this.currentDate = moment().format('YYYY-MM-DD')
    vip_total().then(res => {
      this.overview = res.data
    })
    register_total().then(res => {
      this.registerTotals = res.data
    })
    open_company_list().then(res => {
      this.listapi = registerDetail
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      // this.getList()
      this.initData()
    })
    //  this.chartData = temp
  },
  methods: {
    changeEquip(index) {
      this.currentEquip = index
      this.listQuery.equip = this.equipArrObj[index].id
      this.listQueryFunnel.equip = this.equipArrObj[index].id
      this.initData()
    },
    initPieData(data, dom, title) {
      this.extendOperatePie = {
        // title: {
        //   text: '版本分布',
        //   left: 64
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        xAxis: {
            // 现在坐标系刻度最大值、最小值
            axisLabel: {
                showMinLabel: true,
                showMaxLabel: true,
            },

        },
        legend: {
          show: false
          // type: 'scroll',
          // orient: 'vertical'
          // right: 10,
          // top: 50,
          // itemGap: 20,
          // bottom: 20
          // data: this.legendData
          // formatter: name => {
          //   let temp = ''
          //   for (let i = 0; i < this.tabltData.length; i++) {
          //     if (this.tabltData[i].name === name) {
          //       temp = this.tabltData[i].value
          //     }
          //   }
          //   return name + ' -- ' + temp
          // }
        },

        series: [
          {
            name: title,
            clockWise: false,
            hoverAnimation: false,
            type: 'pie',
            data: data,
            radius: [14, 20],
            center: ['45%', '50%'],
            color: ['#2274E5', '#EDEFF1'],
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
      var myChart = echarts.init(document.getElementById(dom))
      myChart.setOption(this.extendOperatePie)
    },

    initData() {
      this.changeSort()
      index_list({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip }).then(res => {
        const temp = []
        for (const item in res.data) {
          temp.push({
            name: item,
            avgTime: res.data[item].avgTime,
            bounceRate: res.data[item].bounceRate,
            clickRate: res.data[item].clickRate,
            clickTime: res.data[item].clickTime,
            clickUser: res.data[item].clickUser,
            equip: res.data[item].equip,
            payCount: res.data[item].payCount,
            showTimes: res.data[item].showTimes
          })
        }

        this.analysisList = temp
        console.log(this.analysisList)
        console.log('this.analysisList')
      })
      analysis_list(this.listQuery).then(res => {
        this.analysisData = res.data
      })
      vip_register_list(this.listQuery).then(res => {
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
          }
          this.chartData.rows.push(obj)
        }
      })
      vip_data_list(this.listQueryFunnel).then(res => {
        this.funnelData = res.data
        this.initPieData([{ value: res.data.totalRate, name: '总转化率' }, { value: 1 - res.data.totalRate, name: '反转化率' }], 'main_0', '总转化率')
        this.initPieData([{ value: res.data.showRate, name: '转化率' }, { value: 1 - res.data.showRate, name: '反转化率' }], 'main_01', '转化率')
        this.initPieData([{ value: res.data.visitRate, name: '转化率' }, { value: 1 - res.data.visitRate, name: '反转化率' }], 'main_02', '转化率')
        this.initPieData([{ value: res.data.buyRate, name: '转化率' }, { value: 1 - res.data.buyRate, name: '反转化率' }], 'main_03', '转化率')
      })
    },
    changeSort() {
      if (this.listQuery.sort === 3 || this.listQuery.sort === 5) { this.isPecent = true } else { this.isPecent = false }
      index_pie({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        sort: this.listQuery.sort }).then(res => {
        var tempData = []
        for (const item in res.data) {
          tempData.push({
            name: res.data[item].name,
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
              type: 'scroll',
              orient: 'vertical',
              top: 300,
              itemGap: 20,
              itemWidth: 10,
              itemHeight: 10,
              bottom: 20,
              data: this.legendData,
              textStyle: {
                color: '#77899c',
                rich: {
                  uname: {
                    width: 100
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
                    temp = this.listQuery.sort == 6 ? this.showTime(this.pieData[i].value) : this.pieData[i].value
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
          var myChart = echarts.init(document.getElementById('main'))
          myChart.setOption(this.extendOperatePiec)
        }, 0)
      })
      index_line({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        sort: this.listQuery.sort }).then(res => {
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartDataSort.rows = []

          this.chartDataSort.columns = ['日期']
          for (let i = 0; i < dataTime.length; i++) {
            const obj = {}
            for (let j = 0; j < app.length; j++) {
              if (i === 0) {
                this.chartDataSort.columns.push(app[j].name)
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
            this.chartDataSort.rows.push(obj)
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
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.listQueryFunnel.companyId = this.listQuery.companyId
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
      registerDetail(temp).then(res => {
        this.exportData = res.data.list
        console.log('this.exportData')
        console.log(this.exportData)
      })
      this.queryAddUser(this.listQuery, registerList)
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
