<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
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
      default: '500px'
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      disArr: [

      ]
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.initChart()
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
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          bottom: '15%',
          icon: 'rect',
          itemWidth: 12,
          formatter: function(name) {
            var oa = option.series[0].data
            for (var i = 0; i < option.series[0].data.length; i++) {
              if (name === oa[i].name) {
                var space = '        '
                if ((oa[i].percent * 100).toFixed(2) < 1) {
                  space += '  '
                }
                return `{b| ${name}  ${(oa[i].percent * 100).toFixed(2)}%}${space}{hr| ${oa[i].value}人}`
              }
            }
          },
          textStyle: {
            rich: {
              b: {
                color: '#3C3C3C',
                fontSize: 14,
                align: 'left'
              },
              hr: {
                fontSize: 14,
                color: '#2274E5'
              }
            }
          },
          data: this.chartData.names
        },
        series: [
          {
            name: '用户行业类比占比',
            type: 'pie',
            radius: ['35%', '60%'],
            center: ['50%', '27%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.chartData.data,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
