<style rel="stylesheet/scss" lang="scss" scoped>
.dashboardIndex{
  // width:1580px;
  margin:34px 0px 0px 40px;
  padding-bottom: 100px;
  .dashLeft{
  .column_1_box{
    .column_1{
      padding:32px;
      width:257px;
      height:316px;
      border-radius: 4px;
      color:#fff;
      background-image: url('./../../../assets/img/index_01.png');
      .textUser{
        .m_floatL{
          font-size:18px;
        }
        .m_floatR{
          font-size:14px;
        }
      }
      .textData{
        text-align: center;
        margin-top:75px;
        font-weight: 600;
        color:#fff;
        font-size:40px;
      }
    }
  }
  .column_2_box{
    width:850px;
    & > div{
      width:249px;
      margin-left:32px;
      margin-bottom: 24px;
    border-radius: 8px;
      background-color: #fff;
      height:146px;
      padding: 18px;
      .column_box{
        .columnDiv{
          span{
            margin-left:16px;
            font-size:14px;
            width:56px;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:20px;
          }

        }
        .yes{
            // width:98px;
            height:20px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:20px;
            display: flex;
          }
        .columnData{
          // width:95px;
          height:70px;
          text-align: center;
          margin-right: 18px;
          font-size:32px;
          font-family:PingFangSC-Semibold,PingFangSC;
          font-weight:600;
          color:rgba(60,60,60,1);
          line-height:70px;
        }
      }
    }
  }
  .partnerLine{
    width:1100px;
    .chart{

    background-color: #fff;
    }
    .selectChange{
      margin-top:16px;
      height:40px;
      line-height: 40px;
      .el-select>.el-input{
        width:240px;
      }
      & > div:nth-child(1){
        // margin-right: 16px;
      }
    }
  }
}
  .dashRight{
    .pieBox{
      background-color: #fff;
      width:448px;
      height: 511px;
      padding: 24px 43px;
      overflow: hidden;
      .text{
        width:144px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:600;
        color:rgba(60,60,60,1);
        line-height:25px;
      }
    }
    .sortBox{
      background-color: #fff;
      margin-top:32px;
      width:448px;
      height: 424px;
      padding: 24px 36px;
      overflow: hidden;
      .text{
        width:144px;
        height:25px;
        font-size:18px;
        overflow: hidden;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:600;
        color:rgba(60,60,60,1);
        line-height:25px;
        margin-top:8px;

      }
      .sortDiv{
        margin-top:24px;
        height:40px;
        position: relative;
        line-height: 40px;
        img{
          margin-left:32px;
          margin-right: 16px;

          width:40px;
          height:40px;
          border-radius: 20px;
        }
        .textRight{
          width:42px;
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Regular,PingFangSC;
          font-weight:400;
          color:rgba(34,116,229,1);
        }
      }
    }
  }
}
</style>
<template>
  <div class="dashboardIndex">
    <div class="baseTitle">基本指标
      <el-tooltip placement="right" popper-class="tooltipStyle">
        <div slot="content" class="tooltipContent">
          <div>这里展示截至今日上个整点时刻的各指标的当日总数据</div>
          <div>
            <span style="color:#2274e5">总用户数：</span>
            <span>所有注册用户的总和</span>
          </div>
          <div>
            <span style="color:#2274e5">新增用户：</span>
            <span>新增注册的用户</span>
          </div>
          <div>
            <span style="color:#2274e5">启动次数：</span>
            <span>打开应用视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动（全部用户）</span>
          </div>
          <div>
            <span style="color:#2274e5">活跃用户数：</span>
            <span>活跃用户：启动过应用的用户（去重），启动过一次的用户即视为活跃用户，包括新用户与老用户。（全部用户）</span>
          </div>
          <div>
            <span style="color:#2274e5">打印次数：</span>
            <span>所有用户点击打印按钮的次数。（全部用户）</span>
          </div>
        </div>
        <i class="iconfont iconbianzu2 m_style_icon"/>
      </el-tooltip>
    </div>
    <div class=" m_clearLR">
      <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/> -->
      <div class="dashLeft m_floatL ">
        <div class="  m_clearLR">
          <div class="column_1_box m_floatL">
            <div class="column_1">
              <div class="m_clearLR textUser">
                <div class="m_floatL">
                  总用户数
                </div>
                <div class="m_floatR">
                  {{ nowDate }}
                </div>
              </div>
              <div class="text textData">
                {{ dataObj.totalUser }}
              </div>
            </div>
          </div>
          <div class="column_2_box m_floatL m_clearLR">
            <div class="column_1   m_floatL">
              <div class="column_box m_clearLR">
                <div class="columnDiv ">
                  <div >新增用户<span style="">(今日)</span></div>
                </div>
                <div class="columnData ">
                  {{ dataObj.registerUserToday }}
                </div>
                <div class="yes">昨日: {{ dataObj.registerUserTomorrow }}</div>
              </div>
            </div>
            <div class="column_1   m_floatL">
              <div class="column_box ">
                <div class="columnDiv ">
                  <div >活跃用户<span style="">(今日)</span></div>

                </div>
                <div class="columnData ">
                  {{ dataObj.activeEditToday }}
                </div>
                <div class="yes">昨日: {{ dataObj.activeEditTomorrow }}</div>
              </div>
            </div>
            <div class="column_1   m_floatL">
              <div class="column_box ">
                <div class="columnDiv ">
                  <div >编辑用户<span style="">(今日)</span></div>

                </div>
                <div class="columnData ">
                  {{ dataObj.activeUserToday }}
                </div>
                <div class="yes">昨日: {{ dataObj.activeUserTomorrow }}</div>
              </div>
            </div>
            <div class="column_1   m_floatL">
              <div class="column_box ">
                <div class="columnDiv ">
                  <div >启动次数<span style="">(今日)</span></div>
                </div>
                <div class="columnData ">
                  {{ dataObj.loadTimesToday }}
                </div>
                <div class="yes">昨日: {{ dataObj.loadTimesTomorrow }}</div>
              </div>
            </div>
            <div class="column_1   m_floatL">
              <div class="column_box ">
                <div class="columnDiv ">
                  <div >打印次数<span style="">(今日)</span></div>

                </div>
                <div class="columnData " >
                  {{ dataObj.printTimesToday }}
                </div>
                <div class="yes">昨日: {{ dataObj.printTimesTomorrow }}</div>
              </div>
            </div>
            <div class="column_1   m_floatL">
              <div class="column_box ">
                <div class="columnDiv ">
                  <div >新用户次日留存率<span style="">(7日平均)</span></div>
                </div>
                <div class="columnData " >
                  {{ (parseFloat(dataObj.rententionRateToday)*100).toFixed(2)+'%' }}
                </div>
                <div class="yes">同比：<span><i :class="{'active':dataObj.rententionRateTomorrow&&(dataObj.rententionRateTomorrow+'').indexOf('-')==-1}" class="m_percent" style="margin-left:3px"/></span>
                <span style="margin-left:5px">{{ (parseFloat(dataObj.rententionRateTomorrow)*100).toFixed(2)+'%' }}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="partnerLine">
          <div class=" m_clearLR">
            <div class="m_clearLR selectChange " >
              <!-- <div class="m_floatL">数据:</div> -->
              <!-- <div class="m_floatL">
            <el-select v-model="listQueryData.type" @change="changeType" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in partners"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          </div> -->
              <div class="echarts-time m_floatR">
                <div class=" echarts-date">
                  <el-date-picker
                    v-model="selectData"
                    :picker-options="pickerOptions"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="开始日期"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    end-placeholder="结束日期"
                    @change="dateChange"/>
                  <em class="iconfont iconrilix" style="top:0px"/>
                </div>
              </div>
            </div>
          </div>
          <div class="data_chart_box">
            <div class="data_box">
              <div class="title">数据趋势<el-tooltip placement="right" popper-class="tooltipStyle">
                <div slot="content" class="tooltipContent">
                  <div>这里展示截至今日上个整点时刻的各指标的当日总数据</div>
                  <div>
                    <span style="color:#2274e5">总用户数：</span>
                    <span>所有注册用户的总和</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">新增用户：</span>
                    <span>新增注册的用户</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">启动次数：</span>
                    <span>打开应用视为启动。完全退出或后台运行超过30s后再次进入应用，视为一次新启动（全部用户）</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">活跃用户数：</span>
                    <span>活跃用户：启动过应用的用户（去重），启动过一次的用户即视为活跃用户，包括新用户与老用户。（全部用户）</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">打印次数：</span>
                    <span>所有用户点击打印按钮的次数。（全部用户）</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">编辑用户：</span>
                    <span>进入到编辑页面的用户总数（去重）</span>
                  </div>
                  <div>
                    <span style="color:#2274e5">新用户次日留存率：</span>
                    <span>新增用户次日留存率的平均值</span>
                  </div>
                </div>
                <i class="iconfont iconbianzu2 m_style_icon"/>
              </el-tooltip></div>
              <ul class="data_ul m_clearLR">
                <li v-for="(item,index) in partners" :class="currentTypeIndex==item.id?'active':''" :key="item.id" class="m_floatL" @click="changeDataType(item.id)">{{ item.name }}</li>
              </ul>
            </div>

            <line-chart :chart-data="lineData" :chart-type="chartType"/>
          </div>
        </div>

      </div>
      <div class="dashRight m_floatR">
        <div class="pieBox">
          <div class="text">用户行业类比占比</div>
          <PieChart :chart-data="pieData" />
        <!-- <div class="pic">
          <div class="">1</div>
          <div>1</div>
          <div>1</div>
        </div> -->
        </div>
        <div class="sortBox">
          <div class="text">友商总用户数排行</div>
          <div v-for="(item,index) in sortDatas" v-show="index<5" :key="index" class="sortDiv m_clearLR">
            <div class="m_floatL colorBlue" >{{ index+1 }}</div>
            <div class="m_floatL"><img :src="item.loginPath" alt=""></div>
            <div class="m_floatL">{{ item.name }}</div>
            <div class="m_floatR textRight colorBlue">{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { indexList, indexLineList, industryLineList, totallLineList } from '@/api/api'

const lineChartData = {
  // newVisitis: {
  //   expectedData: [100, 120, 161, 134, 105, 160, 165],
  //   actualData: [120, 82, 91, 154, 162, 140, 145]
  // },
  // messages: {
  //   expectedData: [200, 192, 120, 144, 160, 130, 140],
  //   actualData: [180, 160, 151, 106, 145, 150, 130]
  // },
  // purchases: {
  //   expectedData: [80, 100, 121, 104, 105, 90, 100],
  //   actualData: [120, 90, 100, 138, 142, 130, 130]
  // },
  // shoppings: {
  //   expectedData: [130, 140, 141, 142, 145, 150, 160],
  //   actualData: [120, 82, 91, 154, 162, 140, 130]
  // }
}
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      chartType: 'nomal',
      dataObj: {},
      selectData: [],
      selectModle: '',
      sortDatas: [],
      dateArr: ['', ''],
      partners: [
        { id: 1, name: '新增用户' },
        { id: 8, name: '活跃用户' },
        { id: 3, name: '启动次数' },
        { id: 4, name: '打印次数' },
        { id: 2, name: '编辑用户' },
        { id: 9, name: '次日留存率' }
      ],
      lineChartData: lineChartData.newVisitis,
      lineDate: '',
      lineDateInstall: '',
      pieData: { names: [], data: [] },
      deviceValue: 0,
      disArr: ['商超零售', '仓储物流', '服装行业', '电子商务', '生产制造', '其他行业'],
      currentIndex: 0,
      lineData: {
        items: [],
        xAxis: []
      },
      mydate: null,
      dataList: [],
      dataLen: 5,
      dataLen2: 4,
      listQueryData: {
        startTime: '',
        endTime: '',
        type: 1,
        equip: 0,
        companyId: 0
      },
      isSelf: false,
      todate: '',
      nowDate: '',
      isClear: false,
      tradeList: [],
      deviceIndexArr: [],
      deviceIndexArrInstall: [],
      options: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: 'PC端'
        },
        {
          value: 2,
          label: 'IOS端'
        },
        {
          value: 3,
          label: '安卓端'
        },
        {
          value: 4,
          label: '其他'
        }
      ],
      deviceArr: ['全部', 'PC端', 'IOS端', '安卓端', '其他'],
      deviceArrInstall: ['全部', 'PC端', 'IOS端', '安卓端'],
      ct_month: [],
      currentTypeIndex: 1,
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() >= Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    this.nowDate = moment(Date.now()).format('YYYY-MM-DD')
    this.selectData = [this.getDay(-30), this.getDay(-1)]

    industryLineList().then(res => {
      var temp = res.data
      for (var i = 0; i < temp.length; i++) {
        var obj = {}
        obj.value = temp[i].count
        obj.name = this.disArr[temp[i].industry - 1]
        obj.percent = temp[i].percent
        this.pieData.names.push(obj.name)
        this.pieData.data.push(obj)
      }
      console.log(this.pieData)
      totallLineList().then(res => {
        this.sortDatas = res.data
      })
    })
    indexList().then(res => {
      this.dataObj = res.data
      this.dateChange()
    })
  },
  methods: {
    changeDataType(id) {
      this.currentTypeIndex = id
      if (this.currentTypeIndex === 9) { this.chartType = 'pecent' } else {
        this.chartType = 'nomal'
      }
      this.listQueryData.type = id
      this.getData()
    },
    changeType() {
      if (this.currentTypeIndex === 9) { this.chartType = 'pecent' } else {
        this.chartType = 'nomal'
      }
      this.getData()
    },
    getData() {
      indexLineList(this.listQueryData).then(res => {
        console.log(this.listQueryData)
        this.lineData.items = res.data.items.length > 0 ? res.data.items[0].data : []
        this.lineData.xAxis = res.data.xAxis
      })
    },
    doHandleMonth(month) {
      var m = month

      if (month.toString().length == 1) {
        m = '0' + month
      }

      return m
    },
    dateChange() {
      this.listQueryData.startTime = this.selectData[0]
      this.listQueryData.endTime = this.selectData[1]
      this.getData()
    },
    getDay(day) {
      var today = new Date()

      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

      today.setTime(targetday_milliseconds) // 注意，这行是关键代码

      var tYear = today.getFullYear()

      var tMonth = today.getMonth()

      var tDate = today.getDate()

      tMonth = this.doHandleMonth(tMonth + 1)

      tDate = this.doHandleMonth(tDate)

      return tYear + '-' + tMonth + '-' + tDate
    },
    getIndexLineList() {
      indexLineList(this.listQueryData).then(res => {

      })
    },
    format(shijianchuo) {
      // shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      if (m < 10) {
        m = '0' + m
      }
      var d = time.getDate()
      if (d < 10) {
        d = '0' + d
      }
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + m + '-' + d
    },
    format_zh(shijianchuo) {
      // shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      if (m < 10) {
        m = '0' + m
      }
      var d = time.getDate()
      if (d < 10) {
        d = '0' + d
      }
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '年' + m + '月' + d + '日'
    },
    visitDevice(value) {
      this.$refs.userPanel.initData(value)
    },
    getdatatime() {
      const end = new Date()
      const start = new Date()

      this.start.getTime() - 3600 * 1000 * 24 * 7
      this.lineDate.setTime(start, end)
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    changeDevice(index, e, obj, deviceIndexArr) {
      let flag = 0
      for (var i = 0; i < deviceIndexArr.length; i++) {
        if (deviceIndexArr[i] == index) {
          if (deviceIndexArr.length == 1) { return }
          deviceIndexArr.splice(i, 1)
          flag++
        }
      }

      if (flag == 0) {
        deviceIndexArr.push(index)
      }
      this.currentIndex = index
      if (e.currentTarget.className.indexOf('active') != -1) {
        e.currentTarget.className = e.currentTarget.className.replace(' active', '')
      } else {
        e.currentTarget.className += ' active'
        localStorage.setItem('mydateIndex', this.currentIndex)
      }
      this.$refs[obj].endNum = 0
      this.$refs[obj].boutNum++
      this.$refs[obj].arrList = []
      for (var i = 0; i < deviceIndexArr.length; i++) {
        this.$refs[obj].initChart(
          this.lineDate,
          deviceIndexArr[i], i,
          deviceIndexArr.length
        )
      }
    },
    changeLine(e, obj, deviceIndexArr) {
      var _temp = ''
      if (obj == 'lineChart2') {
        _temp = this.lineDateInstall
      } else {
        _temp = this.lineDate
      }
      for (var i = 0; i < deviceIndexArr.length; i++) {
        this.$refs[obj].initChart(
          _temp,
          deviceIndexArr[i], i,
          deviceIndexArr.length
        )
      }
    }
  }
}
</script>

