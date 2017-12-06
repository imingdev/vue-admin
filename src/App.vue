<template>
  <section class="body-warp">
    <nprogress-container style="z-index: 9999"></nprogress-container>
    <transition name="fade" mode="out-in">
      <router-view name="fullView" style="z-index: 200"></router-view>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view name="menuView" style="z-index: 150"></router-view>
    </transition>
    <main-content style="z-index: 100">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main-content>
  </section>
</template>
<!-- 测试提交dev000 -->

<script type="text/javascript">
  import {mainContent} from 'components'
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

  export default {
    name: 'app',
    components: {
      mainContent,
      NprogressContainer
    }
  }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss">
  @import '~assets/scss/main';

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .nprogress-container {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 9999;
  }
</style>
