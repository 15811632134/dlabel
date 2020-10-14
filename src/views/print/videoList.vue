<template>
  <div class="app-container">
    <div class="filter-container"  v-if="permissionData.indexOf('print_manage_vedio_course_add_executable')!=-1">
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
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column property="name" label="视频名称" />
      <el-table-column property="url" label="图文链接">
        <template slot-scope="{row}">
          <div class="">
            {{row.url}}
          </div>
        </template>
      </el-table-column>

      <el-table-column property="equip" label="平台">
        <template slot-scope="{row}">
          <div class="">
            {{equip[row.equip-1]}}
          </div>
        </template>
      </el-table-column>

      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" v-if="permissionData.indexOf('print_manage_vedio_course_edit_executable')!=-1" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" v-if="permissionData.indexOf('print_manage_vedio_course_delete_executable')!=-1" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal='false' :visible.sync="isdialog" :title="title" class="dialog" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="视频名称：" prop="name" class="version">
          <el-input
            v-model="ruleForm.name"
            maxlength="50"
            type="text"
            placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="视频链接：" prop="url" class="version">
          <div class="textareaUrl">
            <!-- <el-input
            v-model="ruleForm.url"
            type="text"
             placeholder="请输入视频地址"
              maxlength="200"
            autocomplete="off"
          /> -->
           <el-input
            v-model="ruleForm.url"
            maxlength="200"
            type="textarea"
            placeholder="请输入视频地址"
          />
          </div>
        </el-form-item>
        <el-form-item label="平台：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.equip">
              <el-radio :label="1">Android</el-radio>
              <el-radio :label="2">IOS</el-radio>
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
    <!-- 分页 -->
    <div v-show="totalnumber>10" class="pagination-container">
      <el-pagination
        :current-page="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" >
    </el-dialog>
  </div>
</template>

<script>
// import { startpageList, startpageUpdate, startpageDelete, startpageInsert } from '@/api/api'
import {mapGetters} from 'vuex'
import {
  courseList,
  courseInsert,
  courseDelete,
  courseUpdate,uploadPic
} from '@/api/api'
import { validateName , validateUrlVideo} from '@/utils/validate'
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
      ruleForm: {
        name: '',
        url: '',
        type:5
      },
      pageSize: 10,
      equip:['Android','IOS','PC'],
      rules: {
        name: [{ required: true,  validator: validateName }],
        image: [{ required: true, message: '请上传缩略图' }],
        url: [
          { required: true, validator:validateUrlVideo , trriger:'change' }
        ]
      },
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      listQuery:{ pageNo: 1, pageSize:10,type:2}
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'

    ])
  },
  created() {
    this.listapi = courseList
    this.asyGetData = this.getData
    this.getListData(this.listQuery, courseList)
  },
  methods: {
    openAdd(){
      this.isedit = false
      this.resetTemp()
      this.dialogStatus = 'create'
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    getList(){this.getListData(this.listQuery, courseList)},
    addData() {
      this.title = '添加'
      this.addListData(
        'ruleForm',
        courseInsert,
        courseUpdate,
        this.isedit,
        courseList,
        this.listQuery
      )
    },
    resetTemp(){
      this.ruleForm = {
        name: '',
        equip: 1,
        type: '2',
        url:'',
        }
    }
    ,
    confirmEdit(row) {

      this.isedit = true
      this.isdialog = true
       this.title = '编辑'
      this.ruleForm = Object.assign({}, row); // copy obj
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });

    },
    editDelete(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, "您确定要删除该数据吗！")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";

            courseDelete(id).then(res => {
              done();
              this.getList();
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
      // this.deleteData(id, courseDelete, courseList)
    },
    handleSearch() {
        this.getListData(
          { name: this.keywords, pageNo:  this.currentpage, pageSize: this.pageSize,type:2 },
          courseList
        )

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
.textareaUrl {
  .el-textarea {
    width: 320px;
  }
}
.dialog{
  textarea{
    width:320px;
    height:160px;
    padding: 8px 16px;
border-radius:4px;
border:1px solid #dcdfe6;
  }
  /deep/.el-dialog__body{
    padding: 30px 20px !important;
  }
  /deep/.el-input__inner{
    width:320px !important;
  }
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
