<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="width:700px; margin-left:50px; margin-top:50px;"
    >
      <el-form-item label="公司名称">
        <el-input v-model="form.name" disabled/>
      </el-form-item>
      <el-form-item label="公司简称">
        <el-input v-model="form.short_name" disabled/>
      </el-form-item>
      <el-form-item label="国家">
        <el-input v-model="form.nation" disabled/>
      </el-form-item>
      <!-- <el-form-item label="省/市/区">
        <div class="linkage">
          <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" size="mini" disabled>
            <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="shi" @change="choseCity" placeholder="市级地区" size="mini" disabled>
            <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" size="mini" disabled>
            <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </div>
      </el-form-item>-->
      <el-form-item label="所在区域">
        <el-input v-model="form.part" disabled/>
      </el-form-item>
      <el-form-item label="网站">
        <el-input v-model="form.website" disabled/>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.linkman" disabled/>
      </el-form-item>
      <el-form-item label="联系手机号">
        <el-input v-model="form.phone" disabled/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" disabled/>
      </el-form-item>
      <el-form-item label="用户注册链接">
        <span><a :href="form.href" target="_blank">{{ form.href }}</a></span>
        <el-button
          v-clipboard:copy="form.href"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="ml10"
          type="text"
          size="medium">点击复制</el-button>
      </el-form-item>
      <el-form-item label="用户注册码">
        <a id="download" download="qrcode.jpg"/>
        <div id="qrcode" ref="qrcode" class="m_floatL" @click="downQrcode"/>
        <div class="m_floatL downCodeBtn" @click="downQrcode">点击下载二维码</div>
      </el-form-item>
      <el-form-item label="身份证/营业执照">
        <img v-for="item in form.image_list" :src="item" :key="item" class="avatar componyImg">
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcodejs2'

import { companyList } from '@/api/article'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tempImg: '',
      mapJson: '@/../static/map.json',
      province: '',
      sheng: '',
      shi: '',
      shi1: [],
      qu: '',
      qu1: [],
      city: '',
      block: ''
    }
  },
  created() {
    this.getCityData()
  },
  methods: {
    onCopy(e) {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    onError(e) {
      console.log('复制失败')
    },
    downQrcode() {
      var canvas = document.querySelector('#qrcode canvas')
      console.log(canvas)
      try {
        // 解决IE转base64时缓存不足，canvas转blob下载
        var blob = canvas.msToBlob()
        navigator.msSaveBlob(blob, 'qrcode.jpg')
      } catch (e) {
        // 如果为其他浏览器，使用base64转码下载
        var url = canvas.toDataURL('image/jpeg')
        document.querySelector('#download').setAttribute('href', url)
        document.querySelector('#download').click()
      }
      return false
    },
    qrcode() {
      new QRCode('qrcode', {
        width: 150, // 设置宽度，单位像素
        height: 150, // 设置高度，单位像素
        text: this.form.href // 设置二维码内容或跳转地址
      })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {
      return false
    },
    changeImg(val) {
      this.tempImg = this.getObjectURL(val.raw)
    },
    getCityData() {
      var that = this
      console.log(this.mapJson)
      axios
        .get(this.mapJson)
        .then(response => {
          console.log(response.data)
          if (response.status === 200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                // 省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: []
                })
              } else if (item.match(/00$/)) {
                // 市
                that.city.push({ id: item, value: data[item], children: [] })
              } else {
                // 区
                that.block.push({ id: item, value: data[item] })
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (
                  that.block[item2].id.slice(0, 4) ===
                  that.city[item1].id.slice(0, 4)
                ) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
            companyList().then(res => {
              this.form = res.data.results
              this.form.href = 'http://m.dlabel.cn/s/partner/login.html?com=' + this.form.id
              this.qrcode()
            })
            // axios.get('http://192.168.1.109:8000/api/v1/partner/Company/')
          } else {
            console.log(response.status)
          }
        })
        .catch(function(error) {
          console.log(typeof +error)
        })
    },
    // 选省
    choseProvince(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 = this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
        }
      }
    },
    // 选市
    choseCity(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e
      // console.log(this.E)
    }
  }
}
</script>

<style>
#qrcode{
  cursor: pointer;
}
.downCodeBtn{
  line-height: 150px;
  margin-left:20px;
  cursor: pointer;
}
.componyImg {
  float: left;
  margin: 30px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 150px;
  display: block;
}
</style>
