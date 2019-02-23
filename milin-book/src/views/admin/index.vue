<template>
  <layout>
    <!-- 左侧边栏 -->
    <left-sidebar>
      <div class="logo">
        <img :src="'http://localhost:3000/'+admin_me.AdminAvatar" alt="">
        <div class="logo-title-box">
          <!-- <h2 class="text-24-R">管理员:</h2> -->
          <div class="logo-title-box-name">
            <p class="text-24-R">{{ admin_me.AdminName }}</p>
            <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
              <div slot="content">
                管理员等级所对应的权限<br/>
                等级一：图书管理<br/>
                等级二：图书管理，订单管理<br/>
                等级三：图书管理，订单管理，账号管理<br/>
              </div>
              <i class="iconfont" :class="admin_me.AdminFlag === '3'? 'icon-level3' : admin_me.AdminFlag === '2'? 'icon-level2' : 'icon-level1'"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="handles">
          <el-button @click="openUpdateAdminAccountDialog" type="primary" size="small">编 辑</el-button>
          <el-button @click="isShowUpdateAdminAccountPwdDialog = true" type="primary" size="small">改 密</el-button>
          <el-button @click="logOut" type="danger" size="small">注 销</el-button>
        </div>
        <div class="border-box"></div>
      </div>
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        :router="true">
        <el-submenu index="/admin/stats">
          <template slot="title">
            <i class="iconfont icon-tongji2 alibaba-icont"></i>
            <span>统计</span>
          </template>
            <el-menu-item index="/admin/stats/typeBook">
              <i class="iconfont icon-bingtu"></i>
              <span slot="title">书籍统计</span>
            </el-menu-item>
        </el-submenu>
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
        <!-- 权限小于2的不能进行订单的管理 -->
        <el-menu-item index="/admin/order" :disabled="Number(admin_me.AdminFlag) < 2">
          <i class="iconfont icon-dingdan alibaba-icont"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/books">
          <i class="iconfont icon-shu alibaba-icont"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
      </el-menu>
    </left-sidebar>
    <!-- 更新管理员账号的窗口 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="isShowUpdateAdminAccountDialog" width="420px" top="120px">
      <div class="handle-title text-16-M">
        更新管理员账号
      </div>
      <div class="add-account-content add-account-from">
        <el-form :model="updateAdminAccountFrom" :rules="newAdminAccountFromRules" label-position="left" ref="updateAccountFrom" label-width="100px" hide-required-asterisk>
          <div class="from-item">
            <el-form-item label="管理员昵称" prop="AdminName">
              <div class="item-input">
                <el-input v-model="updateAdminAccountFrom.AdminName" placeholder="请输入昵称或者姓名"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="上传头像">
              <div class="item-input img-bg">
                <el-upload
                  ref="uploadsAvatar"
                  class="avatar-uploader"
                  action="http://localhost:3000/api/admin/upload"
                  :show-file-list="false"
                  :on-success="updateHandleAvatarSuccess"
                  :on-error="uploadsError"
                  :on-change="uploadActive"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="updateAdminAccountFrom.AdminAvatar" :src="`http://localhost:3000/${updateAdminAccountFrom.AdminAvatar}`" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateAdminAccountDialog('updateAccountFrom')">取 消</el-button>
        <el-button type="primary" @click="updateAdminAccount('updateAccountFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="isShowUpdateAdminAccountPwdDialog" width="420px" top="120px">
      <div class="handle-title text-16-M">
        修改密码
      </div>
      <div class="add-account-content add-account-from">
        <el-form :model="pwFrom" :rules="pwRules" ref="pwFrom" label-width="100px" hide-required-asterisk label-position="left">
          <div class="from-item">
            <el-form-item label="旧密码" prop="oldPwd">
              <div class="item-input">
                <el-input type="password" v-model="pwFrom.oldPwd"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="新密码" prop="newPwd">
              <div class="item-input">
                <el-input type="password" v-model="pwFrom.newPwd"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="确认新密码" prop="confirmPwd">
              <div class="item-input">
                <el-input type="password" v-model="pwFrom.confirmPwd"></el-input>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearInput('pwFrom')">取 消</el-button>
        <el-button type="primary" @click="changePw('pwFrom')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 右主要内容区 -->
    <router-view></router-view>
  </layout>
</template>
<script>
import * as api from '../../api'
import cookie from '../../utils/cookie.js'
import SHA256 from 'js-sha256'
export default {
  data () {
    var confirmPwd = (rule, value, callback) => {
      if (value !== this.pwFrom.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var newPwd = (rule, value, callback) => {
      if (value === this.pwFrom.oldPwd) {
        callback(new Error('新密码不能和旧密码一致'))
      } else {
        callback()
      }
    }
    return {
      // 更改密码
      isShowUpdateAdminAccountPwdDialog: false,
      // 关闭或打开更新表单的Dialog
      isShowUpdateAdminAccountDialog: false,
      // 密码表单
      pwFrom: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      // 修改密码表单验证
      pwRules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: newPwd, trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: confirmPwd, trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ]
      },
      // 更新账号的表单
      updateAdminAccountFrom: {
        AdminId: '',
        // 姓名
        AdminName: '',
        // 权限
        AdminFlag: '',
        // 头像
        AdminAvatar: ''
      },
      // 表单验证
      newAdminAccountFromRules: {
        AdminName: [
          { required: true, message: '请输入新增的管理员昵称', trigger: 'blur' }
        ],
        AdminAccount: [
          { required: true, message: '请输入新增的管理员账号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 打开更新账号的窗口 赋值 当前对象
    openUpdateAdminAccountDialog () {
      this.updateAdminAccountFrom.AdminId = this.admin_me.AdminId
      this.updateAdminAccountFrom.AdminName = this.admin_me.AdminName
      this.updateAdminAccountFrom.AdminAvatar = this.admin_me.AdminAvatar
      this.updateAdminAccountFrom.AdminFlag = this.admin_me.AdminFlag
      this.isShowUpdateAdminAccountDialog = true
    },
    // 关闭更新账号的表单 并重置一些数据
    closeUpdateAdminAccountDialog (formName) {
      this.updateAdminAccountFrom = {
        AdminId: '',
        // 姓名
        AdminName: '',
        // 权限
        AdminFlag: '',
        // 头像
        AdminAvatar: ''
      }
      this.isShowUpdateAdminAccountDialog = false
      this.$refs[formName].resetFields()
    },
    // 保存新添加的管理员账号
    updateAdminAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在更新管理员账号中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          api.adminUpdateAdminAccount(this.updateAdminAccountFrom).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.message)
              loading.close()
              console.log('我进行更新了', res.data.data.newAccountInfo)
              cookie.set('admin_me', res.data.data.newAccountInfo)
              console.log('新的cookie', JSON.parse(cookie.get('admin_me')))

              this.$router.go(0)
              // 重置表单
              this.closeUpdateAdminAccountDialog(formName)
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch((err) => {
            console.log(err)
            this.$message.error('更新管理员账号失败，请重试')
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消修改密码 重置表单
    clearInput (formName) {
      this.$refs[formName].resetFields()
      this.isShowUpdateAdminAccountPwdDialog = false
    },
    //  检验合法性并进行修改
    changePw (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在更新管理员密码中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          api.adminUpdateAdminPwd({
            oldPwd: SHA256(this.pwFrom.oldPwd),
            newPwd: SHA256(this.pwFrom.newPwd),
            confirmPwd: SHA256(this.pwFrom.confirmPwd)
          }).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.message)
              loading.close()

              // 重置表单
              this.clearInput(formName)
              // 退出
              this.logOut()
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch((err) => {
            console.log(err)
            this.$message.error('更新管理员账号失败，请重试')
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注销功能
    logOut () {
      cookie.remove('admin_me')
      this.$router.push('/admin/login')
    },
    // 更新时上传头像成功
    updateHandleAvatarSuccess (res, file) {
      if (res.code === 0) {
        this.$message.success('上传头像成功')
        this.updateAdminAccountFrom.AdminAvatar = res.data.newAvatarPath
      } else {
        this.$message.error('上传头像失败')
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
    &-title-box {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      margin-bottom: 20px;
      height: 35px;
      overflow: hidden;
      h2 {
        margin-right: 10px;
      }
      &-name {
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: 16px;
            margin-left: 5px;
          }
        .icon-level3 {
          &::before {
            color: $danger-color
          }
        }
        .icon-level2 {
          &::before {
            color: $primary-color
          }
        }
        .icon-level1 {
          &::before {
            color: rgb(39, 39, 39)
          }
        }
      }
    }
    .handles {
      display: flex;
      height: 0px;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 10px;
      transition: all 0.5s ease;
      overflow: hidden;
      button {
        margin-bottom: 10px;
      }
    }
    .border-box {
      width: 90%;
      height: 1px;
      border-bottom: 1px solid $bg-color-gray;
      transition: all .3s ease;
      transform-origin: center;
    }
    &:hover {
      .handles {
        height: 90px;
      }
      .border-box {
        border-color: $primary-sub-color;
      }
    }
  }
  .add-account-content {
    width: 100%;
    padding-top: 20px;
    &.add-account-from {
      .from-item {
        .item-input {
          width: 200px;
        }
      }
    }
  }
</style>
