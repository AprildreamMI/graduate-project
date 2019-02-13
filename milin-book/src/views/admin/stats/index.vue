<template>
  <right-content>
    <content-main>
<!--       <div class="title text-24-R">
        数据统计
      </div> -->
      <el-row class="row" type="flex" justify="space-between">
        <el-col :span = 5 class="col">
          <div class="col-content" :class="{'active': statusClass === 'user'}" @click="statusClass = 'user'">
            <div class="col-content-left">
              <h1>2000</h1>
              <h3>用户数量</h3>
            </div>
            <div class="col-content-right">

            </div>
          </div>
        </el-col>
        <el-col :span = 5 class="col">
          <div class="col-content" :class="{'active': statusClass === 'book'}" @click="statusClass = 'book'">
            <div class="col-content-left">
              <h1>2800</h1>
              <h3>书籍数量</h3>
            </div>
            <div class="col-content-right">

            </div>
          </div>
        </el-col>
        <el-col :span=5 class="col">
          <div class="col-content" :class="{'active': statusClass === 'order'}" @click="statusClass = 'order'">
            <div class="col-content-left">
              <h1>2100</h1>
              <h3>订单数量</h3>
            </div>
            <div class="col-content-right">

            </div>
          </div>
        </el-col>
        <el-col :span=5 class="col">
          <div class="col-content" :class="{'active': statusClass === 'comment'}" @click="statusClass = 'comment'">
            <div class="col-content-left">
              <h1>1000</h1>
              <h3>评论数量</h3>
            </div>
            <div class="col-content-right">

            </div>
          </div>
        </el-col>
      </el-row>
      <div class="charts-box">

      </div>
    </content-main>
  </right-content>
</template>
<script>
export default {
  data () {
    return {
      statusClass: 'user'
    }
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
      }
    }
  }
  .charts-box {
    width: 100%;
    height: 780px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
  }
</style>
