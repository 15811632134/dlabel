<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="buildNewData('ruleForm')">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div class="search m_search">
        <el-input v-model="listQuery.name" placeholder="根据角色名搜索" maxlength="20" class="input-with-select">
          <el-button slot="append" icon="el-icon-search "  @keyup.native.enter="handleSearch" @click="handleSearch" />
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
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column property="name" label="角色名称" width="200" />
      <el-table-column property="remark" label="描述" />
      <el-table-column property="staffCount" label="账号数" class="accnumber">
        <template slot-scope="{row}">
          <a @click="toAccountList(row.roleId)" class="accnumber">{{ row.staffCount }}</a>
        </template>
      </el-table-column>
      <el-table-column ref="status" property="state" label="状态" class-name="status">
        <template slot-scope="{row}">
          <span
            :class="row.state==1?'colorBlue':'colorRed'"
          >{{ row.state == '1' ? '启用': '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="createTime" label="更新时间">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | formatDate('') }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconbianji iconfont" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="权限分配" placement="top">
            <i class="iconquanxianfenpei iconfont" @click="permission(row.roleId)"/>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconshanchulanse iconfont" @click="editDelete(row.roleId)" />
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
    <!--编辑-->
    <el-dialog :close-on-click-modal='false' :visible.sync="isdialog" class="dialog" title="编辑角色" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="ruleForm.name"

            type="text"
            placeholder="限制十个字"
            maxlength="10"
            autocomplete="off"
          />
          <!-- <div v-if="isedit" class="edit" @click="editName('isNameDisabled')">
            <i class="iconxiugai iconfont" />
            修改
          </div> -->
        </el-form-item>
        <el-form-item label="角色描述" prop="remark">
          <textarea
            v-model="ruleForm.remark"
            style="width:300px;height:100px;padding:8px 16px;"
            type="textarea"
            placeholder="限制50个字"
            maxlength="30"
            autosize
            show-word-limit
          />
          <!-- <div v-if="isedit" class="edit" @click="editName('isRemarkDisabled')">
            <i class="iconxiugai iconfont" />
            修改
          </div> -->
        </el-form-item>
        <el-form-item label="启用/禁用" v-show="isedit">
          <el-switch  active-color="#2274E5"
              inactive-color="#ddd"
              :active-value="'1'"
              :inactive-value="'0'"
              v-model="ruleForm.state" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="isdialog = false">取消</el-button>
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
import {
  saveDlabelSysRole,
  saveDlabelSysRoleUpdate,
  getDlabelSysRolePage,
  updateSysRoleStatus,
  role_delete
} from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if(time)
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        remark: '',
        state:0
      },
      rules: {
        name: [{ required: true, message: '请输入文件名', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入角色描述' }]
      },
      switchval: false,
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      isSwitch: true,
      isNameDisabled: false,
      isRemarkDisabled: false,
      listQuery:{name:'', page_no: 1, page_size: 10 }
    }
  },
  computed: {},
  created() {
    this.listapi = getDlabelSysRolePage
    this.getListDataLx(this.listQuery, getDlabelSysRolePage)
  },
  methods: {
    toAccountList(id){
      this.$router.push({name:'accountLimit',query:{r:id}})
    },
    addData() {
      this.title = '添加'

      this.addListData(
        'ruleForm',
        saveDlabelSysRole,
        saveDlabelSysRoleUpdate,
        this.isedit,
        getDlabelSysRolePage,
        this.listQuery,
        'role'
      )
    },
    confirmEdit(row) {
      this.isedit = true
      this.isdialog = true
      this.title = '编辑'
      this.isNameDisabled = true
      this.isRemarkDisabled = true
      // this.switchval = row.state === '1'
      this.ruleForm = {
        name: row.name,
        remark: row.remark,
        role_id: row.roleId,
        state: row.state
      }
    },
    async editDelete(roleId) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, "您确定要删除该角色吗！")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";

            role_delete({ role_id:roleId}).then(res => {
              done();
              this.getListDataLx(this.listQuery, getDlabelSysRolePage)
              this.$message.success('删除成功')
              instance.confirmButtonLoading = false;
            }).catch(error=>{
              done();
              instance.confirmButtonLoading = false;
            });
          } else {
            done();
          }
          console.log(done);
        }
      }).then(action => {
        // this.$message({
        //   type: "info",
        //   message: "action: " + action
        // });
      });
      // this.deleteData(id, role_delete, getDlabelSysRolePage, this.listQuery)

    },
    handleSearch() {
        this.getListDataLx(
         this.listQuery,
          getDlabelSysRolePage
        )

    },
    editName(name) {
      this[name] = !this[name]
    },
    buildNewData() {
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
      this.isNameDisabled = false
      this.isRemarkDisabled = false
      this.isdialog = true
    },
    permission(tag) {
      this.$router.push({
        path: '/limit/permissionList',
        query: {
          tag:tag
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
/deep/.dialog .el-input__inner{
  width:300px !important;
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
.state {
  &.active {
    color: #fc7968;
  }
}
</style>
