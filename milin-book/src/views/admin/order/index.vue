<template>
  <right-content>
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
              :width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="折扣"
              prop="BookDiscount"
              :width="50"
              align="center">
            </el-table-column>
            <el-table-column
              label="书籍现价(￥)"
              prop="BookMprice"
              :width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="购买数量"
              prop="ordermount"
              :width="50"
              align="center">
            </el-table-column>
            <el-table-column
              label="总价(￥)"
              prop="totalprice"
              :width="50"
              align="center">
            </el-table-column>
            <el-table-column
              v-if="activeName === 'noShip'"
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="toShip(scope.$index, scope.row)">发货
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </right-content>
</template>
<script>
import * as api from '../../../api'
import cookie from '../../../utils/cookie.js'
// import utils from '../../../utils/index.js'
import moment from 'moment'
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
      ]
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
      api.adminGetrOrderList().then(res => {
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
    // 去发货
    toShip (index, row) {
      let loading = this.$loading({
        lock: true,
        text: '正在发货列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminUpdateOrderShip({
        id: row.id
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          // 进行刷新
          this.getShopOrderGoodsList()
          // 进行过滤
          this.fileterOrderList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('发货失败, 请重试')
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
    }
  },
  computed: {
    // 当前登录的用户信息
    admin_me () {
      if (cookie.get('admin_me')) {
        return JSON.parse(cookie.get('admin_me'))
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .content {
    flex: 1;
    width: 100%;
    // height: 100%;
    padding: 20px 20px 0 20px;
    min-width: 1090px;
    // overflow: auto;
    background-color: white;
  }
</style>
