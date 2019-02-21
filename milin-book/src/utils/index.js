export default {
  pad2 (n) {
    return n < 10 ? '0' + n : n
  },
  generateTimeReqestNumber () {
    var date = new Date()
    return date.getFullYear().toString() + this.pad2(date.getMonth() + 1) + this.pad2(date.getDate()) + this.pad2(date.getHours()) + this.pad2(date.getMinutes())
  },
  /**
   * 生成订单编号
   */
  getOrderId () {
    var rand = Math.floor(Math.random() * 900) + 100
    var orderId = this.generateTimeReqestNumber() + rand

    return orderId
  }

}
