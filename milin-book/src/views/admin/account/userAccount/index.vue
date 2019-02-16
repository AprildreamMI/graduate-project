<template>
  <right-content>
    <content-header>
      <div class="search-box">
        <div class="search-box-input">
          <el-input
            placeholder="输入用户昵称进行搜索"
            prefix-icon="el-icon-search"
            v-model="searchText">
          </el-input>
        </div>
        <el-button type="primary">搜索</el-button>
      </div>
    </content-header>
    <div class="account-content">
      <div class="user-table">
        <el-table
          border
          header-align="center"
          :data="userList"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            type="index"
            :index="1"
            :width="40">
          </el-table-column>
          <el-table-column
            prop="customerName"
            align="center"
            label="昵称"
            :width="70"
            >
          </el-table-column>
          <el-table-column
            prop="customerTrueName"
            align="center"
            label="姓名"
            :width="80"
            >
          </el-table-column>
          <el-table-column
            prop="customerSex"
            align="center"
            label="性别"
            :width="50">
          </el-table-column>
          <el-table-column
            prop="customerEmail"
            align="center"
            label="邮箱"
            >
          </el-table-column>
          <el-table-column
            prop="customerTel"
            align="center"
            label="电话"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="customerAddr"
            align="center"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="customerRegTime"
            align="center"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="customerLastLogTime"
            align="center"
            label="最近登录">
          </el-table-column>
          <el-table-column
            prop="customerLogCount"
            align="center"
            label="登录次数"
            :width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.customerStatus"
                active-value = '1'
                inactive-value = '2'
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
              <el-button
              style="margin-top: 5px"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  </right-content>
</template>
<script>
import * as api from '../../../../api'

export default {
  data () {
    return {
      // 搜索的关键字
      searchText: '',
      // 总页数
      total: 100,
      // 当前页
      pageNum: 1,
      // 每页多少条数据
      pageSize: 10,
      userList: []
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 行状态
    tableRowClassName ({row, rowIndex}) {
      if (row.customerStatus === '2') {
        return 'warning-row'
      }
      return ''
    },
    // 获取用户列表
    getUsersList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取账号列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminGetUserList({
        searchText: this.searchText,
        total: this.total,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data)

          this.userList = res.data.data.userList
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取用户账号列表失败, 请重试')
        loading.close()
      })
    },
    // 上一页
    prevPage () {
      this.pageNum--
      this.getUsersList()
    },
    // 下一页
    nextPage () {
      this.pageNum++
      this.getUsersList()
    },
    // 当前页
    currentPage (currentPage) {
      this.pageNum = currentPage
      this.getUsersList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    &-input {
      width: 200px;
    }
  }
  .account-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 20px 20px 0 20px;
    min-width: 1090px;
    overflow: auto;
    background-color: white;
    .user-table {
      width: 100%;
      height: 90%;
    }
    .pagination-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }
</style>
