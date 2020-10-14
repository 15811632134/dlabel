<template>
  <div class="app-container">
    <div v-if="permissionData.indexOf('print_manage_add_executable')!=-1" class="filter-container">
      <div class="build" @click="openAdd">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="100"/>
      <el-table-column property="version" label="版本号" />
      <el-table-column property="filePath" label="文件地址" />
      <el-table-column property="equip" label="平台">
        <template slot-scope="{row}">
          <span>{{ row.equip === 1 ? 'Android': row.equip === 2 ? 'IOS' : 'PC' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i v-if="permissionData.indexOf('print_manage_edit_executable')!=-1" class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a v-if="permissionData.indexOf('print_manage_download_executable')!=-1" :href="row.filePath" class="iconfont iconxiazai" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i v-if="permissionData.indexOf('print_manage_delete_executable')!=-1" class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <el-dialog :close-on-click-modal="false" :visible.sync="isdialog" :title="title" class="dialog" width="500px">
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
            maxlength="50"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="列表文件：" prop="filePath" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".list" @change="uploadChange($event, 7,'filePath', true)">
            <span>选择文件</span>
            <p>文件格式list，文件大小100kb</p>
          </div>
          <ProgressBar v-if="ispercent && ruleForm.filePath === ''"/>
          <div v-if="ruleForm.filePath && !ispercent" class="progress">
            <span>{{ oldName }}</span>
            <i
              class="iconfont iconshanchuhuise"
              @click="deleteUpload('filePath')"
            />
          </div>
        </el-form-item>
        <el-form-item label="平台：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.equip">
              <el-radio :label="1">Android</el-radio>
              <el-radio :label="2">iOS</el-radio>
              <el-radio :label="3">PC</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" >
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProgressBar from '@/components/ProgressBar'
import { validateName } from '@/utils/validate'
import {
  getPrinterList,
  PrinterUpdate,
  PrinterInsert,
  PrinterDelete
} from '@/api/api'
export default {
  name: 'ComplexTable',
  filters: {},
  components: { ProgressBar },
  data() {
    return {
      ruleForm: {
        id: '',
        version: '',
        equip: 1,
        file: ''
      },
      title: '新增',
      rules: {
        version: [{ required: true, validator: validateName }],
        filePath: [{ required: true, message: '请上传列表文件' }]
      },
      // 是否编辑
      isedit: false,
      listQuery: { pageNo: 1, pageSize: 10 }
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'

    ])
  },
  created() {
    this.listapi = getPrinterList
    this.listQuery.pageNo = this.currentpage
    this.listQuery.pageSize = this.pagesize
    this.getListData(this.listQuery, getPrinterList)
  },
  methods: {
    openAdd() {
      this.resertemp()
      this.buildNewData('ruleForm')
      this.title = '新增'
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    resertemp() {
      this.ruleForm = {
        version: '',
        equip: 1,
        filePath: ''
      }
    },
    addData() {
      this.addListData(
        'ruleForm',
        PrinterInsert,
        PrinterUpdate,
        this.isedit,
        getPrinterList
      )
    },
    confirmEdit(row) {
      this.isedit = true
      this.isdialog = true
      this.ruleForm = row
      this.ruleForm = {
        version: row.version,
        equip: row.equip,
        id: row.id,
        filePath: row.filePath
      }
      this.oldName = row.filePath
      // this.ruleForm.file = row.filePath
      this.fileUrl = row.filePath
      this.title = '编辑'
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    editDelete(id) {
      this.deleteData(id, PrinterDelete, getPrinterList, this.listQuery)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
</style>
