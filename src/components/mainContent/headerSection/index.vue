<template>
  <div class="header-section">
    <div class="search">
      <search @search="submit_search"></search>
    </div>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import search from '../../search'
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {
      menuRight,
      search
    },
    methods: {
      submit_search(value) {
        this.$message({
          message: value,
          type: 'success'
        })
      }
    }
  }
</script>
