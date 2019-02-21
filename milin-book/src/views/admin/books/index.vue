<template>
  <right-content>
    <content-header>
      <div class="search-box">
        <el-button type="primary" @click="openBookFromDialog = true">添加书籍</el-button>
        <div class="search-box-input">
          <el-input
            placeholder="输入书籍名进行搜索"
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
          :row-class-name="tableRowClassName"
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
                @click="openUpdateBookInfo(scope.$index, scope.row)">编辑
              </el-button>
              <el-switch
                v-model="scope.row.BookStatus"
                active-value = '1'
                inactive-value = '0'
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeBookStatus(scope.row.BookStatus, scope.row.BookId)"
                title="上架或下架书籍">
              </el-switch>
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
    <el-dialog custom-class="my-el-dialog" :visible.sync="openBookFromDialog" width="540px" top="50px" :before-close="colseAddBookDiaLogBefor">
      <div class="handle-title text-16-M">
        {{ dialogTitle }}
      </div>
      <div class="dialog-content">
        <el-form :model="bookFrom" :rules="bookFromRules" label-position="left" ref="bookFrom" label-width="100px" hide-required-asterisk>
           <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
             <el-col :span="12">
                <div class="from-item">
                  <el-form-item label="书名" prop="BookName">
                    <div class="item-input">
                      <el-input v-model="bookFrom.BookName" placeholder="请输入书名"></el-input>
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
                      <el-input v-model="bookFrom.BookDiscount" placeholder="如有折扣请输入"></el-input>
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
                      <el-input v-model.number="bookFrom.BookStoremount" placeholder="请输入书籍库存量"></el-input>
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
                      <el-input v-model.number="bookFrom.BookSize" placeholder="请输入书籍开本,不详不输"></el-input>
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
                  <el-form-item label="上传书籍封面">
                    <div class="item-input img-bg">
                      <el-upload
                        ref="uploadsAvatar"
                        class="avatar-uploader"
                        :data="{
                          uploadDir: 'bookPic'
                        }"
                        action="http://localhost:3000/api/admin/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="uploadsError"
                        :on-change="uploadActive"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="bookFrom.BookPic" :src="bookFrom.BookPic" class="avatar">
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
        <el-button @click="addBookCancel">取 消</el-button>
        <el-button type="primary" @click="saveBookFrom('bookFrom')">确 定</el-button>
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
      // dialog 的标题
      dialogTitle: '添加书籍',
      // 判断时编辑状态还是新增状态 默认新增
      isUpdateAddBookInfo: true,
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
        BookName: '',
        BookAuthor: '',
        BookTanslor: '',
        BookPress: '',
        BookTypeId: '',
        BookPrice: '',
        BookDiscount: '',
        BookMprice: '',
        BookPubDate: '',
        BookDealmount: '',
        BookStoremount: '',
        BookSize: '',
        Bookisbn: '',
        BookPackstyle: '',
        BookOutline: '',
        BookPic: ''
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
          { required: true, message: '请输入书籍定价', trigger: 'blur' },
          { pattern: /^\d*\.{0,1}\d{0,1}$/, message: '必须为有效数字', trigger: 'blur' }
        ],
        BookMprice: [
          { required: true, message: '请输入书籍现价', trigger: 'blur' },
          { pattern: /^\d*\.{0,1}\d{0,1}$/, message: '必须为有效数字', trigger: 'blur' }
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
          console.log(res.data.data.bookList)

          this.bookList = res.data.data.bookList
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
    // 上架或下架书籍
    changeBookStatus (newStatus, id) {
      let loading = this.$loading({
        lock: true,
        text: '正在书籍状态',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminUpdateBookStatus({
        BookStatus: newStatus,
        BookId: id
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          // 刷新列表
          this.getBookList()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('改变书籍状态失败, 请重试')
        loading.close()
      })
    },
    // 点击空白关闭添加书籍窗口
    colseAddBookDiaLogBefor (done) {
      this.$confirm('是否取消保存书籍信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        done()
        this.closeRestFrom('bookFrom')
        this.$message({
          type: 'success',
          message: '已取消保存'
        })
      }).catch(() => {
      })
    },
    // 关闭窗口并重置添加书籍的表单
    closeRestFrom (formName) {
      this.openBookFromDialog = false
      this.$refs[formName].resetFields()
      this.bookFrom = {
        BookName: '',
        BookAuthor: '',
        BookTanslor: '',
        BookPress: '',
        BookTypeId: '',
        BookPrice: '',
        BookDiscount: '',
        BookMprice: '',
        BookPubDate: '',
        BookDealmount: '',
        BookStoremount: '',
        BookSize: '',
        Bookisbn: '',
        BookPackstyle: '',
        BookOutline: '',
        BookPic: ''
      }
    },
    // 取消添加 书籍
    addBookCancel () {
      this.$confirm('是否取消保存书籍信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.closeRestFrom('bookFrom')
        this.$message({
          type: 'success',
          message: '已取消保存'
        })
      }).catch(() => {
      })
    },
    // 确定添加书籍 进行保存 或者更新
    saveBookFrom (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在保存书籍信息',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          if (this.isUpdateAddBookInfo) {
            api.adminAddBookInfo(this.bookFrom).then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.message)
                loading.close()
                // 刷新列表
                this.getBookList()
                this.closeRestFrom(formName)
              } else {
                this.$message.error(res.data.message)
                loading.close()
              }
            }).catch(error => {
              console.error(error)
              this.$message.error('添加书籍信息失败, 请重试')
              loading.close()
            })
          } else {
            api.adminUpdateBookInfo(this.bookFrom).then(res => {
              if (res.data.code === 0) {
                this.$message.success(res.data.message)
                loading.close()
                // 刷新列表
                this.getBookList()
                this.closeRestFrom(formName)
              } else {
                this.$message.error(res.data.message)
                loading.close()
              }
            }).catch(error => {
              console.error('错误', error)
              this.$message.error('编辑书籍信息失败, 请重试')
              loading.close()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 进行编辑 打开编辑面板
    openUpdateBookInfo (index, row) {
      // 改变标题
      this.dialogTitle = '编辑书籍'
      // 更改状态
      this.isUpdateAddBookInfo = false
      // 打卡dialog
      this.openBookFromDialog = true
      console.log(row)
      this.bookFrom = JSON.parse(JSON.stringify(row))
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
      return moment(row.BookPubDate).format('YYYY-MM-DD')
    },
    // 译者
    formatterTanslor (row, column) {
      if (row.BookTanslor === '') {
        return '无译者'
      } else {
        let str = row.BookTanslor
        // eslint-disable-next-line
        str = str.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\，|\<|\.|\>|\/|\?]/g, '')
        return str.trim()
      }
    },
    // 格式化书籍类型
    formatterType (row, column) {
      let type = this.bookTypeList.find(value => {
        return value.value === row.BookTypeId
      })
      return type.label
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      if (res.code === 0) {
        this.$message.success('上传封面成功')
        this.bookFrom.BookPic = res.data.Filepath
      } else {
        this.$message.error('上传封面失败')
      }
    },
    // 文件上传时
    uploadActive (file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    // 上传之前
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传失败
    uploadsError (response, file, fileList) {
      this.$message.error('上传头像失败, 请重试')
    },
    // 行状态
    tableRowClassName ({row, rowIndex}) {
      if (row.BookStatus === '0') {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
<style>

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
