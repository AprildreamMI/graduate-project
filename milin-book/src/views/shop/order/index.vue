<template>
  <div class="shop-layout">
    <shop-header></shop-header>
    <div class="header">
      <div class="shop-w">
        <el-row class="header-row" type="flex" :gutter="0">
          <el-col class="header-col" :span="5">
            <img class="logo" src="/static/img/login_blue.png" alt="">
            <h1 class="shop-title">我的订单</h1>
          </el-col>
          <el-col :span="4">
          </el-col>
         </el-row>
       </div>
    </div>
    <div class="shop-layout main">
      <div class="span-box"></div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in tables" :key="index" :label="item.label" :name="item.name">
            <el-table
              ref="multipleTable"
              :data="currentOrderList"
              style="width: 100%"
              :key="Math.random()"
              header-align="center">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="书籍作者">
                      <span>{{ props.row.BookAuthor }}</span>
                    </el-form-item>
                    <el-form-item label="出版社">
                      <span>{{ props.row.BookPress }}</span>
                    </el-form-item>
                    <el-form-item label="出版时间">
                      <span>{{ props.row.BookPubDate | dataFormat }}</span>
                    </el-form-item>
                    <el-form-item label="ISBN">
                      <span>{{ props.row.Bookisbn }}</span>
                    </el-form-item>
                    <el-form-item label="书籍简介">
                      <span>{{ props.row.BookOutline }}</span>
                    </el-form-item>
                    <el-form-item label="书籍封面">
                      <img width="150" height="150" :src="props.row.BookPic" alt="">
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="订单编号"
                prop="OrderId"
                :show-overflow-tooltip="true"
                align="center">
              </el-table-column>
              <el-table-column
                label="下单日期"
                prop="Orderdate"
                :show-overflow-tooltip="true"
                :formatter="formatterDate"
                align="center">
              </el-table-column>
              <el-table-column
                label="付款时间"
                v-if="activeName === 'noShip'"
                prop="payTime"
                :show-overflow-tooltip="true"
                :formatter="formatterDatePay"
                align="center">
              </el-table-column>
              <el-table-column
                label="书名"
                prop="BookName"
                :show-overflow-tooltip="true"
                align="center">
              </el-table-column>
              <el-table-column
                label="书籍原价(￥)"
                prop="BookPrice"
                :width="100"
                align="center">
              </el-table-column>
              <el-table-column
                label="折扣"
                prop="BookDiscount"
                :width="100"
                align="center">
              </el-table-column>
              <el-table-column
                label="书籍现价(￥)"
                prop="BookMprice"
                :width="100"
                align="center">
              </el-table-column>
              <el-table-column
                label="购买数量"
                prop="ordermount"
                :width="100"
                align="center">
              </el-table-column>
              <el-table-column
                label="总价(￥)"
                prop="totalprice"
                :width="100"
                align="center">
              </el-table-column>
              <el-table-column
                v-if="activeName === 'noPay'"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    style="margin-top: 5px"
                    size="mini"
                    type="danger"
                    @click="confirmDeleteOrder(scope.$index, scope.row)">删除
                  </el-button>
                  <el-button
                    size="mini"
                    type="primary"
                    @click="buyOrderGood(scope.$index, scope.row)">支付
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                v-if="activeName === 'shipped'"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="toReceipt(scope.$index, scope.row)">收货
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="span-box">
      </div>
    </div>
    <el-dialog custom-class="my-el-dialog" :visible.sync="openBuyCurrentBookToPayDialog" width="440px" top="50px" :before-close="colseBuyBookToPayDiaLogBefor" append-to-body>
      <div class="handle-title text-16-M">
        付款
      </div>
      <div class="dialog-content">
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">客户昵称:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ user_me.CustomerName }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">订单编号:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.OrderId }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">下单日期:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.Orderdate }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">商品名称:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.BookName }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">商品原价:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.BookPrice }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">折扣:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.BookDiscount }}折</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">商品现价:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.BookMprice }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">购买数量:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.ordermount }}(本)</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">收货地址:</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <p class="p-content">{{ order.address }}</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" style="line-height: 54px;" :span="4">
            <p class="p-title">留言</p>
          </el-col>
          <el-col class="p-col" :span="2">
          </el-col>
          <el-col class="p-col" :span="18">
            <el-input
              type="textarea"
              :rows=2
              placeholder="请输入内容"
              v-model="order.message">
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-col" :span="4">
            <p class="p-title">付款方式:</p>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col class="p-col" style="height: 40px;" :span="18">
            <el-select v-model="order.paymethod" placeholder="选择付款方式">
              <el-option
                v-for="item in paySelect"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" :gutter="0"  justify="space-between">
          <el-col class="p-total-price" :span="4">
            <p class="p-title">总价:</p>
          </el-col>
          <el-col :span="2">
          </el-col>
          <el-col class="p-total-price-content" :span="18">
            <p class="p-content">{{ order.ordermount * order.BookMprice }}￥</p>
          </el-col>
        </el-row>
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <div class="book-outline-bottom-line"></div>
        </el-row>
        <el-row type="flex" style="margin-top: 20px;height: 60px;" :gutter="0" class="address-row" justify="end">
          <el-col :span="5">
            <el-button @click="cancelPay" type="primary">
              取 消
            </el-button>
          </el-col>
          <el-col :span="5">
            <el-button @click="toPay" type="danger">
              付 款
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as api from '../../../api'
import cookie from '../../../utils/cookie.js'
// import utils from '../../../utils/index.js'
import moment from 'moment'
import shopHeader from '../header'
export default {
  data () {
    return {
      // 当前的标签名
      activeName: 'noPay',
      // 订单列表
      orderList: [],
      // 当前的订单列表
      currentOrderList: [],
      // 当前支付的订单商品id
      currentOrderGoodsId: '',
      // 标签列表
      tables: [
        {
          label: '未付款',
          name: 'noPay'
        },
        {
          label: '未发货',
          name: 'noShip'
        },
        {
          label: '以发货',
          name: 'shipped'
        },
        {
          label: '以收货',
          name: 'receipt'
        }
      ],
      // 添加完订单后进行付款的dialog
      openBuyCurrentBookToPayDialog: false,
      // 购物车中的商品列表
      goodsList: [],
      // 付款方式
      paySelect: [
        {
          value: '1',
          label: '支付宝'
        },
        {
          value: '2',
          label: '微信支付'
        },
        {
          value: '3',
          label: '银行卡'
        }
      ],
      // 综合的订单表
      order: {
        // 订单编号
        OrderId: '',
        // 客户编号
        CustomerId: '',
        // 图书名
        BookName: '',
        // 图书编号
        BookId: '',
        // 图书原价
        BookPrice: '',
        // 图书折扣价
        BookDiscount: '',
        // 图书现价
        BookMprice: '',
        // 订购数量
        ordermount: 1,
        // 下单日期
        Orderdate: '',
        // 是否支付
        isPlay: '0',
        // 支付方式
        paymethod: '1',
        // 支付时间 如果没有支付 则为空 如果付款 则设置当前时间
        payTime: '',
        // 留言
        message: '',
        // 收货地址
        address: '',
        // 总卖出价
        totalprice: ''
      }
    }
  },
  created () {
    // 获取订单列表
    this.getShopOrderGoodsList()
  },
  methods: {
    // 获取当前账户的订单列表列表分为四种状态
    getShopOrderGoodsList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取订单列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopGetUserOrderList().then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()

          this.orderList = res.data.data.orderList

          this.orderList.forEach((item, index) => {
            if (item.BookPic.substring(0, 4) !== 'http') {
              item.BookPic = 'http://localhost:3000/' + item.BookPic
            }
          })
          // 进行过滤
          this.fileterOrderList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取订单列表失败, 请重试')
        loading.close()
      })
    },
    // 对订单列表进行过滤 来改变当前订单列表
    fileterOrderList () {
      console.log(this.activeName)
      // 未付款
      if (this.activeName === 'noPay') {
        this.currentOrderList = this.orderList.filter((item, index) => {
          return item.isPlay === '0'
        })
      // 未发货
      } else if (this.activeName === 'noShip') {
        this.currentOrderList = this.orderList.filter((item, index) => {
          return item.isPlay === '1' && item.isShip === '0'
        })
      // 未收货
      } else if (this.activeName === 'shipped') {
        this.currentOrderList = this.orderList.filter((item, index) => {
          return item.isPlay === '1' && item.isShip === '1' && item.isReceipt === '0'
        })
      // 已收货
      } else if (this.activeName === 'receipt') {
        this.currentOrderList = this.orderList.filter((item, index) => {
          return item.isPlay === '1' && item.isShip === '1' && item.isReceipt === '1'
        })
      }
    },
    // 切换选项卡
    handleClick (tab, event) {
      this.fileterOrderList()
    },
    // 未付款 删除订单
    confirmDeleteOrder (index, row) {
      if (!this.isLogin()) {
        return
      }
      this.currentShopCarId = row.shopCarId
      this.$confirm('确定删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 进行删除
        this.deleteOrderGood(row)
      }).catch(() => {
      })
    },
    deleteOrderGood (row) {
      let loading = this.$loading({
        lock: true,
        text: '正在删除订单',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopDeleteUserOrderGoods({
        id: row.id
      }).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)

          this.$message.success(res.data.message)
          loading.close()
          // 更新购物车中商品的数量
          this.$store.commit('setOrderCount')
          // 重新获取列表
          this.getShopOrderGoodsList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('删除订单失败, 请重试')
        loading.close()
      })
    },
    // 进行付款
    toPay () {
      let loading = this.$loading({
        lock: true,
        text: '正在支付订单',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopUpdateUserOrderGoodsNoShip({
        id: this.currentOrderGoodsId
      }).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)

          this.$message.success(res.data.message)
          loading.close()
          // 更新购物车中商品的数量
          this.$store.commit('setOrderCount')
          // 重新获取列表
          this.getShopOrderGoodsList()
          // 重置订单表
          this.restOrder()
          // 关闭面板
          this.openBuyCurrentBookToPayDialog = false
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('支付订单失败, 请重试')
        loading.close()
      })
    },
    // 进行收货
    toReceipt (index, row) {
      let loading = this.$loading({
        lock: true,
        text: '正在收货',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopUpdateUserOrderGoodsReceipt({
        id: row.id
      }).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)

          this.$message.success(res.data.message)
          loading.close()
          // 更新购物车中商品的数量
          this.$store.commit('setOrderCount')
          // 重新获取列表
          this.getShopOrderGoodsList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('收货失败, 请重试')
        loading.close()
      })
    },
    // 格式化注册日期
    formatterDate (row, column) {
      return moment(row.Orderdate).format('YYYY-MM-DD HH:ss:mm')
    },
    // 格式化注册日期
    formatterDatePay (row, column) {
      return moment(row.payTime).format('YYYY-MM-DD HH:ss:mm')
    },
    // 验证是否登陆
    isLogin () {
      // 如果没有登录
      if (!this.user_me) {
        this.$message.info('请您登陆购买')
        this.$router.push('/shop/login')
        return false
      } else {
        return true
      }
    },
    // 购买商品 赋值订单对象
    buyOrderGood (index, row) {
      // 对订单表进行赋值
      this.setOrder(row)
      // 打开面板
      this.openBuyCurrentBookToPayDialog = true
      // 赋值当前所支付的id
      this.currentOrderGoodsId = row.id
    },
    // 订单表赋值
    setOrder (row) {
      this.order.OrderId = row.OrderId
      this.order.CustomerId = row.CustomerId
      this.order.BookName = row.BookName
      this.order.BookId = row.BookId
      this.order.BookPrice = row.BookPrice
      this.order.BookDiscount = row.BookDiscount
      this.order.BookMprice = row.BookMprice
      this.order.ordermount = row.ordermount
      this.order.Orderdate = row.Orderdate
      this.order.address = row.address
      this.order.totalprice = row.totalprice
    },
    // 重置订单表
    restOrder () {
      this.order = {
        // 订单编号
        OrderId: '',
        // 客户编号
        CustomerId: '',
        // 图书名
        BookName: '',
        // 图书编号
        BookId: '',
        // 图书原价
        BookPrice: '',
        // 图书折扣价
        BookDiscount: '',
        // 图书现价
        BookMprice: '',
        // 订购数量
        ordermount: 1,
        // 下单日期
        Orderdate: '',
        // 是否支付
        isPlay: '0',
        // 支付方式
        paymethod: '1',
        // 支付时间 如果没有支付 则为空 如果付款 则设置当前时间
        payTime: '',
        // 留言
        message: '',
        // 收货地址
        address: '',
        // 总卖出价
        totalprice: ''
      }
    },
    // 关闭付款窗口之前
    colseBuyBookToPayDiaLogBefor (done) {
      this.$confirm('是否取消付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 关闭窗口
        done()
        // 重置订单表
        this.restOrder()
        this.$message({
          type: 'info',
          message: '已取消付款'
        })
      }).catch(() => {
      })
    },
    // 在付款窗口点击取消时 取消付款
    cancelPay () {
      this.$confirm('是否取消付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 关闭窗口 添加订单（未付款）
        this.openBuyCurrentBookToPayDialog = false
        this.restOrder()
        this.$message({
          type: 'info',
          message: '已取消付款'
        })
      }).catch(() => {
      })
      // 取消付款
    }
  },
  components: {
    shopHeader
  },
  watch: {

  },
  computed: {
    // 当前登录的用户信息
    user_me () {
      if (cookie.get('user_me')) {
        return JSON.parse(cookie.get('user_me'))
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .header {
      height: 100px;
      border-bottom: 3px solid $danger-color;
      .shop-w {
        height: 100%;
        .header-row {
          display: flex;
          align-items: center;
          height: 100%;
          .header-col {
            display: flex;
            align-items: center;
            .logo {
              width: 40%;
            }
            .shop-title {
              font-family: 'Microsoft YaHei';
              font-size: 24px;
              font-weight: 600;
            }
          }
        }
      }
    }
  .book-outline-bottom-line {
    width: 100%;
    height: 1px;
    margin-top: 2px;
    margin-bottom: 2px;
    border-bottom: 1px dotted $bg-color-gray;
  }
  .main {
    display: flex;
    .content {
      width: 1200px;
    }
    .span-box {
      height: 40px;
      width: calc((100% - 1200px) / 2);
      background-color: #f5f5f5;
    }
  }
  .p-col {
    line-height: 40px;
    .p-title {
      font-weight: 600;
    }
    .p-content {

    }
  }
  .p-total-price {
    font-size: 22px;
    line-height: 60px;
  }
  .p-total-price-content {
    line-height: 60px;
    font-size: 32px;
    color: $danger-color;
  }
</style>
