<template>
  <div class="navbar">
    <breadcrumb class="breadcrumb-container" />
    <div v-show="showUser" class="hiddenBox" @click="showUser = false"/>
    <div class="right-menu" @click="showUser=!showUser">
      <div class="avatar-container">
        <div class="avatar-wrapper" >
          <div class="username">{{userName}}</div>
          <i class="el-icon-caret-bottom" />
          <ul v-show="showUser" class="userUl">
            <li @click="openEditPwd">修改密码</li>
            <!-- <li @click="openEditPhone">修改手机号</li>  -->
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="修改手机号" class="dialog" width="500px">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="密码" prop="name">
          <el-input v-model="temp.password" placeholder="请输入" type="password" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input v-model="temp.mobileNo" placeholder="请输入" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item label="验证码" prop="name">
          <div class="m_clearLR getCodeBox">
            <el-input v-model="temp.smsCode" class="m_floatL getCodeInput" placeholder="请输入" maxlength="20" name="all_name" />
            <el-button :disabled="disable" :class="{'cursor':cursor}" class="m_floatL getCode" @click="getCode(temp.mobileNo)">{{ getMessageText }}</el-button>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateData()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisiblePwd" title="修改密码" class="dialog" width="500px">
      <el-form ref="dataForm" :model="tempPwd" label-position="right" label-width="90px">

        <!-- <el-form-item label="手机号码" prop="name">
          <el-input v-model="tempPwd.mobileNo" placeholder="请输入" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item label="验证码" prop="name">
          <div class="m_clearLR getCodeBox">
            <el-input v-model="tempPwd.smsCode" class="m_floatL getCodeInput" placeholder="请输入" maxlength="20" name="all_name" />
            <el-button :disabled="disable" :class="{'cursor':cursor}" class="m_floatL getCode" @click="getCode(tempPwd.mobileNo)">{{ getMessageText }}</el-button>
          </div>
        </el-form-item> -->
        <el-form-item label="原始密码" prop="name">
          <el-input v-model="tempPwd.oldPassword" placeholder="请输入" type="password" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item label="新密码" prop="name">
          <el-input v-model="tempPwd.newPassword" placeholder="请输入" type="password" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="name">
          <el-input v-model="tempPwd.renewPassword" placeholder="请输入" type="password" maxlength="20" name="all_name" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="dialogFormVisiblePwd = false">取消</el-button>
          <el-button type="primary" @click="updatePwd()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagsView from './TagsView'
import { getCode, reset_old_pwd } from '@/api/api'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    TagsView
  },
  data() {
    return {
      showUser: false,
      dialogStatus: '',
      temp: {},
      cursor: true,
      disable: false,
      tempPwd: {},
      getMessageText: '获取验证码',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      dialogFormVisible: false,
      dialogFormVisiblePwd: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userName'
    ])
  },
  created() {
    // this.resetQ()
  },
  methods: {
    updatePwd() {
      if (this.tempPwd.newPassword === this.tempPwd.renewPassword) {
        reset_old_pwd({
          newPassword:this.tempPwd.renewPassword,
          oldPassword:this.tempPwd.oldPassword
        }).then(res => {
          this.dialogFormVisiblePwd = false
          this.$message.success('修改成功')
        })
      } else {
        this.$message.error('两次密码必须一致!')
      }
    },
    updateData() {
      // changePhone(this.temp).then(res => {
      //   this.dialogFormVisiblePwd = false

      //   this.$message.success('修改成功')
      // })
    },
    getCode(phone) {
      var that = this
      getCode({ phone: phone, src: 3 }).then(res => {
        var countdown = 60
        function settime() {
          if (countdown === 0) {
            that.getMessageText = '获取验证码'
            that.disable = false
            that.cursor = false
            clearInterval(loginTime)
          } else {
            that.getMessageText = countdown + '秒'
            countdown--
            that.disable = true
            that.cursor = true
          }
        }
        var loginTime = setInterval(() => {
          settime()
        }, 1000)
      })
    },
    resetTemp() {
      this.getMessageText = '获取验证码'
      this.temp = {
        mobileNo: '',
        smsCode: '',
        password: ''
      }
    },
    resetPwd() {
      this.getMessageText = '获取验证码'
      this.tempPwd = {
        newPassword: '',
        oldPassword: '',
        renewPassword: ''
      }
    },
    resetQ() {
      this.listQuery = {
        pageNo: 1,
        pageSize: 10,
        account: '',
        realName: '',
        phone: '',
        status: ''
      }
    },
    openEditPwd() {
      this.resetPwd()
      this.dialogFormVisiblePwd = true
    },
    openEditPhone() {
      this.resetTemp()
      this.dialogFormVisible = true
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('logout')
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.getCodeBox .getCode{
  width:100px;
  height:36px;
  border:none;
  margin-left:16px;
  text-align: center;
  background:rgba(34,116,229,1);
  border-radius:4px;

  font-size:12px;
  font-family:PingFangSC-Regular,PingFangSC;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.getCodeBox .getCodeInput{
  width:184px !important;
  height:36px;
}
.getCodeBox .getCodeInput input{
  width:100% !important;

}
.login-container .el-form-item__content .username input{
  width:360px !important;
  border-radius: 4px !important;
}
.login-container .el-form-item__content .password input{
  width:360px !important;
  padding-left:10px;
  border-radius: 4px !important;

}
// .login-container .el-form-item__content .el-input input:-webkit-autofill{
//   -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
//   box-shadow: 0 0 0px 1000px transparent inset !important;
//   -webkit-text-fill-color: #333 !important
// }
.user-dropdown{
  top:37px !important;
  overflow: hidden;
}

.navbar {
  height: 50px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .userUl{
    width:150px;
    top:45px;
    position: absolute;
    background-color: #333;
    border-radius: 4px;
    padding:0;
    z-index: 10000;
    overflow: hidden;
    li{
      text-align: center;
      height:42px;
      line-height: 42px;
      list-style: none;
      color:#fff;
      font-size:14px;
      &:hover{
        background-color: #2274E5;
      }
    }

  }
  .myTagView{
    max-width:calc(80% - 10%);
    margin:8px;
     margin-left:5%;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        margin-right: 115px;
        position: relative;
        .username{
          width:100px;
          text-align: right;
          font-size:16px;
        }
        i{
          color:#2274E5 !important;
          font-size:18px !important;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right:-40px;
          top: 14px;
          color:#333;
          font-size:14px;
        }
      }
    }
  }
}
</style>
