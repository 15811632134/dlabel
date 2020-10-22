<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container .el-input input {
  padding: 0px !important;
  color: #333 !important;
}
// .el-button--medium {
//   padding: 0px !important;
// }
.login-container {
  .labelItem {
    line-height: 22px !important;
  }
  .el-input {
    display: inline-block;
    height: 39px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      caret-color: $cursor;
      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #999;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fafafc;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  .pwdMainLogin {
    margin-top: 40px;
  }
  .phoneLogin {
    margin-top: 40px;
    overflow: hidden;
  }
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    padding: 40px 72px;
    position: absolute;
    width: 500px;
    height: 580px;
    border-radius: 8px;
    top: 19.5%;
    right: 20.83%;
    background-color: #fff;
    max-width: 100%;
    overflow: hidden;
    .el-input {
      color: #333 !important;
      // border-color:#ddd;
      width: 360px;
      border-bottom: 1px solid #ddd;
    }
  }
  @media (max-width: 1400px) {
    .login-form {
      top: 16.57%;
      right: 12.83% !important;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 50px;
    i {
      font-size: 20px;
      color: #333;
    }
    .reg.active {
      float: right;
    }
    .updatePwdText {
      width: 96px;
      height: 33px;
      color: rgba(60, 60, 60, 1);
      font-size: 24px;
      text-align: left;
      margin-top: 34px;

      font-family: PingFangSC-Medium;
    }
    & > div:first-child {
      margin-right: 80px;
    }
    & > div {
      cursor: pointer;
      // color: rgba(102, 102, 102, 1);
      // font-size: 24px;

      // font-family: PingFangSC-Regular;

      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .active {
      margin-top: 0px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFangSC;
      color: rgba(51, 51, 51, 1);
      font-weight: 600;
      .line {
        width: 140px;
        height: 2px;
        background-color: #333;
        margin: 8px auto;
      }
      .linePhone {
        width: 120px;
        height: 2px;
        background-color: #333;
        margin: 8px auto;
      }
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 45px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .show-yzm {
    position: absolute;
    right: 0px;
    top: 5px;
    background-color: #2274e5;
    width: 88px;
    height: 32px;
    line-height: 32px;
    text-align: center;

    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  .logo {
    width: 400px;
    height: 150px;
    img {
      margin: 20px;
      // width: 20.83%;
      // height: 18.52%;
    }
  }
  .loginBtn {
    width: 360px;
    height: 40px;
    // margin-top:89px;
    border-radius: 100px;
    background-color: rgba(34, 116, 229, 1);
    width: 100%;
    border: none;
  }
  .forgetPwd {
    color: rgba(34, 116, 229, 1);
    font-size: 14px;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 16px;
    font-family: PingFangSC-Regular;
  }
  .useProtocol {
    margin-top: 16px;

    font-family: PingFangSC-Regular;
    & > span:nth-child(even) {
      color: rgba(34, 116, 229, 1);
      font-size: 14px;
    }
    & > span:nth-child(odd) {
      color: rgba(102, 102, 102, 1);
      font-size: 14px;
    }
  }
  .loginBack {
    width: 30.33%;
    height: 45.14%;
    margin-left: 10%;
    margin-top: 5%;
  }
  .el-form-item__content > div {
    font-size: 12px;
  }
  .changeLogin {
    width: 70px;
    height: 20px;
    font-size: 14px;
    margin-bottom: 48px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(34, 116, 229, 1);
    line-height: 20px;
  }
  .changeMainLogin {
    margin-bottom: 100px;
  }
  .loginBottom {
    margin-top:100px;
    font-size: 12px;
  }
}
.login-container .el-form-item--medium .el-form-item__content,
.el-form-item--medium .el-form-item__label {
  line-height: 22px;
  height: 22px;
}
.hiddenLogin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.6);
  .reIP_box {
    padding: 40px 63px;
    width: 500px;
    height: 295px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    animation: sport 0.2s ease-out;
    -moz-animation: sport 0.2s ease-out;
    -webkit-animation: sport 0.2s ease-out;
    -o-animation: sport 0.2s ease-out;
  }
  .headIP {
    & > div {
      line-height: 24px;
      margin-left: 14px;
    }
  }
  .ipCode {
    margin-top: 24px;
    width: 300px;
    margin-left: 49px;
    .getIpCode {
      width: 104px;
      height: 32px;
      background: rgba(34, 116, 229, 1);
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      border: none;
      outline: none;
    }
    input {
      padding-left: 16px;
      width: 180px;
      font-size: 12px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
  }
  .ipPhone {
    margin-top: 32px;
    margin-left: 49px;
    input {
      width: 300px;
      font-size: 12px;
      height: 32px;
      padding-left: 16px;
      border-radius: 4px;
      border: 1px solid rgba(153, 153, 153, 1);
    }
  }
  .btnIp {
    margin-top: 48px;
    .cancel {
      width: 80px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border-radius: 16px;
      border: 1px solid rgba(221, 221, 221, 1);

      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 32px;
    }
    .confirm {
      margin-left: 20px;
      text-align: center;
      width: 80px;
      height: 32px;
      background: rgba(34, 116, 229, 1);
      box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
      border-radius: 16px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 32px;
    }
  }
}
</style>
<template>
  <div>
    <div class="login-container">
      <div class="logo">
        <img src="@/assets/img/logo.png" >
      </div>
      <img class="loginBack" src="static/img/undraw_predictive_analytics_kf9n.png" >
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        label-position="left"
      >
        <!-- <div class="title-container">
          <i class="el-icon-back" />
          <div class="updatePwdText">修改密码</div>
        </div>-->
        <div class="title-container m_clearLR">
          <div
            :class="currentIndex==0?'active':''"
            class="loginText m_floatL"
            @click="changeLoginType(0)"
          >
            账户密码登录
            <div class="line"/>
          </div>
        </div>
        <div v-show="currentIndex==0">
          <el-form-item prop="account">
            <input type="text" disabled style="position:absolute;left:10000px;width:0px;height:0px">
            <input type="password" disabled style="position:absolute;left:10000px;width:0px;height:0px">
            <!-- <div class="labelItem">请输入主账号ID</div> -->
            <el-input
              ref="username"
              v-model="loginForm.account"
              placeholder="请输入用户名"
              name="account"
              type="text"
              maxlength="50"
              class="username"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <!-- <div class="labelItem">密码</div> -->
            <input type="text" disabled style="position:absolute;left:10000px;width:0px;height:0px">
            <input type="password" disabled style="position:absolute;left:10000px;width:0px;height:0px">
            <el-input
              ref="password"
              :key="passwordType"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              maxlength="20"
              tabindex="2"
              class="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>-->
          </el-form-item>
          <el-form-item prop="verify_code">
            <!-- <div class="labelItem">验证码</div> -->
            <el-input
              ref="verifyCode"
              v-model="loginForm.verify_code"
              name="verifyCode"
              maxlength="4"
              tabindex="2"
              placeholder="请输入验证码"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <img class="show-yzm yzmImgMain" :src='baseUrl+"/servlet/safecode"' @click="changeCode" >
            <!-- <div class="show-yzm" @click="showPwd">发送验证码</div> -->
          </el-form-item>
        </div>
        <!-- <div class="m_clearLR forgetPwd">
          <div class="m_floatR">更换密码</div>
        </div>-->
        <div class="loginBottom">
          <el-button
            :loading="loading"
            type="primary"
            class="loginBtn"
            @click.native.prevent="handleLogin"
          >确定</el-button>
          <div class="useProtocol">
            <span>登录即同意</span>
            <span><a target="_blank" href="http://dlabel.cn/dlabelUserProtocol.html">《用户使用协议》</a></span>
            <span>和</span>
            <span><a target="_blank" href="http://dlabel.cn/dlabelServerItem.html">《用户隐私协议》</a></span>
          </div>
        </div>
        <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
        </div>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: true,
      currentIndex: 0,
      showIP: false,
      dialogFormVisiblePwd: false,

      loginForm: {
        account: '',
        password: '',
        verify_code: ''
      },

      disable: false,
      tempPwd: {},
      cursor: true,
      tempIP: {
        mobileNo: '',
        smsCode: ''
      },
      loginRules: {
        account: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        verifyCode: [
          { required: true, trigger: 'blur', message: '验证码不能为空' }
        ]
      },
      isMain: true,
      baseUrl: '',
      loading: false,
      getMessageText: '获取验证码',
      passwordType: 'password',
      redirect: undefined,
      test:'123234234qw'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {

    this.baseUrl = process.env.BASE_API
  },
  methods: {
    resetCode() {
      if (this.currentIndex == 0) {
        const yzmImgs = document.querySelectorAll('.yzmImgMain')
        for (var i = 0; i < yzmImgs.length; i++) {
          yzmImgs[i].click()
        }
      } else {
        const yzmImgs = document.querySelectorAll('.yzmImg')
        for (var i = 0; i < yzmImgs.length; i++) {
          yzmImgs[i].click()
        }
      }
    },
    resetPwd() {
      this.getMessageText = '获取验证码'
      this.tempPwd = {
        mobileNo: '',
        smsCode: '',
        newPwd: '',
        reNewPwd: ''
      }
    },
    changeLoginType(index) {
      this.currentIndex = index
    },
    changeCode(e) {
      e.currentTarget.setAttribute(
        'src',
        this.baseUrl+'/servlet/safecode?rd=' + Math.random()
      )
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          var temp = {
            password: this.loginForm.password,
            verify_code: this.loginForm.verify_code,
            account: this.loginForm.account
          }
          var shaObj = new appEncryption(temp.password)
          temp.password = shaObj.getHash()
          this.loading = true
          this.$store.dispatch('LoginByUsername', temp)
            .then((res) => {
              console.log(res)
              this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch(() => {
              this.resetCode()
              this.loading = false
              console.log()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    reset() {
      this.disable = false
      this.cursor = false
      this.getMessageText = '获取验证码'
    }
  }
}
</script>

