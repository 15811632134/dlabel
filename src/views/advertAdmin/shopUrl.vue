<template>
  <div class="app-container">
    <div class="signadmin" style="overflow:hidden;margin-top:0px">
      <div class="app-menu" style="margin-top:0px">
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
      <div class="app-content" >
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
          <el-table-column property="url" label="商城链接" />
          <el-table-column property="companyName" label="平台">
            <template slot-scope="{row}">
              <div>
                <span>{{ row.equip==1?'Android端':row.equip==2?'IOS端':'PC端' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="createTime" label="时间">
            <template slot-scope="{row}">
              <div>
                <span>{{ row.createTime| formatDate(row.createTime) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="enable" label="显示/隐藏">
            <template slot-scope="{row}">
              <div>
                <span :class="row.show=== 1?'colorBlue':'colorRed'">{{ row.show===1?'显示':'隐藏' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="enable" label="启用/禁用">
            <template slot-scope="{row}">
              <div>
                <span :class="row.enable=== 1?'colorBlue':'colorRed'">{{ row.enable===1?'启用':'禁用' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i
                  v-if="permissionData.indexOf('advert_manage_mall_url_edit_executable')!=-1"
                  class="iconfont iconbianji"
                  @click="confirmEdit(row)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      :title="textMap[dialogStatus]"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      class="dialog"
      width="560px"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商城链接：" prop="url" class="version">
          <div class="textareaUrl">
            <el-input
              v-model="ruleForm.url"
              type="text"
              placeholder="请输入商城链接"
              maxlength="200"
              autocomplete="off"
            />
          </div>
        </el-form-item>

        <el-form-item label="显示/隐藏">
          <el-switch
            v-model="ruleForm.show"
            :active-value="1"
            :inactive-value="0"
            active-color="#2274e5"
            inactive-color="#ddd"
          />
        </el-form-item>
        <el-form-item
          v-if="permissionData.indexOf('advert_manage_mall_url_enable_executable')!=-1"
          label="启用/禁用"
        >
          <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#2274e5"
            inactive-color="#ddd"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="showDialog=false">取消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'? createData(): updateData()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
  protocolList,
  protocolInsert,
  protocolDelete,
  protocolUpdate,
  open_company_list
} from '@/api/api';
import moment from 'moment';
import { validateUrl } from '@/utils/validate';
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
    return {
      showDialog: false,
      dialogStatus: '',
      currentIndex: 0,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      ruleForm: {
        url: '',
        enable: 2,
        companyId: '',
        show: ''
      },
      rules: {
        url: [{ required: true, validator: validateUrl }]
      },
      // 是否编辑
      isedit: false,
      barIndex: 0,
      fileTexts: ['PC端', 'Android端', 'IOS端'],
      listQuery: { pageNo: 1, pageSize: 10, type: 4, companyId: -1 ,equip:3},
      companys: []
    };
  },
  computed: {
    partnerList() {
      return [
        { id: 1, name: 'Android' },
        { id: 2, name: 'IOS' },
        { id: 3, name: 'PC' }
      ];
    },
    ...mapGetters(['permissionData'])
  },
  created() {
    this.listapi = protocolList;
    open_company_list().then(res => {
      res.data.splice(0, 0, { companyId: '', shortName: '默认' })
      this.companys = res.data;
      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id;
        this.getList();
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
      this.getList();
    },
    getList() {
      protocolList(this.listQuery).then(res => {
        this.tableList = res.data.list;
        this.totalnumber = res.data.total;
      });
    },
    openAdd() {
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
      this.dialogStatus = 'create';
      this.resetTemp();
      this.showDialog = true;
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          protocolInsert(this.ruleForm).then(res => {
            this.showDialog = false;
            this.getList();
            this.$message.success('添加成功');
          });
        } else {
          return false;
        }
      });
    },
    updateData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          protocolUpdate(this.ruleForm).then(res => {
            this.showDialog = false;
            this.getList();
            this.$message.success('修改成功');
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.ruleForm = {
        type: 4,
        enable: 1,
        companyId:
          this.companys && this.companys.length > 0 ? this.companys[0].id : ''
      };
    },
    confirmEdit(row) {
      this.ruleForm = Object.assign({}, row); // copy obj
      this.dialogStatus = 'update';
      this.showDialog = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate();
      });
    },
    editDelete(id) {
      this.deleteData(id, protocolDelete, protocolList, this.listQuery);
    },
    handleSearch() {
      this.getListData(
        { name: this.keywords, pageNo: 1, pageSize: 10, type: 4,equip:3 },
        protocolList
      );
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.textareaUrl {
  .el-input {
    width: 300px;
  }
}
.version {
  width: 380px;
}
.dialog .el-input__inner {
  line-height: 36px !important;
  height: 36px !important;
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
.colorRed {
  color: #f00;
}
</style>
