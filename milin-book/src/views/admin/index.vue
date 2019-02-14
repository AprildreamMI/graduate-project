<template>
  <layout>
    <!-- 左侧边栏 -->
    <left-sidebar>
      <div class="logo">
        <img :src="'http://localhost:3000/'+admin_me.AdminAvatar" alt="">
        <div class="logo-title-box">
          <h2 class="text-24-R">管理员:</h2>
          <div class="logo-title-box-name">
            <p class="text-24-R">{{ admin_me.AdminName }}</p>
            <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
              <div slot="content">
                管理员等级<br/>
                等级一：图书管理<br/>
                等级二：图书管理，订单管理<br/>
                等级三：图书管理，订单管理，账号管理<br/>
              </div>
              <i class="iconfont" :class="admin_me.AdminFlag === '3'? 'icon-level3' : admin_me.AdminFlag === '2'? 'icon-level2' : 'icon-level1'"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="border-box"></div>
      </div>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        :router="true">
        <el-menu-item index="/admin/stats">
          <i class="iconfont icon-tongji2 alibaba-icont"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <!-- 权限小于3的，不能进行账号的管理 -->
        <el-submenu index="/admin/account" :disabled="Number(admin_me.AdminFlag) < 3">
          <template slot="title">
            <i class="iconfont icon-tuandui alibaba-icont"></i>
            <span>账号管理</span>
          </template>
            <el-menu-item index="/admin/account/adminAccount">
              <i class="iconfont icon-guanliyuan alibaba-icont"></i>
              <span slot="title">管理员账号</span>
            </el-menu-item>
            <el-menu-item index="/admin/account/userAccount">
              <i class="iconfont icon-yonghu alibaba-icont"></i>
              <span slot="title">用户账号</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item index="3">
          <i class="iconfont icon-shu alibaba-icont"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <!-- 权限小于2的不能进行订单的管理 -->
        <el-menu-item index="4" :disabled="Number(admin_me.AdminFlag) < 2">
          <i class="iconfont icon-dingdan alibaba-icont"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="iconfont icon-chat alibaba-icont"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
      </el-menu>
    </left-sidebar>
    <!-- 右主要内容区 -->
    <router-view></router-view>
  </layout>
</template>
<script>
import cookie from '../../utils/cookie.js'
export default {
  data () {
    return {
    }
  },
  computed: {
    admin_me () {
      return JSON.parse(cookie.get('admin_me'))
    },
    active () {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
  .logo {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    img {
      display: block;
      width: 80%;
      margin-bottom: 10px;
    }
    &-title-box {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      margin-bottom: 20px;
      height: 35px;
      h2 {
        margin-right: 10px;
      }
      &-name {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 16px;
            margin-left: 5px;
          }
        .icon-level3 {
          &::before {
            color: $danger-color
          }
        }
        .icon-level2 {
          &::before {
            color: $primary-color
          }
        }
        .icon-level1 {
          &::before {
            color: rgb(39, 39, 39)
          }
        }
      }
    }
    .border-box {
      width: 90%;
      height: 1px;
      border-bottom: 1px solid $bg-color-gray;
      transition: all .3s ease;
      transform-origin: center;
    }
    &:hover {
      .border-box {
        border-color: $primary-sub-color;
      }
    }
  }
</style>
