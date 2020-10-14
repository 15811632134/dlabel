<style lang="scss">
.companyInfo {
  margin-top: 40px;
  .el-form-item__label{
    text-align: right;
  }
  .el-input--medium .el-input__inner {
    width: 320px;
  }
  .companyAddress {
    input {
      width: 680px !important;
    }
  }
  .el-input--suffix .el-input__inner {
    width: 200px;
  }

  .header {
    width: 322px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #333;
    overflow: hidden;
    border-radius: 4px;
    div {
      cursor: pointer;
      width: 160px;
      height: 38px;
      border-radius: 4px;
      background-color: #fff;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFangSC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    div.active {
      color: #fff;
      background-color: #333;
    }
  }
  .companyForm {
    margin-top: 54px;
  }

  .imgUpload {
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
    border: 1px dotted rgba(0, 0, 0, 1);
    img {
      max-width: 90%;
      max-height: 90%;
      vertical-align: middle;
    }
    i {
      color: #ddd;
      font-size: 45px;
    }
  }
  .threeImg {
    width: 320px;
    height: 200px;
    line-height: 200px;
  }
  .logoText {
    margin-left: 24px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
  .threeText {
    width: 344px;
    height: 80px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-left: 16px;
  }
  .saveBtn {
    width: 160px;
    height: 40px;
    border: 0px;
    outline: 0px;
    // background:rgba(221,221,221,1);
    background-color: rgba(34, 116, 229, 1);
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }
  .stopBtn{
    width:160px;
    height:40px;
    border-radius:24px;
    border:1px solid rgba(51,51,51,1);
    font-size:14px;
    background-color: #fff;
    margin-left:48px;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:20px;
  }
  .shSave{
    width: 160px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 0px;
    outline: 0px;
    margin-top:44px;
    // background:rgba(221,221,221,1);
    background-color: rgba(34, 116, 229, 1);
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .zfbFBox{
    width:1600px;
    .zfbBox{
      width:500px;
      .zfbCheck{
        margin-top:48px;
        margin-bottom: 40px;
      }
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #333;
    border-color: #333;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#666;
  }
}
.el-form-item__label {
  width: 78px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
}
.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  float: right;
}
.el-input--medium .el-input__inner {
  border: 1px solid #333;
  border-radius: 0px;
}
</style>
<template>
  <div class="companyInfo">
    <div class="header m_clearLR">
      <div class="m_floatL" :class="currentIndex==0?'active':''" @click="currentIndex = 0">基本资料</div>
      <div class="m_floatR" :class="currentIndex==1?'active':''" @click="currentIndex = 1">商户资料</div>
    </div>
    <div v-show="currentIndex==1">
     <div class="m_clearLR zfbFBox" >
      <div class="m_floatL zfbBox">
        <div class="zfbCheck"><el-checkbox size="medium" v-model="zfbCheck" disabled>支付宝支付</el-checkbox></div>
        <el-form ref="dataForm" class="zfbForm" :rules="rules"  :model="temp" label-position="right" label-width="100px">
          <el-form-item label="appid" prop="name">
           <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.alipayAppId}}</span>
          </el-form-item>
          <el-form-item label="商户私钥" prop="name">
            <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.alipayPrivateKey}}</span>
          </el-form-item>
          <el-form-item label="商户公钥" prop="name">
            <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.alipayBusinessPublicKey}}</span>
          </el-form-item>
          <el-form-item label="支付宝公钥" prop="name">
            <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.alipayPublicKey}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="m_floatL zfbBox">
        <div class="zfbCheck"><el-checkbox size="medium" v-model="wxCheck" disabled>微信支付</el-checkbox></div>
        <el-form ref="dataForm" class="zfbForm" :rules="rules" :model="temp" label-position="right" label-width="100px">
          <el-form-item label="appid" prop="name">
           <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.wechatAppId}}</span>
          </el-form-item>
          <el-form-item label="appkey" prop="name">
            <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.wechatMchId}}</span>
          </el-form-item>
          <el-form-item label="mchid" prop="name">
            <span>{{ruleForm.mallCompanyPayConfig&&ruleForm.mallCompanyPayConfig.wechatSecretKey}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>

    </div>
    <el-form
      :model="ruleForm"
      v-show="currentIndex==0"
      ref="ruleForm"
      label-width="150px"
      class="companyForm"
    >
      <el-form-item label="公司名称:" prop="name">
        <span>{{ruleForm.fullName}}</span>
      </el-form-item>
      <el-form-item label="公司简称:" prop="name">
        <span>{{ruleForm.shortName}}</span>
      </el-form-item>

      <el-form-item label="联系人:" prop="name">
        <span>{{ruleForm.contactName}}</span>
      </el-form-item>
      <el-form-item label="联系电话:" prop="name">
        <div class="m_clearLR">
          <div class="m_floatL">
            <span>{{ruleForm.contactPhone}}</span>
          </div>
          <div class="m_floatL m_clearLR" style="margin-left:64px;">
            <div style="margin-right:16px;color:#666;" class="m_floatL">固定电话:</div>
            <div class="m_floatL">
              <span>{{ruleForm.fixedTelephone}}</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="邮箱:" prop="name">
        <span>{{ruleForm.contactEmail}}</span>
      </el-form-item>

      <el-form-item label="公司Logo:" prop="name">
        <div class="m_clearLR">
          <div class="m_floatL">
            <div class="imgUpload" @click="logoChange">
              <i v-if="!temp.logoImg" class="iconfont icontupian"></i>
              <img :src="temp.logoImg" v-else />
              <input disabled
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
                @change="uploadImgLogo"
              />
            </div>
          </div>
          <div class="m_floatL logoText">文件格式jpeg、jpg、png、文件大小限制2M,图像比例1:1</div>
        </div>
      </el-form-item>
      <el-form-item label="统一社会信用代码:" prop="name">
        <span>{{ruleForm.organizationCode}}</span>
      </el-form-item>
      <el-form-item label="公司营业执照:" prop="name">
        <div class="m_clearLR">
          <div class="m_floatL">
            <div class="imgUpload threeImg" @click="threeChange">
              <i class="iconfont icontupian" v-if="!temp.threeImg"></i>
              <img :src="temp.threeImg" v-else />
              <input
              disabled
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
                @change="uploadImgThree"
              />
            </div>
          </div>
          <div
            class="m_floatL threeText"
          >上传最新版公司营业执照营业执照清晰正面照，图片将用于识别，请确保完整清晰，仅支持大陆工商颁布的营业执照，请确认证件在有效期内。 如提供不正规营业执照或其他图片，将无法识别。</div>
        </div>
      </el-form-item>
      <el-form-item label="公司地址:" prop="name">
        <div class="linkage">
          <el-select v-model="ruleForm.provinceCode" @change="choseProvince" placeholder="省级地区" disabled>
            <el-option v-for="item in getPro" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="ruleForm.cityCode" @change="choseCity" placeholder="市级地区" disabled>
            <el-option v-for="item in getshi1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="ruleForm.areaCode" @change="choseBlock" placeholder="区级地区" disabled>
            <el-option v-for="item in qu1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="详细地址:" prop="name">
        <span>{{ruleForm.address}}</span>
      </el-form-item>
      <el-form-item label="协议上传:" prop="name">
        <div class="m_clearLR">
          <div class="m_floatL">
            <div class="imgUpload threeImg" @click="serverChange">
              <i class="iconfont icontupian" v-if="!temp.serverImg"></i>
              <img :src="temp.serverImg" v-else />
              <input disabled
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
                @change="uploadImgServer"
              />
            </div>
          </div>
          <div class="m_floatL threeText">
            下载填写
            <span class="colorBlue">《友商盖章协议》</span>，并加盖公章，上传清晰无残缺加盖公章的公函扫描件。
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(1)" class="saveBtn" :disabled="companyStatus == 1" v-show="permissionData.indexOf('super_company_status')!=-1">启用</el-button>
        <el-button type="primary" @click="submitForm(0)" class="stopBtn" :disabled="companyStatus == 0" v-show="permissionData.indexOf('super_company_status')!=-1">禁用</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="启用生成公司主账号" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="90px">
        <el-form-item label="主账户" prop="name">
          <div class="m_clearLR deliver">

            <el-input
              class="m_floatL"
              v-model="account"
              placeholder="请输入"
              maxlength="10"
            />
            <!-- <el-input class="m_floatL" v-show="dialogStatus=='create'" v-model="temp.name" placeholder="请输入" maxlength="20" name="all_name" /> -->

          </div>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="tableCancel" @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          class="tableConfirm"
          type="primary"
          @click="makeOpen()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios";
import test from "../../assets/json/map.json";
import {
  getCompanyInfo,updateCompanyStatus
} from "@/api/api";
export default {
  computed: {
    ...mapGetters([
      'permissionData'

    ]),
    getPro() {
      return this.province;
    },
    gequ1() {
      return this.qu1;
    },
    getshi1() {
      return this.shi1;
    },
    companyStatusCalc(){
      return this.companyStatus
    }



  },
  created() {
    this.ruleForm.id = this.$route.query.id;
    this.updateIcon();
    this.getCityData();

  },
  data() {
    return {
      account:"",
      dialogFormVisible:false,
      companyStatus: 0,
      currentIndex: 0,
      mapJson: "../../assets/json/map.json",
      province: [],
      sheng: "",
      shi: "",
      shi1: [],
      temp: {
        logoImg: "",
        threeImg: "",
        serverImg: ""
      },
      qu: "",
      qu1: [],
      city: "",
      block: "",
      zfbCheck:false,
      wxCheck:false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCompanyInfo(id){
      getCompanyInfo({id:id}).then(res=>{
        if (res.code == 100) {
          this.ruleForm = res.data;
          this.companyStatus = this.ruleForm.status;
            this.ruleForm.provinceCode =  res.data.provinceCode+'';
            this.choseProvince(this.ruleForm.provinceCode)
            this.ruleForm.cityCode =  res.data.cityCode+'';
            this.choseCity(this.ruleForm.cityCode)
            this.ruleForm.areaCode =  res.data.areaCode+'';
          this.temp.logoImg = res.data.logoImage.sourceUrl;
          this.temp.threeImg = res.data.licenseImage.sourceUrl;
          this.temp.serverImg = res.data.agreementImage.sourceUrl;
            if(res.data.mallCompanyPayConfig.aliCheck == 1){
              this.zfbCheck = true;
            }
            if(res.data.mallCompanyPayConfig.wxCheck == 1){
              this.wxCheck = true;
            }
        }
      })
    },

    logoChange(e) {
      e.currentTarget.querySelector("input").click();
    },
    threeChange(e) {
      e.currentTarget.querySelector("input").click();
    },
    serverChange(e) {
      e.currentTarget.querySelector("input").click();
    },
    uploadImgLogo(e) {
      this.temp.logoImg = this.getObjectURL(e.target.files[0]);
      console.log(this.temp.logoImg);
    },
    uploadImgThree(e) {
      this.temp.threeImg = this.getObjectURL(e.target.files[0]);
      console.log(this.temp.threeImg);
    },
    uploadImgServer(e) {
      this.temp.serverImg = this.getObjectURL(e.target.files[0]);
      console.log(this.temp.serverImg);
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    updateIcon() {
      setTimeout(() => {
        console.log(document.querySelector(".el-input__suffix-inner"));
        var inputs = document.querySelectorAll(".el-input__suffix-inner");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].innerHTML =
            '<i class="el-select__caret el-input__icon el-icon-arrow-up iconfont iconxialaxuanxiang2"></i>';
        }
      }, 1);
    },
    submitForm(status) {
      if(!this.ruleForm.staffId){
        this.dialogFormVisible = true;
        this.account = this.ruleForm.shortName;
      }else{
        updateCompanyStatus({id:this.ruleForm.id,status:status}).then(res=>{
          if (res.code == 100) {

          this.companyStatus = status;

          setTimeout(() => {

    }, 2000);

              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000
              });
          }
        })
      }

    },
    makeOpen(){
        updateCompanyStatus({id:this.ruleForm.id,status:1,account:this.account}).then(res=>{
          if (res.code == 100) {
            this.ruleForm = res.data;
          this.companyStatus = 1;
           setTimeout(() => {
    }, 2000);
        this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000
              });
          }
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getCityData() {
      var that = this;
      var data = test;
      that.province = [];
      that.city = [];
      that.block = [];
      // 省市区数据分类
      for (var item in data) {
        if (item.match(/0000$/)) {
          //省
          that.province.push({ id: item, value: data[item], children: [] });
        } else if (item.match(/00$/)) {
          //市
          that.city.push({ id: item, value: data[item], children: [] });
        } else {
          //区
          that.block.push({ id: item, value: data[item] });
        }
      }
      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (
            that.province[index].id.slice(0, 2) ===
            that.city[index1].id.slice(0, 2)
          ) {
            that.province[index].children.push(that.city[index1]);
          }
        }
      }
      // 分类区级
      for (var item1 in that.city) {
        for (var item2 in that.block) {
          if (
            that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)
          ) {
            that.city[item1].children.push(that.block[item2]);
          }
        }
      }

      this.getCompanyInfo(this.ruleForm.id);
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.shi1) {
        if (e === this.shi1[index3].id) {
          this.qu1 = this.shi1[index3].children;
          this.qu = this.shi1[index3].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e;
      // console.log(this.E)
    }
  }
};
</script>


