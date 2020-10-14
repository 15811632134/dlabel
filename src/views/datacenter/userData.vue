<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-menu">
        <h3>全部（{{ companys.length }}）</h3>
        <ul>
          <li
            v-for="(item,index) in companys"
            :class="currentIndex==index?'active':''"
            :key="index"
            class="textLine"
            @click="selectCompany(item.id,index)"
          >{{ item.shortName }}</li>
        </ul>
      </div>
      <div class="app-content">
        <div class="screen-box">
          <div class="screen-item">
            <div class="echarts-time">
              <div >手机号</div>
              <div>
                <el-input
                  v-model="listQuery.phone"
                   @keyup.native.enter="onSearchData"
                  :disabled="listQuery.printer_type!=''||listQuery.printer_brand!=''||listQuery.width_start!=''
                    ||listQuery.width_end!=''||listQuery.height_start!=''||
                    listQuery.day_percent_print_end!=''||
                    listQuery.day_percent_print_start!=''||
                    listQuery.print_area_end!=''||
                    listQuery.print_area_start!=''||
                    listQuery.print_times_end!=''||
                    listQuery.print_times_start!=''||
                    listQuery.print_count_end!=''||
                    listQuery.print_count_start!=''||
                    listQuery.load_times_end!=''||
                    listQuery.load_times_start!=''||
                    listQuery.height_end!=''||
                    listQuery.height_start!=''||
                  selectDate.length>0"
                  placeholder="请输入手机号"
                  maxlength="20"
                  type="text"
                  @input="numberOriginalPrice($event,'phone')" />
              </div>
            </div>
          </div>

          <div class="screen-item">
            <div class="echarts-time">
              <div class="title-right">访问时间<el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  默认为近一周的访问时间</div>
                <span style="padding-right:16px"><img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></div>
              <!-- <ul>
                <li :class="dateType=='week'?'active':''" @click="screen('week')">一星期</li>
                <li :class="dateType=='month'?'active':''" @click="screen('month')">一个月</li>
                <li :class="dateType=='threemonth'?'active':''" @click="screen('threemonth')">三个月</li>
              </ul>-->
              <div class="echarts-date">
                <el-date-picker
                  :picker-options="pickerOptionsDate"
                  v-model="selectDate"
                  :disabled="listQuery.phone!=''"
                  type="daterange"
                  ref="date-picker"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="changeTime"
                />
                <em class="iconfont iconrilix" @click="openDate" />
              </div>
            </div>
          </div>

          <div class="screen-item">
            <div class="echarts-time">
              <div>设备品牌<el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  用户打印标签使用的设备品牌</div>
                <span style="padding-right:16px"><img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></div>
              <div class="echarts-select">
                <el-select v-model="listQuery.printer_brand" filterable :disabled="listQuery.phone!=''" class="filter-item m_floatL" placeholder="请选择" @change="changePrinter">
                  <el-option v-for="(item) in printers" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div class="title-right">平均每天打印数量</div>
              <div class="echarts-input-right">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.day_percent_print_start" :disabled="listQuery.phone!=''" type="text" placeholder="张" @input="numberOriginalPrice($event,'day_percent_print_start')"/>
              </div>
              <div style="margin-left:18px;">至</div>
              <div class="echarts-input-left">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.day_percent_print_end" :disabled="listQuery.phone!=''" type="text" placeholder="张" @input="numberOriginalPrice($event,'day_percent_print_end')"/>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div >设备型号<el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  用户打印标签使用的设备型号</div>
                <span style="padding-right:16px"><img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></div>
              <div class="echarts-select">
                <el-select v-model="listQuery.printer_type" filterable :disabled="listQuery.phone!=''" class="filter-item m_floatL" placeholder="请选择">
                  <el-option v-for="(item) in printerBrands" :key="item.name" :label="item.name" :value="item.name" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div class="title-right">访问次数</div>
              <div class="echarts-input-right" >
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.load_times_start" :disabled="listQuery.phone!=''" type="text" placeholder="次" @input="numberOriginalPrice($event,'load_times_start')"/>
              </div>
              <div style="margin-left:18px;">至</div>
              <div class="echarts-input-left" >
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.load_times_end" :disabled="listQuery.phone!=''" type="text" placeholder="次" @input="numberOriginalPrice($event,'load_timesload_times_end_start')"/>
              </div>
            </div>
          </div>

          <div class="screen-item">
            <div class="echarts-time">
              <div>打印数量</div>
              <div class="echarts-input-right">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_count_start" :disabled="listQuery.phone!=''" type="text" placeholder="张" @input="numberOriginalPrice($event,'print_count_start')"/>
              </div>
              <div style="margin-left:18px;">至</div>
              <div class="echarts-input-left">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_count_end" :disabled="listQuery.phone!=''" type="text" placeholder="张" @input="numberOriginalPrice($event,'print_count_end')"/>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div class="title-right">行业<el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  根据用户保存的标签内容划分的行业</div>
                <span style="padding-right:16px"><img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></div>
              <div class="echarts-select">
                <el-select v-model="listQuery.industry_type" :disabled="listQuery.phone!=''" class="filter-item m_floatL" placeholder="请选择">
                  <el-option v-for="(item) in industry" :key="item.id" :label="item.industry_name" :value="item.id" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div>打印次数</div>
              <div class="echarts-input-right">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_times_start" :disabled="listQuery.phone!=''" type="text" placeholder="次" @input="numberOriginalPrice($event,'print_times_start')"/>
              </div>
              <div style="margin-left:18px;">至</div>
              <div class="echarts-input-left">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_times_end" :disabled="listQuery.phone!=''" type="text" placeholder="次" @input="numberOriginalPrice($event,'print_times_end')"/>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div class="title-right">打印尺寸</div>
              <div class="echarts-input-right-1">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.width_start" :disabled="listQuery.phone!=''" type="text" placeholder="宽" @input="numberOriginalPrice($event,'width_start')"/>
              </div>
              <div style="margin-left:9px;">~</div>
              <div class="echarts-input-right-2">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.width_end" :disabled="listQuery.phone!=''" type="text" placeholder="宽" @input="numberOriginalPrice($event,'width_end')"/>
              </div>
              <div style="margin-left:9px;">至</div>
              <div class="echarts-input-left-1">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.height_start" :disabled="listQuery.phone!=''" placeholder="高" type="text" @input="numberOriginalPrice($event,'height_start')"/>
              </div>
              <div style="margin-left:9px;">~</div>
              <div class="echarts-input-left-2">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.height_end" :disabled="listQuery.phone!=''" placeholder="高" type="text" @input="numberOriginalPrice($event,'height_end')"/>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="echarts-time">
              <div>打印面积</div>
              <div class="echarts-input-right">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_area_start" :disabled="listQuery.phone!=''" type="text" placeholder="m²" @input="numberOriginalPrice($event,'print_area_start')"/>
              </div>
              <div style="margin-left:18px;">至</div>
              <div class="echarts-input-left">
                <el-input @keyup.native.enter="onSearchData" v-model="listQuery.print_area_end" :disabled="listQuery.phone!=''" type="text" placeholder="m²" @input="numberOriginalPrice($event,'print_area_end')"/>
              </div>
            </div>
          </div>
          <div class="screen-item">
            <div class="search">
              <div class="search-list searchbtn">
                <el-button type="primary" class="m_search" @click="onSearchData" :disabled="loading">查询</el-button>
                <div class="search-reset">
                  <el-button type="primary" @click="resetData">
                    <i class="iconfont iconzhongzhimima" style="margin-right:5px;" />重置
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class=" filesearch filesearch_box">
          <div class="search searchFlex">
            <div v-show="barIndex==0" class="search-list">
              <span >文件名：</span>
              <el-input v-model="listQuery.name" maxlength="20" placeholder="请输入文件名" @keyup.native.enter="handleSearch" />
            </div>
            <div v-show="barIndex==0" class="search-list size" >
              <span>文件尺寸：</span>
              <el-input v-model="listQuery.width" maxlength="5" placeholder="40mm" @keyup.native.enter="handleSearch" />
              <div style="margin:0px 10px;">*</div>
              <el-input v-model="listQuery.height" placeholder="30mm" maxlength="5" @keyup.native.enter="handleSearch" />
            </div>
            <div class="search-list" >
              <span>创建者：</span>
              <el-input v-model="listQuery.phone" maxlength="20" placeholder="请输入创建者" @keyup.native.enter="handleSearch" />
            </div>
            <div v-show="barIndex!=0" class="search" style="margin-left:64px;">
              <div class="search-list searchbtn">
                <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
                <div class="search-reset">
                  <el-button type="primary" @click="resetData"><i class="iconfont iconzhongzhimima" style="margin-right:5px;"/>重置</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-show="barIndex==0" class="search">
            <div class="search-list searchbtn">
              <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
              <div class="search-reset">
                <el-button type="primary" @click="resetData"><i class="iconfont iconzhongzhimima" style="margin-right:5px;"/>重置</el-button>
              </div>
            </div>
          </div>
        </div>-->
        <el-table
          v-loading="loading"
          ref="singleTable"

          :data="tableLists"
          :default-sort="{prop: 'total_load_times', order: 'descending'}"
          highlight-current-row
          element-loading-text="数据加载中，请稍后"
          style="width: 100%"
          class="table"
          @sort-change="sortChange"
        >
          <el-table-column property="nick_name" label="用户名" :show-overflow-tooltip="true" />
          <el-table-column property="phone" label="手机号" />
          <el-table-column
            sortable
            property="total_load_times">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  指统计用户访问时间段内启动DLabel软件的次数</div>
                <span style="padding-right:16px">访问次数<img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope" >
              <span>{{ scope.row.total_load_times }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            sortable
            property="total_print_area">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  指统计用户从注册时间到当前时间的打印面积，打印面积(m²)=宽*高*打印数量</div>
                <span style="padding-right:16px">打印面积(m²)<img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope" >
              <span>{{ scope.row.total_print_area.toFixed(4) }}</span>
            </template>
          </el-table-column>
        <el-table-column
            sortable
            property="total_print_times">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  指统计用户从注册是按到当前时间的打印次数，点击”打印”按钮记为1次</div>
                <span style="padding-right:16px">打印次数<img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope" >
              <span>{{ scope.row.total_print_times }}</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            property="total_print_count">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  指统计用户从注册是按到当前时间的打印数量</div>
                <span style="padding-right:16px">打印数量<img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope" >
              <span>{{ scope.row.total_print_count }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            sortable
            property="day_percent_print">
            <template slot="header" slot-scope="scope">
              <span><el-tooltip class="item" effect="dark" placement="right">
                <div slot="content" class="tooltip-content-box">
                  指在访问时间段内，打印数量/使用DLabel的天数</div>
                <span style="padding-right:16px">平均每天打印数量<img src="@/assets/img/i-icon.png" class="i-icon-header" alt=""></span>
              </el-tooltip></span>
            </template>
            <template slot-scope="scope" >
              <span>{{ scope.row.day_percent_print.toFixed(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="last_load_times" label="最近访问时间" />
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <div style="display: flex;justify-content: center;">
                <el-tooltip class="item" effect="dark" content="查看" placement="top">
                  <i class="iconfont iconwenjianliebiao-chakan" @click="toInfo(row.user_id)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content" class="tooltip-content-box">
                    <img v-if="row.sign_type" :src="require( `@/assets/img/${row.sign_type}.png`)" style="width:13px;cursor: pointer;" alt="">
                    <span class="tooltip-flag-text">{{ row.sign_content }}</span>
                  <div class="tooltip-flag-content" style="max-width:300px;">备注内容：{{ row.mark_content }}</div></div>
                  <img v-if="row.sign_type" :src="require( `@/assets/img/${row.sign_type}.png`)" style="width:19px;position:absolute;height:20px;cursor: pointer;margin-top:2px;right:50px" alt="">

                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalnumber > 10" class="pagination-container">
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
    <el-dialog :visible.sync="isdialog" title="查看" class="dialog" width="600px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文件名：" prop="name" class="version">
          <div style="word-break: break-all;">{{ ruleForm.name||ruleForm.fileName }}</div>
        </el-form-item>
        <el-form-item v-show="barIndex!=1" label="缩略图：" class="backupload" prop="image">
          <img :src="ruleForm[strs[barIndex]]" class="picture" >
        </el-form-item>
        <el-form-item label="文件地址：" prop="name" class="version">
          <div style="word-break: break-all;">{{ ruleForm[strs[barIndex]] }}</div>
        </el-form-item>
        <el-form-item
          label="文件尺寸："
          prop="name"
          class="version"
        >{{ ruleForm.width?ruleForm.width+'*'+ruleForm.height:parseInt(ruleForm.size/1024)+'kb' }}</el-form-item>
        <el-form-item
          label="上传平台："
          prop="name"
          class="version"
        >{{ checkEq(ruleForm.type)+(ruleForm.version?ruleForm.version:'') }}</el-form-item>
        <el-form-item
          label="上传时间："
          prop="name"
          class="version"
        >{{ ruleForm.addTime?ruleForm.addTime:ruleForm.createTime| formatDate(ruleForm.addTime||ruleForm.createTime) }}</el-form-item>
        <el-form-item label="创建者：" prop="name" class="version">
          <span>{{ ruleForm.phone }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="isEnlarge"
      :modal-append-to-body="false"
      :show-close="false"
      :width="widthauto"
      title
      class="imgdialog"
    >
      <img :src="imgPath" class="magnifier" @load="onLoad" >
    </el-dialog>
  </div>
</template>
<script>
import {
  open_company_list,
  myclouddocList,
  clouddb_list,
  cloudlogo_list,
  cloudbgimage_list
} from '@/api/api'
import {
  industry_type,
  printer_brand,
  printer_brandById,
  print_info
} from '@/api/api-python'

import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if (!time) {
        return ''
      }
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    this.apis = [
      myclouddocList,
      clouddb_list,

      cloudlogo_list,
      cloudbgimage_list
    ]
    return {
      pickerOptionsDate: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 3600 * 1000 * 24
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date(new Date().getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date(new Date().getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date(new Date().getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      strArr: ['手机号', '上传人'],
      commandIndex: 0,
      fileTexts: ['标签文件', '标签数据库', '标签图片', '标签背景'],
      barIndex: 0,
      loading: true,
      strs: ['img', 'ossFileUrl', 'ossFileUrl', 'ossFileUrl'],
      ruleForm: {},
      eqs: [
        { id: 0, name: '其他' },
        { id: 1, name: 'Android' },
        { id: 2, name: 'IOS' },
        { id: 3, name: 'PC' },
        { id: 4, name: 'Web' }
      ],
      rules: {},
      isedit: false,
      currentIndex: 0,
      tempData: ['data1', 'data2', 'data3', 'data4'],
      companys: [],
      tableLists: [],
      industry: [],
      printers: [],
      printerBrands: [],
      currentCid: -1,
      selectDate: [],

      listQuery: {
        start_time: '', // 起始时间       默认七天前的现在时间
        end_time: '', // 截止时间       默认当前时间
        industry_type: '', // 行业类别       默认全部=0，int
        width_start: '', // 最小宽度       默认为0
        width_end: '', // 最大宽度       默认为0
        height_start: '', // 最小高度       默认为0
        height_end: '', // 最大高度       默认为0
        printer_brand: '', //  打印机品牌     默认全部=0，int
        printer_type: '', //  打印机型号     默认全部=0，int
        phone: '', // 手机号         默认为None
        load_times_start: '', //  最少启动次数   默认为0
        load_times_end: '', //  最大启动次数   默认为0
        print_count_start: '', //  最少打印量     默认为0
        print_count_end: '', // 最多打印量     默认为0
        print_times_start: '', // 最少打印次数   默认为0
        print_times_end: '', // 最多打印次数   默认为0
        print_area_start: '', // 最小打印面积   默认为0
        print_area_end: '', // 最大打印面积   默认为0
        day_percent_print_start: '', // 每日最少打印量 默认为0
        day_percent_print_end: '', // 每日最大打印量 默认为0
        ordering: 'total_print_count',
        page: 1,
        page_size: 10,
        company_id: ''
      }
    }
  },
  computed: {
    checkEq() {
      return function(index) {
        if (!index) {
          return ''
        }
        var name = ''
        for (var i = 0; i < this.eqs.length; i++) {
          if (this.eqs[i].id == index) {
            name = this.eqs[i].name
          }
        }
        return name
      }
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.listQuery)
    }, 2000);
    // this.chooseTime(3)
    // 获取行业
    industry_type().then(res => {
      this.industry = res.results
      // this.industry.splice(0, 0, { id: '', industry_name: '全部' })
    })

    // 获取设备类型
    open_company_list().then(res => {
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      // 获取品牌
      printer_brand().then(res => {
        this.printers = res.results
        // this.printers.splice(0, 0, { id: '', name: '全部' })
        printer_brandById({ id: 0 }).then(res => {
          this.printerBrands = res.results;
          // this.searchData();
        });
      })
    })
  },
  methods: {
    openDate(){
      this.$refs['date-picker'].focus()
    },
    changePrinter(id) {
      this.listQuery.printer_type = ''
      printer_brandById({ id: this.listQuery.printer_brand?this.listQuery.printer_brand:0 }).then(res => {
        this.printerBrands = res.results
      })
    },

    numberOriginalPrice(value, item) {
      setTimeout(() => {
         this.listQuery[item] = (value.match(/^[1-9]([0-9])*/g) ? parseInt(value.match(/^[1-9]([0-9])*/g)[0]) : '')
      }, 0)
    },
    handleSizeChangeData(val) {
      this.listQuery.page_size = val
      this.searchData()
    },
    handleCurrentChangeData(val) {
      this.listQuery.page = val
      this.searchData()
    },
    sortChange(val) {
      if (val.order == 'descending') this.listQuery.ordering = '-' + val.prop
      else this.listQuery.ordering = val.prop
      this.searchData()
    },
    onSearchData(){
      this.listQuery.page = 1
      this.searchData()
    },
    searchData() {
      if (this.listQuery.load_times_start !== '' && this.listQuery.load_times_end !== '' && this.listQuery.load_times_end < this.listQuery.load_times_start) {
        this.$message.warning('请正确输入访问数量区间')
        return
      } else if (this.listQuery.print_count_start !== '' && this.listQuery.print_count_end !== '' && this.listQuery.print_count_end < this.listQuery.print_count_start) {
        this.$message.warning('请正确输入打印数量区间')
        return
      } else if (this.listQuery.print_times_start !== '' && this.listQuery.print_times_end !== '' && this.listQuery.print_times_end < this.listQuery.print_times_start) {
        this.$message.warning('请正确输入打印次数区间')
        return
      } else if (this.listQuery.print_area_start !== '' && this.listQuery.print_area_end !== '' && this.listQuery.print_area_end < this.listQuery.print_area_start) {
        this.$message.warning('请正确输入打印面积区间')
        return
      } else if (this.listQuery.day_percent_print_start !== '' && this.listQuery.day_percent_print_end !== '' && this.listQuery.day_percent_print_end < this.listQuery.day_percent_print_start) {
        this.$message.warning('请正确输入每日打印量区间')
        return
      } else if (this.listQuery.width_start !== '' && this.listQuery.width_end !== '' && (parseInt(this.listQuery.width_end) < parseInt(this.listQuery.width_start))) {
        this.$message.warning('请正确输入打印尺寸的宽区间')
        return
      } else if (this.listQuery.height_start !== '' && this.listQuery.height_end !== '' && this.listQuery.height_end < this.listQuery.height_start) {
        this.$message.warning('请正确输入打印尺寸的高区间')
        return
      }
      //  else if (this.listQuery.height_start === '' && this.listQuery.height_end !== '') {
      //   this.listQuery.height_start = this.listQuery.height_end
      // } else if (this.listQuery.width_start === '' && this.listQuery.width_end !== '') {
      //   this.listQuery.width_start = this.listQuery.width_end
      // }
      this.loading = true
      var printer_brands = this.printers.filter(e => {
        return e.id == this.listQuery.printer_brand&&this.listQuery.printer_brand!=''
      })
      if (printer_brands.length > 0) { this.listQuery.printer_brand = printer_brands[0].name }
      print_info(this.listQuery).then(res => {
        this.tableLists = res.results.results
        this.loading = false
        this.totalnumber = res.results.count
      }).catch(err => {
        this.loading = false
      })
    },
    changeTime() {
      this.listQuery.end_time = this.selectDate[1]
      this.listQuery.start_time = this.selectDate[0]
      this.searchData()
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
      this.listQuery.start_time = this.startTime
      this.listQuery.end_time = this.endTime
    },
    command(com) {
      this.commandIndex = com
      this.keyword = ''
      this.$refs['keyword'].focus()
      // this.handleChange()
      console.log(com)
    },
    selectBarIndex(index) {
      this.resetTemp()
      this.barIndex = index
      this.listapi = this.apis[this.barIndex]
      this.getListDataFile(
        this.listQuery,
        this.listapi,
        this.tempData[this.barIndex]
      )
    },
    resetData() {
      this.listQuery= {
        start_time: '', // 起始时间       默认七天前的现在时间
        end_time: '', // 截止时间       默认当前时间
        industry_type: '', // 行业类别       默认全部=0，int
        width_start: '', // 最小宽度       默认为0
        width_end: '', // 最大宽度       默认为0
        height_start: '', // 最小高度       默认为0
        height_end: '', // 最大高度       默认为0
        printer_brand: '', //  打印机品牌     默认全部=0，int
        printer_type: '', //  打印机型号     默认全部=0，int
        phone: '', // 手机号         默认为None
        load_times_start: '', //  最少启动次数   默认为0
        load_times_end: '', //  最大启动次数   默认为0
        print_count_start: '', //  最少打印量     默认为0
        print_count_end: '', // 最多打印量     默认为0
        print_times_start: '', // 最少打印次数   默认为0
        print_times_end: '', // 最多打印次数   默认为0
        print_area_start: '', // 最小打印面积   默认为0
        print_area_end: '', // 最大打印面积   默认为0
        day_percent_print_start: '', // 每日最少打印量 默认为0
        day_percent_print_end: '', // 每日最大打印量 默认为0
        ordering: 'total_print_count',
        page: 1,
        page_size: 10,
        company_id: this.listQuery.company_id
      }
      this.selectDate = []
      this.searchData()
    },
    resetTemp() {
      this.listQuery.name = ''
      this.listQuery.width = ''
      this.listQuery.height = ''
      this.listQuery.phone = ''
      this.listQuery.pageNo = 1
      this.currentpage = 1
      // this.handleSearch()
    },
    selectCompany(id, index) {
      this.listQuery.page = 1
      this.listQuery.page_size = 10,
      this.currentIndex = index
      this.listQuery.company_id = id
      this.searchData()
    },
    download(url) {
      location.href = url
    },
    toInfo(id, cid) {
      this.$router.push({ name: 'userInfoData', query: { id: id, cid: cid }})
    },
    handleSearch() {
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.getListDataFile(
        this.listQuery,
        this.listapi,
        this.tempData[this.barIndex]
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tooltip-content-box{
  padding: 10px;
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  .tooltip-flag-text{

    margin-left: 4px;
  }
  .tooltip-flag-content{
    margin-top:6px;
  }
}
/deep/.table i, /deep/.table a{
  margin-right: 0px!important;
}
.screen-box {
  display: flex;
  flex-flow: wrap;
  .screen-item {
    margin-right: 180px;
    width: 408px;
    display: flex;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 32px;
    .echarts-time{
      &>div:first-child{
        width:80px;
      }
      .title-right {
        width: 126px !important;
      }
    }

    /deep/.el-input--medium .el-input__inner {
      height: 32px;
      width: 320px;
      margin-left: 18px;
    }
    .echarts-input-right,
    .echarts-input-left {
      /deep/.el-input--medium .el-input__inner {
        height: 32px;
        width: 120px;
        margin-left: 18px;
      }
    }
    .echarts-input-right-1,
    .echarts-input-right-2,
    .echarts-input-left-1,
    .echarts-input-left-2 {
      /deep/.el-input--medium .el-input__inner {
        height: 32px;
        width: 72px;
        margin-left: 9px;
      }
    }

    .echarts-select {
    }
    .echarts-input-right-1 {
      margin-left: 9px;
    }
    .echarts-time .echarts-date .el-date-editor {
      height: 32px;
    }
    .echarts-time .echarts-date em {
      top: 0px !important;
    }
    .echarts-time .echarts-date .el-date-editor {
      width: 285px;
      margin-left: 18px;
    }
  }
}
.el-dropdown {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  height: 32px;
  width: 70px;
  background-color: #ffffff;
  padding-left: 6px;
  border-radius: 4px;
  border: 1px solid rgba(229, 229, 229, 1);
  line-height: 32px;
  color: rgba(60, 60, 60, 1);
  i {
    color: #2274e5;
    font-size: 16px;
  }
}
.signadmin {
  width: 100%;
  display: flex;
  // .app-menu{
  //   max-height: 1495px;
  //   ul{
  //     max-height: 1415px;
  //     /* overflow-y: scroll; */
  //     overflow-y: auto;
  //   }
  // }
  // /deep/.table .el-table__body-wrapper{
  //   min-height: 1200px;
  // }
  .app-content {
    margin-left: 30px;
    flex: 1;
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
}
.app-menu {
  margin-top: 0px !important;
}
.filesearch_box {
  padding: 32px 0px 0px 24px;
  background-color: #fff;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  margin-bottom: 6px;
  box-shadow: 0px 0px 2px rgba(229, 229, 229, 1);
  .searchFlex {
    flex-flow: wrap;
    .search-list {
      max-width: 400px;
      span {
        text-align: left;
      }
    }
    .size {
      .el-input {
        width: 120px;
      }
    }
  }
}
.search {
  .searchbtn {
    margin-left: 0px !important;
  }
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #c3c3c3;
}
</style>
