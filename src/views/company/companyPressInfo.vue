<style lang="scss">
.createCompany {
  margin-top: 40px;
  .saleDiv{
    word-break: break-all;
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
    background: #fff;
    margin-left:40px;
    padding: 40px 48px;
  }
  textarea{
    width:680px;
    height:56px;
    padding:8px 15px;
    font-size:12px;
    resize:none;
    border:1px solid #dcdfe6;
    border-radius: 0px;
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
    border: 0px;
    outline: 0px;
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);

    width:160px;
    height:40px;
    background:rgba(34,116,229,1);
    box-shadow:0px 10px 20px 0px rgba(0,134,255,0.21);
    border-radius:4px;
  }
  .saveBtnDis {
    border: 0px;
    outline: 0px;
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color:rgba(51,51,51,1);
    width:160px;
    height:40px;
    background:#fff;
    border-radius:4px;
    border:1px solid rgba(153,153,153,1);

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
  .zfbBox{
    .zfbCheck{
      margin-top:48px;
      margin-bottom: 40px;
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
  // text-align: center;
}
.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  float: right;
}
.companyCheck{
  position: absolute;
  top:0px;
  left:-120px;
}
</style>
<template>
  <div class="createCompany">
    <el-form
      :model="ruleForm"
      :rules="rules"
      v-show="currentIndex==0"
      ref="ruleForm"
      label-width="180px"
      class="companyForm"
    >
      <el-form-item label="公司名称" prop="fullName">
        <el-checkbox class="companyCheck" v-show="noPress" v-model="fullNameCheck"></el-checkbox>
        <textarea
          placeholder="请输入"
          v-model="ruleForm.fullName"
        ></textarea>
      </el-form-item>
      <el-form-item label="公司简称" prop="shortName">
        <el-input v-model="ruleForm.shortName"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="ruleForm.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="contactPhone">
        <el-checkbox class="companyCheck" v-show="noPress" v-model="phoneCheck"></el-checkbox>
        <div class="m_clearLR">
          <div class="m_floatL">
            <el-input v-model="ruleForm.contactPhone"></el-input>
          </div>
          <!-- <div class="m_floatL m_clearLR" style="margin-left:64px;">
            <div style="margin-right:16px;color:#666;" class="m_floatL">固定电话:</div>
            <div class="m_floatL">
              <el-input v-model="ruleForm.fixedTelephone"></el-input>
            </div>
          </div> -->
        </div>
      </el-form-item>
      <el-form-item label="邮箱" prop="contactEmail">
        <el-input v-model="ruleForm.contactEmail"></el-input>
      </el-form-item>
      <el-form-item label="近三年平均年营业额" prop="contactEmail">
        <!-- <el-select v-model="ruleForm.turnover" @change="choseBlock" placeholder="区级地区">
            <el-option v-for="(item,index) in turnoverArr" :key="index" :label="item" :value="item"></el-option>
          </el-select> -->
        <span>{{ruleForm.turnover}}</span>
      </el-form-item>
      <el-form-item label="正在销售的打印硬件品牌" prop="contactEmail">
        <div class="saleDiv">{{ruleForm.saleLabelBrand}}</div>
        <!-- <el-input v-model="ruleForm.saleLabelBrand" placeholder="请输入正在销售的打印硬件品牌"></el-input> -->
      </el-form-item>
      <el-form-item label="合作意向描述" prop="contactEmail">
        <div class="saleDiv">{{ruleForm.cooperIntention}}</div>
        <!-- <el-input v-model="ruleForm.cooperIntention" placeholder="请输入合作意向描述"></el-input> -->
      </el-form-item>
      <el-form-item label="公司Logo" >
        <div class="m_clearLR">
          <div class="m_floatL">
            <div class="imgUpload" >
              <i v-if="!temp.logoImg" class="iconfont icontupian"></i>
              <img :src="temp.logoImg" v-else />
              <input
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
              />
            </div>
          </div>
          <div class="m_floatL logoText">文件格式jpeg、jpg、png、文件大小限制2M,图像比例1:1</div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="统一社会信用代码" >
        <el-checkbox class="companyCheck" v-show="noPress" v-model="codeCheck"></el-checkbox>
        <el-input v-model="ruleForm.organizationCode"></el-input>
      </el-form-item> -->
      <el-form-item label="公司营业执照">
        <el-checkbox class="companyCheck" v-show="noPress" v-model="threeCheck"></el-checkbox>
        <div class="m_clearLR">
          <div class="m_floatL imgHiddenDiv">
            <div class="imgUpload threeImg" >
              <i class="iconfont icontupian" v-if="!temp.threeImg"></i>
              <img :src="temp.threeImg" v-else />
              <input
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
              />
            </div>
            <div class="imgHiddenBox" v-if="temp.threeImg">
              <svg t="1572834051347" class="icon threei1" :class="ruleForm.applyStatus == 3?'threei3':''" @click="openImg(temp.threeImg)" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1836" width="32" height="32"><path d="M483.027256 868.173913a422.956522 422.956522 0 1 0 0-845.913043 422.956522 422.956522 0 0 0 0 845.913043z m0-44.521739a378.434783 378.434783 0 1 1 0-756.869565 378.434783 378.434783 0 0 1 0 756.869565z" fill="#FFFFFF" p-id="1837"></path><path d="M673.371564 782.738317m15.463699-16.013129l0 0q15.463699-16.013129 31.476829-0.54943l224.183813 216.491791q16.013129 15.463699 0.54943 31.476829l0 0q-15.463699 16.013129-31.476829 0.54943l-224.183813-216.491792q-16.013129-15.463699-0.54943-31.476828Z" fill="#FFFFFF" p-id="1838"></path><path d="M260.41856 422.956522m22.26087 0l400.695652 0q22.26087 0 22.260869 22.260869l0 0q0 22.26087-22.260869 22.26087l-400.695652 0q-22.26087 0-22.26087-22.26087l0 0q0-22.26087 22.26087-22.260869Z" fill="#FFFFFF" p-id="1839"></path><path d="M505.288125 222.608696m0 22.260869l0 400.695652q0 22.26087-22.260869 22.26087l0 0q-22.26087 0-22.26087-22.26087l0-400.695652q0-22.26087 22.26087-22.260869l0 0q22.26087 0 22.260869 22.260869Z" fill="#FFFFFF" p-id="1840"></path></svg>
              <svg t="1572833416147" class="icon threei2" v-if="ruleForm.applyStatus != 3" @click="deleteImg('threeImg')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7815" width="32" height="32"><path d="M381.952 24.380952h260.096a97.52381 97.52381 0 0 1 97.52381 97.52381v130.048H284.42819V121.904762a97.52381 97.52381 0 0 1 97.52381-97.52381z m308.857905 97.52381a48.761905 48.761905 0 0 0-48.761905-48.761905H381.952a48.761905 48.761905 0 0 0-48.761905 48.761905v81.286095h357.61981V121.904762z" fill="#ffffff" p-id="7816"></path><path d="M113.761524 195.047619h796.476952l-64.365714 707.730286a97.52381 97.52381 0 0 1-97.133714 88.746666H273.944381a97.52381 97.52381 0 0 1-97.133714-88.892952L113.761524 195.047619z m53.296762 48.761905l58.319238 654.482286a48.761905 48.761905 0 0 0 48.566857 44.422095h474.794667a48.761905 48.761905 0 0 0 48.566857-44.373334L856.746667 243.809524H167.107048z" fill="#ffffff" p-id="7817"></path><path d="M52.809143 195.047619h918.381714a24.380952 24.380952 0 0 1 24.380953 24.380952v8.143239a24.380952 24.380952 0 0 1-24.380953 24.380952H52.809143a24.380952 24.380952 0 0 1-24.380953-24.380952V219.428571a24.380952 24.380952 0 0 1 24.380953-24.380952zM327.92381 337.627429a28.42819 28.42819 0 0 1 29.891047 26.916571l23.844572 454.460952a28.42819 28.42819 0 1 1-56.807619 2.974477l-23.844572-454.460953a28.42819 28.42819 0 0 1 26.916572-29.891047zM512 337.286095c15.701333 0 28.42819 12.678095 28.42819 28.428191v455.094857a28.42819 28.42819 0 1 1-56.85638 0V365.714286c0-15.701333 12.678095-28.42819 28.42819-28.428191zM700.513524 337.92a28.42819 28.42819 0 0 1 26.38019 30.329905l-31.695238 453.973333a28.42819 28.42819 0 1 1-56.758857-3.900952l31.695238-454.022096a28.42819 28.42819 0 0 1 30.378667-26.428952z" fill="#ffffff" p-id="7818"></path></svg>
            </div>
          </div>
          <div
            class="m_floatL threeText"
          >上传最新版公司营业执照营业执照清晰正面照，图片将用于识别，请确保完整清晰，仅支持大陆工商颁布的营业执照，请确认证件在有效期内。 如提供不正规营业执照或其他图片，将无法识别。</div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="公司地址" >
        <div class="linkage">
          <el-select v-model="ruleForm.provinceCode" @change="choseProvince" placeholder="省级地区">
            <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="calcRuleForm.cityCode" @change="choseCity" placeholder="市级地区">
            <el-option v-for="item in shi1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="calcRuleForm.areaCode" @change="choseBlock" placeholder="区级地区">
            <el-option v-for="item in qu1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </el-form-item> -->
      <el-form-item label="公司地址">
        <el-input v-model="ruleForm.address" class="companyAddress"></el-input>
      </el-form-item>
      <!-- <el-form-item label="协议上传">
        <div class="m_clearLR">
          <div class="m_floatL">
            <div class="imgUpload threeImg" >
              <i class="iconfont icontupian" v-if="!temp.serverImg"></i>
              <img :src="temp.serverImg" v-else />
              <input
                type="file"
                style="display:none"
                class="uploadImg"
                multiple
              />
            </div>
          </div>
          <div class="m_floatL threeText">
            下载填写
            <span class="colorBlue"><a href="https://fileimage.ctaiot.com/dlabel/deal/%E5%8F%8B%E5%95%86%E7%9B%96%E7%AB%A0%E5%8D%8F%E8%AE%AE.docx">《友商盖章协议》</a></span>，并加盖公章，上传清晰无残缺加盖公章的公函扫描件。
          </div>
        </div>
      </el-form-item> -->
      <el-form-item v-if="noPress">
        <el-button type="primary" @click="saveNoPress" class="saveBtn m_search">保存</el-button>
        <div>备注：选中项需要友商重新录入</div>
      </el-form-item>
      <el-form-item v-else>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="saveBtn">保存</el-button> -->
        <el-button type="primary" @click="openEnable" v-show="permissionData.indexOf('company_manage_enable_executable')!=-1" class="saveBtn m_search">启用</el-button>
        <el-button type="primary" @click="saveCompany(0)" v-show="permissionData.indexOf('company_manage_enable_executable')!=-1" style="margin-left:48px" class="saveBtnDis">禁用</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :close-on-click-modal='false' :visible.sync="visibile" :title="title" class="dialog classifydialog" width="500px">
      <el-form
        ref="ruleClassifyForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="主账号" prop="name" style="width:400px;">
          <el-input v-model="ruleForm.shortName" placeholder="限制10个字符" maxlength="10" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="visibile = false">取消</el-button>
          <el-button type="primary" @click="submitFormSuccess">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="showImage" v-show="showImgPath" @click="hiddenImage">
      <img :src="imgPath"  class="magnifier" >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from "axios";
import test from "../../assets/json/map.json";
import {
  saveCompanyBase,uploadPic ,getCompanyInfo , company_apply_refuse_save ,
  company_apply_success_save,enable_company_save
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
    calcRuleForm(){
      if(this.ruleForm.cityCode)
      this.ruleForm.cityCode = this.ruleForm.cityCode + ''
      if(this.ruleForm.areaCode)
      this.ruleForm.areaCode = this.ruleForm.areaCode + ''
      return  this.ruleForm
    }



  },
  created() {

    console.log(test);
    this.updateIcon();
    this.getCityData();
  },
  data() {
    return {
      fullNameCheck:false,
      codeCheck:false,
      phoneCheck:false,
      threeCheck:false,
      noPress:false,
      zfbTemp:[],
      wxTemp:[],
      configForm:[],
      loading:'',
      zfbCheck:false,
      mainAccount:{shortName:''},
      wxCheck:false,
      aliCheck:0,
      wechatCheck:0,
      title:'设置主账号',
      currentIndex: 0,
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
      ruleForm: {
        name: "",
        region: "",
        provinceCode:'',
        date1: "",
        date2: "",
        turnover:'小于500W',
        sale_label_brand:'',
        cooper_intention:'',
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      aliRules:{
        alipayAppId: [
          { required: true, message: "请输入支付宝appId", trigger: "blur" }
        ],
        alipayPrivateKey: [
          { required: true, message: "请输入支付宝商户私钥", trigger: "blur" }
        ],
        alipayPublicKey: [
          { required: true, message: "请输入支付宝公钥", trigger: "blur" }
        ],
        alipayBusinessPublicKey: [
          { required: true, message: "请输入支付宝商户公钥", trigger: "blur" }
        ]
      },
      wxRules:{
        wechatAppId: [
          { required: true, message: "请输入微信appId", trigger: "blur" }
        ],
        wechatMchId: [
          { required: true, message: "请输入微信商户号", trigger: "blur" }
        ],
        wechatSecretKey: [
          { required: true, message: "请输入微信appkey", trigger: "blur" }
        ]
      },
      rules: {
        fullName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 50 个字符以内", trigger: "blur" }
        ],
        shortName: [
          { required: true, message: "请输入公司简称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 50 个字符以内", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 15 个字符以内", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }
        ],
        contactEmail: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入公司地址", trigger: "blur" },
          { min: 1, max: 100, message: "长度在 100 个字符以内", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      visibile:false,
      imgPath:'',
      showImgPath:'',
    };
  },
  methods: {
    hiddenImage(){
      this.showImgPath = false
    },
    openImg(url){
      this.imgPath = url
      this.showImgPath = true
      // window.open(url,'_blank')
    },
    openLoading() {
        this.loading = this.$loading({
          lock: true,
          text: '正在保存中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }
    ,
    openEnable(){
      if(this.ruleForm.status==0){
        this.visibile = true
      }else{
        this.saveCompany(1)
      }
    },
    saveCompany(type){
      var temp = {company_code:this.ruleForm.companyCode,enable:type}
      if(this.ruleForm.status==0){
        temp.short_name = this.ruleForm.shortName
      }
      this.openLoading()
      enable_company_save(temp).then(res=>{
        if(res.code==100){
          if(type==1){
            this.$message({
              showClose: true,
              message: '启用成功',
              type: 'success'
            })
          }else{
            this.$message({
              showClose: true,
              message: '禁用成功',
              type: 'success'
            })
          }
          this.loading.close();

          this.ruleForm.status = 1

          this.visibile = false
          this.$router.push({name:'companyPressList'})
        }
      }).catch(error=>{
              this.loading.close();
            });
    },
    saveNoPress(){

      var temp ={
        company_code: this.ruleForm.companyCode,
        apply_remark:[]
      }
      if(this.fullNameCheck){
        var obj = {
          "desc": "公司全名",
          "item": "fullName"
        }
       temp.apply_remark.push(obj)

      }
      if(this.phoneCheck){
        var obj = {
          "desc": "联系电话",
          "item": "contactPhone"
        }
       temp.apply_remark.push(obj)
      }
      if(this.codeCheck){
        var obj = {
          "desc": "统一社会信用代码",
          "item": "organizationCode"
        }
       temp.apply_remark.push(obj)
      }
      if(this.threeCheck){
        var obj = {
          "desc": "公司营业执照",
          "item": "imageBusinessPhoto"
        }
       temp.apply_remark.push(obj)
      }
      temp.apply_remark = JSON.stringify(temp.apply_remark)
      company_apply_refuse_save(temp).then(res=>{
        if (res.code == 100) {
          this.$message.success('已拒绝!')
        }
      })
    },
    submitFormSuccess(){
      this.saveCompany(1)
    },
    submitFormFaild(){

    },
    getCompanyInfo(id){
      getCompanyInfo({company_code:id}).then(res=>{
        if (res.code == 100) {
            this.ruleForm = res.data;
            // this.ruleForm.provinceCode =  res.data.provinceCode+'';
            // this.choseProvince(this.ruleForm.provinceCode)
            // this.ruleForm.cityCode =  res.data.cityCode+'';
            // this.choseCity(this.ruleForm.cityCode)
            // this.ruleForm.areaCode =  res.data.areaCode+'';
            this.temp.sale_label_brand = res.data.saleLabelBrand;
            this.temp.cooper_intention = res.data.cooperIntention;
            this.temp.logoImg = res.data.imageLogo&&res.data.imageLogo.sourceUrl;
            this.temp.threeImg = res.data.imageBusinessPhoto&&res.data.imageBusinessPhoto.sourceUrl;
            // this.temp.serverImg = res.data.imageDealPhoto.sourceUrl;
            // this.configForm.id = res.data.mallCompanyPayConfig.id;
            // this.wechatCheck = res.data.mallCompanyPayConfig.wxCheck;
            // this.aliCheck = res.data.mallCompanyPayConfig.aliCheck;
            // if(res.data.mallCompanyPayConfig.aliCheck == 1){
            //   this.zfbCheck = true;
            // }
            // if(res.data.mallCompanyPayConfig.wxCheck == 1){
            //   this.wxCheck = true;
            // }
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
      let formData = new FormData()
      formData.append('fileData',e.target.files[0])
      uploadPic(formData,9).then(res=>{
        if (res.code == 100) {
          this.ruleForm.imageLogo.id = res.data.id;
        }
      })
      this.temp.logoImg = this.getObjectURL(e.target.files[0]);
    },
    uploadImgThree(e) {
      let formData = new FormData()
      formData.append('fileData',e.target.files[0])
      uploadPic(formData,10).then(res=>{
        if (res.code == 100) {
          this.ruleForm.imageBusinessPhoto.id = res.data.id;
        }
      })
      this.temp.threeImg = this.getObjectURL(e.target.files[0]);
    },
    uploadImgServer(e) {
      let formData = new FormData()
      formData.append('fileData',e.target.files[0])
      uploadPic(formData,10).then(res=>{
        if (res.code == 100) {
          this.ruleForm.imageDealPhoto.id = res.data.id;
        }
      })
      this.temp.serverImg = this.getObjectURL(e.target.files[0]);
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
      // setTimeout(() => {
      //   console.log(document.querySelector(".el-input__suffix-inner"));
      //   var inputs = document.querySelectorAll(".el-input__suffix-inner");
      //   for (var i = 0; i < inputs.length; i++) {
      //     inputs[i].innerHTML =
      //       '<i class="el-select__caret el-input__icon el-icon-arrow-up iconfont iconxialaxuanxiang"></i>';
      //   }
      // }, 1);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           let temp = {
             company_code:this.ruleForm.companyCode,
             full_name:this.ruleForm.fullName,
             short_name:this.ruleForm.shortName,
             fixed_telephone:this.ruleForm.fixedTelephone,
             contact_email:this.ruleForm.contactEmail,
             contact_phone:this.ruleForm.contactPhone,
             image_logo_id:this.ruleForm.imageLogo.id,
             image_business_photo_id:this.ruleForm.imageBusinessPhoto.id,
             image_deal_photo_id:this.ruleForm.imageDealPhoto.id,
             organization_code:this.ruleForm.organizationCode,
             province_code:this.ruleForm.provinceCode,
             city_code:this.ruleForm.cityCode,
             area_code:this.ruleForm.areaCode,
             address:this.ruleForm.address,
           }
           saveCompanyBase(temp).then(res => {
            if (res.code == 100) {
              this.ruleForm.id = res.data.id;
              this.configForm.companyId = res.data.id;
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getCityData () {
      var that = this;
      var data = test;
      that.province = [];
      that.city = [];
      that.block = [];
      // 省市区数据分类
      // for (var item in data) {
      //   if (item.match(/0000$/)) {
      //     //省
      //     that.province.push({ id: item, value: data[item], child: [] });

      //   } else if (item.match(/00$/)) {
      //     //市
      //     that.city.push({ id: item, value: data[item], child: [] });
      //   } else {
      //     //区
      //     that.block.push({ id: item, value: data[item] });
      //   }
      // }
      // console.log(that.province)
      // // 分类市级
      // for (var index in that.province) {
      //   for (var index1 in that.city) {
      //     if (
      //       that.province[index].id.slice(0, 2) ===
      //       that.city[index1].id.slice(0, 2)
      //     ) {
      //       that.province[index].child.push(that.city[index1]);
      //     }
      //   }
      // }
      // // 分类区级
      // for (var item1 in that.city) {
      //   for (var item2 in that.block) {
      //     if (
      //       that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)
      //     ) {
      //       that.city[item1].child.push(that.block[item2]);
      //     }
      //   }
      // }
      for(var i = 0 ; i < data.length ; i ++){
        this.province.push(data[i])
      }
      this.shi1 = this.province[0].child
      this.qu1 = this.province[0].child[0].child
       this.ruleForm.id = this.$route.query.id;
            this.configForm.companyId = this.$route.query.id;
        if(this.ruleForm.id){
          this.getCompanyInfo(this.ruleForm.id);
        }

    },
    // 选省
    choseProvince(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].child;
          this.ruleForm.cityCode = this.province[index2].child[0].id;
          this.qu1 = this.province[index2].child[0].child;
          this.ruleForm.areaCode = this.province[index2].child[0].child[0].id;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.shi1) {
        if (e === this.shi1[index3].id) {
          this.qu1 = this.shi1[index3].child;
          this.ruleForm.areaCode = this.shi1[index3].child[0].id;
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


