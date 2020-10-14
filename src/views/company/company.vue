<template>
  <div class="app-container">
    <div class="infor">
      <span>
        公司名称：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor">
      <span>
        公司简称：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor">
      <span>
        联系人：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
      <div class="fixtelphone">
        <span>固定电话：</span>
        <p>0101-2374705</p>
      </div>
    </div>
    <div class="infor">
      <span>
        联系电话：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor">
      <span>
        邮箱：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="inforlogo infor">
      <span>
        公司logo：
        <em>*</em>
      </span>
      <div class="logo">
        <input type="file" >
        <div class="logo-file">
          <img src="@/assets/404_images/404.png" >
          <div class="logo-edit">
            <i />
            <i />
          </div>
        </div>
        <p>文件格式jpeg、jpg、png、文件大小限制2M,图像比例1:1</p>
      </div>
    </div>
    <div class="infor">
      <span>
        统一社会信用代码：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor inforimg">
      <span>
        三证合一：
        <em>*</em>
      </span>
      <img src="@/assets/404_images/404.png" >
    </div>
    <div class="infor">
      <span>
        公司地址：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor">
      <span>
        详细地址：
        <em>*</em>
      </span>
      <p>深圳云联软件有限公司</p>
    </div>
    <div class="infor inforimg">
      <span>
        协议上传：
        <em>*</em>
      </span>
      <img src="@/assets/404_images/404.png" >
    </div>
    <button type="button" class="confirm">保存</button>
  </div>
</template>

<script>
// import {} from '@/api/article'
// import { mapGetters } from 'vuex'
import { getCompanyInfor } from '@/api/userinfor'
export default {
  name: 'ComplexTable',
  filters: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    getCompanyInfor()
  },
  methods: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.app-container {
  font-size: 14px;
  color: #666;
  .infor {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 78px;
      margin-right: 32px;
      em {
        color: #ff0000;
      }
    }
    .fixtelphone {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 280px;
    }
  }
  .inforlogo {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    input {
      width: 160px;
      height: 160px;
      opacity: 0;
      position: absolute;
    }
    img {
      display: inline-block;
      width: 100px;
      height: 100px;
      margin-top: 30px;
    }
    .logo-file {
      width: 160px;
      height: 160px;
      text-align: center;
    }
    .logo {
      display: flex;
      align-items: flex-start;
    }
  }
  .inforimg {
    align-items: flex-start;
    img {
      width: 244px;
      height: 166px;
    }
  }
  .confirm {
    width: 160px;
    height: 40px;
    background: rgba(34, 116, 229, 1);
    border-radius: 24px;
    color: #fff;
    border: none;
    margin-top: 40px;
  }
}
</style>
