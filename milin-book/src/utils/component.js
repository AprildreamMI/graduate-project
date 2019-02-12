// 全局的组件
import Vue from 'vue'

import layout from '../components/layout.vue'
import leftSidebar from '../components/leftSidebar'
import rightContent from '../components/rightContent'
import contentHeader from '../components/rightContent/contentHeader.vue'
import contentMain from '../components/rightContent/contentMain.vue'

Vue.component('layout', layout)
Vue.component('leftSidebar', leftSidebar)
Vue.component('rightContent', rightContent)
Vue.component('contentHeader', contentHeader)
Vue.component('contentMain', contentMain)
