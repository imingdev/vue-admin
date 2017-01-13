<template>
  <section class="body-warp">
    <div :class="{'warpBlur': page_loading}">
      <div v-if="content_is_show">
        <div class="left-side">
          <left-slide></left-slide>
        </div>
        <div class="main-content">
          <main-content>
            <router-view>路由显示dom</router-view>
          </main-content>
        </div>
      </div>
      <router-view name="fullView"></router-view>
    </div>
    <page-loading v-if="page_loading">page-loading</page-loading>
    <data-loading v-if="data_loading">data-loading</data-loading>
  </section>
</template>
<script type="text/javascript">
  import store from 'vux/store'
  import {leftSlide, mainContent, pageLoading, dataLoading} from 'components'
  const storeState = store.state

  export default {
    store,
    components: {
      leftSlide,
      mainContent,
      pageLoading,
      dataLoading
    },
    computed: {
      content_is_show() {
        return storeState.content_show
      },
      page_loading() {
        return storeState.page_loading
      },
      data_loading() {
        return storeState.date_loading
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  @import './assets/scss/main';
</style>
