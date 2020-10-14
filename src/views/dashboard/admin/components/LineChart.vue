<template>
  <div :class="className" :style="{height:height,width:width}" style="margin-top:16px;" />
</template>
<style>

</style>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    chartType: {
      type: String,
      default: 'nomal'
    },
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
      default: '555px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ items, xAxis } = {}) {
      this.chart.setOption({
        xAxis: {
          data: xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true, // 这行代码控制着坐标轴x轴的文字是否显示
            textStyle: {
              color: '#333' // x轴上的字体颜色
              // x轴字体大小
            }
          }
        },
        grid: {
          left: 40,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
          },
          padding: [5, 10],
          // formatter: function(params) {
          //   console.log(params)
          //   console.log('params')
          //   return params
          // }
          formatter: (obj) => {
            // return value
            console.log('aaaaaaaaaaaa')
            obj = obj[0]
            return this.chartType == 'pecent' ? obj.name + '</br>' + obj.seriesName + ':' + parseFloat(obj.value * 100).toFixed(2) + '%' : obj.name + '</br>' + obj.seriesName + ':' + obj.value
          }
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
          axisLabel: {
            interval: 'auto',
            formatter: (value) => {
              // return value
              return this.chartType == 'pecent' ? parseFloat(value * 100).toFixed(2) + '%' : value
            },
            show: true, // 这行代码控制着坐标轴x轴的文字是否显示
            textStyle: {
              color: '#333' // x轴上的字体颜色
              // x轴字体大小
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
        },
        // legend: {
        //   data: ['expected', 'actual']
        // },
        series: [{
          name: '全部',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          itemStyle: {
            normal: {
              color: '#2274e5'
            }
          },

          symbolSize: 5,
          type: 'line',
          data: items,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
