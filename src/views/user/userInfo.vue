<template>
  <div class="userInfo">
    <div class="userItem">
      <div class="header">基础信息</div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">昵称: </div>
          <div class="textContent m_floatL"> {{ dataForm.nickName }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">性别: </div>
          <div class="textContent m_floatL"> {{ dataForm.gender==1?'男':'女' }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">IP归属地: </div>
          <div class="textContent m_floatL"> {{ dataForm.provinceName+dataForm.cityName }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">手机: </div>
          <div class="textContent m_floatL"> {{ dataForm.phone }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">企业名称: </div>
          <div class="textContent m_floatL"> {{ dataForm.enterpriseName }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">公司地址: </div>
          <div class="textContent m_floatL"> {{ dataForm.enterpriseAddress }}</div>
        </div>
      </div>
    </div>
    <div class="userItem">
      <div class="header">注册信息</div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">注册时间: </div>
          <div class="textContent m_floatL"> {{ dataForm.createTime|formatDate('') }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">注册渠道: </div>
          <div class="textContent m_floatL"> {{ equip[dataForm.firstEquip] }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">当前使用版本： </div>
          <div class="textContent "> Android {{ dataForm.dlabelAndroidVersion||'无' }}</div>
          <div class="textContent" style="margin-left:100px;margin-top:16px;"> PC {{ dataForm.dlabelPcVersion||'无' }}</div>
          <div class="textContent " style="margin-left:100px;margin-top:16px;"> IOS {{ dataForm.dlabelIosVersion||'无' }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">设备: </div>
          <div class="textContent m_floatL"> {{ dataForm.equipMeid }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">最后访问时间: </div>
          <div class="textContent m_floatL"> {{ dataForm.lastLogin|formatDate('') }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">云文件个数: </div>
          <div class="textContent m_floatL"> {{ dataForm.cloudNum }}</div>
        </div>
      </div>
      <div class="itemDiv">
        <div class="m_clearLR">
          <div class="m_floatL textHead">归属友商: </div>
          <div class="textContent m_floatL"> {{ dataForm.companyName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { user_info } from '@/api/api'
export default {
  filters: {
    formatDate(time) {
      if (time) { return moment(time).format('YYYY-MM-DD HH:mm:ss') }
    }
  },
  data() {
    return {
      dataForm: {},
      equip: ['未知', '安卓', 'IOS', 'PC', 'Web端']
    }
  },
  created() {
    user_info({ id: this.$route.query.id }).then(res => {
      this.dataForm = res.data
    })
  },
  user_info() {

  }
}
</script>

<style scoped lang="scss">
.userInfo{
  padding: 33px 42px;
  display: flex;
  .userItem{
    margin-right: 32px;
    width:500px;
    height:500px;
    padding: 24px 32px;
    border-radius: 8px;
    border:1px solid #e5e5e5;
    background-color: #fff;
    .header{
      width:64px;
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(60,60,60,1);
      line-height:22px;
    }
    .itemDiv{
      margin-top:25px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
      .textContent{
        margin-left:5px;
      }
    }
  }
}
</style>
