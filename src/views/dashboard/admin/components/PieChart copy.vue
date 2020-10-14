<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { userPieVisitor } from '@/api/article'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '490px'
    },
    dataList:Array
  },
  data() {
    return {
      chart: null,
      casList:{}
    }
  },
  mounted() {
    // userPieVisitor().then(res=>{
    //   this.dataList = res.data.results
    //   this.initChart()
    // })
// this.initChart()
setTimeout(() => {
  console.log(this.dataList)
}, 2000);
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initData(){
      // tradeLineVisitor().then(res=>{
      //   this.dataList = res.data.results
      //   this.initChart()
      // })
    },
    initChart() {
      var flagNum = 0
      for(var i = 0 ; i < this.dataList.length ; i++){

        if(this.dataList[i].value>0)
        {
          this.casList[this.dataList[i].name] = true

        }else{
          flagNum++
          this.casList[this.dataList[i].name] = false
        }
      }
      if(flagNum==this.dataList.length){
        this.dataList.forEach((item)=>{
           this.casList[item.name] = true
        })
      }
      console.log(this.casList)
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          selected: this.casList
        },
        // calculable: true,
        series: [
          {
            name: '平台分布',
            type:'pie',
            // selectedMode: 'single',
            radius: [0, '70%'],

            // label: {
            //     normal: {
            //         position: 'inner'
            //     }
            // },
            // labelLine: {
            //     normal: {
            //         show: false
            //     }
            // },
            data: this.dataList,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
