<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  background-color: #F6F8FA;
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 134px);
  width: 100%;
  position: absolute;
  /* overflow: hidden; */
  top:63px;
}
</style>
