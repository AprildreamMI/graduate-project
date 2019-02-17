<template>
  <right-content>
    <content-header>
      <div class="search-box">
        <div class="search-box-input">
          <el-input
            placeholder="输入用户昵称进行搜索"
            prefix-icon="el-icon-search"
            v-model="searchText"
            clearable
            @blur="searchUser">
          </el-input>
        </div>
        <!-- <el-button type="primary" @click="searchUser">搜索</el-button> -->
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
            align="center"
            :width="40">
          </el-table-column>
          <el-table-column
            prop="CustomerName"
            align="center"
            label="昵称"
            :width="80"
            >
          </el-table-column>
          <el-table-column
            prop="CustomerTrueName"
            align="center"
            label="姓名"
            :width="80"
            >
          </el-table-column>
          <el-table-column
            prop="CustomerSex"
            align="center"
            label="性别"
            :formatter="formatterSex"
            :width="50">
          </el-table-column>
          <el-table-column
            prop="CustomerEmail"
            align="center"
            label="邮箱"
            >
          </el-table-column>
          <el-table-column
            prop="CustomerTel"
            align="center"
            label="电话"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="CustomerAddr"
            align="center"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="CustomerRegTime"
            align="center"
            :formatter="formatterRegTimeDate"
            label="注册时间">
          </el-table-column>
          <el-table-column
            prop="CustomerLastLogTime"
            align="center"
            :formatter="formatterLastLogTimeDate"
            label="最近登录">
          </el-table-column>
          <el-table-column
            prop="CustomerLogCount"
            align="center"
            label="登录次数"
            :width="80">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.CustomerStatus"
                active-value = '1'
                inactive-value = '0'
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeUserStatus(scope.row.CustomerStatus, scope.row.CustomerId)"
                title="禁用或者启用账号">
              </el-switch>
              <el-button
              style="margin-top: 5px"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.CustomerId)">删除
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
import moment from 'moment'

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
      if (row.CustomerStatus === '2') {
        return 'warning-row'
      }
      return ''
    },
    // 搜索
    searchUser () {
      this.pageNum = 1
      this.getUsersList()
    },
    // 获取用户列表
    getUsersList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取账号列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminGetUserList({
        searchText: String.trim(this.searchText),
        total: this.total,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data)

          this.userList = res.data.data.userList
          this.total = res.data.data.total
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
    // 禁用或启用账户
    changeUserStatus (newStatus, id) {
      let loading = this.$loading({
        lock: true,
        text: '正在改变用户账号状态',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminChangeUserStatus({
        newStatus: newStatus,
        userId: id
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          // 刷新列表
          this.getUsersList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('改变用户账号状态失败, 请重试')
        loading.close()
      })
    },
    // 删除用户
    handleDelete (index, id) {
      let loading = this.$loading({
        lock: true,
        text: '正在删除用户账号',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminDeleteUserAccount({
        userId: id
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          // 刷新列表
          this.getUsersList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('删除用户账号状态失败, 请重试')
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
    },
    // 性别格式化内容
    formatterSex (row, column) {
      return row.CustomerSex === '1' ? '男' : '女'
    },
    // 格式化注册日期
    formatterRegTimeDate (row, column) {
      return moment(row.CustomerRegTime).format('YYYY-MM-DD HH:mm:ss')
    },
    formatterLastLogTimeDate (row, column) {
      if (!row.CustomerLastLogTime) {
        return '从未登陆'
      } else {
        return moment(row.CustomerLastLogTime).format('YYYY-MM-DD HH:mm:ss')
      }
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
