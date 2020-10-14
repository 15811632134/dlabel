<template>
  <div class="app-container">
    <div class="table-switch">
      <ul>
        <li
          v-for="(item,index) in regionList"
          :key="index"
          :class="{'active': currentindex === index}"
          @click="selectRegion(index)"
        >{{ item }}</li>
      </ul>
    </div>
    <div class="table-map">
      <h3>地图预览</h3>
      <div class="mapshow">
        <div class="table-data">
          <el-table :data="tablemapList" highlight-current-row>
            <el-table-column type="index" label="排名" width="80" />
            <el-table-column prop="city" label="地区" />
            <el-table-column prop="count" label="数量" />
          </el-table>
        </div>
        <div ref="mainMap" class="map" />
      </div>
    </div>
    <div class="datatable">
      <div class="table-export">
        <span>数据说明</span>
      </div>
      <el-table :data="tableList" border>
        <el-table-column type="index" label="排行" width="80" />
        <el-table-column prop="city" label="地域" />
        <el-table-column prop="user_count" label="总用户数" />
        <el-table-column prop="new_user_count" label="新增用户" />
        <el-table-column prop="active_user_count" label="活跃用户" />
        <el-table-column prop="start_times" label="启动次数" />
      </el-table>
    </div>
    <!-- 分页 -->
    <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, {})"
        @current-change="handleCurrentChange($event, {})"
      />
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { regionlocationList, regionlocationLocation } from '@/api/api'
import echarts from 'echarts'
import 'echarts/map/js/china'
export default {
  components: {
    VeLine
  },
  data() {
    return {
      type: 1,
      maxLength: 100,
      tablemapList: [],
      mapList: [],
      currentindex: 0,
      listQuery: { type: 1, pageNo: 1, pageSize: 10 },
      regionList: ['总用户数', '注册用户', '活跃用户', '启动次数']
    }
  },
  created() {
    this.listapi = regionlocationList
    this.getListData(
      this.listQuery,
      regionlocationList
    )
    this.regionlocationLocation()
  },
  mounted() {},
  methods: {
    // 实例化地图
    initalECharts() {
      const $this = this
      const option = {
        visualMap: {
          min: 0,
          max: this.maxLength,
          left: '80px',
          bottom: '40px',
          text: ['高', '低'],
          calculable: false,
          orient: 'horizontal',
          inRange: {
            color: ['#EEEEEE', '#2274E5'],
            symbolSize: [100, 100]
          }
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none'
          },
          formatter: function(params) {
            console.log('0000000', params)
            return params.name + '：' + params.data['value']
          }
        },
        series: [
          {
            name: 'iphone4',
            type: 'map',
            mapType: 'china',
            roam: false,
            left: 'center',
            top: '50',
            itemStyle: {
              normal: {
                label: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: $this.mapList
          }
        ]
      }
      const myChart = echarts.init(this.$refs.mainMap)
      myChart.setOption(option)
    },
    screenMapStr(str) {
      if (str === '内蒙古自治区') {
        return '内蒙古'
      } else if (str === '黑龙江省') {
        return '黑龙江'
      } else {
        return str.substring(0, 2)
      }
    },
    // 地域分布总用户
    async regionlocationLocation() {
      const res = await regionlocationLocation(this.listQuery)
      if (res.code === 100) {
        this.tablemapList = res.data.slice(0, 10)
        const arr = []
        for (var i = 0; i < res.data.length; i++) {
          const obj = {
            name: this.screenMapStr(res.data[i].city),
            value: res.data[i].count
          }
          arr.push(obj)
        }
        if (this.tablemapList[0].city == '未知') {
          this.maxLength = this.tablemapList[1].count + 100
        } else {
          this.maxLength = this.tablemapList[0].count + 100
        }
        this.mapList = arr
        this.initalECharts()
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 数据切换查询
    selectRegion(index) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.currentindex = index
      this.listQuery.type = index + 1
      this.getListData(this.listQuery, regionlocationList)
      this.regionlocationLocation()
    }
  }
}
</script>

<style lang="scss" scoped>
.table-switch {
  overflow: hidden;
  ul {
    overflow: hidden;
    float: right;
    li {
      list-style: none;
      float: left;
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #c3c3c3;
      box-sizing: border-box;
      cursor: pointer;
      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        border-right: 0;
      }
      &.active {
        background: #2274e5;
        color: #fff;
        border: none;
      }
    }
  }
}
.datatable {
  .table-export {
    display: flex;
    justify-content: space-between;
    height: 70px;
    font-size: 18px;
    color: #3c3c3c;
    align-items: center;
    background: #fff;
    padding: 0 24px;
    .export {
      border: 1px solid #2274e5;
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      color: #2274e5;
      border-radius: 4px;
      padding-right: 22px;
      cursor: pointer;
      i {
        padding: 0 9px 0 22px;
      }
    }
  }
  /deep/ .el-table__header-wrapper {
    thead {
      tr {
        th {
          background: #f2faff;
        }
      }
    }
  }
}
.table-map {
  background: #fff;
  padding: 26px;
  margin-bottom: 32px;
  h3 {
    font-size: 18px;
    font-weight: normal;
    margin: 0 0 40px 0;
  }
  .mapshow {
    display: flex;
    justify-content: space-between;
    .table-data {
      flex: 2;
      // /deep/ .el-table__header-wrapper {
      //   border-bottom: 1px dashed #ebeef5;
      // }
      /deep/ td {
        border-bottom: 1px dashed #ebeef5;
        height: 64px;
        line-height: 64px;
      }
    }
    .map {
      flex: 3;
      height: 700px;
    }
  }
}
</style>
