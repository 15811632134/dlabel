<template>
  <div class="app-container">
    <div class="filter-container">
      <div
        v-if="permissionData.indexOf('advert_manage_banner_add_executable')!=-1"
        class="build"
        @click="buildNewData"
      >
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div
        v-if="permissionData.indexOf('advert_manage_banner_select_executable')!=-1"
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
        <div class="fileBar_box">
          <div
            v-for="(item,index) in fileTexts"
            :class="barIndex==index?'active':''"
            :key="index"
            class="fileBar_div"
            @click="selectBarIndex(index)"
          >{{ item }}</div>
        </div>
        <el-table
          ref="singleTable"
          :data="tableList"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column property="imgPath" label="缩略图">
            <template slot-scope="{row}">
              <div class="thumbnail">
                <img :src="row.imgPath" />
                <div class="edit">
                  <i class="iconfont iconfangdachakan" @click="enlargeImage(row.imgPath)" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="name" label="名称" />
          <el-table-column property="equip" label="位置">
            <template slot-scope="{row}">{{ row.equip === 3 ? '侧边栏' : '首页' }}</template>
          </el-table-column>
          <el-table-column property="equip" label="平台">
            <template
              slot-scope="{row}"
            >{{ row.equip === 1 ? 'Android': row.equip === 2 ? 'IOS' : 'PC' }}</template>
          </el-table-column>
          <el-table-column property="enable" label="启用/禁用">
            <template slot-scope="{row}">
              <!-- <span
            :class="{'active': row.enable === 0}"
            class="state"
              >{{ row.enable === 1 ? '启用': '禁用' }}</span>-->
              <span :class="row.enable==1?'colorBlue':'colorRed'">{{ row.enable==1?'启用':'禁用' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i
                  v-if="permissionData.indexOf('advert_manage_banner_edit_executable')!=-1"
                  class="iconfont iconbianji"
                  @click="confirmEdit(row)"
                />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i
                  v-if="permissionData.indexOf('advert_manage_banner_delete_executable')!=-1"
                  class="iconfont iconshanchulanse"
                  @click="editDelete(row.id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="isdialog"
          :title="title"
          class="dialog"
          width="600px"
        >
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :modal-append-to-body="false"
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文件名：" prop="name" class="version">
              <el-input
                v-model="ruleForm.name"
                type="text"
                placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="广告图：" class="backupload adpic" prop="imgPath">
              <div class="file">
                <div v-if="!ruleForm.imgPath" class="upfile">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    @change="uploadChange($event,12,'imgPath',200)"
                  />
                  <i class="iconfont icontianjiatupian" />
                  <p>文件格式jpg、png、文件大小限制1M,建议尺寸：750*336</p>
                </div>
                <div v-else class="fileimg">
                  <div class="fileimg-delete">
                    <i class="iconfont iconshanchulanse" @click="deleteUpload('imgPath')" />
                  </div>
                  <img :src="ruleForm.imgPath" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="平台：" prop="languageId" class="version">
              <div class>
                <el-radio-group v-model="ruleForm.equip">
                  <el-radio :label="1">Android</el-radio>
                  <el-radio :label="2">iOS</el-radio>
                  <el-radio :label="3">PC</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item
              v-if="permissionData.indexOf('advert_manage_banner_enable_executable')!=-1"
              label="启用/禁用："
              prop="languageId"
              class="version"
            >
              <el-switch v-model="value" active-color="#2274E5" inactive-color="#999999" />
            </el-form-item>
            <el-form-item label="详情：" class="version">
              <el-input v-model="ruleForm.linkPath" type="text" placeholder="url链接" />
            </el-form-item>
            <el-form-item class="submit">
              <el-button @click="resetForm">取消</el-button>
              <el-button type="primary" @click="addData">确定</el-button>
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
  slideimg_personList,
  slideimg_personInsert,
  slideimg_personDelete,
  slideimg_personUpdate,
  uploadPic,
  user_list,
  open_company_list
} from '@/api/api';
import moment from 'moment';
import { validateName, validateUrl } from '@/utils/validate';
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
    return {
      currentRow: null,
      keyword: '', // 关键字
      currentIndex: 0,
      dialogVisible: false,
      barIndex: 0,
      fileTexts: ['PC端', 'Android端', 'IOS端'],
      ruleForm: {
        name: '',
        imgPath: '',
        linkPath: '',
        enable: 1,
        equip: 1
      },
      companys: [],
      title: '添加',
      value: false,
      rules: {
        name: [{ required: true, validator: validateName }],
        imgPath: [{ required: true, message: '请上传广告图' }],
        linkPath: [{ required: true, validator: validateUrl }]
      },
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
      this.listapi = slideimg_personList;

      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id;
        this.getListData(
          {
            pageNo: 1,
            pageSize: 10,
            companyId: this.companys[0].id,
            name: this.listQuery.name,equip:3
          },
          slideimg_personList
        );
      }
    });
  },
  methods: {
    selectBarIndex(index) {
      this.listQuery.equip = index === 0 ? 3 : index === 1 ? 1 : 2
      this.barIndex = index;
      this.getListData(this.listQuery, slideimg_personList);
    },
    handleSearch() {
      this.getListData(this.listQuery, slideimg_personList);
    },
    selectCompany(id, index) {
      this.listQuery.pageNo = 1;
      this.currentIndex = index;
      this.listQuery.companyId = id;
      this.getListData(this.listQuery, slideimg_personList);
    },
    openAdd() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
    },
    addData() {
      this.ruleForm.companyId = this.listQuery.companyId;
      this.ruleForm.enable = this.value ? 1 : 0;
      this.addListData(
        'ruleForm',
        slideimg_personInsert,
        slideimg_personUpdate,
        this.isedit,
        slideimg_personList,
        this.listQuery
      );
    },
    editDelete(id) {
      this.deleteData(
        id,
        slideimg_personDelete,
        slideimg_personList,
        this.listQuery
      );
    },
    confirmEdit(row) {
      this.isedit = true;
      this.isdialog = true;
      this.title = '编辑';
      this.ruleForm = {
        id: row.id,
        name: row.name,
        imgPath: row.imgPath,
        linkPath: row.linkPath,
        enable: row.enable,
        equip: row.equip
      };
      this.value = row.enable === 1;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
    },
    buildNewData() {
      this.isedit = false;
      this.ruleForm = {
        name: '',
        imgPath: '',
        linkPath: '',
        enable: 1,
        equip: 1
      };
      this.title = '添加';
      this.value = false;
      this.isdialog = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
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
    overflow: hidden;
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
</style>
