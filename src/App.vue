<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default{
  name: 'App',
  created(){
    console.log(Cookies.get('language') )
  }
}
</script>
<style scoped>
#app{
  min-width: 1800px;
}
body,html{
  transition: all 3s linear;
}
</style>
