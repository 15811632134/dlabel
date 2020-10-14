<template>
  <div class="userInfo-box">
    <div class="app-content">
      <div class="fileBar_box">
        <div
          v-for="(item,index) in fileTexts"
          :class="barIndex===index?'active':''"
          :key="index"
          class="fileBar_div"
          @click="selectBarIndex(index)"
        >{{ item }}</div>
      </div>
      <div class="echarts-time">
        <div class="selectPartner">
          <label>商户：</label>
          <el-select
            v-model="listQuery.companyId"
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
      <div v-show="barIndex===0" class="tabselect">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content" class="tooltip-content-box">
            <p>1、按行业：每天统计用户云文档标签所属行业的占比根据提取用户标签的内容，大致判断所属行业</p>
            <p>2、按标签尺寸：每天统计用户云文档标签尺寸的占比</p>
            <p>3、按标签内容：每天统计用户云文档含条码、含二维码、含数据库标签的占比</p>
          </div>
          <div class="explain">
            <span>标签统计</span>
            <img src="@/assets/img/i-icon.png" >
          </div>
        </el-tooltip>
        <div class="bar-tran-box">
          <span
            v-for="(item,index) in classifyList"
            :key="index"
            :class="currentIndex === index ? 'active bar-tran-item': 'bar-tran-item'"
            @click="selectData(index)"
          >{{ item }}</span>
        </div>
      </div>
      <el-table
        v-show="barIndex===0"
        ref="singleTable"
        :data="tableLists.data1"
        highlight-current-row
        class="table"
        @sort-change="sortChange"
      >
        <el-table-column label="排名" type="index" width="100" align="center" />
        <el-table-column
          :label="currentIndex ===0 ? '行业': currentIndex ===1 ? '标签尺寸': '类型'"
          :property="currentIndex ===0 ? 'industry_type': currentIndex ===1 ? 'print_size': 'cloud_type'"
          width="180"
          align="center"
        />
        <el-table-column sortable property="proportion" label="占比" align="center">
          <template slot-scope="{row}">
            <div class="thumbnail">
              <span>{{ row.proportion }}%</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable property="count" label="总数" align="center" />
      </el-table>
      <div v-show="totalnumber>0 && barIndex===0" class="pagination-container">
        <el-pagination
          :current-page.sync="currentpage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          :total="totalnumber"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeData($event, 'listQuery')"
          @current-change="handleCurrentChangeData($event, 'listQuery')"
        />
      </div>
      <div v-show="barIndex===0" class="tabselect">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content" class="tooltip-content-box">
            每天统计用户云标签内容的相关词的出现次数根据云标签的内容，提取所有文本，
            <br >并拆解成各词条，最后统计相关词条出现的次数
          </div>
          <div class="explain">
            <span>标签内容分析</span>
            <img src="@/assets/img/i-icon.png" >
          </div>
        </el-tooltip>
        <div class="bar-tran-box">
          <span :class="{active:repeatIndex===1}" class="bar-tran-item" @click="selectRepeat(1)">去重</span>
          <span :class="{active:repeatIndex===0}" class="bar-tran-item" @click="selectRepeat(0)">不去重</span>
        </div>
      </div>
      <el-table
        v-loading="contentLoading"
        v-show="barIndex===0"
        ref="singleTable"
        :data="tableLists.data2"
        highlight-current-row
        class="table"
        @sort-change="sortContentChange"
      >
        <el-table-column label="排名" type="index" width="100" align="center" />
        <el-table-column width="180" property="keywords" label="相关词" />
        <el-table-column sortable property="total_times" label="出现次数" />
      </el-table>
      <div v-show="contentNumber>0 && barIndex===0" class="pagination-container">
        <el-pagination
          :current-page.sync="contentcurrentpage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          :total="contentNumber"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeData($event, 'query')"
          @current-change="handleCurrentChangeData($event, 'query')"
        />
      </div>
      <div v-show="barIndex===1" class="tabselect">
        <el-tooltip class="item" effect="dark" placement="right">
          <div slot="content" class="tooltip-content-box">
            每天统计用户云标签内容的相关词的出现次数根据云标签的内容，提取所有文本，
            <br >并拆解成各词条，最后统计相关词条出现的次数
          </div>
          <div class="explain">
            <span>搜索统计</span>
            <img src="@/assets/img/i-icon.png" >
          </div>
        </el-tooltip>
        <div class="bar-tran-box">
          <span
            :class="{active:searchIndex===1}"
            class="bar-tran-item"
            @click="selectSearchData(1)"
          >去重</span>
          <span
            :class="{active:searchIndex===0}"
            class="bar-tran-item"
            @click="selectSearchData(0)"
          >不去重</span>
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content" class="tooltip-content-box">
              每天统计用户云标签内容的相关词的出现次数根据云标签的内容，提取所有文本，
              <br >并拆解成各词条，最后统计相关词条出现的次数
            </div>
            <div class="explain">
              <img src="@/assets/img/i-icon.png" >
            </div>
          </el-tooltip>
        </div>
      </div>
      <el-table
        v-if="barIndex === 1"
        ref="singleTable"
        :data="tableLists.data3"
        :default-sort="{prop: 'search_times', order: 'ascending'}"
        highlight-current-row
        class="table"
        @sort-change="sortSearchChange"
      >
        <el-table-column label="排名" type="index" width="100" align="center" />
        <el-table-column width="180" property="keywords" label="搜索词" />
        <el-table-column sortable property="search_times" label="出现次数" />
      </el-table>
      <!-- <div class="tabselect">
        <div class="explain">
          <span>模板使用统计</span>
        </div>
        <div class="bar-tran-box">
          <span :class="{active:currentIndex==0}" class="bar-tran-item" @click="selectData(0)">去重</span>
          <span :class="{active:currentIndex==1}" class="bar-tran-item" @click="selectData(1)">不去重</span>
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content" class="tooltip-content-box">
              每天统计用户云标签内容的相关词的出现次数根据云标签的内容，提取所有文本，
              <br >并拆解成各词条，最后统计相关词条出现的次数
            </div>
            <div class="explain">
              <img src="@/assets/img/i-icon.png" >
            </div>
          </el-tooltip>
        </div>
      </div>
      <el-table
        v-show="barIndex ===1"
        ref="singleTable"
        :data="tableLists.data1"
        :default-sort="{prop: 'area', order: 'descending'}"
        highlight-current-row
        style="width: 100%;"
        class="table"
      >
        <el-table-column property="print_size" label="排名" />
        <el-table-column property="imgPath" label="缩略图">
          <template slot-scope="{row}">
            <div class="thumbnail">
              <img :src="row.imgPath" >
              <div class="edit">
                <i class="iconfont iconfangdachakan" @click="enlargeImage(row.imgPath)" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="180" property="area" label="模板名称" />
        <el-table-column width="180" property="area" label="模板尺寸" />
        <el-table-column sortable property="print_times" label="出现次数" />
      </el-table>-->
      <div v-show="searchNumber>0 && barIndex=== 1" class="pagination-container">
        <el-pagination
          :current-page.sync="searchcurrentpage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          :total="searchNumber"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChangeData($event, 'searchQuery')"
          @current-change="handleCurrentChangeData($event, 'searchQuery')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {
  tagSizeLocalCloud,
  cloudTags,
  tagContent,
  cloudKeywords,
  templateKeywords
} from '@/api/api-python'
import { open_company_list } from '@/api/api'
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
      contentLoading: true,
      fileTexts: ['云标签分析', '云模板分析'],
      classifyList: ['按行业', '按标签尺寸', '按标签内容'],
      barIndex: 0,
      currentIndex: 0,
      // 去重不去重
      repeatIndex: 1,
      searchIndex: 1,
      totalnumber: 0,
      // 标签内容分析分页数量
      contentNumber: 0,
      // 搜索统计分页数量
      searchNumber: 0,
      contentcurrentpage: 1,
      searchcurrentpage: 1,
      listQuery: {
        page: 1,
        page_size: 10,
        company_id: '',
        ordering: ''
      },
      // 标签内容分析
      query: {
        page: 1,
        page_size: 10,
        ordering: '',
        deweight: 1
      },
      // 云模板分析搜索统计
      searchQuery: {
        page: 1,
        page_size: 10,
        ordering: '',
        deweight: 1
      },
      // 商户
      companys: [],
      options: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      time: [
        moment().subtract(7, 'days').format('YYYY-MM-DD'),
        moment().subtract(1, 'days').format('YYYY-MM-DD')
      ],
      tableLists: {
        data1: [],
        data2: [],
        data3: [],
        data4: []
      },
      equip: ['未知', '安卓', 'IOS', 'PC', 'Web端']
    }
  },
  created() {
    this.getCloudTags()
    this.getCompanyList()
    this.getCloudKeywords()
  },
  methods: {
    sortChange(val) {
      if (val.order === 'ascending') {
        this.listQuery.ordering = val.prop
      } else if (val.order === 'descending') {
        this.listQuery.ordering = `-${val.prop}`
      } else {
        this.listQuery.ordering = ''
      }
      if (this.currentIndex === 0) {
        this.getCloudTags()
      } else if (this.currentIndex === 1) {
        this.getTagSizeLocalCloud()
      } else {
        this.tagContent()
      }
    },
    // 标签内容分析改变
    sortContentChange(val) {
      if (val.order === 'ascending') {
        this.query.ordering = val.prop
      } else if (val.order === 'descending') {
        this.query.ordering = `-${val.prop}`
      } else {
        this.query.ordering = ''
      }
      this.getCloudKeywords()
    },
    // 搜索统计排列
    sortSearchChange(val) {
      if (val.order === 'ascending') {
        this.searchQuery.ordering = val.prop
      } else if (val.order === 'descending') {
        this.searchQuery.ordering = `-${val.prop}`
      } else {
        this.query.ordering = ''
      }
      this.getTemplateKeywords()
    },
    async getCompanyList() {
      const res = await open_company_list()
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
    },
    // 商户change
    changeType(val) {
      this.listQuery.company_id = val
      if (this.barIndex === 0) {
        this.getCloudKeywords()
        if (this.currentIndex === 0) {
          this.getCloudTags()
        } else if (this.currentIndex === 1) {
          this.getTagSizeLocalCloud()
        } else {
          this.tagContent()
        }
      } else {
        this.getTemplateKeywords()
      }
    },
    handleSizeChangeData(val, params) {
      this[`${params}`].page_size = val
      if (params === 'listQuery') {
        if (this.currentIndex === 0) {
          this.getCloudTags()
        } else if (this.currentIndex === 1) {
          this.getTagSizeLocalCloud()
        } else {
          this.tagContent()
        }
      } else if (params === 'query') {
        this.getCloudKeywords()
      } else {
        this.getTemplateKeywords()
      }
    },
    handleCurrentChangeData(val, params) {
      this[`${params}`].page = val
      if (params === 'listQuery') {
        if (this.currentIndex === 0) {
          this.getCloudTags()
        } else if (this.currentIndex === 1) {
          this.getTagSizeLocalCloud()
        } else {
          this.tagContent()
        }
      } else if (params === 'query') {
        this.getCloudKeywords()
      } else {
        this.getTemplateKeywords()
      }
    },
    selectBarIndex(index) {
      this.loading = true
      this.barIndex = index
      if (index === 0) {
        if (this.currentIndex === 0) {
          this.getCloudTags()
        } else if (this.currentIndex === 1) {
          this.getTagSizeLocalCloud()
        } else {
          this.tagContent()
        }
        this.getCloudKeywords()
      } else {
        this.getTemplateKeywords()
      }
    },
    selectData(index) {
      this.currentIndex = index
      this.listQuery.page = 1
      this.listQuery.page_size = 10
      this.currentpage = 1
      if (index === 0) {
        this.getCloudTags()
      } else if (index === 1) {
        this.getTagSizeLocalCloud()
      } else {
        this.tagContent()
      }
    },
    selectRepeat(index) {
      this.repeatIndex = index
      this.query.deweight = index
      this.getCloudKeywords()
    },
    // 搜索统计去重、不去重
    selectSearchData(index) {
      this.searchIndex = index
      this.searchQuery.deweight = index
      this.getTemplateKeywords()
    },
    // 时间变化
    handleChange() {
      if (this.barIndex === 0) {
        this.getCloudKeywords()
        if (this.currentIndex === 0) {
          this.getCloudTags()
        } else if (this.currentIndex === 1) {
          this.getTagSizeLocalCloud()
        } else {
          this.tagContent()
        }
      } else {
        this.getTemplateKeywords()
      }
    },
    async getCloudTags() {
      const res = await cloudTags({
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data1 = res.results.results
      this.totalnumber = res.results.count
      this.loading = false
    },
    // 标签内容分析
    async getCloudKeywords() {
      this.contentLoading = true
      const res = await cloudKeywords({
        deweight: this.query.deweight,
        page_size: this.query.page_size,
        page: this.query.page,
        company_id: this.listQuery.company_id,
        ordering: this.query.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data2 = res.results.results
      this.contentNumber = res.results.count
      this.contentLoading = false
    },
    // 获取标签信息
    async getTagSizeLocalCloud() {
      const res = await tagSizeLocalCloud({
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data1 = res.results.results
      this.totalnumber = res.results.count
      this.loading = false
    },
    // 获取标签信息标签内容
    async tagContent() {
      const res = await tagContent({
        page_size: this.listQuery.page_size,
        page: this.listQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.listQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data1 = res.results.results
      this.totalnumber = res.results.count
    },
    // 搜索统计
    async getTemplateKeywords() {
      const res = await templateKeywords({
        deweight: this.searchQuery.deweight,
        page_size: this.searchQuery.page_size,
        page: this.searchQuery.page,
        company_id: this.listQuery.company_id,
        ordering: this.searchQuery.ordering,
        start_time: this.time[0],
        end_time: this.time[1]
      })
      this.tableLists.data3 = res.results.results
      this.searchNumber = res.results.count
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
  padding: 0 24px;
  margin: 8px 0;
  .explain {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    img {
      width: 16px;
      height: 16px;
      margin-left: 8px;
    }
  }
  .bar-tran-box {
    padding: 12px 0px;
    background-color: #ffffff;
    display: flex;
    .bar-tran-item {
      width: 120px;
      height: 40px;
      cursor: pointer;
      line-height: 40px;
      text-align: center;
      color: rgba(102, 102, 102, 1);
      border-radius: 4px 0px 0px 4px;
      border: 1px solid #c3c3c3;
      &.active {
        border: 1px solid rgba(34, 116, 229, 1);
        color: rgba(34, 116, 229, 1);
        border-radius: 4px;
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
  .echarts-time {
    background: #fff;
    padding: 26px 24px;
    margin: 0;
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
