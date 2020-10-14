<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-content">
        <div class="fileBar_box">
          <div
            v-for="(item,index) in fileTexts"
            :class="barIndex === index ? 'active' : '' "
            :key="index"
            class="fileBar_div"
            @click="selectBarIndex(index)"
          >{{ item }}</div>
        </div>
        <div class="echarts-time">
          <div class="selectPartner">
            <label>友商：</label>
            <el-select
              v-model="companyId"
              class="filter-item"
              placeholder="请选择"
              @change="changeType"
            >
              <el-option
                v-for="item in companys"
                :key="item.id"
                :label="item.shortName"
                :value="item.id"
              />
            </el-select>
            <span v-if="barIndex === 2 || barIndex === 3 || barIndex === 4">
              <el-dialog :visible.sync="screenShow" :modal="false" title="选择显示的列表" width="240px">
                <div class="hightSelect_box m_clearLR">
                  <div class="checkItem">
                    <el-checkbox v-model="allCheck" @change="allselect">全选</el-checkbox>
                  </div>
                  <transition-group tag="div" class="container m_clearLR">
                    <div v-for="(item,index) in configList" :key="index" class="checkItem">
                      <div>
                        <el-checkbox v-model="item.flag">{{ item.industry_name }}</el-checkbox>
                        <div class="sorts">
                          <i class="iconfont iconpaixu1" />
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="screenShow = false">取 消</el-button>
                  <el-button type="primary" @click="comfirmShows">确 定</el-button>
                </span>
              </el-dialog>
              <em @click="openScreen"><i class="iconfont iconshezhibeifen" />配置</em>
            </span>
          </div>
          <div style="display:flex">
            <div class="echarts-date">
              <el-date-picker
                v-model="time"
                :picker-options="options"
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
        <!-- echarts统计表 -->
        <div v-if="barIndex === 0 || barIndex === 1" ref="echarts" class="charts" />
      </div>
    </div>
    <div class="tabledata">
      <div v-if="barIndex === 0 || barIndex === 1" class="list">
        <span>数据说明</span>
        <span>
          <el-dialog :visible.sync="screenShow" :modal="false" title="选择显示的列表" width="240px">
            <div class="hightSelect_box m_clearLR">
              <div class="checkItem">
                <el-checkbox v-model="allCheck" @change="allselect">全选</el-checkbox>
              </div>
              <transition-group tag="div" class="container m_clearLR">
                <div v-for="(item,index) in configList" :key="index" class="checkItem">
                  <div>
                    <el-checkbox v-model="item.flag">{{ item.industry_name }}</el-checkbox>
                    <div class="sorts">
                      <i class="iconfont iconpaixu1" />
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="screenShow = false">取 消</el-button>
              <el-button type="primary" @click="comfirmShows">确 定</el-button>
            </span>
          </el-dialog>
          <em @click="openScreen"><i class="iconfont iconshezhibeifen" />配置</em>
        </span>
      </div>
      <div class="chart">
        <el-table v-show="barIndex === 0 || barIndex === 1" :data="tableData">
          <el-table-column
            v-for="(item,index) in tableLists.data1"
            :key="index"
            :label="item.industry_type"
            width="120"
          >
            <template slot-scope="{row}">
              <span>{{ barIndex ===0 ? tableLists.data1[index].total_times : tableLists.data1[index].print_count }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="barIndex === 2 || barIndex === 3 || barIndex === 4"
          :data="tableLists.data2"
          @sort-change="sortChange"
        >
          <el-table-column label="排名" type="index" />
          <el-table-column
            :label="barIndex === 2 ? '省市': barIndex === 3 ? '尺寸' : '型号'"
            :prop="barIndex === 2 ? 'location': barIndex === 3 ? 'print_size' : 'printer_type'"
            width="160"
          />
          <el-table-column
            v-for="(item,index) in showConfigList"
            :key="index"
            :label="item.industry_name"
            :prop="item.industry_name"
            sortable
            width="120"
          />
        </el-table>
      </div>
    </div>
    <div v-if="totalnumber > 10" class="pagination-container m_floatL">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeData"
        @current-change="handleCurrentChangeData"
      />
    </div>
  </div>
</template>
<script>
import {
  industryAnalyze,
  industryConfig,
  setIndustryConfig,
  industryPrint,
  industryCityUser,
  industryPrintSize,
  industryPrintType
} from '@/api/api-python'
import { open_company_list } from '@/api/api'
import moment from 'moment'
import echarts from 'echarts'
export default {
  data() {
    return {
      fileTexts: [
        '各行业用户数',
        '各行业打印量',
        '各省市行业用户数',
        '各行业耗材使用量',
        '各行业打印机型号使用量'
      ],
      barIndex: 0,
      time: [
        moment().subtract(7, 'days').format('YYYY-MM-DD'),
        moment().subtract(1, 'days').format('YYYY-MM-DD')
      ],
      tempTable: [1],
      tableLists: {
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: []
      },
      // 配置项列表
      configList: [],
      showConfigList: [],
      // 是否全选
      allCheck: false,
      ordering: '',
      page: 1,
      page_size: 10,
      options: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      userList: {
        company_id: '',
        ordering: ''
      },
      screenShow: false,
      // 商户
      companys: [],
      // 商户id
      companyId: '',
      tableData: [{}]
    }
  },
  created() {
    this.getUserNumber()
    this.getIndustryConfig()
    this.getCompanyList()
  },
  methods: {
    // 点击排序
    sortChange(val) {
      if (val.order === 'descending') {
        this.ordering = '-' + val.prop
      } else if (val.order === 'ascending') {
        this.ordering = val.prop
      } else {
        this.ordering = ''
      }
      if (this.barIndex === 2) {
        this.getindustryCityUser()
      } else if (this.barIndex === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    // 获取商户信息
    async getCompanyList() {
      const res = await open_company_list()
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
    },
    openScreen() {
      this.screenShow = true
    },
    selectBarIndex(index) {
      this.barIndex = index
      this.page = 1
      this.page_size = 10
      this.currentpage = 1
      if (index === 0) {
        this.getUserNumber()
      } else if (index === 1) {
        this.getindustryPrint()
      } else if (index === 2) {
        this.getindustryCityUser()
      } else if (index === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    async getIndustryConfig() {
      const res = await industryConfig()
      this.configList = res.results
      this.configList.forEach((value) => {
        this.$set(value, 'flag', value.is_show === 1)
      })
      this.showConfigList = this.configList.filter((value) => value.flag)
      this.allCheck =
        this.configList.filter((value) => value.flag).length ===
        this.configList.length
    },
    async getUserNumber() {
      this.tableLists.data1 = []
      const res = await industryAnalyze({
        company_id: this.userList.company_id,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data1 = res.results
      this.initEcharts()
    },
    changeType(val) {
      this.company_id = val
      if (this.barIndex === 0) {
        this.getUserNumber()
      } else if (this.barIndex === 1) {
        this.getindustryPrint()
      } else if (this.barIndex === 2) {
        this.getindustryCityUser()
      } else if (this.barIndex === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    // 时间变化
    handleChange() {
      if (this.barIndex === 0) {
        this.getUserNumber()
      } else if (this.barIndex === 1) {
        this.getindustryPrint()
      } else if (this.barIndex === 2) {
        this.getindustryCityUser()
      } else if (this.barIndex === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    // 各行业打印量占比
    async getindustryPrint() {
      this.tableLists.data1 = []
      const res = await industryPrint({
        company_id: this.userList.company_id,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data1 = res.results
      this.initEcharts()
    },
    // 各省市行业用户数占比
    async getindustryCityUser() {
      this.tableLists.data2 = []
      const res = await industryCityUser({
        page: this.page,
        page_size: this.page_size,
        company_id: this.company_id,
        ordering: this.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data2 = res.results.results
      this.totalnumber = res.results.count
    },
    // 各行业耗材尺寸使用占比
    async getindustryPrintSize() {
      this.tableLists.data2 = []
      const res = await industryPrintSize({
        page: this.page,
        page_size: this.page_size,
        company_id: this.company_id,
        ordering: this.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data2 = res.results.results
      this.totalnumber = res.results.count
    },
    // 各行业打印机型号使用占比
    async getindustryPrintType() {
      const res = await industryPrintType({
        page: this.page,
        page_size: this.page_size,
        company_id: this.company_id,
        ordering: this.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data2 = res.results.results
      this.totalnumber = res.results.count
    },
    handleSizeChangeData(val) {
      this.page_size = val
      if (this.barIndex === 2) {
        this.getindustryCityUser()
      } else if (this.barIndex === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    handleCurrentChangeData(val) {
      this.page = val
      if (this.barIndex === 2) {
        this.getindustryCityUser()
      } else if (this.barIndex === 3) {
        this.getindustryPrintSize()
      } else {
        this.getindustryPrintType()
      }
    },
    // 全选
    allselect() {
      this.configList.forEach((value) => {
        this.$set(value, 'flag', this.allCheck)
      })
    },
    // 确定
    async comfirmShows() {
      this.screenShow = false
      const is_select = this.configList
        .filter((value) => value.flag)
        .map((val) => val.industry_id)
        .join(',')
      const un_select = this.configList
        .filter((value) => !value.flag)
        .map((val) => val.industry_id)
        .join(',')
      const res = await setIndustryConfig({
        is_select,
        un_select
      })
      if (res.status === 200) {
        this.getIndustryConfig()
        if (this.barIndex === 0) {
          this.getUserNumber()
        } else if (this.barIndex === 1) {
          this.getindustryPrint()
        } else if (this.barIndex === 2) {
          this.getindustryCityUser()
        } else if (this.barIndex === 3) {
          this.getindustryPrintSize()
        } else {
          this.getindustryPrintType()
        }
      }
    },
    // echarts图标
    initEcharts() {
      const options = {
        backgroundColor: '#fff',
        tooltip: {
          show: true,
          trigger: 'item',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                global: false
              }
            }
          }
        },
        legend: {
          right: 20,
          top: 0,
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
          itemWidth: 30, // 图例图形宽度
          itemHeight: 10, // 图例图形高度
          textStyle: {
            color: 'red',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.tableLists.data1.map(
              (value) => value.industry_type || value.print_count
            ),
            axisTick: {
              show: false // 是否显示坐标轴轴线
            },
            axisLabel: {
              color: '#666666'
            },
            splitLine: {
              show: false
            },
            boundaryGap: true,
            axisLine: {
              // 坐标轴轴线相关设置。
              show: false,
              inside: false
            }
          }
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            splitNumber: 10,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#C3C3C3'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(131,101,101,0.2)',
                type: 'dashed'
              }
            },
            show: true
          }
        ],
        series: [
          {
            type: 'bar',
            barMaxWidth: 8,
            zlevel: 10,
            data: this.barIndex === 0 ? this.tableLists.data1.map((value) => value.total_times) : this.tableLists.data1.map((value) => value.print_count),
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#2274E5'
                    },
                    {
                      offset: 1,
                      color: '#2274E5'
                    }
                  ]
                },
                barBorderRadius: [30, 30, 0, 0]
              }
            }
          }
        ]
      }
      const myChart = echarts.init(this.$refs.echarts)
      myChart.setOption(options, true)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-table__fixed-right {
  opacity: 0;
  transition: all 1s linear;
}
/deep/.el-table:hover {
  /deep/.el-table__fixed-right {
    // display: block !important;
    opacity: 1;
  }
}

.signadmin {
  width: 100%;
  display: flex;
  .app-content {
    margin-left: 0;
    flex: 1;
    overflow: hidden;
    .echarts-time {
      background: #fff;
      padding: 26px 24px;
      margin-bottom: 8px;
      .selectPartner {
        span {
          position: relative;
          font-size: 14px;
          color: #2274e5;
          cursor: pointer;
          margin-left: 50px;
          i {
            margin-right: 8px;
          }
        }
      }
    }
    .fileBar_box {
      z-index: 9;
      display: flex;
      justify-content: flex-start;
      position: relative;
      & > div:nth-child(2) {
        opacity: 0.8;
      }
      & > div:nth-child(3) {
        opacity: 0.6;
      }
      & > div:nth-child(4) {
        opacity: 0.4;
      }
      .fileBar_div {
        padding-left: 23px;
        line-height: 56px;
        width: 220px;
        margin-right: 8px;
        cursor: pointer;
        height: 56px;
        background: rgba(34, 116, 229, 1);
        border-radius: 8px 8px 0px 0px;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        &.active {
          color: #2274e5;
          opacity: 1;
          background-color: #fff;
        }
        &.active::after {
          content: '';
          width: 4px;
          position: absolute;
          left: 0px;
          top: 16px;
          height: 22px;
          background-color: #2274e5;
        }
      }
    }
    .charts {
      height: 650px;
      padding: 0;
    }
  }
}
.hightSelect_box {
  max-height: 400px;
  overflow-x: hidden;
}
.tabledata {
  .list {
    display: flex;
    justify-content: space-between;
    padding: 32px 24px 16px;
    span {
      &:first-child {
        font-size: 18px;
        font-weight: 500;
      }
      &:last-child {
        position: relative;
        font-size: 14px;
        color: #2274e5;
        cursor: pointer;
        i {
          margin-right: 8px;
        }
      }
    }
  }
  .chart {
    table {
      width: 100%;
      thead {
        height: 60px;
        line-height: 60px;
        background: #fff;
        margin-bottom: 8px;
        th {
          border-bottom: 8px solid #f6f8fa;
          position: relative;
          cursor: pointer;
          width: 100px;
          span {
            position: absolute;
            right: 0;
            top: 17px;
            em {
              display: block;
              width: 0;
              height: 0;
              border: 6px solid #c3c3c3;
              border-left-color: transparent;
              border-right-color: transparent;
              margin-bottom: 2px;
              &:first-child {
                border-top-color: transparent; /* 设置透明背景色 */
              }
              &:last-child {
                border-bottom-color: transparent; /* 设置透明背景色 */
              }
            }
          }
        }
      }
      tbody {
        background: #fff;
        tr {
          height: 64px;
          line-height: 64px;
          border: 1px solid #e5e5e5;
        }
      }
    }
  }
}
</style>
