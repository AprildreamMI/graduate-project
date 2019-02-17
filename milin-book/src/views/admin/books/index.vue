<template>
  <right-content>
    <content-header>
      <div class="search-box">
        <el-button type="primary" @click="openBookFromDialog = true">添加书籍</el-button>
        <div class="search-box-input">
          <el-input
            placeholder="输入用户昵称进行搜索"
            prefix-icon="el-icon-search"
            v-model="searchText"
            clearable
            @change="searchUser">
          </el-input>
        </div>
        <div class="search-box-select-input">
          <el-select v-model="bookTypeId" @change="searchUser" clearable placeholder="选择分类">
            <el-option
              v-for="item in bookTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </div>
      </div>
    </content-header>
    <div class="account-content">
      <div class="user-table">
        <el-table
          border
          :data="bookList"
          height="100%"
          header-align="center"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="书籍ID">
                  <span>{{ props.row.BookId }}</span>
                </el-form-item>
                <el-form-item label="书籍开本">
                  <span>{{ props.row.BookSize }}</span>
                </el-form-item>
                <el-form-item label="书籍ISBN">
                  <span>{{ props.row.Bookisbn }}</span>
                </el-form-item>
                <el-form-item label="封装方式">
                  <span>{{ props.row.BookPackstyle }}</span>
                </el-form-item>
                <el-form-item label="书籍简介">
                  <span>{{ props.row.BookOutline }}</span>
                </el-form-item>
                <el-form-item label="书籍封面">
                  <img width="150" height="150" :src="props.row.BookPic" alt="">
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :index="1"
            align="center"
            :width="40">
          </el-table-column>
          <el-table-column
            label="书名"
            prop="BookName"
            :show-overflow-tooltip="true"
            align="center"
            :width="150">
          </el-table-column>
          <el-table-column
            label="作者"
            prop="BookAuthor"
            align="center"
            :width="80">
          </el-table-column>
          <el-table-column
            label="译者"
            prop="BookTanslor"
            align="center"
            :formatter="formatterTanslor"
            :width="100">
          </el-table-column>
          <el-table-column
            label="出版社"
            prop="BookPress"
            align="center">
          </el-table-column>
          <el-table-column
            label="类别"
            prop="BookTypeId"
            align="center"
            :formatter="formatterType"
            :min-width="70">
          </el-table-column>
          <el-table-column
            label="原价"
            prop="BookPrice"
            align="center"
            :width="60">
          </el-table-column>
          <el-table-column
            label="折扣"
            prop="BookDiscount"
            align="center"
            :width="50">
          </el-table-column>
          <el-table-column
            label="现价"
            prop="BookMprice"
            align="center"
            :width="60">
          </el-table-column>
          <el-table-column
            label="出版日期"
            prop="BookPubDate"
            align="center"
            :formatter="formatterDate">
          </el-table-column>
          <el-table-column
            label="销量"
            prop="BookDealmount"
            align="center"
            :width="80">
          </el-table-column>
          <el-table-column
            label="库存"
            prop="BookStoremount"
            align="center"
            :width="50">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button
                style="margin-top: 5px"
                size="mini"
                type="primary"
                @click="handleDelete(scope.$index, scope.row.CustomerId)">编辑
              </el-button>
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
    <!-- 添加书籍的窗口 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="openBookFromDialog" width="540px" top="50px">
      <div class="handle-title text-16-M">
        添加书籍
      </div>
      <div class="dialog-content">
        <el-form :model="bookFrom" :rules="bookFromRules" label-position="left" ref="bookFrom" label-width="100px" hide-required-asterisk>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
                <div class="from-item">
                  <el-form-item label="书名" prop="BookName">
                    <div class="item-input">
                      <el-input v-model="bookFrom.AdminName" placeholder="请输入书名"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="作者" prop="BookAuthor">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookAuthor" placeholder="请输入书及作者"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
                <div class="from-item">
                  <el-form-item label="译者" prop="">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookTanslor" placeholder="请输入书籍译者"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="出版社" prop="BookPress">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookPress" placeholder="请输入书籍出版社"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
               <el-form-item label="书籍类别" prop="BookTypeId">
                  <div class="item-input">
                    <el-select v-model="bookFrom.BookTypeId" clearable placeholder="选择分类">
                      <el-option
                        v-for="item in bookTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="书籍定价" prop="BookPrice">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookPrice" placeholder="请输入书籍定价"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="折扣" prop="">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookDiscount" placeholder="请输入折扣，如没有，则不输入"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="书籍现价" prop="BookMprice">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookMprice" placeholder="请输入书籍现价"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="出版日期" prop="">
                    <div class="item-input">
                      <el-date-picker
                        v-model="bookFrom.BookPubDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="库存" prop="BookStoremount">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookStoremount" placeholder="请输入书籍库存量"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="开本" prop="">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookSize" placeholder="请输入书籍开本,不详不输"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="书籍ISBN" prop="Bookisbn">
                    <div class="item-input">
                      <el-input v-model="bookFrom.Bookisbn" placeholder="请输入书籍ISBN"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
             <el-col :span="2">
             </el-col>
             <el-col :span="12">
               <div class="from-item">
                  <el-form-item label="封装方式" prop="">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookPackstyle" placeholder="请输入书籍开本,不详不输"></el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="24">
               <div class="from-item">
                  <el-form-item label="书籍简介" prop="BookOutline">
                    <div class="item-input">
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入书籍简介"
                        v-model="bookFrom.BookOutline">
                      </el-input>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
              <el-col :span="24">
                <div class="from-item">
                  <el-form-item label="上传头像">
                    <div class="item-input img-bg">
                      <el-upload
                        ref="uploadsAvatar"
                        class="avatar-uploader"
                        action="http://localhost:3000/api/admin/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="uploadsError"
                        :on-change="uploadActive"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="bookFrom.BookPic" :src="`http://localhost:3000/${bookFrom.BookPic}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                  </el-form-item>
                </div>
             </el-col>
           </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddAdminAccountDialog('addAccountFrom')">取 消</el-button>
        <el-button type="primary" @click="addAdminAccount('addAccountFrom')">确 定</el-button>
      </span>
    </el-dialog>
  </right-content>
</template>
<script>
import * as api from '../../../api'
import moment from 'moment'

export default {
  data () {
    return {
      // 搜索的关键字
      searchText: '',
      // 类型id
      bookTypeId: '',
      // 总页数
      total: 0,
      // 当前页
      pageNum: 1,
      // 每页多少条数据
      pageSize: 12,
      bookTypeList: [],
      bookList: [],
      openBookFromDialog: false,
      bookFrom: {
        BookName: '马尔克斯：百年孤独（50周年纪念版）',
        BookAuthor: '加西亚·马尔克斯',
        BookTanslor: '',
        BookPress: '南海出版公司',
        BookTypeId: '',
        BookPrice: '55',
        BookDiscount: '7.5',
        BookMprice: '41.3',
        BookPubDate: '1/8/2017 00:00:00',
        BookDealmount: '0',
        BookStoremount: '100',
        BookSize: '32',
        Bookisbn: '9787544291170',
        BookPackstyle: '精装',
        BookOutline: '50周年纪念版！全新典藏内封，限量赠50周年精美魔幻明信片1套。马尔克斯代表作，全球惟一正式授权中文版，未作任何删节！6年发行量超600万册！  ',
        BookPic: 'http://img3m6.ddimg.cn/83/20/25138856-1_l_2.jpg'
      },
      // 表单验证
      bookFromRules: {
        BookName: [
          { required: true, message: '请输入书籍名', trigger: 'blur' }
        ],
        BookAuthor: [
          { required: true, message: '请输入书籍作者', trigger: 'blur' }
        ],
        BookPress: [
          { required: true, message: '请输入书籍出版社', trigger: 'blur' }
        ],
        BookTypeId: [
          { required: true, message: '请选择书籍类别', trigger: 'blur' }
        ],
        BookPrice: [
          { required: true, message: '请输入书籍原价', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        BookMprice: [
          { required: true, message: '请输入书籍现价', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        BookStoremount: [
          { required: true, message: '请输入书籍库存量', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        BookPackstyle: [
          { required: true, message: '请输入书籍封装方式', trigger: 'blur' }
        ],
        Bookisbn: [
          { required: true, message: '请输入书籍ISBN', trigger: 'blur' }
        ],
        BookOutline: [
          { required: true, message: '请输入书籍简介', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getBookTypesList()
    this.getBookList()
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
      this.getBookList()
    },
    // 获取 分类列表
    getBookTypesList () {
      api.adminGetBookTypeList().then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          console.log(res.data)

          this.bookTypeList = res.data.data.bookTypeList
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取用户书籍分类列表失败, 请重试')
      })
    },
    // 获取书籍列表
    getBookList () {
      let loading = this.$loading({
        lock: true,
        text: '正在获取书籍列表',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminGetBookList({
        searchText: this.searchText.trim(),
        bookTypeId: this.bookTypeId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data)

          this.bookList = res.data.data.bookList
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
    },
    // 格式化注册日期
    formatterDate (row, column) {
      return moment(row.BookPubDate).format('YYYY-MM-DD HH:mm:ss')
    },
    formatterLastLogTimeDate (row, column) {
      if (!row.CustomerLastLogTime) {
        return '从未登陆'
      } else {
        return moment(row.CustomerLastLogTime).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    // 译者
    formatterTanslor (row, column) {
      if (row.BookTanslor === '') {
        return '无译者'
      } else {
        console.log(row.BookTanslor)
        let str = row.BookTanslor
        // eslint-disable-next-line
        str = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\，|\<|\.|\>|\/|\?]/g, '')
        return str.trim()
      }
    },
    formatterType (row, column) {
      let type = this.bookTypeList.find(value => {
        return value.value === row.BookTypeId
      })
      return type.label
    }
  }
}
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<style lang="scss" scoped>
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    &-input {
      width: 200px;
    }
    &-select-input {
      width: 120px;
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
