<template>
  <div class="shop-layout">
    <div class="shop-header">
      <div class="shop-w">
        <div class="shop-header-content">
          <div class="shop-header-content-left">
            <div class="shop-header-content-left-home">
              <i class="iconfont icon-shouyeshouye"></i>
              <p class="text-14-R">密林的书店首页</p>
            </div>
          </div>
          <div class="shop-header-content-right">
            <div class="shop-header-content-right-user">
              <p>用户</p>
            </div>
            <i class="iconfont icon-vertical_line"></i>
            <p>密林的书店首页2</p>
            <i class="iconfont icon-vertical_line"></i>
            <p>密林的书店首页3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {

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
            color: black;
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
          height: 100%;

        }
      }
    }
  }
</style>
