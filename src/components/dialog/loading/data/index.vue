<template>
  <div class="v-shade">
    <div class="loading">
      <span class="inner icon"></span>
      <span class="inner text">数据正在加载中...</span>
    </div>
  </div>
</template>
<style lang="scss" scoped type="text/css">
  .loading {
    position: fixed;
    left: 50%;
    top: 30%;
    padding: 10px;
    font-size: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    transform: translate(-50%, -50%);
    .inner {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      vertical-align: middle;
      &.icon {
        width: 30px;
        background-image: url(./images/data_loading.svg);
      }
      &.text {
        margin-left: 10px;
      }
    }
  }
</style>
