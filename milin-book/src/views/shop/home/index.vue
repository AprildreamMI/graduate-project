<template>
  <div class="shop-layout">
    <shop-header></shop-header>
    <div class="header-search">
      <div class="shop-w">
        <div class="header-search-content">
          <el-row type="flex" :gutter="0" class="header-search-content-row" justify="space-between">
            <el-col class="row-col logo-col" :span="4">
              <img class="logo" src="/static/img/login_blue.png" alt="">
            </el-col>
            <el-col class="row-col" :span="3">
            </el-col>
            <el-col class="row-col" :span="10">
              <el-input
                placeholder="选择分类，输入书名搜索"
                @keyup.enter.native="searchUser"
                v-model="searchText">
                <el-select v-model="currentTypeId" slot="prepend" placeholder="请选择">
                  <el-option
                    v-for="item in bookTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-input>
            </el-col>
            <el-col class="row-col" :span="3">
            </el-col>
            <el-col class="row-col" :span="4">

            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="shop-layout main">
      <div class="span-box"></div>
      <div class="content">
        <el-tabs  v-model="currentTypeId" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in bookTypeList" :label="item.label" :name="item.value" :key="index">
            <div class="tab-contnet">
              <div v-for="(item, index) in bookList" :key="index" class="book-item" @click="buyBook(item)">
                <img :src="item.BookPic" alt="">
                <p class="book-name" :title="item.BookName">{{ item.BookName }}</p>
                <p class="book-author" :title="item.BookAuthor">{{ item.BookAuthor }}</p>
                <div class="book-price-box">
                  <p class="book-price">￥{{ item.BookPrice }}</p>
                  <p class="book-mprice">￥{{ item.BookMprice }}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="pagination-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @prev-click="prevPage"
            @next-click="nextPage"
            @current-change="currentPage"
            :current-page="pageNum">
          </el-pagination>
        </div>
      </div>
      <div class="span-box">

      </div>
    </div>
    <!-- 添加书籍的窗口 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="openBuyCurrentBookDialog" width="640px" top="50px" :before-close="colseBuyBookDiaLogBefor">
      <div class="handle-title text-16-M">
        书籍购买
      </div>
      <div class="dialog-content">
        <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
          <el-col :span="7">
            <img :src="currentBuyBook.BookPic" alt="">
          </el-col>
          <!-- <el-col :span="1">
          </el-col> -->
          <el-col :span="17">
             <!-- 主标题 -->
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <h1 class="book-name" :title="currentBuyBook.BookName">{{ currentBuyBook.BookName }}</h1>
            </el-row>
            <el-row>
              <div class="book-name-bottom-line"></div>
            </el-row>
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <h2 class="book-outline" :title="currentBuyBook.BookOutline">{{ currentBuyBook.BookOutline }}</h2>
            </el-row>
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <div class="book-outline-bottom-line"></div>
            </el-row>
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <el-col :span="7">
                <p class="message">
                  作者：
                  <span class="message-span">
                    {{ currentBuyBook.BookAuthor }}
                  </span>
                </p>
              </el-col>
              <el-col v-if="currentBuyBook.BookTanslor" :span="6">
                <p class="message">
                  译者：
                  <span class="message-span">
                    {{ currentBuyBook.BookTanslor }}
                  </span>
                </p>
              </el-col>
              <el-col :span="11">
                <p class="message">
                  出版社：
                  <span class="message-span">
                    {{ currentBuyBook.BookPress }}
                  </span>
                </p>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <el-col :span="12">
                <p class="message">
                  出版时间：
                  <span class="message-span">
                    {{ currentBuyBook.BookPubDate | dataFormat }}
                  </span>
                </p>
              </el-col>
              <el-col :span="12">
                <p class="message">
                  销量：
                  <span class="message-span">
                    {{ currentBuyBook.BookDealmount }}
                  </span>
                </p>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <div class="pric-content">
                <p class="pric-content-p">
                  <span>￥</span>
                  <span class="mprice">{{ currentBuyBook.BookMprice }}</span>
                  <span class="">（{{ currentBuyBook.BookDiscount }}折）</span>
                  <span class="price-label">
                    定价
                  </span>
                  <span class="price">￥{{ currentBuyBook.BookPrice }}</span>
                </p>
              </div>
            </el-row>
            <el-row type="flex" :gutter="0" class="address-row" justify="space-between">
              <el-col style="line-height: 40px;" :span="4">
                <p>配 送 至</p>
              </el-col>
              <el-col :span="20">
                <v-distpicker @selected="selectAddress"></v-distpicker>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="0" class="address-row" justify="space-between">
              <el-col style="line-height: 40px;" :span="4">
                <p>购买数量</p>
              </el-col>
              <el-col :span="20">
                <el-input-number :min="1" :max="Number(currentBuyBook.BookStoremount)" v-model="ordermount"></el-input-number>
              </el-col>
            </el-row>
            <el-row type="flex" :gutter="0" class="address-row">
              <el-col :span="9">
                <el-button @click="addShopCar" type="primary">
                  加入购物车
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="addOrder" type="danger">
                  立即购买
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-dialog custom-class="my-el-dialog" :visible.sync="openBuyCurrentBookToPayDialog" width="640px" top="50px" :before-close="colseBuyBookToPayDiaLogBefor" append-to-body>
        <div class="handle-title text-16-M">
          付款
        </div>
        <div class="dialog-content">

        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import shopHeader from '../header'
import * as api from '../../../api'
import VDistpicker from 'v-distpicker'
import cookie from '../../../utils/cookie.js'
import moment from 'moment'

export default {
  data () {
    return {
      // 书籍购买的窗口
      openBuyCurrentBookDialog: false,
      // 添加完订单后进行付款的dialog
      openBuyCurrentBookToPayDialog: false,
      // 搜索的关键字
      searchText: '',
      // 当前书籍类型
      currentTypeId: '0',
      // 书籍类型表
      bookTypeList: [],
      // 书籍列表
      bookList: [],
      // 总页数
      total: 0,
      // 当前页
      pageNum: 1,
      // 每页多少条数据
      pageSize: 12,
      // 当前所购买的书籍对象
      currentBuyBook: {
        BookId: '',
        BookName: '',
        BookAuthor: '',
        BookTanslor: '',
        BookPress: '',
        BookTypeId: '',
        BookPrice: '',
        BookDiscount: '',
        BookMprice: '',
        BookPubDate: '',
        BookDealmount: '',
        BookStoremount: '',
        BookSize: '',
        Bookisbn: '',
        BookPackstyle: '',
        BookOutline: '',
        BookPic: ''
      },
      // 收货地址
      address: '',
      // 购买数量
      ordermount: '',
      // 订单表
      order: {
        // 客户编号
        CustomerId: '',
        // 图书编号
        BookId: '',
        // 订购数量
        ordermount: 1,
        // 下单日期
        Orderdate: '',
        // 是否支付
        isPlay: '0',
        // 支付方式
        paymethod: '1',
        // 留言
        message: '',
        // 收货地址
        address: '',
        // 总卖出价
        totalprice: ''
      },
      // 购物车表
      shopCar: {
        CustomerId: '',
        BookId: '',
        ordermount: '',
        goodsStatus: '1',
        address: ''
      }
    }
  },
  created () {
    // 获取书籍类别
    this.getBookTypesList()
    //
  },
  methods: {
    // 获取 分类列表
    getBookTypesList () {
      api.adminGetBookTypeList().then(res => {
        if (res.data.code === 0) {
          // this.$message.success(res.data.message)
          console.log(res.data)

          this.bookTypeList = res.data.data.bookTypeList
          // 添加一个全部
          this.bookTypeList.unshift({
            value: '0',
            label: '全部'
          })
          this.bookTypeList.forEach(item => {
            item.value += ''
          })
          this.getBookList()
        } else {
          // this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取书籍分类列表失败, 请重试')
      })
    },
    // // 获取书籍列表
    getBookList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取书籍列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.shopGetBookList({
        searchText: this.searchText.trim(),
        bookTypeId: Number(this.currentTypeId),
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data.data.bookList)

          this.bookList = res.data.data.bookList.filter(item => {
            return item.BookStatus !== '0'
          })
          this.bookList.forEach((item, index) => {
            if (item.BookPic.substring(0, 4) !== 'http') {
              item.BookPic = 'http://localhost:3000/' + item.BookPic
            }
          })
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取书籍列表失败, 请重试')
        loading.close()
      })
    },
    handleClick (item) {
      this.searchUser()
    },
    // 搜索
    searchUser () {
      this.pageNum = 1
      this.getBookList()
    },
    // 上一页
    prevPage () {
      this.pageNum--
      this.getBookList()
    },
    // 下一页
    nextPage () {
      this.pageNum++
      this.getBookList()
    },
    // 当前页
    currentPage (currentPage) {
      this.pageNum = currentPage
      this.getBookList()
    },
    // 打开 购买书籍 传递书籍对象
    buyBook (item) {
      this.openBuyCurrentBookDialog = true
      this.currentBuyBook = JSON.parse(JSON.stringify(item))
    },
    // 关闭购买书籍的窗口
    colseBuyBookDiaLog () {
      this.openBuyCurrentBookDialog = false
      // 重置
      this.resetBuyBookFrom()
    },
    // 购买书籍窗口关闭之前
    colseBuyBookDiaLogBefor (done) {
      this.$confirm('是否取消购买书籍?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
        // 重置
        this.resetBuyBookFrom()
        this.$message({
          type: 'info',
          message: '已取消购买'
        })
      }).catch(() => {
      })
    },
    // 付款之前
    colseBuyBookToPayDiaLogBefor (done) {
      this.$confirm('是否取消付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
        // 重置 订单表
        this.$message({
          type: 'info',
          message: '已取消付款，在“我的订单”中可以查看'
        })
      }).catch(() => {
      })
    },
    // 重置书籍购买对象
    resetBuyBookFrom () {
      this.currentBuyBook = {
        BookName: '',
        BookAuthor: '',
        BookTanslor: '',
        BookPress: '',
        BookTypeId: '',
        BookPrice: '',
        BookDiscount: '',
        BookMprice: '',
        BookPubDate: '',
        BookDealmount: '',
        BookStoremount: '',
        BookSize: '',
        Bookisbn: '',
        BookPackstyle: '',
        BookOutline: '',
        BookPic: ''
      }
    },
    // 地址的选择
    selectAddress (data) {
      console.log(data)
      this.address = data.province.value + '' + data.city.value + '' + data.area.value
    },
    // 加入购物车
    addShopCar () {
      // 如果没有登录
      if (!this.user_me) {
        this.$message.info('请您登陆购买')
        this.$router.push('/shop/login')
        return
      }
      if (!this.address) {
        this.$message.warning('请选择地址')
        return
      }
      let loading = this.$loading({
        lock: true,
        text: '正在添加书籍到购物车',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      // 对购物车表单进行赋值
      this.setShopCar()
      api.shopAddShopCar(this.shopCar).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)

          this.$message.success(res.data.message)
          loading.close()
          // 关闭窗口
          this.colseBuyBookDiaLog()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取书籍到购物车失败, 请重试')
        loading.close()
      })
    },
    // 赋值购物车表单
    setShopCar () {
      this.shopCar.CustomerId = this.user_me.CustomerId
      this.shopCar.BookId = this.currentBuyBook.BookId
      this.shopCar.ordermount = this.ordermount
      this.shopCar.address = this.address
    },
    // 立即购买 添加订单
    addOrder () {
      // 如果没有登录
      if (!this.user_me) {
        this.$message.info('请您登陆购买')
        this.$router.push('/shop/login')
        return
      }
      if (!this.address) {
        this.$message.warning('请选择地址')
      }
      // 赋值订单
      this.setOrder()
      // 打开订单弹窗 输入留言点击付款时 再进行付款的请求
    },
    // 赋值订单
    setOrder () {
      this.order.CustomerId = this.user_me.CustomerId
      this.order.BookId = this.currentBuyBook.BookId
      this.order.ordermount = this.ordermount
      this.order.Orderdate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      this.order.address = this.address
      this.order.totalprice = this.ordermount * this.currentBuyBook.BookMprice
    }
  },
  components: {
    shopHeader,
    VDistpicker
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
<style lang="scss">
  .el-input--medium .el-input__inner {
    height: 50px;
  }
  .address-row {
    .el-input--medium .el-input__inner {
      height: 36px;
    }
  }
  .el-input__suffix-inner {
    margin-right: 10px;
    .el-input__icon.el-icon-search {
      font-size: 24px;
    }
  }
  .el-tabs__nav-wrap {
    &.is-scrollable {
      &.is-top {
        background-color: #f5f5f5;
      }
    }
  }
  .el-tabs__nav-scroll {
    background-color: #f5f5f5;
  }
  .el-select .el-input {
    width: 120px;
  }
</style>

<style lang="scss" scoped>
  .header-search {
    height: 150px;
    border-bottom: 3px solid $danger-color;
    &-content {
      height: 150px;
      &-row {
        height: 100%;
        .row-col {
          display: flex;
          justify-content: center;
          align-items: center;
          &.logo-col {
            justify-content: flex-start;
          }
          .order-car {
            display: flex;
            width: 100%;
            height: 50px;
            border: 1px solid #000;
            justify-content: center;
            .car {
              display: flex;
              align-items: center;
              justify-content: center;
              flex: 0.5;
              background-color: $danger-color;
              color: white;
              cursor: pointer;
              i {
                font-size: 22px;
              }
              p {
                font-size: 16px;
              }
              .car-num {
                margin-left: 2px;
                margin-top: 5px;
              }
              &:hover {
                background-color: $bg-main-color;
                color: $danger-color;
              }
            }
            .order {
              flex: 0.5;
            }
          }
          .logo {
            width: 80%;
          }
        }
      }
    }
  }
  .shop-header {
    height: 45px;
    border-bottom: 1px solid $bg-color-gray;
    background-color: #f5f5f5;
    color: #6C6C6C;
    cursor: pointer;
  }
  .main {
    display: flex;
    .content {
      width: 1200px;
      .tab-contnet {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        .book-item {
          display: flex;
          flex-direction: column;
          // justify-content: space-between;
          width: 150px;
          height: 250px;
          margin-right: 50px;
          margin-bottom: 25px;
          overflow: visible;
          cursor: pointer;
          &:hover {
            .book-name {
              color: $danger-color;
              text-decoration: underline;
            }
          }
          img {
            display: block;
            width: 150px;
            height: 150px;
          }
          .book-name {
            padding: 7px 20px 0;
            height: 25px;
            line-height: 18px;
            overflow: hidden;
          }
          .book-author {
            padding: 0 20px;
            height: 24px;
            line-height: 24px;
            overflow: hidden;
            color: #aaa;
          }
          .book-price-box {
            display: flex;
            padding-left: 20px;
            line-height: 16px;
            overflow: hidden;
            font-family: "Arial";
            font-size: 14px;
            height: 36px;
            .book-price {
              color: #c30;
              float: left;
              overflow: hidden;
              font-weight: bold;
              margin-right: 12px;
            }
            .book-mprice {
              color: #aaa;
              text-decoration: line-through;
              float: left;
              overflow: hidden;
            }
          }
        }
      }
      .pagination-box {
        display: flex;
        margin-top: 50px;
        margin-bottom: 50px;
        align-items: center;
        justify-content: space-evenly;
        flex: 1;
      }
    }
    .span-box {
      height: 40px;
      width: calc((100% - 1200px) / 2);
      background-color: #f5f5f5;
    }
  }
  // 标题区
  .name-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .book-name {
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
    color: #323232;
    font-family: "Verdana","Microsoft Yahei";
    font-weight: bold;
    font-size: 18px;
  }
  .book-name-bottom-line {
    width: 100%;
    height: 2px;
    margin-top: 2px;
    margin-bottom: 2px;
    background-color: $bg-color-gray;
  }
  .book-outline {
    padding-top: 6px;
    max-height: 96px;
    overflow: hidden;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .book-outline-bottom-line {
    width: 100%;
    height: 1px;
    margin-top: 2px;
    margin-bottom: 2px;
    border-bottom: 1px dotted $bg-color-gray;
  }
  .message {
    margin-bottom: 10px;
    margin-top: 5px;
    &-span {
      color: $primary-color;
    }
  }
  .pric-content {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: flex-end;
    background-color: $bg-main-color;
    margin-bottom: 20px;
    &-p {
      font-size: 14px;
      color: #e52222;
      .mprice {
        font-size: 26px;
      }
      .price-label {
        color: #969696;
      }
      .price {
        text-decoration: line-through;
        color: #969696;
      }
    }
  }
  .address-row {
    margin-bottom: 20px;
  }
</style>
