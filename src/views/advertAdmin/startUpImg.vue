<template>
  <div class="app-container">
    <div class="filter-container">
      <div
        v-if="permissionData.indexOf('advert_manage_start_page_add_executable')!=-1"
        class="build"
        @click="openAdd()"
      >
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div
        v-if="permissionData.indexOf('advert_manage_start_page_select_executable')!=-1"
        class="search m_search"
      >
        <el-input
          v-model="listQuery.name"
          placeholder="搜索相关关键词"
          maxlength="20"
          class="input-with-select"
          @keyup.native.enter="handleSearch"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>
    </div>
    <div class="signadmin">
      <div class="app-menu">
        <h3 v-if="companys.length>0">全部（{{ companys.length-1 }}）</h3>
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
        <!-- <div class="filter-container filesearch"  v-if="permissionData.indexOf('user_manage_search_executable')!=-1">
      <div class="search">
        <el-input v-model="listQuery.keyword" placeholder="根据手机号搜索" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>
        </div>-->
        <div class="fileBar_box">
          <div
            v-for="(item,index) in fileTexts"
            :class="barIndex==index?'active':''"
            :key="index"
            class="fileBar_div"
            @click="selectBarIndex(index)"
          >{{ item }}</div>
        </div>
        <el-table ref="singleTable" :data="tableList" highlight-current-row class="table">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column property="framePath" label="缩略图">
            <template slot-scope="{row}">
              <div class="thumbnail">
                <img :src="row.imgPath" />
                <div class="edit">
                  <i class="iconfont iconfangdachakan" @click="enlargeImage(row.imgPath)" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="name" label="名称">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column property="equip" label="平台">
            <template slot-scope="{row}">
              <span>{{ row.equip?eqList[row.equip-1].name:'无平台' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="equip" label="启用/禁用">
            <template slot-scope="{row}">
              <span :class="row.enable==1?'colorBlue':'colorRed'">{{ row.enable==1?'启用':'禁用' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i
                  v-if="permissionData.indexOf('advert_manage_start_page_edit_executable')!=-1"
                  class="iconfont iconbianji"
                  @click="confirmEdit(row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i
                  v-if="permissionData.indexOf('advert_manage_start_page_delete_executable')!=-1"
                  class="iconfont iconshanchulanse"
                  @click="editDelete(row.id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="showDialog"
          :title="textMap[dialogStatus]"
          class="dialog"
          width="560px"
        >
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            :modal-append-to-body="false"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文件名：" prop="name" class="version">
              <el-input
                v-model="ruleForm.name"
                type="text"
                maxlength="50"
                placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="缩略图：" class="backupload" prop="imgPath">
              <div class="file">
                <div v-if="!ruleForm.imgPath" class="upfile">
                  <input type="file" accept=".jpg, .jpeg, .png" @change="changeImg" />
                  <i class="iconfont icontianjiatupian" />
                  <p>建议尺寸：750*1334</p>
                </div>
                <div v-else class="fileimg">
                  <div class="fileimg-delete">
                    <i class="iconfont iconshanchulanse" @click="deleteUpload('imgPath')" />
                  </div>
                  <img :src="ruleForm.imgPath" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="平台：" class="version">
              <div>
                <el-radio v-model="ruleForm.equip" label="1">Android</el-radio>
                <el-radio v-model="ruleForm.equip" label="2">IOS</el-radio>
                <el-radio v-model="ruleForm.equip" label="3">PC</el-radio>
              </div>
            </el-form-item>
            <el-form-item label="启用/禁用">
              <el-switch
                v-model="ruleForm.enable"
                :active-value="1"
                :inactive-value="0"
                active-color="#2274e5"
                inactive-color="#ddd"
              />
            </el-form-item>
            <el-form-item label="跳过按钮：" class="version">
              <div>
                <el-radio v-model="ruleForm.jumpButton" label="1">有</el-radio>
                <el-radio v-model="ruleForm.jumpButton" label="0">无</el-radio>
              </div>
            </el-form-item>
            <el-form-item label="跳过倒计时:" class="version" prop="jumpTime">
              <div class="timerOut">
                <el-input v-model="ruleForm.jumpTime" type="text" placeholder="秒" />
                <span>秒 ( 可填2-5 )</span>
              </div>
            </el-form-item>
            <el-form-item label="后续动作：" class="version">
              <div>
                <div class="playing">
                  <el-radio v-model="ruleForm.linkControl" label="1">打开链接</el-radio>
                  <el-input v-model="ruleForm.linkPath" style="margin-left:32px" />
                </div>
                <div>
                  <el-radio v-model="ruleForm.linkControl" label="0">关闭</el-radio>
                </div>
              </div>
            </el-form-item>
            <el-form-item class="submit">
              <el-button @click="showDialog=false">取消</el-button>
              <el-button
                type="primary"
                @click="dialogStatus==='create'?createData():updateData()"
              >确定</el-button>
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
            @size-change="handleSizeChange($event, listQuery)"
            @current-change="handleCurrentChange($event, listQuery)"
          />
        </div>
      </div>
    </div>
    <!-- 放大图片 -->
    <el-dialog
      :visible.sync="isEnlarge"
      :modal-append-to-body="false"
      :show-close="false"
      :width="widthauto"
      title
      class="imgdialog"
    >
      <img :src="imgPath" class="magnifier" @load="onLoad" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  startpageList,
  startpageInsert,
  startpageDelete,
  startpageUpdate,
  uploadPic,
  user_list,
  open_company_list
} from '@/api/api';
import { validateUrl, validateName, validateNum } from '@/utils/validate';
import moment from 'moment';
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
    return {
      eqList: [
        { id: 1, name: 'Android端' },
        { id: 2, name: 'IOS端' },
        { id: 3, name: 'PC端' }
      ],
      showDialog: false,
      dialogStatus: '',
      barIndex: 0,
      fileTexts: ['PC端', 'Android端', 'IOS端'],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      ruleForm: {
        name: '',
        imgPath: '',
        linkPath: '',
        jumpTime: ''
      },
      rules: {
        jumpTime: [{ required: true, validator: validateNum, trigger: 'blur' }],
        name: [{ required: true, validator: validateName }],
        imgPath: [{ required: true, message: '请上传广告图' }],
        linkPath: [{ required: true, validator: validateUrl }]
      },
      // 是否编辑
      isedit: false,
      currentIndex: 0,
      selectId: 0,
      companys: [],
      listQuery: { pageNo: 1, pageSize: 10, companyId: -1, name: '',equip:3 }
    };
  },
  computed: {
    ...mapGetters(['permissionData'])
  },
  created() {
    open_company_list().then(res => {
      res.data.splice(0, 0, { companyId: '', shortName: '默认' })
      this.companys = res.data;
      this.listapi = startpageList;
      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id;
        this.getListData(
          {
            pageNo: 1,
            pageSize: 10,
            companyId: this.companys[0].id,
            name: this.listQuery.name,equip:3
          },
          startpageList
        );
      }
    });
  },
  methods: {
    selectBarIndex(index) {
      this.listQuery.equip = index === 0 ? 3 : index === 1 ? 1 : 2
      this.barIndex = index;
      this.getList();
    },
    selectCompany(id, index) {
      this.listQuery.pageNo = 1;
      this.currentIndex = index;
      this.listQuery.companyId = id;
      this.getListData(this.listQuery, startpageList);
    },
    getList() {
      startpageList(this.listQuery).then(res => {
        this.tableList = res.data.list;
        this.totalnumber = res.data.total;
      });
    },
    changeImg(val) {
      console.log(val);
      // const isLt2M = val.size / 1024 < 200;
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 200kb !");
      //   return;
      // }
      var form = new FormData();
      form.append('fileData', event.target.files[0]);
      uploadPic(form, 11).then(res => {
        console.log(res.data.sourceUrl);
        this.ruleForm.imgPath = res.data.sourceUrl;
      });
    },
    openAdd() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm.companyId = this.listQuery.companyId;
          startpageInsert(this.ruleForm).then(res => {
            this.showDialog = false;
            this.getList();
            this.$message.success('添加成功');
          });
        }
      });
    },
    updateData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm.companyId = this.listQuery.companyId;
          startpageUpdate(this.ruleForm).then(res => {
            this.getList();
            this.showDialog = false;
            this.$message.success('修改成功');
          });
        }
      });
    },
    resetTemp() {
      this.ruleForm = {
        name: '',
        imgPath: '',
        equip: '1',
        enable: 1,
        linkPath: '',
        jumpTime: ''
      };
    },
    confirmEdit(row) {
      row.equip = row.equip + '';
      row.jumpButton = row.jumpButton + '';
      row.linkControl = row.linkControl + '';
      this.ruleForm = Object.assign({}, row); // copy obj
      this.dialogStatus = 'update';
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
    },

    editDelete(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '删除后将无法恢复，是否继续？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            startpageDelete(id)
              .then(res => {
                done();
                this.getList();
                this.$message.success('删除成功');
                instance.confirmButtonLoading = false;
              })
              .catch(error => {
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
    },
    handleSearch() {
      this.listQuery.pageNo = 1;
      this.currentpage = 1;
      this.getListData(this.listQuery, startpageList);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.signadmin {
  width: 100%;
  display: flex;

  .app-content {
    margin-left: 30px;
    flex: 1;
    overflow-y: hidden;
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
          opacity: 1;
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
/deep/.timerOut {
  .el-input {
    width: 50px;
  }
}
.playing {
  .el-input {
    width: 200px;
  }
}
.app-menu {
  margin-top: 0px !important;
}
.filesearch {
  justify-content: flex-end;
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #c3c3c3;
}
</style>
