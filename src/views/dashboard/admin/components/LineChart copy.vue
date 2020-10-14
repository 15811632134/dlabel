<template>
  <div :class="className" class="myLineChart"/>
</template>
<style>
.myLineChart {
  width: 100%;
  min-width: 320px;
  height: 480px;
}
</style>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { userLineVisitor ,userInstallVisitor } from "@/api/article";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "330px"
    },
    height: {
      type: String,
      default: "450px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    changeDateArr: {
      type: Array,
      default: false
    },
    dataLen: {
      type: Number,
      default:0
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      dateArr: [],
      seriesArr: [],
      deviceTextArr: ["全部", "PC端", "IOS端", "安卓端", "其他"],
      // valueArr: [],
      // valueArr2:[],
      arrList: [],
      endNum: 0,
      boutNum:0
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }
    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }
    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );

    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getRandomColor() {
      var rand = Math.floor(Math.random() * 0xffffff).toString(16);
      if (rand.length == 6) {
        return "#" + rand;
      } else {
        return this.getRandomColor();
      }
    },
    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: this.dateArr,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: '10',
          right: '4%',
          bottom: '0',
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          // data: ['用户活跃趋势图']
        },
        series: this.seriesArr
      });
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    initChart(date, arrIndex, forIndex, ends) {
      console.log(this.$el)
      const end = new Date();
      const start = new Date();
      var _dateTemp = {};

      //var device=localStorage.getItem("mydateIndex")
      if (!arrIndex) {
        arrIndex = 0;
      }

      if (date) {
        _dateTemp = {
          "start-date": date[0],
          "last-date": date[1],
          device: arrIndex
        };
      }
      for (var i = forIndex; i < this.dataLen; i++) {
        if (i >= forIndex) {
          this.arrList[i] = [];
        }
      }
      for (var i = forIndex; i < this.seriesArr.length; i++) {
        this.seriesArr.splice(i, 1);
        i--;
      }

      this.dateArr = [];
      this.chart = echarts.init(this.$el, "macarons");
      console.log(this.endNum);

      if(this.dataLen == 4){
        ((boutNum)=>{
        // userInstallVisitor(_dateTemp).then(res => {
          // var dataTemp = res.data.results;
          var dataTemp = [["2019-08-06T00:00:00Z",Math.random()*100],["2019-08-07T00:00:00Z","819"],["2019-08-08T00:00:00Z","997"],["2019-08-09T00:00:00Z","981"],["2019-08-10T00:00:00Z","809"],["2019-08-11T00:00:00Z","787"],["2019-08-12T00:00:00Z","1177"],["2019-08-13T00:00:00Z","404"]]
          this.arrList[arrIndex] = []
          for (var i = 0; i < dataTemp.length; i++) {
            if (this.dateArr.length != dataTemp.length)
              this.dateArr.push(dataTemp[i][0].split("T")[0]);
            //this.arrList[arrIndex].push(Math.random() * 10);
            this.arrList[arrIndex].push(dataTemp[i][1]);

            // else {
            //   this.dateArr.push(dataTemp[i].time.split(" ")[0]);
            //   this.arrList[arrIndex].push(dataTemp[i].count);
            // }
          }
           if(boutNum!=this.boutNum)
             return
          this.endNum++;
          var tempColor = this.getRandomColor();
          var _series = {
            smooth: true,
            type: "line",
            name: this.deviceTextArr[arrIndex],
            itemStyle: {
              normal: {
                color: tempColor,
                lineStyle: {
                  color: tempColor,
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: this.arrList[arrIndex],
            animationDuration: 1500,
            animationEasing: "quadraticOut"
          };

          this.seriesArr[forIndex] = _series;
          if (this.endNum == ends) {
            this.chart.clear();

            this.setOptions();
            this.endNum = 0;
          }
        // })
        })(this.boutNum)
      }else{
        ((boutNum)=>{
          // userLineVisitor(_dateTemp)
          // .then(res => {
            // var dataTemp = res.data.results;
            var dataTemp = [["2019-08-06T00:00:00Z",Math.random()*10000],["2019-08-07T00:00:00Z",Math.random()*10000],["2019-08-08T00:00:00Z",Math.random()*10000],["2019-08-09T00:00:00Z",Math.random()*10000],["2019-08-10T00:00:00Z",Math.random()*10000],["2019-08-11T00:00:00Z",Math.random()*10000],["2019-08-12T00:00:00Z",Math.random()*10000],["2019-08-13T00:00:00Z",Math.random()*10000]]
            for (var i = 0; i < dataTemp.length; i++) {
              if (this.dateArr.length != dataTemp.length)
                this.dateArr.push(dataTemp[i][0].split("T")[0]);
              //this.arrList[arrIndex].push(Math.random() * 10);
                this.arrList[arrIndex].push(dataTemp[i][1]);
              // else {
              //   this.dateArr.push(dataTemp[i].time.split(" ")[0]);
              //   this.arrList[arrIndex].push(dataTemp[i].count);
              // }
            }
            if(boutNum!=this.boutNum)
             return
              this.endNum++;
            var tempColor = this.getRandomColor();
            var _series = {
              smooth: true,
              type: "line",
              name: this.deviceTextArr[arrIndex],
              itemStyle: {
                normal: {
                  color: tempColor,
                  lineStyle: {
                    color: tempColor,
                    width: 2
                  },
                  areaStyle: {
                    color: "#f3f8ff"
                  }
                }
              },
              data: this.arrList[arrIndex],
              animationDuration: 1500,
              animationEasing: "quadraticOut"
            };

            this.seriesArr[forIndex] = _series;
            if (this.endNum == ends) {
              this.chart.clear();

              this.setOptions();
              this.endNum = 0;
            }
          // })
          // .catch(res => {});
        })(this.boutNum)

        }
    }
  }
};
</script>
