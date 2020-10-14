<template>
  <div class="headnav">
    <div class="m_clearLR">
      <div class="m_floatL headnav_title">度点科技</div>
      <div class="m_floatR headnav_user">
        <el-dropdown @command="backLogin" trigger="click">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  computed: {
    username() {
      var eqData = this.$store.getters.name;
      return eqData;
    }
  },
  data() {
    return {
      user: {}
    };
  },
  created() {},
  methods: {
    backLogin() {
      // removeToken()
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  },
  name: "HeadNav"
};
</script>

<style>
.el-dropdown{
  color:#fff;
  cursor: pointer;
}
.headnav {
  border-bottom: 1px solid rgb(38, 52, 69);

  height: 50px;
  font-size: 16px;
  line-height: 50px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1002;
  background-color: rgb(48, 65, 86);
  color: #fff;
}
.headnav_title {
  width: 180px;
  text-align: center;
}
.headnav_user {
  margin-right: 10px;
}
</style>
