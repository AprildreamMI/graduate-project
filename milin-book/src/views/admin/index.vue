<template>
  <layout>
    <!-- 左侧边栏 -->
    <left-sidebar>
      <div class="logo">
        <img src="/static/img/login_blue.png" alt="">
        <h3 class="text-24-R">管理员：赵思</h3>
        <div></div>
      </div>
      <el-menu
        default-active="/admin/stats"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router="true">
        <el-menu-item index="/admin/stats">
          <i class="iconfont icon-tongji2 alibaba-icont"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-tuandui alibaba-icont"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <i class="iconfont icon-guanliyuan alibaba-icont"></i>
              <span slot="title">管理员账号</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <i class="iconfont icon-yonghu alibaba-icont"></i>
              <span slot="title">用户账号</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="iconfont icon-shu alibaba-icont"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <el-menu-item index="4">
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
export default {

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
