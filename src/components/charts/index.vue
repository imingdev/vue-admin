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
  <div class="charts__panel__warp" v-loading="dataLoading" element-loading-text="玩命加载中..."></div>
</template>
<script>
  // enumerating ECharts events for now
  const ACTION_EVENTS = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'brush',
    'brushselected'
  ]
  const MOUSE_EVENTS = [
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousedown',
    'mouseup',
    'globalout'
  ]
  export default {
    props: {
      options: Object,
      theme: String,
      initOptions: Object,
      group: String,
      autoResize: Boolean,
      modules: Array
    },
    data() {
      return {
        chart: null,
        dataLoading: true
      }
    },
    computed: {
      // Only recalculated when accessed from JavaScript.
      // Won't update DOM on value change because getters
      // don't depend on reactive values
      width: {
        cache: false,
        get() {
          return this.chart.getWidth()
        }
      },
      height: {
        cache: false,
        get() {
          return this.chart.getHeight()
        }
      },
      isDisposed: {
        cache: false,
        get() {
          return this.chart.isDisposed()
        }
      }
    },
    watch: {
      // use assign statements to tigger "options" and "group" setters
      options: {
        handler(options) {
          if (!this.chart && options) {
            this._init()
          } else {
            this.chart.setOption(this.options, true)
          }
        },
        deep: true
      },
      group: {
        handler(group) {
          this.chart.group = group
        }
      }
    },
    methods: {
      // provide a explicit merge option method
      mergeOptions(options) {
        this._delegateMethod('setOption', options)
      },
      // just delegates ECharts methods to Vue component
      // use explicit params to reduce transpiled size for now
      resize(options) {
        this._delegateMethod('resize', options)
      },
      dispatchAction(payload) {
        this._delegateMethod('dispatchAction', payload)
      },
      convertToPixel(finder, value) {
        return this._delegateMethod('convertToPixel', finder, value)
      },
      convertFromPixel(finder, value) {
        return this._delegateMethod('convertFromPixel', finder, value)
      },
      containPixel(finder, value) {
        return this._delegateMethod('containPixel', finder, value)
      },
      showLoading(type, options) {
        this._delegateMethod('showLoading', type, options)
      },
      hideLoading() {
        this._delegateMethod('hideLoading')
      },
      getDataURL(options) {
        return this._delegateMethod('getDataURL', options)
      },
      getConnectedDataURL(options) {
        return this._delegateMethod('getConnectedDataURL', options)
      },
      clear() {
        this._delegateMethod('clear')
      },
      dispose() {
        this._delegateMethod('dispose')
      },
      _delegateMethod(name, ...args) {
        if (!this.chart) {
          return
        }
        return this.chart[name](...args)
      },
      _init() {
        if (this.chart) return false

        this.dataLoading = true
        /**
         * 按需引入 ECharts 图表组件
         * doc: http://echarts.baidu.com
         */
        import('echarts')
          .then(({init}) => {
            const {$el, theme, initOptions, group, options, autoResize, _resizeHanlder} = this
            let chart = init($el, theme, initOptions)
            if (group) {
              chart.group = group
            }
            chart.setOption(options, true)
            // expose ECharts events as custom events
            ACTION_EVENTS.forEach(event => {
              chart.on(event, params => {
                this.$emit(event, params)
              })
            })
            MOUSE_EVENTS.forEach(event => {
              chart.on(event, params => {
                this.$emit(event, params)
              })
            })
            if (autoResize) {
              window.addEventListener('resize', _resizeHanlder, false)
            }
            this.chart = chart
            this.dataLoading = false
          })
          .catch(_ => {
            this.dataLoading = false
          })
      },
      _resizeHanlder() {
        window.setTimeout(() => {
          this.chart.resize()
        }, 100)
      }
    },
    mounted() {
      // auto init if `options` is already provided
      if (this.options) {
        this._init()
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this._resizeHanlder, false)
      }
      this.dispose()
    },
    connect(group) {
      const {chart} = this
      if (typeof group !== 'string') {
        group = group.map(chart => chart.chart)
      }
      this.chart.connect(group)
    },
    disconnect(group) {
      this.chart.disConnect(group)
    },
    registerMap(...args) {
      this.chart.registerMap(...args)
    },
    registerTheme(...args) {
      this.chart.registerTheme(...args)
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
</style>
