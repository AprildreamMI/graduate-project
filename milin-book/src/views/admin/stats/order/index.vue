<template>
  <v-echarts :style="{'height':'700px'}" :option="option" v-loading="loading" @ready="onReady"></v-echarts>
</template>
<script>
import * as api from '../../../../api'
import vEcharts from 'vue-echarts-v3/src/lite.js'
// 引入标题组件
import 'echarts/lib/component/title'
// 引入图例组件
import 'echarts/lib/component/legend'
// 引入提示框组件
import 'echarts/lib/component/tooltip'
// 引入工具箱组件
import 'echarts/lib/component/toolbox'
// 引入柱状图
import 'echarts/lib/chart/bar'

import option from './option.js'
export default {
  data () {
    return {
      loading: true,
      option: option,
      typeCount: ''
    }
  },
  created () {
    this.getTypeBookCount()
  },
  methods: {
    // 图表初始化
    onReady (instance, ECharts) {
      this.instance = instance
      instance.setOption(option)
      this.loading = false
    },
    // 获取分类书籍的数量
    getTypeBookCount () {
      api.adminGetTypeBookCount().then(res => {
        if (res.data.code === 0) {
          this.typeCount = res.data.data.typeCount
          option.series[0].data = this.typeCount
        } else {
        }
      }).catch(error => {
        console.error(error)
      })
    }
  },
  components: {
    vEcharts
  }
}
</script>
<style lang="scss" scoped>

</style>
