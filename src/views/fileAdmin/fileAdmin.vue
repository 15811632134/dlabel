<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build">
        <span>
          <i class="el-icon-plus" />
        </span>新建
      </div>
      <div class="search">
        <el-input v-model="keyword" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      class="table"
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column property="name" label="缩略图" width="200" />
      <el-table-column property="describe" label="文件名" />
      <el-table-column property="number" label="文件尺寸" class="accnumber">
        <template slot-scope="{row}">
          <a class="accnumber">{{ row.number }}</a>
        </template>
      </el-table-column>
      <el-table-column property="date" label="创建者ID" />
      <el-table-column property="date" label="上传时间" />
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <i class="el-icon-edit" @click="confirmEdit(row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      layout="prev, pager, next, jumper"
      @pagination="getList"
    />-->
    <!--新增-->
    <!-- <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="dialog"
      title="新增提示"
      width="30%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        status-icon
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            placeholder="限制十个字"
            maxlength="10"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="textarea"
            placeholder="限制50个字"
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm('numberValidateForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('numberValidateForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>-->
    <!--编辑-->
    <el-dialog :visible.sync="editDialogVisible" :before-close="handleClose" class="dialog" title="编辑角色" width="30%">
      <el-form  label-width="80px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="pass">
          <el-input
            v-model="rolename"
            :disabled="isNameDisabled"
            type="password"
            placeholder="限制十个字"
            maxlength="10"
            autocomplete="off"
          />
          <div class="edit" @click="editName">
            <i class="el-icon-edit" />
            编辑
          </div>
        </el-form-item>
        <el-form-item label="角色描述" prop="checkPass">
          <el-input
            v-model="roledescription"
            :disabled="isRoleDisabled"
            type="textarea"
            placeholder="限制50个字"
            maxlength="30"
            autosize
            show-word-limit
          />
          <div class="edit" @click="editDescription">
            <i class="el-icon-edit" />
            编辑
          </div>
        </el-form-item>
        <el-form-item label="启用/禁用" prop="checkPass">
          <el-switch v-model="enable" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm('numberValidateForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('numberValidateForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import {} from '@/api/article'
// import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {},
  data() {
    return {
      tableData: [
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 695,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 856,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 695,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 856,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        },
        {
          name: '王小虎',
          describe:
            '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
          number: 233,
          date: '2019-12-25  13:34:39'
        }
      ],
      currentRow: null,
      total: 1200,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      keyword: '', // 关键字
      dialogVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      textarea: '',
      isNameDisabled: true,
      isRoleDisabled: true,
      enable: true, // 启用、禁用
      rolename: '',
      roledescription: '',
      editDialogVisible: false
    }
  },
  computed: {},
  created() {},
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleClose(done) {
      done()
    },
    confirmEdit() {
      this.dialogVisible = true
    },
    editName() {
      this.isNameDisabled = !this.isNameDisabled
    },
    editDescription() {
      this.isRoleDisabled = !this.isRoleDisabled
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .build {
    color: #2274e5;
    cursor: pointer;
    span {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 16px;
      line-height: 24px;
      text-align: center;
      background: #2274e5;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      i {
        font-size: 18px;
        margin: 3px 0;
      }
    }
  }
  .search {
    .input-with-select {
      height: 40px;
      input {
        width: 300px;
        height: 40px;
      }
      .el-input-group__append {
        background: #2274e5;
        border: none;
        button {
          border: none;
          i {
            color: #fff;
            font-size: 20px;
          }
        }
      }
    }
  }
}
.table {
  background: #f6f8fa;
  border: none;
  .el-table__header-wrapper {
    margin-bottom: 8px;
  }
  tr {
    height: 60px;
  }
  i {
    color: #2274e5;
    font-size: 20px;
    margin-right: 34px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }
  .el-tooltip__popper {
    padding: 10px 20px;
  }
  .accnumber {
    color: #2274e5;
    &:hover {
      text-decoration: underline;
    }
  }
}
.editdialog {
  .el-form-item__content {
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    .el-input,
    span {
      flex: 1;
    }
    .edit {
      color: #2274e5;
      font-size: 12px;
      padding-left: 16px;
      cursor: pointer;
      i {
        margin-right: 9px;
        font-size: 16px;
      }
    }
  }
}
</style>
