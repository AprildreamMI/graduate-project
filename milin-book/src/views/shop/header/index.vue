<template>
    <div class="shop-header">
      <div class="shop-w">
        <div class="shop-header-content">
          <div class="shop-header-content-left">
            <div class="shop-header-content-left-home">
              <i class="iconfont icon-shouyeshouye"></i>
              <p class="text-14-R">密林的书店首页</p>
            </div>
          </div>
          <div v-if="user_me" class="shop-header-content-right">
            <div class="shop-header-content-right-user">
              <el-popover
                ref="popover_userName"
                placement="bottom"
                width="200"
                trigger="hover">
                <div class="popover-content">
                  <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
                    <el-col :span="11">
                      <img class="user-avatar" width="100%" :src="`http://localhost:3000/${user_me.CustomerAvatar}`" alt="">
                    </el-col>
                    <el-col :span="2">
                      <div class="bg-div">

                      </div>
                    </el-col>
                    <el-col :span="11">
                      <div class="right-handel">
                        <el-button plain type="primary" size="mini">编辑信息</el-button>
                        <el-button plain type="danger" size="mini">注销登陆</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-popover>
              <div v-popover:popover_userName class="user-name hover-red">
                {{ user_me.CustomerName }}
              </div>
            </div>
            <i class="iconfont icon-vertical_line"></i>
            <div class="shop-car hover-red" >
              <i class="iconfont icon-htmal5icon29"></i>
              <el-badge :value="shopCarCount" type="warning" class="item">
                <p class="hover-red">我的购物车</p>
              </el-badge>
            </div>
            <i class="iconfont icon-vertical_line"></i>
            <div class="order hover-red">
              <i class="iconfont icon-dingdan"></i>
              <el-badge :value="8" class="item">
                <p class="hover-red">我的订单</p>
              </el-badge>
            </div>
          </div>
          <div v-else  class="shop-header-content-right">
            <p class="login-p">您好，欢迎光临密林，请
              <span class="login-span">登陆</span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import * as api from '../../../api'
import cookie from '../../../utils/cookie.js'
export default {
  data () {
    return {

    }
  },
  created () {
    this.getShopCarCount()
  },
  methods: {
    // 获取当前账户购物车中的数量
    getShopCarCount () {
      api.shopGetShopCarCount(this.shopCar).then(res => {
        if (res.data.code === 0) {
          console.log(res.data)
          this.$store.commit('setShopCarCount', res.data.data.shopCarCount)
          // this.$message.success(res.data.message)
        } else {
          // this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.error(error)
      })
    }
  },
  computed: {
    user_me () {
      if (cookie.get('user_me')) {
        return JSON.parse(cookie.get('user_me'))
      }
      return {}
    },
    // 购物车中的胡亮
    shopCarCount () {
      return this.$store.state.shopCarCount
    }
  }
}
</script>
<style lang="scss" scoped>
  .shop-header {
    height: 36px;
    border-bottom: 1px solid $bg-color-gray;
    background-color: #f5f5f5;
    color: #6C6C6C;
    cursor: pointer;
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 36px;
      &-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        &-home {
          display: flex;
          justify-content: space-around;
          align-items: center;
          i {
            margin-right: 5px;
          }
          &:hover {
            color: $danger-color;
          }
        }
      }
      &-right {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        i {
          font-size: 20px;
        }
        &-user {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          .user-name {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
        }
        .shop-car {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          i {
            color: $danger-color;
            margin-right: 5px;
          }
        }
        .order {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          i {
            color: $danger-color;
            margin-right: 5px;
          }
        }
        .login-p {
          .login-span {
            color: $danger-color;
          }
        }
      }
    }
  }
  .popover-content {
    width: 100%;
    padding: 10px;
    .user-avatar {
      width: 80%;
      border-radius: 50%;
    }
    .bg-div {
      margin: 0 auto;
      width: 1px;
      height: 100%;
      background-color: #6C6C6C;
    }
    .right-handel {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      button  {
        margin-top: 5px;
      }
    }
  }
</style>
