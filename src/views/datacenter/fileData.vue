<template>
  <div class="app-container">
    <div class="echarts-time" style="width:100%">
      <div style="display:flex;width:100%">
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
        <div class="selectPartner" style="margin-right:32px">
          <label>类型：</label>
          <el-select v-model="currentType" class="filter-item" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div  style="margin-left:auto;">
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
    </div>
    <div class="echarts">
      <div class="echarts-title">
        <span>云文档统计</span>
      </div>
      <div class="echarts-title-c">
        <span>单位：人</span>
      </div>
      <ve-line :data="chartDataFile"  :extend="extendOperate" />
    </div>
    <div class="pieLine_box">
      <div class="pieLine_div">
        <div class="line_data" >
          <div class="echarts-title m_clearLR">
        <div class="m_floatL title">区间增长趋势</div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:241px">
            <li  class="m_floatL " :class="currentIndex==1?'active':''" @click="changeFileType(1)" >增长趋势</li>
            <li  class="m_floatL" :class="currentIndex==2?'active':''" @click="changeFileType(2)" >区间走势</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle" >单位：个</div>
          <ve-line :data="chartData" v-loading="loading" :extend="extendOperate" />
        </div>
         <div class="pie_data">
          <div id="main" style="width: 450px;height:520px;"/>
        </div>
      </div>
    </div>
    <div class="pieLine_box">
      <div class="pieLine_div">
        <div class="line_data" >
          <div class="echarts-title m_clearLR">
        <div class="m_floatL title">上传数量统计
        </div>
        <div class="select_box m_floatR m_clearLR">
          <ul class="m_data_ul m_clearLR m_floatL" style="width:241px">
            <li  class="m_floatL " :class="currentIndexNum==1?'active':''" @click="changeFileTypeNum(1)" >增长趋势</li>
            <li  class="m_floatL" :class="currentIndexNum==2?'active':''" @click="changeFileTypeNum(2)" >区间走势</li>
          </ul>
        </div>
      </div>
      <div class="unitTitle" >单位：个</div>
          <ve-line :data="chartDataNum"  :extend="extendOperate" />
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common'
import { registerDetail,dlabeldatadocumentInterval_rate,dlabeldatadocumentUpload_trend,dlabeldatadocumentTrend, dlabeldatadocumentUpload_total,registerList, open_company_list, dlabeldatadocument_list ,dlabeldatadocumentInterval} from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
import echarts from 'echarts'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      types: [{ id: '', name: '全部' }, { id: 1, name: '云标签' }, { id: 2, name: '云数据库' }, { id: 3, name: '云LOGO' }, { id: 4, name: '云背景' }],
      dateType: '',
      listQuery: { companyId: '', type: '',startTime:'',endTime:'' },
      exportData: [],
      selectExcelData: [],
      pieData:[],
      loading:true,
      currentIndex:1,
      currentIndexNum:1,
      dataType:'',
      currentType: '',
      chartDataNum: {
        columns: ['日期', 'PC', 'Android', 'IOS', 'All'],
        rows: []
      },
      companys: [],
      selects: [1, 2, 3, 4]
    }
  },
  created() {
    open_company_list().then(res => {
      this.listapi = registerDetail
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.chooseTime('week')
      this.getList()
    })
  },
  methods: {
    changeFileTypeNum(type){
      this.currentIndexNum = type
      if(type==1){
        dlabeldatadocumentUpload_total({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        type: this.dateType }).then(res => {
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartDataNum.rows = []

          this.chartDataNum.columns = ['日期']
          this.chartAllData.rows = []
          for (let i = 0; i < dataTime.length; i++) {
            const obj = {}
            const allobj = {}
            for (let j = 0; j < app.length; j++) {
              if (i === 0) {
                this.chartDataNum.columns.push(app[j].name)
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
            this.chartDataNum.rows.push(obj)
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
      }else{

        dlabeldatadocumentUpload_trend({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        type: this.dateType }).then(res => {
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartDataNum.rows = []

          this.chartDataNum.columns = ['日期']
          this.chartAllData.rows = []
          for (let i = 0; i < dataTime.length; i++) {
            const obj = {}
            const allobj = {}
            for (let j = 0; j < app.length; j++) {
              if (i === 0) {
                this.chartDataNum.columns.push(app[j].name)
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
            this.chartDataNum.rows.push(obj)
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
      }
    },
    changeFileType(type){
      this.currentIndex = type
      if(type==1){
        this.loading = true
        dlabeldatadocumentInterval({ companyId: this.listQuery.companyId,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime,
          type: this.dataType }).then(res => {
            this.loading = false
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
      }else{
          this.loading = true
        dlabeldatadocumentTrend({ companyId: this.listQuery.companyId,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime,
          type: this.dataType }).then(res => {
          if (res.code === 100) {
            const dataTime = res.data.xAxis
            const app = res.data.items
            this.chartData.rows = []
            this.loading = false
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
      }
    },
    initData(){
      dlabeldatadocumentInterval_rate({ companyId: this.listQuery.companyId,
        type: this.listQuery.type }).then(res => {
        var tempData = []
        for (const item in res.data) {
          tempData.push({
            name: item,
            value: res.data[item].user,
            rate: res.data[item].percent
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
     dlabeldatadocumentInterval({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        type: this.listQuery.type }).then(res => {
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartData.rows = []
          this.loading = false
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


      dlabeldatadocumentUpload_total({ companyId: this.listQuery.companyId,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        type: this.listQuery.type }).then(res => {
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartDataNum.rows = []

          this.chartDataNum.columns = ['日期']
          this.chartAllData.rows = []
          for (let i = 0; i < dataTime.length; i++) {
            const obj = {}
            const allobj = {}
            for (let j = 0; j < app.length; j++) {
              if (i === 0) {
                this.chartDataNum.columns.push(app[j].name)
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
            this.chartDataNum.rows.push(obj)
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
      this.dataType = this.listQuery.type
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
    screen(str) {
      var temp = {
        type: this.currentType,
        companyId: this.listQuery.companyId
      }
      this.initData()
      this.queryAddUser_M(this.listQuery, dlabeldatadocument_list, this.selects)
    },
    handleChange() {
      this.selects = []
      this.listQuery.startTime = this.time[0]
      this.listQuery.endTime = this.time[1]
      if (this.currentType) {
        this.selects.push(this.currentType)
      } else {
        this.selects = [1, 2, 3, 4]
      }
      this.initData()
      this.queryAddUser_M(this.listQuery, dlabeldatadocument_list, this.selects)
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
