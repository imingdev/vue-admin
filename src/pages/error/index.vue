<route-config>
  {
  layoutName:'full',
  meta:{
  auth: false
  }
  }
</route-config>
<template>
  <div class="page-module error-page flex ofh">
    <div class="errorWarp align_center">
      <div class="image">
        <img :src="image"/>
      </div>
      <h2 class="title" v-text="title"/>
      <h3 class="desc" v-text="desc"/>
      <router-link :to="path" class="backBtn pointer" tag="span">返回首页</router-link>
    </div>
  </div>
</template>
<script type="text/javascript">
import {homePage} from 'src/common/setting'

export default {
  name: 'noPage',
  data () {
    return {
      image: require('./images/404.png'),
      title: 'PAGE NOT FOUND',
      desc: 'WE COULDN’T FIND THIS PAGE',
      path: homePage
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .error-page {
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: #6bc5a4;

    .image {
      margin: 20px auto;
    }

    .title {
      color: #fff;
      font-size: 64px;
      padding: 15px 30px;
      margin-bottom: 20px;
      margin-top: 50px;
      font-weight: bold;
    }

    .desc {
      font-size: 32px;
      color: #474747;
      font-weight: bold;
      line-height: 30px;
    }

    .backBtn {
      display: inline-block;
      color: #fff;
      margin-bottom: 20px;
      margin-top: 50px;
      padding: 15px 30px;
      border: 1px solid #fff;
      border-radius: 5px;
    }
  }
</style>
