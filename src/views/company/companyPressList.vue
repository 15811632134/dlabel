<style lang='scss'>

::-webkit-input-placeholder {
  color: #c3c3c3;
}

:-ms-input-placeholder {
  color: #c3c3c3;
}

.companyPressList {
  padding: 0px 72px 0px 48px;
  position: relative;
}

.copyUrl {
  width: 64px;
  height: 32px;
  line-height: 32px;
  padding: 0px;
  border-radius: 16px;
  background-color: rgba(34, 116, 229, 1);
  box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
  border: 0px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  font-family: PingFangSC-Medium;
}
.goodsQrcode {
  img {
    width: 120px;
    height: 120px;
  }
  canvas {
    width: 120px;
    height: 120px;
  }
}
.codeUrl {
  width: 147px;
  height: 56px;
  border-radius: 4px;
  margin-left: 8px;
  background-color: rgba(245, 245, 245, 1);
  p {
    margin: 8px;
    width: 131px;
    height: 34px;
    color: rgba(102, 102, 102, 1);
    font-size: 12px;
    text-align: left;
    font-family: PingFangSC-Regular;
  }
}
.companyPressList {
  .companyPressList .el-table .cell {
    text-align: center;
  }
  .filter-container {
    margin-top:0px !important;
    overflow: hidden;
    padding-bottom: 30px;
    .tableAdd {
      margin-top: 20px;
    }
  }
  .accoutSearch {
    // width: 1550px;
    margin-top: 42px;
    & > div:nth-child(1) {
      margin-right: 210px;
    }
    .screenItem {
      .el-input {
        width: 320px;
        margin-bottom: 24px;
        margin-left: 16px;
      }
      .m_clearLR{
        &>div:first-child{
          // color:#666;
          // font-size:14px;
        }
      }

      .el-input--medium .el-input__inner {
        width: 320px !important;
      }
      & > span {
        width: 42px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
      .itemSearch {
        width: 80px;
        cursor: pointer;
        height: 32px;
        background: #2274E5;
        text-align: center;
        margin-left: 48px;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
      }
      .itemReset {
        width: 80px;
        cursor: pointer;
        text-align: center;
        height: 32px;
        border-radius: 4px;
        margin-left: 16px;
        border: 1px solid#2274E5;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: #2274E5;
        line-height: 32px;
      }
    }
  }
}
textarea {
  width: 300px;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
}
.deliver {
  color: #2274e5;
  .iconbianji {
    margin: 0px 10px;
  }
  .label {
    margin-left: 10px;
    width: 290px;
    color: #fff;
    height: 36px;
  }
  .el-input {
    width: 300px !important;
    // margin-left:16px;
  }
  .el-input--medium .el-input__inner {
    width: 300px;
  }
}
</style>
<template>
  <div class="app-container accout companyPressList">
    <div v-if="permissionData.indexOf('company_manage_select_executable')!=-1" class="accoutSearch m_clearLR">
      <div class="screenItem m_floatL">
        <div class="m_clearLR">

          <div class="m_floatL" style="margin-top:10px; width:70px">公司名称:</div>
          <el-input v-model="listQuery.full_name" class="m_floatL" placeholder="请输入" maxlength="50" name="all_name" />
        </div>
        <div class="m_clearLR">
          <div class="m_floatL" style="margin-top:10px; width:70px">手机号:</div>
          <el-input v-model="listQuery.contact_phone" class="m_floatL" placeholder="请输入" maxlength="11" name="all_name" />
        </div>
      </div>
      <div class="screenItem m_floatL m_clearLR">
        <div class="m_floatL">
          <div class="m_clearLR">
            <div class="m_floatL" style="margin-top:10px;width:70px">状态:</div>
            <el-select v-model="listQuery.enable" class="filter-item m_floatL" placeholder="请选择">
              <el-option v-for="(item) in enableArr" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
          <div class="m_clearLR ">
            <div class="m_floatL" style="margin-top:10px;width:70px">联系人:</div>
            <el-input v-model="listQuery.contact_name" class="m_floatL" placeholder="请输入" maxlength="10" name="all_name" />
          </div>
        </div>
        <div class="screenItem m_floatL m_clearLR">
          <div class="itemSearch m_floatL m_search" @click="getData">搜索</div>
          <div class="itemReset m_floatL" @click="resetQ">
            <i class="iconfont iconzhongzhimima"/>
            重置
          </div>
        </div>
      </div>

    </div>
    <div v-if="permissionData.indexOf('company_manage_add_executable')!=-1" class="filter-container">
      <div class="build" @click="handleCreate">
        <span>
          <i class="el-icon-plus" />
        </span>新建
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableList"
      element-loading-text="Loading"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <!-- <el-table-column label="友商公司编码" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.companyCode}}</span>
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column label="友商公司名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.fullName }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="友商公司简称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.shortName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="联系人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactName }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="主账号绑定手机" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobileNo }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.enable==0?'colorRed':'colorBlue'">{{ enableArr[scope.row.enable+1].name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="更新时间" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime|partFilter('') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="350" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <div class="operation">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <i v-if="permissionData.indexOf('company_manage_detail_executable')!=-1" class="iconfont iconwenjianliebiao-chakan" @click="toInfo(scope.row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <i v-if="permissionData.indexOf('company_manage_save_executable')!=-1" class="iconfont iconbianji" @click="toEdit(scope.row)"/>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="分配权限" placement="top">
              <i
                v-if="scope.row.enable==1&&permissionData.indexOf('company_manage_autority_button')!=-1"
                class="iconfont iconquanxianfenpei"
                @click="updateGoods(scope.row.companyStaffId)"
              />
              <i
                v-show="scope.row.enable==0&&permissionData.indexOf('company_manage_autority_button')!=-1"
                class="iconfont iconquanxianfenpei"
                style="color:#ddd" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置密码" placement="top">
              <el-popover placement="top-end" width="260" trigger="click" class-name="tooltips">
                <div class="reset-password">
                  <el-form ref="randomForm" :model="randomForm" :rules="randonrules">
                    <el-form-item label prop="password" class="copypassword">
                      <el-input v-model="randomForm.password" />
                      <el-button
                        v-clipboard:copy="randomForm.password"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">复制</el-button>
                    </el-form-item>
                  <!-- <el-form-item class="tooltip-button">
                    <el-button type="primary" @click="hidepopover(scope.$index)">取消</el-button>
                    <el-button @click="resetPassword('randomForm', scope.row.companyStaffId,scope.$index)">确定</el-button>
                  </el-form-item> -->
                  </el-form>
                </div>
                <i v-show="scope.row.enable==1&&permissionData.indexOf('company_manage_reset_pwd_executable')!=-1" slot="reference" style="margin-right:22.5px" class="iconzhongzhimima iconfont m_reset" @click="deleteRole(scope.row.id,scope.row.companyStaffId,scope.$index)" />
              </el-popover>
            </el-tooltip>
            <i
              v-show="scope.row.enable==0&&permissionData.indexOf('company_manage_reset_pwd_executable')!=-1"
              class="iconfont iconzhongzhimima "
              style="color:#ddd" />

            <el-popover ref="popover4" placement="top" title trigger="hover" content>
              <div>
                <div class="m_clearLR" >
                  <div
                    v-clipboard:copy="scope.row.shareUrl"
                    v-clipboard:success="onCopys"
                    v-clipboard:error="onError"
                    class="copyUrl m_floatL">复制</div>
                  <div class="codeUrl m_floatL">
                    <p
                      class="textLineTwo"
                    >{{ scope.row.shareUrl }}</p>
                  </div>
                </div>
                <div class="m_clearLR" style="margin-top:16px;" >
                  <div class="copyUrl m_floatL" @click="downs(scope.$index)">
                    <a :href="scope.row.shareQrcodeUrl">下载</a>
                  </div>
                  <div class="m_floatL">
                    <img :src="scope.row.shareQrcodeUrl" style="width:120px;height:120px;margin-left:8px;">
                  <!-- <div :id="'qrcode'+scope.$index" class="goodsQrcode"  style="width:120px;height:120px;margin-left:8px;"></div> -->
                  <!-- <img style="width:120px;height:120px;margin-left:8px;" src="@/assets/1.png" /> -->
                  </div>
                </div>
              </div>
            </el-popover>

            <i v-popover:popover4 v-show="scope.row.enable==1&&permissionData.indexOf('company_manage_qrcode_executable')!=-1" class="iconfont iconerweima" />
            <i
              v-show="scope.row.enable==0&&permissionData.indexOf('company_manage_qrcode_executable')!=-1"
              class="iconfont iconerweima"
              style="color:#ddd" />
            <el-popover ref="popover4" placement="top" title trigger="hover" content>
              <div>
                <div class="m_clearLR" >
                  <div
                    v-clipboard:copy="scope.row.shareUrl"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    class="copyUrl m_floatL">复制</div>
                  <div class="codeUrl m_floatL">
                    <p
                      class="textLineTwo"
                    >{{ scope.row.shareUrl }}</p>
                  </div>
                </div>
                <div class="m_clearLR" style="margin-top:16px;" >
                  <div class="copyUrl m_floatL" >
                    <a :href="scope.row.shareQrcodeUrl">下载</a>
                  </div>
                  <div class="m_floatL">
                    <img :src="scope.row.shareQrcodeUrl" style="width:120px;height:120px;margin-left:8px;">
                  <!-- <div :id="'qrcode'+scope.$index+''+scope.$index" class="goodsQrcode"  style="width:120px;height:120px;margin-left:8px;"></div> -->
                  <!-- <img style="width:120px;height:120px;margin-left:8px;" src="@/assets/1.png" /> -->
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="totalnumber>10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import {
  getList,
  getMallSysRoleList,
  systemReset_company_pwd,
  getMallSysUserPage,
  getPressCompanyByPage,
  updateProductStatus,
  saveMallSysRole,
  updateSysRoleStatus,
  get_random_pwd,
  reset_pwd
} from '@/api/api'
import QRCode from 'qrcodejs2'
export default {
  computed: {
    ...mapGetters([
      'permissionData'

    ]),
    getRoleList() {
      return this.roleList
    },
    getRoleListCalc() {
      return function(id) {
        var name = ''
        for (var i = 0; i < this.roleList.length; i++) {
          if (this.roleList[i].id == id) name = this.roleList[i].name
        }
        return name
      }
    },
    getRoleById(id) {
      return function(item) {
        var name = ''
        for (let i = 0; i < this.roleList.length; i++) {
          name = this.roleList[i].name
          break
        }
        return name
      }
    }
  },
  filters: {
    partFilter: function(value, type) {
      if (!value) return ''
      var date = new Date(value)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      var second = date.getSeconds()
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  },
  components: { Pagination, QRCode },
  data() {
    return {
      colorArr: ['colorBlue', 'colorRed'],
      isEdit: false,
      disabledPwd: false,
      randomForm: {
        password: ''
      },
      copyIndex: 0,
      total: 20,
      statusArr: ['审核中', '审核拒绝', '审核通过'],
      enableArr: [{ name: '全部', id: '' }, { name: '禁用', id: '0' }, { name: '启用', id: '1' }],
      test: false,
      visible: false,
      randonrules: {
        password: [{ required: true, message: '请输入密码' }]
      },
      resetedPwd: '',
      totalnumber: 0,
      getMessageText: '获取验证码',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {},
      pageSize: 10,
      disabled: false,
      resetFlag: false,
      cursor: true,

      listQuery: {
      },
      cursor: true,
      disable: false,
      selectExcelData: [],
      list: [],
      roleList: [],
      listLoading: true
    }
  },
  created() {
    this.listapi = getPressCompanyByPage
    this.resetQ()
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.getData()
      }
    })
    // this.updateIcon();
    // getMallSysRoleList().then(res => {
    //   this.roleList = res.data;
    // });
  },
  methods: {
    onCopys(e) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    onError(e) {
      console.log('复制失败')
    },
    hiddenPopover(index) {
      console.log(document.querySelectorAll('.operation .iconzhongzhi'))
      var icons = document.querySelectorAll('.operation .iconzhongzhi')
      icons[index].click()
      // e.currentTarget.parentElement.parentElement.setAttribute('aria-hidden',true)
      // e.currentTarget.parentElement.parentElement.style.display = 'none'
      // aria-hidden
    },
    openResetPwd(id) {
      this.test = true
      get_random_pwd().then(res => {
        this.resetedPwd = res.data
      })
    },
    onCopy(index) {
      this.resetFlag = true
      this.$message({
        message: '复制成功',
        type: 'success'
      })
      var iconzhongzhimimas = document.querySelectorAll('.el-table .m_reset')

      console.log(iconzhongzhimimas)
      iconzhongzhimimas[this.copyIndex].click()
    },
    onError(e) {
      console.log('复制失败')
    },
    resetPwd(id, index) {
      systemReset_company_pwd({ comnpany_staff_id: id, password: this.resetedPwd }).then(res => {
        console.log(index)
        this.hiddenPopover(index)
        this.$notify({
          title: '成功',
          message: '重置成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateIcon() {
      setTimeout(() => {
        console.log(document.querySelector('.el-input__suffix-inner'))
        var inputs = document.querySelectorAll('.el-input__suffix-inner')
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].innerHTML =
            '<i class="el-select__caret el-input__icon el-icon-arrow-up iconfont iconxialaxuanxiang2"></i>'
        }
      }, 1)
    },
    hidepopover(index) {
      var iconzhongzhimimas = document.querySelectorAll('.el-table .iconzhongzhimima')
      iconzhongzhimimas[index].click()
    },
    handleUpdate(row) {
      this.updateIcon()
      // this.$router.push({ name: "advertUpdate" });
      this.temp = Object.assign({}, row) // copy obj
      // var temp = {};
      // temp.id = row.id;
      // temp.name = row.name;
      // temp.body = row.remark;
      // this.temp = temp;
      this.disabled = false
      this.cursor = true
      this.getMessageText = '获取验证码'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {

    },
    resetTemp() {
      this.temp = {
        name: '',
        body: ''
      }
    },
    async deleteRole(id, companyStaffId, index) {
      if (this.resetFlag) {
        this.resetFlag = false
        return
      } else {
        this.resetFlag = false
      }
      const res = await get_random_pwd()
      if (res.code === 100) {
        this.randomForm.password = res.data
        this.disabledPwd = !this.disabledPwd

        this.resetPassword('randomForm', companyStaffId, index)
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    resetPassword(formName, id, index) {
      systemReset_company_pwd({
        comnpany_staff_id: id,
        password: this.randomForm.password
      }).then(res => {
        if (res.code === 100) {
          this.$message({
            showClose: true,
            message: '重置密码成功',
            type: 'success'
          })
          this.copyIndex = index
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    resetQ() {
      this.listQuery = {
        page_no: 1,
        page_size: this.pageSize,
        contact_phone: '',
        contact_name: '',
        enable: '',
        full_name: ''
      }
      this.getData()
    },
    updateData() {

    },
    updateGoods(id, type) {
      this.$router.push({ name: 'permissionPartnerList', query: { id: id }})
    },
    handleCreate() {
      this.$router.push({ name: 'companyCreate' })
    },
    changeImg(val) {
      const isLt2M = val.size / 1024 < 200
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 200kb !')
        return
      }
      this.temp.file = val.raw
      this.temp.image = this.getObjectURL(val.raw)
      // var myimg = URL.createObjectURL(val.raw);
      // var img = new Image();
      // img.src = myimg;
      // img.onload = function() {
      //   console.log(img.width, img.height);
      //   if(img.width==750&&img.height==1334){
      //     this.temp.file = val.raw;
      //     this.temp.image = this.getObjectURL(val.raw);
      //     console.log(this.temp.file);
      //   }else{
      //     this.$message.error("上传尺寸为：750*1334!");
      //   }
      // };
    },
    getRowKey(row) {
      console.log(row)
      return row.id
    },
    handleDownload() {
      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '您确定要导出所有数据吗')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              done()
              this.selectExcelData = this.tableList
              this.handleDownload()
            } else {
              done()
            }
            console.log(done)
          }
        }).then(action => {})
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['文件名']
        const filterVal = ['title']
        console.log(this.selectExcelData)
        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      return false
    },
    handleFilter() {},
    handleModifyStatus(row, status) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '您确定要删除该数据吗！')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            done()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            instance.confirmButtonLoading = false
            // deleteTemplateEn(row.id).then(res => {
            //   this.getList();
            //   done();

            //   this.$notify({
            //     title: "成功",
            //     message: "删除成功",
            //     type: "success",
            //     duration: 2000
            //   });
            //   instance.confirmButtonLoading = false;
            // });
          } else {
            done()
          }
          console.log(done)
        }
      }).then(action => {})
    },
    toInfo(item) {
      this.$router.push({ name: 'companyPressInfo', query: { id: item.companyCode || 1 }})
    },
    toEdit(item) {
      this.$router.push({ name: 'companyPressEdit', query: { id: item.companyCode || 1 }})
    },
    toPermission(id) {
      this.$router.push({ name: 'companyPermission', query: { id: companyCode || 1 }})
    },
    downs(index) {
      // //找到canvas标签
      const myCanvas = document.getElementById('qrcode' + index).getElementsByTagName('canvas')
      const img = document.getElementById('qrcode' + index).getElementsByTagName('img')
      // // //创建一个a标签节点
      const a = document.createElement('a')
      // //设置a标签的href属性（将canvas变成png图片）
      const imgURL = myCanvas[0].toDataURL('image/jpg')
      const ua = navigator.userAgent
      if (ua.indexOf('Trident') != -1 && ua.indexOf('Windows') != -1) { // IE内核 并且  windows系统 情况下 才执行;
        var bstr = atob(imgURL.split(',')[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        var blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, '下载' + '.' + 'png')
      } else if (ua.indexOf('Firefox') > -1) { // 火狐兼容下载
        const blob = this.base64ToBlob(imgURL) // new Blob([content]);
        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        a.download = ' '// 下载图片名称，如果填内容识别不到，下载为未知文件，所以我这里就不填为空
        a.href = URL.createObjectURL(blob)
        a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))// 兼容火狐
      } else { // 谷歌兼容下载
        img.src = myCanvas[0].toDataURL('image/jpg')
        // a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream')
        a.href = img.src
        // 设置下载文件的名字
        a.download = '下载'
        // 点击
        a.click()
      }
    },
    getData() {
      this.currentpage = 1
      this.listQuery.page_no = 1
      this.listLoading = true
      getPressCompanyByPage(this.listQuery).then(response => {
        var temp = response.data.records
        this.tableList = temp
        this.totalnumber = response.data.total

        // setTimeout(() => {
        //   temp.forEach(item => {
        //     item.children = null;
        //     item.isOpen = true;
        //     item.isFather = true;
        //   });

        //   setTimeout(() => {
        //     this.list[1].children = [
        //       "510000199410171357",
        //       "230000198405318834"
        //     ];
        //     this.list[2].isFather = false;
        //     this.list[3].isFather = false;
        //     // document.querySelectorAll('.el-table__row')[4].style.display = 'none'
        //   }, 0);
        // }, 0);
        //  setTimeout(() => {
        //     for(var i = 0 ; i < this.list.length ; i ++){
        //       document.querySelector('#qrcode'+i).innerHTML = ''
        //       // console.log(document.querySelector())
        //         let qrcode = new QRCode('qrcode'+i, {
        //         width: 200,
        //         height: 200,        // 高度
        //         text:  this.list[i].shareQrcodeUrl,   // 二维码内容

        //       })
        //         let qrcode2 = new QRCode('qrcode'+i+''+i, {
        //         width: 200,
        //         height: 200,        // 高度
        //         text:  this.list[i].shareQrcodeUrl,   // 二维码内容

        //       })
        //     }

        // }, 0);

        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog {
  margin-top: 10% !important;
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
