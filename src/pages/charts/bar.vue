<template>
  <el-row>
    <div class="panel">
      <panel-title :title="$route.meta.title"></panel-title>
      <div class="panel-body">
        <charts :options="optionA" style="height: 700px"></charts>
      </div>
    </div>
    <el-col :span="12">
      <div class="panel" style="margin-right: 10px">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body">
          <charts :options="optionB" style="height: 400px" ref="chartsB" @click="onClickChartsB"></charts>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="panel" style="margin-left: 10px">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body">
          <charts :options="optionC" style="height: 400px"></charts>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script type="text/javascript">
  import {panelTitle, charts} from 'components'

  export default{
    data(){
      return {
        optionA: null,
        optionB: null,
        optionC: null
      }
    },
    created(){
      this.create_all_charts()
    },
    methods: {
      create_all_charts(){
        setTimeout(this.create_chartsA, 500)
        setTimeout(this.create_chartsB, 1500)
        setTimeout(this.create_chartsC, 2500)
      },
      create_chartsA(){
        this.optionA = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['利润', '支出', '收入']
          },
          grid: {
            left: '16px',
            right: '16px',
            bottom: '16px',
            top: '40px',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: {show: false},
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          series: [
            {
              name: '利润',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: [200, 170, 240, 244, 200, 220, 210]
            },
            {
              name: '收入',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true
                }
              },
              data: [320, 302, 341, 374, 390, 450, 420]
            },
            {
              name: '支出',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'left'
                }
              },
              data: [-120, -132, -101, -134, -190, -230, -210]
            }
          ]
        }
      },
      create_chartsB(){
        var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
        var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        let yMax = 500;
        let dataShadow = [];

        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }

        this.optionB = {
          grid: {
            left: '16px',
            right: '16px',
            bottom: '16px',
            top: '16px',
            containLabel: true
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap: '-100%',
              barCategoryGap: '40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              data: data
            }
          ]
        }
      },
      create_chartsC(){
        this.optionC = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
          },
          grid: {
            left: '16px',
            right: '16px',
            bottom: '16px',
            top: '40px',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '广告',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '广告',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '广告',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data: [
                  [{type: 'min'}, {type: 'max'}]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: '谷歌',
              type: 'bar',
              stack: '搜索引擎',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: '必应',
              type: 'bar',
              stack: '搜索引擎',
              data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
              name: '其他',
              type: 'bar',
              stack: '搜索引擎',
              data: [62, 82, 91, 84, 109, 110, 120]
            }
          ]
        }
      },
      //单击chartsB的回调
      onClickChartsB(params){
        var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
        var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        const zoomSize = 6
        this.$refs.chartsB.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        })
      }
    },
    components: {
      panelTitle,
      charts
    }
  }
</script>
