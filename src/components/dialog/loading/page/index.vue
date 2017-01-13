<template>
  <div class="loading"></div>
</template>
<style lang="scss" scoped type="text/css">
  .loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.1);
    background-image: url(./images/page_loading.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100px 100px;
    z-index: 9999;
  }
</style>
