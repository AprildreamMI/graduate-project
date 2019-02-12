<template>
  <right-content>
    <content-main>
      <div class="title text-24-R">
        数据统计
      </div>
      <el-row class="row" type="flex" justify="space-between">
        <el-col span="5" class="col">
          <div>
            <h1>2000</h1>
            <h3>用户数量</h3>
          </div>
        </el-col>
        <el-col span="5" class="col">
          <div>
            <h1>2800</h1>
            <h3>书籍数量</h3>
          </div>
        </el-col>
        <el-col span="5" class="col">
          <div>
            <h1>2100</h1>
            <h3>订单数量</h3>
          </div>
        </el-col>
        <el-col span="5" class="col">
          <div>
            <h1>1000</h1>
            <h3>评论数量</h3>
          </div>
        </el-col>
      </el-row>
    </content-main>
  </right-content>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
  .row {
    width: 100%;
    height: 200px;
    .col {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 100%;
      background-color: white;
      box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
      div {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title {
    margin-bottom: 20px;
  }
  .item-stats {
    display: flex;
    width: 100%;
    height: 500px;
    &-left {
      width: 150px;
      height: 100%;
      background-color: white;
      box-shadow:0px 1px 7px 2px rgba(40,51,73,0.2);
    }
  }
</style>
