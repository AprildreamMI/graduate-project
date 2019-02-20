// 全局的过滤器
import Vue from 'vue'
import moment from 'moment'

Vue.filter('dataFormat', (input) => {
  return moment(input).format('YYYY年MM月DD')
})
