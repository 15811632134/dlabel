<template>
  <div class="app-container">
    <div v-for="item in list" :key="item.id" class="permmssion-info">
      <p>{{ item.name }}</p>
      <div v-for="_item in item.sons" :key="_item.id">
        <el-checkbox
          v-model="_item.flag"
          size="mini"
          class="checkall"
          @change="handleCheckAllChange(_item)"
        >{{ _item.name }}</el-checkbox>

        <div style="margin: 17px 25px;">
        <el-checkbox
          v-for="child in _item.sons"
          v-model="child.flag"
          :label="child.name"
          :key="child.id"
          @change="changeItem(child,_item)"
        >{{ child.name }}</el-checkbox>
        </div>
      </div>
    </div>
    <div v-show="list.length>0" class="conserve">
      <el-button type="primary" class="m_search" @click="savePermission">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  getDlabelSysAuthorityList,
  get_system_authority,
  getMallSysAuthorityListByAccount,
  get_role_authority_by_role_id,
  saveDlabelSysRoleAuthority,
  role_authority_deploy_save,
  authority_list,
  company_default_role_save,
  get_company_role_detail,
  company_default_role_save_by_company_role_id
} from '@/api/api'
export default {
  data() {
    return {
      checkAll: false,
      staffId: -1,
      checkedCities: [],
      cities: [],
      rolePermission: [],
      list: [],
      str: [],
      roleId:'',
      isIndeterminate: false
    }
  },
  created() {
    this.staffId = this.$route.query.id
    get_company_role_detail({company_staff_id:this.staffId}).then(response => {
      this.roleId = response.data.company_role_id
      this.rolePermission = response.data.company_defult_authority
      if(this.rolePermission)
      for (var i = 0; i < this.rolePermission.length; i++) {
        this.str.push(this.rolePermission[i].id)
         if (this.rolePermission[i].sons&&this.rolePermission[i].sons.length > 0) {
          this.createdStr(this.rolePermission[i].sons)
        }
      }
      var data = response.data.system_company_defult_authority
      for (var i = 0; i < data.length; i++) {
        this.calcData(data[i].sons)
      }
      console.log('999999', data)
      this.list = data

    })
  },
  methods: {

    createdStr(data) {
      for (var i = 0; i < data.length; i++) {

          this.str.push(data[i].id)

        if (data[i].sons&&data[i].sons.length > 0) {

          this.createdStr(data[i].sons)
        }
      }
    },
    savePermission() {
      this.str = [];
      for (var i = 0; i < this.list.length; i++) {
        var flag = false
        for(var j = 0 ; j < this.list[i].sons.length;j++){
          if(this.list[i].sons[j].flag){
            flag = true
            break
          }
        }
        if(flag){
          this.str.push(this.list[i].id);
        }
        this.calcDataToStr(this.list[i].sons);
      }
      company_default_role_save_by_company_role_id({
        company_role_id:this.roleId,
        authorityIds: this.str.join(',')
      }).then(res => {
        this.$message({
          message: '已保存',
          type: 'success'
        })
      })
    },
    cancelPermission() {
      this.$router.push({ name: 'role' })
    },
    calcData(data) {
      for (var i = 0; i < data.length; i++) {
        if (this.str.indexOf(data[i].id) !== -1) data[i].flag = true
        else data[i].flag = false
        if (data[i].sons) this.calcData(data[i].sons)
      }
    },
    calcDataToStr(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].flag) {
          this.str.push(data[i].id)
        }
        if (data[i].sons&&data[i].sons.length > 0) {
          data[i].fatherFlag = []
          this.calcDataToStr(data[i].sons)
        }
      }
    },
    handleCheckAllChange(item) {
      if (item.flag === true) {
        item.sons.forEach(element => {
          element.flag = true
        })
      } else {
        item.sons.forEach(element => {
          element.flag = false
        })
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value)
    },
    changeItem(value, item) {
      var flag = false
      item.sons.forEach(element => {
        if (element.flag) {
          flag = true
        }
      })
      if (flag) item.flag = true
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  padding: 32px 40px 51px 40px;
  .permmssion-info {
    background-color: #fff;
    padding: 24px 0 0 37px;
    margin-bottom: 16px;
    padding-bottom: 6px;
    border-radius: 8px;
    p {
      font-size: 16px;
      margin: 0 0 24px 0;
    }
    .el-checkbox {
      font-size: 14px;
      padding-bottom: 19px;
    }
    .el-checkbox-group {
      margin-left: 36px;
      .el-checkbox__label {
        color: #666;
      }
    }
    .el-checkbox__label {
      padding-left: 16px;
    }
  }
  .material {
    .el-checkbox-group {
      margin-left: 0;
      .el-checkbox {
        display: block;
        margin-left: 0 !important;
      }
    }
  }
  .conserve {
    position: fixed;
    left: 260px;
    right: 0;
    bottom: 0;
    z-index: 9;
    height: 56px;
    background: #fff;
    button {
      width: 160px;
      height: 40px;
      background: #2274e5;
      box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
      border-radius: 8px;
      margin: 8px 0 0 40px;
    }
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #fff;
    border-color: #666;
  }
  .el-checkbox__inner {
    border-color: #666 !important;
    &:after {
      border-color: #666;
    }
  }
  .checkall,.group {
    .el-checkbox__label{
      color:#333 !important;
    }
    .el-checkbox__inner {
      border-color: #333 !important;
      &:after {
        border-color: #333;
      }
    }
  }
}
</style>
