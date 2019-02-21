<template>
  <div class="shop-layout">
    <shop-header></shop-header>
    <div class="header">
       <div class="shop-w">
         <el-row class="header-row" type="flex" :gutter="0">
            <el-col class="header-col" :span="5">
              <img class="logo" src="/static/img/login_blue.png" alt="">
              <h1 class="shop-title">我的购物车</h1>
            </el-col>
            <el-col :span="4">
            </el-col>
         </el-row>
       </div>
    </div>
    <div class="shop-layout">
      <div class="shop-w">
        <div class="goods-table">
          <el-table
            ref="multipleTable"
            :data="goodsList"
            tooltip-effect="dark"
            style="width: 100%"
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
              label="书名"
              prop="BookName"
              :show-overflow-tooltip="true"
              align="center">
            </el-table-column>
            <el-table-column
              label="书籍原价(￥)"
              prop="BookPrice"
              align="center">
            </el-table-column>
            <el-table-column
              label="折扣"
              prop="BookDiscount"
              align="center">
            </el-table-column>
            <el-table-column
              label="书籍现价(￥)"
              prop="BookMprice"
              align="center">
            </el-table-column>
            <el-table-column
              label="购买数量"
              prop="ordermount"
              align="center">
              <template slot-scope="scope">
                <el-input-number size="mini" v-model="scope.row.ordermount" :min="1" :max="scope.row.BookStoremount"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  style="margin-top: 5px"
                  size="mini"
                  type="danger"
                  @click="deleteShopCarGood(scope.$index, scope.row)">删除
                </el-button>
                <el-button
                  size="mini"
                  type="primary"
                  @click="buyShopCarGood(scope.$index, scope.row)">购买
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
              <!-- 取消付款  添加订单订单状态为未付款 -->
              <el-button @click="cancelPay" type="primary">
                取 消
              </el-button>
            </el-col>
            <el-col :span="5">
              <!-- 付款 状态为未发货 -->
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
import utils from '../../../utils/index.js'
import moment from 'moment'
import shopHeader from '../header'
export default {
  data () {
    return {
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
    // 获取购物车商品列表
    this.getShopCarGoodsList()
  },
  methods: {
    // 获取购物车中的商品列表
    getShopCarGoodsList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取购物车商品列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopGetUserShopCarGoods().then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()

          this.goodsList = res.data.data.goodList

          this.goodsList.forEach((item, index) => {
            if (item.BookPic.substring(0, 4) !== 'http') {
              item.BookPic = 'http://localhost:3000/' + item.BookPic
            }
          })
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取购物车商品列表失败, 请重试')
        loading.close()
      })
    },
    // 删除商品
    deleteShopCarGood () {

    },
    // 购买商品 赋值订单对象
    buyShopCarGood (index, row) {
      console.log(row)
      this.setOrder(row)
      this.openBuyCurrentBookToPayDialog = true
    },
    // 订单表赋值
    setOrder (row) {
      this.order.OrderId = utils.getOrderId()
      this.order.CustomerId = this.user_me.CustomerId
      this.order.BookName = row.BookName
      this.order.BookId = row.BookId
      this.order.BookPrice = row.BookPrice
      this.order.BookDiscount = row.BookDiscount
      this.order.BookMprice = row.BookMprice
      this.order.ordermount = row.ordermount
      this.order.Orderdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      this.order.address = row.address
      this.order.totalprice = row.BookMprice * row.ordermount
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
        // 关闭窗口 添加订单（未付款）
        done()
        this.cancelPayAddOrder()
        this.$message({
          type: 'info',
          message: ''
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
        this.cancelPayAddOrder()
        this.$message({
          type: 'info',
          message: ''
        })
      }).catch(() => {
      })
      // 取消付款
    },
    // 进行付款
    toPay () {
      this.order.isPlay = '1'
      this.order.payTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      // 添加订单 付款状态为已付款
      this.cancelPayAddOrder()
    },
    // 添加订单
    cancelPayAddOrder () {
      if (!this.isLogin()) {
        return
      }
      let loading = this.$loading({
        lock: true,
        text: '正在添加订单',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopAddOrder(this.order).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)

          this.$message.success(res.data.message)
          loading.close()
          // 更新订单中的数量
          this.$store.commit('setOrderCount')
          // 付款关闭窗口 并重置订单表单
          this.openBuyCurrentBookToPayDialog = false
          // 重置
          this.restOrder()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('添加订单失败, 请重试')
        loading.close()
      })
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
    }
  },
  components: {
    shopHeader
  },
  computed: {
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
  .goods-table {
    width: 100%;
    margin-top: 30px;
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
