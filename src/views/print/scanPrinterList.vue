<template>
  <div class="app-container ">
    <div class="tab-box">
      <div class="fileBar_box">
        <div v-for="(item,index) in fileTexts" :class="barIndex==index?'active':''" :key="index" class="fileBar_div" @click="selectBarIndex(index)">{{ item.name }}</div>
      </div>
      <div class="bottom-line"/>
    </div>

    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="100"/>
      <el-table-column property="name" label="文件名" />
      <el-table-column property="version" label="版本号" />
      <el-table-column property="url" label="文件地址" />
      <el-table-column property="equip" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.createTime |formatDate('') }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a :href="row.filePath" class="iconfont iconxiazai" target="_blank" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, listQuery)"
        @current-change="handleCurrentChange($event, listQuery)"
      />
    </div>
    <el-dialog :visible.sync="isdialog" :modal-append-to-body="false" :close-on-click-modal="false" :title="title" class="dialog" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="版本号：" prop="version" class="version">
          <el-input
            v-model="ruleForm.version"
            type="text"
            placeholder="请输入版本号"
            maxlength="10"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="列表文件：" prop="url" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".xlsx,.xls" @change="uploadChange($event, 31,'url', true)">
            <span>选择文件</span>
          </div>
          <ProgressBar v-if="ruleForm.url === '' && ispercent"/>
          <div v-if="ruleForm.url && !ispercent" class="progress">
            <span>{{ oldName }}</span>
            <i
              class="iconfont iconshanchuhuise"
              @click="deleteUpload('url')"
            />
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :width="widthauto" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>

<script>
import {
  scanList,
  scanUpdate,
  scannewprinterDelete
} from '@/api/api'
import moment from 'moment'
import { validateName } from '@/utils/validate'
import ProgressBar from '@/components/ProgressBar'
export default {
  name: 'ComplexTable',
  components: {
    ProgressBar
  },
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      fileTexts: [{ id: 1, name: 'Android端' }, { id: 2, name: 'IOS端' }],
      barIndex: 0,
      ruleForm: {
        id: '',
        version: '',
        equip: 1,
        url: ''
      },
      rules: {
        version: [{ required: true, validator: validateName }],
        filePath: [{ required: true, message: '请上传列表文件' }]
      },
      // 是否编辑
      isedit: false,
      title: '添加',
      listQuery: { equip: 1 }
    }
  },
  computed: {},
  created() {
    this.listapi = scanList
    this.initData()
  },
  methods: {
    selectBarIndex(index) {
      this.barIndex = index
      if (index === 0) {
        this.listQuery.equip = 1
        this.ruleForm.equip = 1
        this.initData(this.barIndex + 1)
      } else {
        this.listQuery.equip = 2
        this.ruleForm.equip = 2
        this.initData(this.barIndex + 1)
      }
    },
    initData() {
      scanList(this.listQuery).then(res => {
        this.tableList = res.data
      })
    },
    addData() {
      scanUpdate(this.ruleForm).then(res => {
        this.$message.success('修改成功')
        this.isdialog = false
        this.initData()
      })
    },
    confirmEdit(row) {
      this.isedit = true
      this.title = '编辑'
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
        this.ruleForm = {
          version: row.version,
          equip: row.equip,
          id: row.id,
          url: row.url
        }
        this.oldName = row.url
      })
    },
    editDelete(id) {
      this.deleteData(id, scannewprinterDelete, scanList, this.listQuery)
    },
    buildNewData() {
      this.isedit = false
      this.title = '添加'
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
        this.ruleForm = {
          version: '',
          equip: 1,
          id: '',
          filePath: ''
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
.tab-box{
      margin-bottom:8px;
    .fileBar_box{
      z-index: 9;
      display: flex;
      justify-content: flex-start;
      position: relative;
      &>div:nth-child(2){
        opacity: 0.8;
      }
      &>div:nth-child(3){
        opacity: 0.6;
      }
      &>div:nth-child(4){
        opacity: 0.4;
      }
      .fileBar_div{
        padding-left: 23px;
        line-height: 56px;
        width:162px;
        margin-right: 8px;
        cursor: pointer;
        height:56px;
        background:rgba(34,116,229,1);
        border-radius:8px 8px 0px 0px;
        position: relative;
        font-size:16px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        &.active{
          color:#2274e5;
          opacity: 1;
          background-color: #fff;
        }
        &.active::after{
          content: '';
          width:4px;
          position: absolute;
          left:0px;
          top:16px;
          height:22px;
          background-color: #2274e5;
        }
      }
    }
    .bottom-line{
      background-color: #fff;
      height:30px;
      width:100%;
    }
  }
.notice-message{
  .notice-ul{
    display: flex;
    li{
      width: 100px;
      height: 32px;
      cursor: pointer;
      text-align: center;
      line-height: 32px;
      background: #FFFFFF;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #666666;
      margin-right: 16px;
      &.active{
        color: #FFFFFF;
        background: #2274E5;
      }
    }

  }
}
</style>
