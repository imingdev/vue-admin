<template>
  <div class="panel">
    <panel-title title="注册统计"></panel-title>
    <div class="panel-body">
      <line-chart style="height:350px" :url="lineChartUrl"></line-chart>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {url_count_over_view, url_count_by_register} from 'common/URL'
  import {lineChart, panelTitle} from 'components'

  export default {
    data() {
      return {
        lineChartUrl: url_count_by_register
      }
    },
    components: {
      lineChart,
      panelTitle
    }
  }
</script>
