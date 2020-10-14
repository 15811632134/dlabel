<template>
  <div class="app-container">
    <div class="echarts-time">

      <div class="selectPartner" style="margin-right:32px">
        <label>商户：</label>
        <el-select v-model="listQuery.companyId" class="filter-item" placeholder="请选择" @change="changeType">
          <el-option
            v-for="item in companys"
            :key="item.id"
            :label="item.shortName"
            :value="item.id"
          />
        </el-select>
      </div>
      <div style="display:flex">
        <!-- <ul>
          <li :class="dateType=='week'?'active':''" @click="screen('week')">一星期</li>
          <li :class="dateType=='month'?'active':''" @click="screen('month')">一个月</li>
          <li :class="dateType=='threemonth'?'active':''" @click="screen('threemonth')">三个月</li>
        </ul> -->
        <div class="echarts-date">
          <el-date-picker
            v-model="selectDate"
            :picker-options="pickerOptions"
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
    <div class="echarts">
      <div class="echarts-title">
        <span>打印次数统计</span>
      </div>
      <p>单位：次</p>
      <ve-line :data="chartData" :extend="extendOperate"/>
    </div>
    <!-- <div class="echarts">
      <div class="echarts-title">
        <span>全部打印次数</span>
      </div>
      <p>单位：次</p>
      <ve-line :data="chartAllData" :extend="extendOperate"/>
    </div> -->
    <div class="datatable">
      <div class="table-export">
        <span>数据说明</span>
        <div class="export" @click="handleDownload">
          <i class="iconfont iconxiazai" />导出
        </div>
      </div>
      <el-table :data="tableList" border>
        <el-table-column prop="time" label="日期" />

        <el-table-column prop="pc" label="PC" />
        <el-table-column prop="android" label="Android"/>
        <el-table-column prop="ios" label="iOS" />
        <!-- <el-table-column prop="web" label="WEB" /> -->
        <el-table-column prop="total" label="总计" />
      </el-table>
    </div>
    <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
import { printtimesDetail,printtimesDetails, printtimesList, open_company_list } from '@/api/api'
import datacenter from '@/mixin/datacenter.js'
export default {
  components: {
    VeLine
  },
  mixins: [datacenter],
  data() {
    return {
      dateType: '',
      listQuery: { companyId: '', startTime: '2019-8-9', endTime: '2019-8-9', type: 4, pageNo: 1, pageSize: 10, companyId: '' },
      companys: []
    }
  },
  created() {
    open_company_list().then(res => {
      this.listapi = printtimesDetail
      this.companys = res.data
      this.companys.splice(0, 0, { id: '', shortName: '全部' })
      this.getList()
    })

    // this.getListData(
    //   this.listQuery,
    //   printtimesDetail
    // )
    // this.queryAddUser(this.listQuery, printtimesList)
  },
  methods: {
    changeType() {
      this.currentpage = 1
      this.handleChange()
    },
    getExport() {
      var temp = {
        type: this.listQuery.type,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime,
        equip: this.listQuery.equip,
        companyId: this.listQuery.companyId

      }
      printtimesDetails(temp).then(res => {
        this.exportData = res.data.list
      })
    },
    getList() {
    //   this.getListData(
    //   this.listQuery,
    //   registerDetail
    // )
    // this.queryAddUser(this.listQuery, registerList)
      this.screen('week')
    },
    screen(str) {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.dateType = str
      this.chooseTime(str)
      this.getListData(
        this.listQuery,
        printtimesDetail
      )
      this.getExport()
      this.queryAddUser(this.listQuery, printtimesList)
    },
    handleChange() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.changeTime()
      this.getListData(
        this.listQuery,
        printtimesDetail
      )
      this.getExport()
      this.queryAddUser(this.listQuery, printtimesList)
    },
    handleDownload() {
      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '您确定要导出所有数据吗')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              done()

              this.selectExcelData = this.exportData

              this.handleDownload()
            } else {
              done()
            }
            instance.confirmButtonLoading = false
            console.log(done)
          }
        }).then(action => {})
      } else {
      // this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['日期', '安卓', 'ios', 'pc', '总计']
        const filterVal = ['time', 'android', 'ios', 'pc', 'total']
        console.log(this.selectExcelData)

        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        })
        this.selectExcelData = []
        // this.downloadLoading = false;
      })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
