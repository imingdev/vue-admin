<template>
  <div class="bottom-toolbar ofh">
    <el-row>
      <el-col :span="24">
        <div class="fl">
          <slot name="handler"></slot>
        </div>
        <div class="fr">
          <slot name="page"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">

</style>
