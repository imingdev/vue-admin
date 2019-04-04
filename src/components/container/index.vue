<template>
  <el-container class="ui-widget-container" direction="vertical">
    <div class="container-header relative" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <el-container v-if="$slots.default">
      <div class="container-main relative flex__item" :style="{padding}">
        <slot/>
      </div>
    </el-container>
  </el-container>
</template>
<script type="text/javascript">
export default {
  name: 'UiContainer',
  props: {
    padding: {
      type: String,
      default: '10px'
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .ui-widget-container {
    .container-header, .container-main {
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, .03);
    }

    .container-header {
      padding: 15px 10px;
      margin-bottom: 20px;
    }
  }
</style>
