<style lang='scss'>

::-webkit-input-placeholder {
  color: #c3c3c3;
}

:-ms-input-placeholder {
  color: #c3c3c3;
}

.companyList {
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
.accout {
  .accout .el-table .cell {
    text-align: center;
  }
  .filter-container {
    margin-top:0px !important;
    overflow: hidden;
    // padding-bottom: 0px;
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
        margin-top: 64px;
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
        margin-top: 64px;
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
  <div class="app-container accout companyList">
    <div v-if="permissionData.indexOf('company_apply_search_executable')!=-1" class="accoutSearch m_clearLR">
      <div class="screenItem m_floatL">
        <div class="m_clearLR">
          <div class="m_floatL" style="margin-top:10px; width:70px">公司名称:</div>
          <el-input v-model="listQuery.full_name" class="m_floatL" placeholder="请输入" maxlength="50" name="all_name" />
        </div>
        <div class="m_clearLR">
          <div class="m_floatL" style="margin-top:10px; width:70px">手机:</div>
          <el-input v-model="listQuery.contact_phone" class="m_floatL" placeholder="请输入" maxlength="11" name="all_name" />
        </div>
      </div>
      <div class="screenItem m_floatL">
        <div class="m_clearLR">
          <div class="m_floatL" style="margin-top:10px;width:70px">状态:</div>
          <el-select v-model="listQuery.apply_status" class="filter-item m_floatL" placeholder="请选择" @change="getData">
            <el-option v-for="(item) in statusArr" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div class="m_clearLR">
          <div class="m_floatL" style="margin-top:10px;width:70px">联系人:</div>
          <el-input v-model="listQuery.contact_name" class="m_floatL" placeholder="请输入" maxlength="10" name="all_name" />
        </div>
      </div>
      <div class="screenItem m_floatL m_clearLR">
        <div class="itemSearch m_floatL m_search" @click="getData">搜索</div>
        <div class="itemReset m_floatL" @click="resetData">
          <i class="iconfont iconzhongzhimima"/>
          重置
        </div>
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
      <el-table-column class-name="status-col" label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <span :class="colorArr[scope.row.applyStatus]">{{ statusArr[scope.row.applyStatus].name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="更新时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime|partFilter('') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">

          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i v-if="permissionData.indexOf('company_apply_edit_executable')!=-1" class="iconfont iconbianji" @click="toEdit(scope.row)" />
          </el-tooltip>

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
  getMallSysUserPage,
  get_random_pwd,
  getCompanyByPage,
  updateProductStatus,
  saveMallSysRole,
  updateSysRoleStatus
} from '@/api/api'
import QRCode from 'qrcodejs2'
export default {
  computed: {
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
    getStatusArr() {
      return function(id) {
        var name = ''
        for (var i = 0; i < this.statusArr.length; i++) {
          if (this.statusArr[i].id == id) name = this.statusArr[i].name
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
    },
    ...mapGetters([
      'permissionData'

    ])
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
      colorArr: ['', 'colorBlue', 'colorRed'],
      isEdit: false,
      total: 20,
      statusArr: [{ name: '全部', id: '' }, { name: '待审批', id: '1' }, { name: '审核拒绝', id: '2' }, { name: '审核通过', id: '3' }],
      test: false,
      visible: false,
      resetedPwd: '',
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
    // this.asyGetData = this.getData
    this.listapi = getCompanyByPage
    this.resetQ()
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.getData()
      }
    })
    // getMallSysRoleList().then(res => {
    //   this.roleList = res.data;
    // });
  },
  methods: {
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
    onCopy(e) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    onError(e) {
      console.log('复制失败')
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
      // saveMallSysUser(this.temp).then(res => {
      //   if (res.code == 100) {
      //     this.getData();
      //     this.dialogFormVisible = false;
      //     this.$notify({
      //       title: "成功",
      //       message: "创建成功",
      //       type: "success",
      //       duration: 2000
      //     });
      //   }
      // });
    },
    resetTemp() {
      this.temp = {
        name: '',
        body: ''
      }
    },
    resetQ() {
      this.listQuery = {
        page_no: 1,
        page_size: this.pageSize,
        contact_phone: '',
        contact_name: '',
        apply_status: '',
        full_name: ''
      }
      this.getData()
    },
    resetData() {
      this.resetQ()
    },
    updateData() {
      // saveMallSysUser(this.temp).then(res => {
      //   if (res.code == 100) {
      //     this.getData();
      //     this.dialogFormVisible = false;
      //     this.$notify({
      //       title: "成功",
      //       message: "创建成功",
      //       type: "success",
      //       duration: 2000
      //     });
      //   }
      // });
    },
    updateGoods(id, type) {
      this.$router.push({ name: 'companyPermission', query: { id: id }})
    },
    handleCreate() {
      this.$router.push({ name: 'companyEdit' })
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
      this.$router.push({ name: 'companyInfo', query: { id: item.companyCode || 1 }})
    },
    toEdit(item) {
      this.$router.push({ name: 'companyEdit', query: { id: item.companyCode || 1 }})
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
      getCompanyByPage(this.listQuery).then(response => {
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
<style>
/* .el-table td, .el-table th.is-leaf{
  border-bottom: 0px solid #ebeef5;
}
.el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
      border-right: 0px solid #ebeef5;
} */
.el-dialog {
  margin-top: 10% !important;
}
</style>
