<template>
  <div class="chart"></div>
</template>
<script type="text/ecmascript-6">
  //引入主模块
  import echarts from 'echarts/lib/echarts'
  // 引入饼图
  import 'echarts/lib/chart/pie'
  // 引入提示框
  import 'echarts/lib/component/tooltip'

  export default {
    props: {
      url: ''
    },
    data() {
      return {
        chart: null
      }
    },
    methods: {
      createChart() {
        this.chart = echarts.init(this.$el)
        //获取详情信息
        this.$http.get(this.url)
          .then(({data:{data, code, msg}}) => {
            let series = function () {
              let arrObj = new Array()
              let reObj = {
                type: 'pie',
                data: []
              }
              for (let i = 0; i < data['series'].length; i++) {
                arrObj.push({
                  name: data.legend[i],
                  value: data.series[i]
                })
              }
              reObj['data'] = arrObj
              return reObj
            }
            this.chart.setOption({
              tooltip: {
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                show: false,
                top: '16',
                right: '16',
                data: data.legend
              },
              grid: {
                left: '16px',
                right: '16px',
                bottom: '16px',
                top: '16px',
                containLabel: true
              },
              series: series()
            })
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.createChart()
      })
    },
    destroyed() {
      this.chart = null
    }
  }

</script>
