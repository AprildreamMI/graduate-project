<template>
  <layout>
    <!-- 左侧边栏 -->
    <left-sidebar>
      <div class="logo">
        <img :src="'http://localhost:3000/'+admin_me.AdminAvatar" alt="">
        <h3 class="text-24-R">管理员：{{ admin_me.AdminName }}</h3>
        <div></div>
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
    h3 {
      margin-bottom: 20px;
    }
    div {
      width: 90%;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
