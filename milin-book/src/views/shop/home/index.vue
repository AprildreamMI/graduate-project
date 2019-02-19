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
              <div v-for="(item, index) in bookList" :key="index" class="book-item">
                <img :src="item.BookPic" alt="">
                <p class="book-name">{{ item.BookName }}</p>
                <p class="book-author">{{ item.BookAuthor }}</p>
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
  </div>
</template>
<script>
import shopHeader from '../header'
import * as api from '../../../api'
export default {
  data () {
    return {
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
      pageSize: 12
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
    }
  },
  components: {
    shopHeader
  }
}
</script>
<style lang="scss">
  .el-input--medium .el-input__inner {
    height: 50px;
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
</style>
