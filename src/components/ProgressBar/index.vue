<template>
  <div class="progress">
    <div class="warning"/>
    <span>上传中</span>
  </div>

</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.progress{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  span{
    font-size:12px;
    margin-left:6px;
  }
}
.warning {
  width:80px;
  height:6px;
  position: relative;
  background-color: #2274e5;
  border: 1px solid #2274e5;
  border-radius: 100px;
  background-size: 3em 3em;
  background-image: linear-gradient(
    -45deg,
    transparent 0em,
    transparent 0.8em,
    #5a99f1 0.9em,
    #5a99f1 2.1em,
    transparent 2.1em,
    transparent 2.9em,
    #5a99f1 3.1em
  );
  -webkit-animation: warning-animation 750ms infinite linear;
  -moz-animation: warning-animation 750ms infinite linear;
  animation: warning-animation 750ms infinite linear;
  // margin-top:4px;
}
@-webkit-keyframes warning-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 3em 0;
  }
}
@-moz-keyframes warning-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 3em 0;
  }
}
@keyframes warning-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 3em 0;
  }
}
// .warning:before {
//   content: ´´;
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   height: 100%;
//   border-radius: 10px;
//   background-image: linear-gradient(
//     to bottom,
//     #6da807,
//     rgba(171, 226, 77, 0.6) 15%,
//     transparent 60%,
//     #6da807
//   );
// }
</style>
