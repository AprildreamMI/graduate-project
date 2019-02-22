<template>
  <right-content>
    <content-main>
<!--       <div class="title text-24-R">
        数据统计
      </div> -->
      <el-row class="row" type="flex" justify="space-between">
        <el-col :span = 6 class="col">
          <router-link to="user" tag="div" class="col-content">
            <div class="col-content-left">
              <h1>{{ userCount }}</h1>
              <h3>用户总数量</h3>
            </div>
            <div class="col-content-right">
              <i class="iconfont icon-icon-"></i>
            </div>
          </router-link>
        </el-col>
        <el-col :span = 6 class="col">
          <router-link to="typeBook" tag="div" class="col-content">
            <div class="col-content-left">
              <h1>{{ bookCount }}</h1>
              <h3>书籍总数量</h3>
            </div>
            <div class="col-content-right">
              <i class="iconfont icon-bingtu"></i>
            </div>
          </router-link>
        </el-col>
        <el-col :span= 6 class="col">
          <router-link to="order" tag="div" class="col-content">
            <div class="col-content-left">
              <h1>{{ orderCount }}</h1>
              <h3>订单总数量</h3>
            </div>
            <div class="col-content-right">
              <i class="iconfont icon-zhuzhuangtu"></i>
            </div>
          </router-link>
        </el-col>
      </el-row>
      <div class="charts-box">
        <router-view></router-view>
      </div>
    </content-main>
  </right-content>
</template>
<script>
import * as api from '../../../api'
/* import vEcharts from 'vue-echarts-v3/src/lite.js'
// 引入标题组件
import 'echarts/lib/component/title'
// 引入图例组件
import 'echarts/lib/component/legend'
// 引入提示框组件
import 'echarts/lib/component/tooltip'
// 引入工具箱组件
import 'echarts/lib/component/toolbox'
// 引入饼图
import 'echarts/lib/chart/pie'

import option from './option.js' */

export default {
  data () {
    return {
      // 状态
      statusClass: 'user',
      // 用户的总数量
      userCount: '',
      // 书籍数量
      bookCount: '',
      // 订单数量
      orderCount: ''
    }
  },
  created () {
    // 获取用户的数量
    this.getUserCount()
    // 获取书籍数量
    this.getBookCount()
    // 获取订单数量
    this.getOrderCount()
    // 获取分类数量
    // this.getTypeBookCount()
  },
  methods: {
    // 获取用户的数量
    getUserCount () {
      api.adminGetUserCount().then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.userCount = res.data.data.userCount
        } else {
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 获取用户的数量
    getBookCount () {
      api.adminGetBookCount().then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.bookCount = res.data.data.bookCount
        } else {
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 获取订单的数量
    getOrderCount () {
      api.adminGetOrderCount().then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.orderCount = res.data.data.orderCount
        } else {
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 获取分类书籍的数量
    getTypeBookCount () {
      api.adminGetTypeBookCount().then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.typeCount = res.data.data.typeCount
        } else {
        }
      }).catch(error => {
        console.error(error)
      })
    }
  },
  components: {
  }

}
</script>
<style lang="scss" scoped>
  .row {
    width: 100%;
    height: 110px;
    margin-bottom: 20px;
    .col {
      height: 100%;
      &-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: white;
        box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
        cursor: pointer;
        transition: all 0.3s ease;
        &.active {
          background-color: #409EFF;
          color: white;
        }
        &-left {
          h1 {
            font-size: 38px;
            font-weight: 600;
            font-family:Microsoft YaHei;
          }
          h3 {
            font-size: 20px;
            font-weight: 500;
            font-family:Microsoft YaHei;
          }
        }
        &-right {
          i {
            font-size: 50px;
          }
        }
      }
    }
  }
  .charts-box {
    width: 100%;
    height: 780px;
    display: flex;
    // justify-content: center;
    // align-items: center;
    background-color: white;
    box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
  }
</style>
