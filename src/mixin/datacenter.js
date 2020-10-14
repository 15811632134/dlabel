import moment from 'moment'
const datacenter = {
  data() {
    return {
      exportData: [],
      selectDate: [],
      listQueryFunnel: {},
      extendOperate: {
        legend: {
          left: 'left',
          // type: 'scroll',
          bottom: 0,
          itemWidth: 32,
          itemGap: 48,
          selected: { 'Android': true, 'IOS': true, 'PC': true, 'All': false }
        },
        dataZoom: [{
          bottom:30,
          backgroundColor:"rgba(255,255,255,1)",
          fillerColor:"rgba(255,255,255,1)",
        }],
        grid: {
          left: 10,
          right: 10,
          bottom: 70,
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

      selectExcelData: [],
      partners: [
        { id: '', name: '全部' },
        { id: 1, name: '度点' },
        { id: 2, name: '活跃用户' },
        { id: 3, name: '打印次数' },
        { id: 4, name: '启动次数' },
        { id: 5, name: '打印尺寸' },
        { id: 6, name: '打印机' },
        { id: 7, name: '打印记录' }
      ],
      chartData: {
        columns: ['日期', 'PC', 'Android', 'IOS', 'All'],
        rows: []
      },
      chartDataFile: {
        columns: [],
        rows: []
      },
      chartAllData: {
        columns: ['日期', 'All'],
        rows: []
      },
      endTime: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      time: [],
      startTime: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      // eslint-disable-next-line no-dupe-keys
      endTime: moment().format('YYYY-MM-DD'),
      today: moment().subtract(1, 'days').format('YYYY-MM-DD')
    }
  },
  created() {
    this.time[0] = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD')
    this.time[1] = moment().format('YYYY-MM-DD')
  },
  methods: {
    async queryAddUser(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        const dataTime = res.data.xAxis
        const app = res.data.items
        this.chartData.rows = []
        // this.chartAllData.rows = []
        for (let i = 0; i < dataTime.length; i++) {
          const obj = {}
          const allobj = {}
          obj['日期'] = dataTime[i]
          allobj['日期'] = dataTime[i]
          obj['All'] = app[0].data[i]
          obj['PC'] = app[3].data[i]
          obj['Android'] = app[1].data[i]
          obj['IOS'] = app[2].data[i]
          // obj['WEB'] = app[4].data[i]
          this.chartData.rows.push(obj)

          // this.chartAllData.rows.push(allobj)
        }
        console.log('aaaaaaaa')
        console.log(this.chartData)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    async queryAddUser_M(data, url, indexs) {
      const xs = []
      const ys = []
      var tempColumns = ['个数']
      for (let index = 0; index < indexs.length; index++) {
        this.listQuery.type = indexs[index]
        tempColumns.push(this.types[indexs[index]].name)
        ys[this.types[indexs[index]].name] = []
        const res = await url(data)
        if (res.code === 100) {
          const dataTime = res.data.xAxis
          const app = res.data.items
          this.chartDataFile.rows = []
          this.chartAllData.rows = []
          for (let i = 0; i < dataTime.length; i++) {
            const obj = {}
            if (index == 0) { xs.push(dataTime[i]) }
            ys[this.types[indexs[index]].name].push(app[0].data[i])
          }
          console.log(xs)
          console.log(ys)
          var tempData = []

          for (let i = 0; i < xs.length; i++) {
            var obj = {}
            obj['个数'] = xs[i]
            for (const j in ys) {
              obj[j] = ys[j][i]
            }
            tempData.push(obj)
          }
          console.log(tempData)
          this.chartDataFile.rows = tempData
          this.chartDataFile.columns = tempColumns
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      }
    },
    chooseTime(time) {
      this.endTime = moment().format('YYYY-MM-DD')
      if (time === 'week') {
        this.startTime = moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
      } else if (time === 'month') {
        this.startTime = moment()
          .subtract(1, 'months')
          .format('YYYY-MM-DD')
      } else {
        this.startTime = moment()
          .subtract(3, 'months')
          .format('YYYY-MM-DD')
      }
      this.selectDate = [this.startTime, this.endTime]
      this.listQuery.startTime = this.startTime
      this.listQuery.endTime = this.endTime
      this.listQueryFunnel.startTime = this.startTime
      this.listQueryFunnel.endTime = this.endTime
    },
    changeTime() {
      this.startTime = this.selectDate[0]
      this.endTime = this.selectDate[1]
      this.listQuery.startTime = this.selectDate[0]
      this.listQuery.endTime = this.selectDate[1]
      this.listQueryFunnel.startTime = this.selectDate[0]
      this.listQueryFunnel.endTime = this.selectDate[1]

      this.selectDate = [this.startTime, this.endTime]
    },
    // 导出表格
    exportExcel() {

    }

  }
}
export default datacenter
