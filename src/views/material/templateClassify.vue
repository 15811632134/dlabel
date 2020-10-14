<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="buildNewData">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div class="search m_search">
        <el-input v-model="listQuery.name" placeholder="搜索相关关键词" maxlength="20" class="input-with-select" @keyup.native.enter="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column property="name" label="名称" />
      <el-table-column property="languageId" label="语言">
        <template slot-scope="{row}">
          <span>{{ row.languageId === 1 ? '中文': 'English' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" :visible.sync="isdialog" :title="title" class="dialog" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文件名：" prop="name" class="version">
          <el-input
            v-model="ruleForm.name"
            type="text"
            placeholder="请输入文件名"
            maxlength="50"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="语言：" prop="languageId" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.languageId">
              <el-radio :label="1">中文</el-radio>
              <el-radio :label="2">English</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, listQuery)"
        @current-change="handleCurrentChange($event, listQuery)"/>
    </div>
  </div>
</template>

<script>
import { templatetypeList, templatetypeInsert, templatetypeDelete, templatetypeUpdate } from '@/api/api'
import { validateName } from '@/utils/validate'
export default {
  name: 'ComplexTable',
  filters: {},
  data() {
    return {
      ruleForm: {
        name: '',
        languageId: 1
      },
      rules: {
        name: [{ required: true, validator: validateName }]
      },
      options: [
        {
          languageId: 1,
          label: '中文'
        },
        {
          languageId: 2,
          label: 'English'
        }
      ],
      // 是否编辑
      isedit: false,
      title: '新增',
      listQuery: { name: '', pageNo: 1, pageSize: 10 }
    }
  },
  computed: {},
  created() {
    this.listapi = templatetypeList
    this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), templatetypeList)
  },
  methods: {
    addData() {
      this.addListData('ruleForm', templatetypeInsert, templatetypeUpdate, this.isedit, templatetypeList)
    },
    confirmEdit(row) {
      this.title = '编辑'
      this.isedit = true
      this.isdialog = true
      this.ruleForm = {
        name: row.name,
        languageId: row.languageId,
        id: row.id
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    editDelete(id) {
      this.deleteData(id, templatetypeDelete, templatetypeList, this.listQuery)
    },
    buildNewData() {
      this.title = '新增'
      this.isedit = false
      this.ruleForm = {
        name: '',
        languageId: 1
      }
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
.ttffile {
  position: relative;
  text-align: center;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 32px;
    z-index: 9;
    opacity: 0;
  }
  p {
    display: inline-block;
    margin: 0 0 0 16px;
    font-size: 12px;
    color: #c3c3c3;
  }
  span {
    display: inline-block;
    width: 80px;
    height: 32px;
    background: #2274e5;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
  }
}
</style>
