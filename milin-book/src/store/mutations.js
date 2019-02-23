import * as api from '../api'

export default {
  // 设置个人信息
  setMe (state, data) {
    state.me = data
  },

  /**
   * 设置购物车中的数量
   * @param {*} state
   * @param {*} data
   */
  setShopCarCount (state) {
    api.shopGetShopCarCount().then(res => {
      if (res.data.code === 0) {
        state.shopCarCount = res.data.data.shopCarCount
        // this.$message.success(res.data.message)
      } else {
        // this.$message.error(res.data.message)
      }
    }).catch(error => {
      console.error(error)
    })
  },
  /**
   * 设置订单数量
   * @param {*} state
   * @param {*} data
   */
  setOrderCount (state) {
    api.shopGetOrderCount().then(res => {
      if (res.data.code === 0) {
        state.orderCount = res.data.data.orderCount
        // this.$message.success(res.data.message)
      } else {
        // this.$message.error(res.data.message)
      }
    }).catch(error => {
      console.error(error)
    })
  }
}
