<template>
  <div class="chart"></div>
</template>
<script type="text/ecmascript-6">
  //引入主模块
  import echarts from 'echarts/lib/echarts'
  // 引入线形图
  import 'echarts/lib/chart/line'
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
              let rSeries = new Array()
              for (let i = 0; i < data['series'].length; i++) {
                rSeries.push({
                  name: data.legend[i],
                  type: 'line',
                  symbolSize: '6',
                  smooth: true,
                  data: data.series[i]
                })
              }
              return rSeries
            }
            this.chart.setOption({
              tooltip: {
                trigger: 'axis'
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
              xAxis: {
                data: data.xAxis
              },
              yAxis: {},
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
