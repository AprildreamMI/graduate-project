import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getter from './getter'

Vue.use(Vuex)

const state = {
  // 个人信息
  me: sessionStorage.getItem('currUserInfo') ? JSON.parse(sessionStorage.getItem('currUserInfo')) : null
}

const options = {
  state,
  mutations,
  getter,
  actions,
  modules: {
  }
}

export default new Vuex.Store(options)
