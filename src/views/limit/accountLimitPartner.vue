<template>
  <div class="app-container">
    <div class="account-search" v-show="!listQuery.role_id">
      <div class="search">
        <div class="search-list">
          <span class="title">账号：</span>
          <el-input v-model="listQuery.account" placeholder="请输入账号" />
        </div>
        <div class="search-list search-size">
          <span class="title">状态：</span>
          <el-select v-model="listQuery.state" placeholder="请选择" class="selectstate">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="search">
        <div class="search-list">
          <span class="title">手机：</span>
          <el-input v-model="listQuery.mobile_no" placeholder="请输入手机号码" />
        </div>
        <div class="search-list search-size account-btn">
          <span class="title">联系人：</span>
          <el-input v-model="listQuery.name" placeholder="请输入联系人" />
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" class="resetaccount" @click="resetSearch">重置</el-button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column property="account" label="账号" width="200" />
      <el-table-column property="mobileNo" label="手机" />
      <el-table-column property="name" label="联系人" />
      <el-table-column property="roleName" label="所属角色" />
      <el-table-column property="companyName" label="所属友商" />
      <el-table-column property="state" label="状态">
        <template slot-scope="{row}">
          <span
            :class="row.state==1?'colorBlue':'colorRed'"
          >{{ row.state === 1 ? '启用': '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="updateTime" label="更新时间">
        <template slot-scope="{row}">
          <div>
            <span>{{ row.updateTime| formatDate(row.updateTime) }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增账户 -->
    <el-dialog :visible.sync="isdialog" class="dialog" title="新增账户" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="账户：" prop="account">
          <el-input
            v-model="ruleForm.account"
            type="text"
            placeholder="请输入8-20位字母加数字"
            maxlength="20"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="选择角色：" prop="roleId">
          <el-select
            v-model="ruleForm.roleId"
            filterable
            placeholder="从角色列表中搜索选择"
          >
            <el-option
              v-for="item in roleoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            placeholder="6个汉字以内，英文名限制30个字母"
            maxlength="30"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="绑定手机号：" prop="mobileNo">
          <el-input
            v-model="ruleForm.mobileNo"
            type="tel"
            placeholder="请输入11位手机号码"
            maxlength="11"
            autocomplete="off"
          />
        </el-form-item> -->
        <el-form-item v-if="isedit" label="启用/禁用：" >
          <el-switch
            v-model="ruleForm.state"
            :active-value="1"
            :inactive-value="0"
            active-color="#2274e5"
            inactive-color="#ddd"
          />
        </el-form-item>
        <!-- <el-form-item v-if="!isedit" label="验证码：" prop="smsCode" class="code">
          <el-input
            v-model="ruleForm.smsCode"
            type="tel"
            placeholder="请输入验证码"
            maxlength="20"
            autocomplete="off"
          />
          <el-button type="primary" @click="getSmsCode">{{ codetitle }}</el-button>
        </el-form-item> -->
        <el-form-item class="submit">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import {
  company_staff_list,
  getRandomPwd,
  resetPwd,
  getDlabelSysRoleList,
  getDlabelSysUserByRole,
  saveSysUser,
  getCode,
  get_random_pwd,
  reset_pwd
} from '@/api/api'
import { validateTelphone, validateAccount } from '@/utils/validate'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      //  搜索账号
      telphone: '',
      visible: false,
      // 保存修改手机号码
      phonenumber: '',
      classification: '',
      tableList: [],
      disabledPwd:false,
      currentRow: null,
      isedit: false,
      ruleForm: {
        account: '',
        mobile_no: '',
        state: '',
        name: '',
        page_no: 1,
        page_size: 10
      },
      randomForm: {
        password: ''
      },
      randonrules: {
        password: [{ required: true, message: '请输入密码' }]
      },
      // 随机密码
      randomPassword: '',
      rules: {
        name: [{ required: true, message: '请输入姓名' }],
        account: [{ required: true, validator: validateAccount }],
        mobileNo: [{ required: true, validator: validateTelphone }],
        smsCode: [{ required: true, message: '请输入验证码' }],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      // 状态搜索
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '禁用'
        },
        {
          value: 1,
          label: '启用'
        }
      ],
      state: '',
      roleoptions: [],
      popval: false,
      account: '',
      value: 1,
      codetitle: '获取验证码',
      countdown: 0,
      listQuery:{
        account: '',
        mobile_no: '',
        state: '',
        name: '',
        page_no: 1,
        page_size: 10,
        role_id:''
      }
    }
  },
  computed: {},
  created() {
    this.listapi = company_staff_list
     if(this.$route.query.r)
      this.listQuery.role_id = this.$route.query.r
    this.company_staff_list(this.listQuery)
    this.getDlabelSysRoleList()
  },
  mounted() {},
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    confirmEdit(row) {
      this.isedit = true
      this.ruleForm = {
        id: row.id,
        name: row.name,
        account: row.account,
        roleId: row.roleId,
        state: row.state
      }
      this.isdialog = true
    },
    // 查询角色名称
    async getDlabelSysRoleList() {
      const res = await getDlabelSysRoleList()
      if (res.code === 100) {
        this.roleoptions = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 查询账号列表信息
    async company_staff_list(data) {
      const res = await company_staff_list(data)
      if (res.code === 100) {
        this.tableList = res.data.records
        this.totalnumber = res.data.total
        this.pagecount = res.data.pages
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 新增账户
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await saveSysUser(this.ruleForm)
          if (res.code === 100) {
            this.isdialog = false
            this.company_staff_list(this.listQuery)
            this.$message({
              showClose: true,
              message: this.isedit ? '编辑账号成功' : '新建账号成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    async getSmsCode() {
      if (this.countdown <= 0) {
        const res = await getCode({
          mobile: this.ruleForm.mobileNo,
        })
        if (res.code === 100) {
          const TIME_COUNT = 60
          if (!this.timer) {
            this.countdown = TIME_COUNT
            this.timer = setInterval(() => {
              if (this.countdown > 0 && this.countdown <= TIME_COUNT) {
                this.countdown--
                this.codetitle = `${this.countdown}s`
              } else {
                this.codetitle = '获取验证码'
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
          this.$message({
            showClose: true,
            message: '发送短信验证码成功，请注意查收',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      }
    },
    // 获取随机密码
    async deleteRole(id) {
      const res = await get_random_pwd()
      if (res.code === 100) {
        this.randomForm.password = res.data
        this.disabledPwd = !this.disabledPwd
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 重置密码
    resetPassword(formName, id) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await reset_pwd({
            staffId: id,
            password: this.randomForm.password
          })
          if (res.code === 100) {
            this.$message({
              showClose: true,
              message: '重置密码成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    buildData() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
      this.ruleForm = {
        name: '',
        account: '',
        roleId: '',
      }
      this.isedit = false
      this.isdialog = true
    },
    hidepopover() {},
    // 查询
    search() {
      this.company_staff_list(this.listQuery)
    },
    // 重置查询
    resetSearch() {
      this.account = ''
      this.telphone = ''
      this.state = ''
      this.classification = ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
    cursor: pointer;
    &:first-child {
      // margin-right: 34px;
    }
  }
  .el-tooltip__popper {
    padding: 10px 20px;
  }
}
.code {
  .el-input {
    width: 65%;
    height: 32px;
  }
  button {
    width: 100px;
    height: 32px;
    padding: 0;
    float: right;
    font-size: 12px;
    background: #2274e5;
    margin-left: 16px;
    &:hover {
      border-color: #2274e5;
      background: #2274e5;
      color: #fff;
    }
  }
}
.account-search {
  .search-list {
    .title {
      width: 66px !important;
    }
    .el-input {
      width: 320px !important;
    }
    .selectstate {
      width: 320px;
      /deep/ .el-input {
        width: 320px;
        input {
          padding-right: 16px;
        }
        span {
          width: auto;
        }
      }
    }
  }
  .account-btn {
    button {
      width: 80px;
      height: 32px;
      line-height: 32px;
      background: #2274e5;
      color: #fff;
      padding: 0;
      margin-left: 48px;
      span {
        font-size: 12px;
      }
      &.resetaccount {
        border: 1px solid rgba(34, 116, 229, 1);
        background: #fff;
        color: #2274e5;
        margin-left: 16px;
      }
    }
  }
}
.reset-password {
  margin: 0;

  .copypassword {
    margin-bottom: 40px;
    /deep/ .el-form-item__content {
      display: flex;
      align-items: center;
      height: 32px;

      .el-input {
        width: 148px;
        height: 32px;

        input {
          height: 32px;
          line-height: 32px;
          border-color: #c3c3c3;
          border-radius: 4px;
        }
      }

      button {
        width: 64px;
        height: 32px;
        background: #2274e5;
        padding: 0;
        margin-left: 16px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .tooltip-button {
    text-align: right;
    button {
      width: 80px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      padding: 0;
      background: #2274e5;
      color: #fff;
      &:first-child {
        border-color: #999999;
        background: #fff;
        color: #999999;
      }
    }
  }
}
</style>
