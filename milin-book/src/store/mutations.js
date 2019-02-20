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
  setShopCarCount (state, data) {
    state.shopCarCount = data
  }
}
