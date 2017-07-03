<!--
/**
 * @file: index.
 * @intro: intro.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/7/3 15:55.
 *
 */
-->
<template>
  <div
    :ref="refid"
    v-loading="load_data"
    element-loading-text="拼命加载中"></div>
</template>
<script type="text/javascript">
  export default{
    props: {
      refid: {
        type: String,
        require: true
      },
      option: {
        type: Object,
        default: null
      }
    },
    data(){
      return {
        charts: null,
        load_data: true
      }
    },
    created(){
      this.initCharts()
    },
    methods: {
      //初始化charts
      initCharts(){
        /**
         * 按需引入 ECharts 图表和组件，这里先全部引入
         * doc: http://echarts.baidu.com
         */
        this.load_data = true
        import('echarts')
          .then(({init}) => {
            this.$nextTick(() => {
              const {$refs, refid, setOption, option} = this
              this.charts = init($refs[refid])
              this.load_data = false
              this.charts.showLoading()
              option && setOption()
            })
          })
          .catch(() => {
          })
      },
      //设置属性到charts
      setOption(){
        if (this.charts) {
          this.charts.setOption(this.option)
          this.charts.hideLoading()
        }
      }
    },
    destroyed(){
      this.charts = null
      this.option = null
    },
    watch: {
      option: {
        handler(){
          this.setOption()
        },
        deep: true
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
