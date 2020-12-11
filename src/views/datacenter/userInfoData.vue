<template>
  <div class="userInfo-box">
    <div class="userInfo">
      <div class="userItem">
        <div class="header">用户资料</div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">昵称:</div>
            <div class="textContent m_floatL">{{ dataForm.nick_name }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">性别:</div>
            <div class="textContent m_floatL">{{ dataForm.sex==1?'男':dataForm.sex==2?'女':'其他' }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">手机号:</div>
            <div class="textContent m_floatL">{{ dataForm.phone }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">地域:</div>
            <div class="textContent m_floatL">{{ dataForm.province+dataForm.city }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">企业名称:</div>
            <div class="textContent m_floatL">{{ dataForm.enterprise_name }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">公司地址:</div>
            <div class="textContent m_floatL">{{ dataForm.address }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">行业:</div>
            <div class="textContent m_floatL">{{ dataForm.industry_type }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">注册时间:</div>
            <div class="textContent m_floatL">{{ (dataForm.register_time*1000)|formatDate('') }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">注册渠道:</div>
            <div class="textContent m_floatL">{{ equip[dataForm.first_equip] }}</div>
          </div>
        </div>
      </div>
      <div class="userItem">
        <div class="header">注册信息</div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">注册时间:</div>
            <div class="textContent m_floatL">{{ (dataForm.register_time*1000)|formatDate('') }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">注册渠道:</div>
            <div class="textContent m_floatL">{{ equip[dataForm.first_equip] }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">所属友商:</div>
            <div class="textContent m_floatL">{{ dataForm.company_name }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">最近访问时间:</div>
            <div class="textContent m_floatL">{{ dataForm.last_load_times }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">设备:</div>
            <div class="textContent m_floatL">{{ dataForm.mobile_devices }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">当前使用版本:</div>
            <div
              class="textContent m_floatL"
            >AD{{ dataForm.dlabel_version && dataForm.dlabel_version.AD }} IOS{{ dataForm.dlabel_version && dataForm.dlabel_version.IOS }} PC{{ dataForm.dlabel_version && dataForm.dlabel_version.PC }}</div>
          </div>
        </div>
      </div>
      <div class="userItem">
        <div class="header">
          业务信息
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content" class="tooltip-content-box">以下信息是统计用户从注册时间到当前时间的总数据</div>
            <span style="padding-right:16px">
              <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
            </span>
          </el-tooltip>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">访问次数:</div>
            <div class="textContent m_floatL">{{ dataForm.total_load_times }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">打印面积(m²):</div>
            <div
              v-if="dataForm.total_print_area"
              class="textContent m_floatL"
            >{{ dataForm.total_print_area.toFixed(4) }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">打印次数:</div>
            <div class="textContent m_floatL">{{ dataForm.total_print_times }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">打印数量:</div>
            <div class="textContent m_floatL">{{ dataForm.total_print_count }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">平均每天打印数量:</div>
            <div
              v-if="dataForm.day_percent_print"
              class="textContent m_floatL"
            >{{ dataForm.day_percent_print.toFixed(0) }}</div>
          </div>
        </div>
      </div>
      <div class="userItem">
        <div class="header">备注</div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">
              <img
                v-if="dataForm.sign_type"
                :src="require( `@/assets/img/${dataForm.sign_type}.png`)"
                style="width:19px;margin-right:17px"
                alt
              >
            </div>
            <div class="m_floatL">{{ dataForm.sign_content?dataForm.sign_content:'无' }}</div>
          </div>
        </div>
        <div class="itemDiv">
          <div class="m_clearLR">
            <div class="m_floatL textHead">备注内容:</div>
            <div class="textContent m_floatL">{{ dataForm.mark_content }}</div>
          </div>
        </div>
        <!-- <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">当前使用版本： </div>
          <div class="textContent "> Android {{ dataForm.dlabelAndroidVersion||'无' }}</div>
          <div class="textContent" style="margin-left:100px;margin-top:16px;"> PC {{ dataForm.dlabelPcVersion||'无' }}</div>
          <div class="textContent " style="margin-left:100px;margin-top:16px;"> IOS {{ dataForm.dlabelIosVersion||'无' }}</div>
        </div>
        </div>-->

        <!-- <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">云文件个数: </div>
          <div class="textContent m_floatL"> {{ dataForm.cloudNum }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">归属友商: </div>
          <div class="textContent m_floatL"> {{ dataForm.companyName }}</div>
        </div>-->
      </div>
    </div>
    <div class="app-content">
      <div class="fileBar_box">
        <div
          v-for="(item,index) in fileTexts"
          :class="barIndex==index?'active':''"
          :key="index"
          class="fileBar_div"
          @click="selectBarIndex(index)"
        >{{ item }}</div>
      </div>
      <!-- <div class="bar-line" v-show="barIndex==1"/> -->
      <div :class="{flexend:barIndex !== 0}" class="tabselect echarts-time">
        <div v-show="barIndex == 0&&dataForm.company_id==1" class="bar-tran-box">
          <div :class="{active:currentIndex==0}" class="bar-tran-item" @click="selectData(0)">全部</div>
          <div :class="{active:currentIndex==1}" class="bar-tran-item" @click="selectData(1)">RFID耗材</div>
          <div
            :class="{active:currentIndex==2}"
            class="bar-tran-item"
            @click="selectData(2)"
          >非RFID耗材</div>
        </div>
        <div class="echarts-date">
          <div class="bar-tran-box timeselect">
            <!-- <span
              v-for="(item,index) in timeList"
              :key="index"
              :class="timeIndex === index ? 'active bar-tran-item': 'bar-tran-item'"
              @click="selectTime(index)"
            >{{ item }}</span> -->
            <span :class="timeIndex === 0 ? 'active bar-tran-item': 'bar-tran-item'" @click="selectTime(0)">天</span>
            <span :class="days < 7 ? 'disabled bar-tran-item': timeIndex === 1 ? 'active bar-tran-item': 'bar-tran-item'" @click="selectTime(1)">周</span>
            <span :class="days < 30 ? 'disabled bar-tran-item': timeIndex === 2 ? 'active bar-tran-item': 'bar-tran-item'" @click="selectTime(2)">月</span>
          </div>
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
      <el-table
        v-loading="loading"
        v-show="barIndex===0&&currentIndex===0"
        ref="singleTable"
        :data="tableLists.data1"
        :default-sort="{prop: 'area', order: 'descending'}"
        highlight-current-row
        style="width: 100%;"
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column property="print_day" label="时间" />
        <el-table-column property="print_size" label="尺寸" />
        <el-table-column width="180" sortable property="area">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div
                  slot="content"
                  class="tooltip-content-box"
                >指统计用户从注册时间到当前时间的打印面积，打印面积(m²)=宽*高*打印数量</div>
                <span style="padding-right:16px">
                  打印面积(m²)
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column sortable property="print_times">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印次数，点击”打印”按钮记为1次</div>
                <span style="padding-right:16px">
                  打印次数
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_times }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable property="print_count">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印数量</div>
                <span style="padding-right:16px">
                  打印数量
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_count }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-loading="loading"
        v-show="barIndex==0&&currentIndex==1"
        ref="singleTable"
        :data="tableLists.data2"
        :default-sort="{prop: 'area', order: 'descending'}"
        highlight-current-row
        style="width: 100%"
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column property="paper_type" label="时间" />
        <el-table-column property="paper_type" label="耗材类型" />
        <!-- <el-table-column property="print_size" label="尺寸" /> -->
        <el-table-column property="print_times" label="尺寸" sortable>
          <template slot-scope="{row}">
            <span>{{ row.width+'*'+row.height }}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" sortable property="area">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div
                  slot="content"
                  class="tooltip-content-box"
                >指统计用户从注册时间到当前时间的打印面积，打印面积(m²)=宽*高*打印数量</div>
                <span style="padding-right:16px">
                  打印面积(m²)
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>

        <el-table-column sortable property="print_times">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印次数，点击”打印”按钮记为1次</div>
                <span style="padding-right:16px">
                  打印次数
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_times }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable property="print_count">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印数量</div>
                <span style="padding-right:16px">
                  打印数量
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_count }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-loading="loading"
        v-show="barIndex==0&&currentIndex==2"
        ref="singleTable"
        :data="tableLists.data3"
        highlight-current-row
        style="width: 100%"
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column property="paper_type" label="时间" />
        <el-table-column property="paper_type" label="耗材类型" />
        <el-table-column property="print_size" label="尺寸" />
        <el-table-column width="180" sortable property="area">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">打印面积(m²)=宽*高*打印数量</div>
                <span style="padding-right:16px">
                  打印面积(m²)
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.area}}</span>
          </template>
        </el-table-column>
        <el-table-column sortable property="print_times">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印次数，点击”打印”按钮记为1次</div>
                <span style="padding-right:16px">
                  打印次数
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_times }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable property="print_count">
          <template slot="header" slot-scope="scope">
            <span>
              <el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">指统计用户从注册是按到当前时间的打印数量</div>
                <span style="padding-right:16px">
                  打印数量
                  <img src="@/assets/img/i-icon.png" class="i-icon-header" alt >
                </span>
              </el-tooltip>
            </span>
          </template>
          <template slot-scope="scope">
            <span>{{ scope.row.print_count }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        v-show="barIndex==1"
        ref="singleTable"
        :data="tableLists.data4"
        highlight-current-row
        style="width: 100%"
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column property="print_day" label="时间" />
        <el-table-column property="local_print_times" label="本地标签打印次数" sortable />
        <el-table-column property="local_print_count" label="本地标签打印数量" sortable />
        <el-table-column property="cloud_print_times" label="云标签打印次数" sortable />
        <el-table-column property="cloud_print_count" label="云标签打印数量" sortable />
      </el-table>

      <!-- 设备信息 -->
      <el-table
        v-show="barIndex===2"
        ref="singleTable"
        :data="tableLists.data4"
        highlight-current-row
        style="width: 100%"
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column property="print_day" label="时间" />
        <el-table-column property="printer_brand" label="品牌" />
        <el-table-column property="printer_type" label="型号" />
        <el-table-column property="print_times" label="打印次数" sortable />
        <el-table-column property="print_count" label="打印数量" sortable />
      </el-table>

      <div v-show="totalnumber>0" class="pagination-container">
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
  </div>
</template>

<script>
import moment from 'moment'
import {
  print_infoById,
  user_sign,
  paper_rfid,
  local_cloud,
  user_printer,
  paper_unrfid
} from '@/api/api-python'
export default {
  filters: {
    formatDate(time) {
      if (time) {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  data() {
    return {
      dataForm: {},
      loading: true,
      fileTexts: ['打印尺寸分析', '打印标签分析', '设备信息'],
      barIndex: 0,
      currentIndex: 0,
      totalnumber: 0,
      listQuery: {
        page: 1,
        page_size: 10,
        company_id: '',
        ordering: ''
      },
      days: 7,
      timeList: ['天', '周', '月'],
      timeIndex: 1,
      time: [
        moment().subtract(7, 'days').format('YYYY-MM-DD'),
        moment().subtract(1, 'days').format('YYYY-MM-DD')
      ],
      options: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
        // shortcuts: [
        //   {
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        //       picker.$emit('pick', [start, end])
        //     }
        //   },
        //   {
        //     text: '最近一个月',
        //     onClick(picker) {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        //       picker.$emit('pick', [start, end])
        //     }
        //   },
        //   {
        //     text: '最近三个月',
        //     onClick(picker) {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        //       picker.$emit('pick', [start, end])
        //     }
        //   }
        // ]
      },
      tableLists: {
        data1: [],
        data2: [],
        data3: [],
        data4: []
      },
      equip: ['未知', '安卓', 'IOS', 'PC', 'Web端']
    }
  },
  computed: {
    dayLength() {
      return moment(this.time[0]).diff(this.time[1], 'day')
    }
  },
  watch: {
    time(newValue) {
      this.days = moment(newValue[1]).diff(newValue[0], 'day')
      if (this.days < 7) {
        this.timeIndex = 0
      }
    }
  },
  created() {
    // user_info({ id: this.$route.query.t }).then(res => {
    //   console.log('res')
    //   console.log(res)
    //   this.dataForm = res.data
    // })
    this.listQuery.company_id = this.$route.query.cid

    print_infoById({ id: this.$route.query.id }).then((res) => {
      this.dataForm = res.results
    })
    // this.selectData(0)
    // console.log('444', this.dayLength())
  },
  methods: {
    sortChange(val) {
      if (val.order === 'descending') {
        this.listQuery.ordering = '-' + val.prop
      } else {
        this.listQuery.ordering = val.prop
      }
      this.selectBarIndex(this.barIndex)
    },
    handleSizeChangeData(val) {
      this.listQuery.page_size = val
      this.selectBarIndex(this.barIndex)
    },
    handleCurrentChangeData(val) {
      this.listQuery.page = val
      this.selectBarIndex(this.barIndex)
    },
    selectBarIndex(index) {
      this.loading = true
      if (index === 0) {
        this.barIndex = index
        this.selectData(this.currentIndex)
      } else if (index === 1) {
        if (this.barIndex !== index) {
          this.listQuery.ordering = ''
          this.barIndex = index
        }
        this.getLocalPrinter()
      } else {
        if (this.barIndex !== index) {
          this.listQuery.ordering = ''
          this.barIndex = index
        }
        this.getUserPrinter()
      }
    },
    handleChange() {
      if (this.barIndex === 0) {
        if (this.currentIndex === 0) {
          this.getUserSign()
        } else if (this.currentIndex === 1) {
          this.getpaperRfid()
        } else {
          this.getpaperUnrfid()
        }
      } else if (this.barIndex === 1) {
        this.getLocalPrinter()
      } else {
        this.getUserPrinter()
      }
    },
    // 选择日周月
    selectTime(index) {
      if (index === 1) {
        if (this.days >= 7) {
          this.timeIndex = index
          if (this.barIndex === 0) {
            if (this.currentIndex === 0) {
              this.getUserSign()
            } else if (this.currentIndex === 1) {
              this.getpaperRfid()
            } else {
              this.getpaperUnrfid()
            }
          } else if (this.barIndex === 1) {
            this.getLocalPrinter()
          } else {
            this.getUserPrinter()
          }
        }
      } else if (index === 2) {
        if (this.days >= 30) {
          this.timeIndex = index
          if (this.barIndex === 0) {
            if (this.currentIndex === 0) {
              this.getUserSign()
            } else if (this.currentIndex === 1) {
              this.getpaperRfid()
            } else {
              this.getpaperUnrfid()
            }
          } else if (this.barIndex === 1) {
            this.getLocalPrinter()
          } else {
            this.getUserPrinter()
          }
        }
      } else {
        this.timeIndex = index
        if (this.barIndex === 0) {
          if (this.currentIndex === 0) {
            this.getUserSign()
          } else if (this.currentIndex === 1) {
            this.getpaperRfid()
          } else {
            this.getpaperUnrfid()
          }
        } else if (this.barIndex === 1) {
          this.getLocalPrinter()
        } else {
          this.getUserPrinter()
        }
      }
    },
    selectData(index) {
      this.loading = true
      this.currentIndex = index
      if (index === 0) {
        this.getUserSign()
      } else if (index === 1) {
        this.getpaperRfid()
      } else {
        this.getpaperUnrfid()
      }
    },
    async getLocalPrinter() {
      const res = await local_cloud({
        id: this.$route.query.id,
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1],
        time_type: this.timeIndex + 1
      })
      this.loading = false
      this.tableLists.data4 = res.results.results
      this.totalnumber = res.results.count
    },
    // 获取全部打印尺寸
    async getUserSign() {
      const res = await user_sign({
        user_id: this.$route.query.id,
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1],
        time_type: this.timeIndex + 1
      })
      this.tableLists.data1 = res.results.results
      this.totalnumber = res.results.count
      this.loading = false
    },
    async getpaperRfid() {
      const res = await paper_rfid({
        id: this.$route.query.id,
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1],
        time_type: this.timeIndex + 1
      })
      this.tableLists.data2 = res.results.results
      this.totalnumber = res.results.count
      this.loading = false
    },
    // 获取非RFID耗材
    async getpaperUnrfid() {
      const res = await paper_unrfid({
        id: this.$route.query.id,
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1],
        time_type: this.timeIndex + 1
      })
      this.tableLists.data3 = res.results.results
      this.totalnumber = res.results.count
      this.loading = false
    },
    // 获取用户设备信息
    async getUserPrinter() {
      const res = await user_printer({
        id: this.$route.query.id,
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1],
        time_type: this.timeIndex + 1
      })
      this.loading = false
      this.tableLists.data4 = res.results.results
      this.totalnumber = res.results.count
    }
  }
}
</script>

<style scoped lang="scss">
.tooltip-content-box {
  padding: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  .tooltip-flag-text {
    margin-left: 4px;
  }
  .tooltip-flag-content {
    margin-top: 6px;
  }
}
.tabselect {
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  margin-bottom: 8px;
  .echarts-date {
    display: flex;
    align-items: center;
  }
}
.flexend {
  justify-content: flex-end;
}
.bar-tran-box {
  background-color: #ffffff;
  display: flex;
  .bar-tran-item {
    width: 120px;
    height: 40px;
    cursor: pointer;
    line-height: 40px;
    text-align: center;
    color: rgba(102, 102, 102, 1);
    border-radius: 4px;
    border: 1px solid #c3c3c3;
    &.active {
      border: 1px solid rgba(34, 116, 229, 1);
      color: rgba(34, 116, 229, 1);
      border-radius: 4px;
    }
    &.disabled {
      color: #D0D0D0;
      border-radius: 4px;
      cursor: no-drop;
    }
  }
  & > div:nth-child(2) {
    border-left: 0px;
    border-radius: 0;
  }
  & > div:last-child {
    border-radius: 0px 4px 4px 0px;
    border-left: 0px;
  }
  &.timeselect {
    margin-right: 50px;
    .bar-tran-item {
      width: 52px;
    }
  }
}
.app-content {
  margin-left: 42px;
  flex: 1;
  width: 1541px;
  overflow: hidden;
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
      width: 162px;
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
}
.userInfo {
  padding: 33px 42px;
  display: flex;
  .userItem {
    margin-right: 32px;
    width: 500px;
    height: 500px;
    padding: 24px 32px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    .header {
      // width: 64px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(60, 60, 60, 1);
      line-height: 22px;
      .i-icon-header {
        margin-top: 5px;
        margin-left: 5px;
      }
    }
    .itemDiv {
      margin-top: 25px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      .textContent {
        margin-left: 17px;
      }
    }
  }
}
</style>
