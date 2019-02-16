<template>
  <div class="login">
    <div class="w">
      <div class="login-box">
        <div class="right-from">
          <p class="from-title text-24-R">登录</p>
          <div class="login-from">
            <el-form :model="userForm" :rules="userRules" ref="userForm" label-position="top" hide-required-asterisk>
              <div class="from-item text-14-M">
                <el-form-item label="账号" prop="username">
                  <div class="from-item-input">
                    <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
                  </div>
                </el-form-item>
              </div>
              <div class="from-item text-14-M">
                <el-form-item label="密码" prop="password">
                  <div class="from-item-input">
                    <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="login-btn text-16-M" @click="submitLogin('userForm')">
            登 录
          </div>
          <div class="sign-pwd">
            <p @click="isShowAddUserAccountDialog = true">账号注册</p>
            <p>|</p>
            <p>忘记密码</p>
          </div>
        </div>
        <div class="right-bottom-bg">
        </div>
      </div>
    </div>
    <!-- 注册用户账号的窗口 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="isShowAddUserAccountDialog" width="420px" top="120px">
      <div class="handle-title text-16-M">
        注册账号
      </div>
      <div class="add-account-content add-account-from">
        <el-form :model="userSignInFrom" :rules="userSignInFromRules" label-position="left" ref="addAccountFrom" label-width="100px" hide-required-asterisk>
          <div class="from-item">
            <el-form-item label="昵称" prop="customerName">
              <div class="item-input">
                <el-input v-model="userSignInFrom.customerName" placeholder="请输入昵称"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="邮箱账号" prop="customerEmail">
              <div class="item-input">
                <el-input v-model="userSignInFrom.customerEmail" placeholder="请输入邮箱为账号"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="姓名" prop="customerTrueName">
              <div class="item-input">
                <el-input v-model="userSignInFrom.customerTrueName" placeholder="请输入真实姓名"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="性别">
              <div class="item-input">
                <el-radio v-model="userSignInFrom.customerSex" label="1">男</el-radio>
                <el-radio v-model="userSignInFrom.customerSex" label="2">女</el-radio>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="手机号" prop="customerTel">
              <div class="item-input">
                <el-input v-model="userSignInFrom.customerTel" placeholder="请输入手机号"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="城市" prop="customerAddr">
              <div class="item-input">
                <el-input v-model="userSignInFrom.customerAddr" placeholder="请输入所在城市"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="密码" prop="customerPwd">
              <div class="item-input">
                <el-input type="password" v-model="userSignInFrom.customerPwd" placeholder="请输入密码"></el-input>
              </div>
            </el-form-item>
          </div>
          <div class="from-item">
            <el-form-item label="确认密码" prop="customerPwdConFirm">
              <div class="item-input">
                <el-input type="password" v-model="userSignInFrom.customerPwdConFirm" placeholder="请确认密码"></el-input>
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
                  :on-success="handleAvatarSuccess"
                  :on-error="uploadsError"
                  :on-change="uploadActive"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="userSignInFrom.customerAvatar" :src="`http://localhost:3000/${userSignInFrom.customerAvatar}`" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddAccountDialog('addAccountFrom')">取 消</el-button>
        <el-button type="primary" @click="addUserAccount('addAccountFrom')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SHA256 from 'js-sha256'
import * as api from '../../../api'
import cookie from '../../../utils/cookie.js'

export default {
  data () {
    var confirmPwd = (rule, value, callback) => {
      if (value !== this.userSignInFrom.customerPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 注册账号窗口的显示
      isShowAddUserAccountDialog: false,
      // 用户注册表单
      userSignInFrom: {
        // 邮箱
        customerEmail: '',
        // 客户昵称
        customerName: '',
        // 客户姓名
        customerTrueName: '',
        // 性别
        customerSex: '1',
        // 手机号
        customerTel: '',
        // 城市
        customerAddr: '',
        // 密码
        customerPwd: '',
        // 确认密码
        customerPwdConFirm: '',
        // 头像
        customerAvatar: 'public/upload/img/userAvatar/default_user_avatar.jpg'
      },
      userSignInFromRules: {
        customerEmail: [
          { required: true, message: '请输入注册邮箱', trigger: 'blur' },
          // eslint-disable-next-line
          { pattern: /^[\w\-\.]+\@[\w]+\.[\w]{2,4}$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        customerName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        customerTrueName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        customerTel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        customerAddr: [
          { required: true, message: '请输入城市地址', trigger: 'blur' }
        ],
        customerPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ],
        customerPwdConFirm: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: confirmPwd, trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ]
      },
      // 登录表单
      userForm: {
        username: '',
        password: ''
      },
      // 登录的表单验证
      userRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          // eslint-disable-next-line
          { pattern: /^[\w\-\.]+\@[\w]+\.[\w]{2,4}$/, message: '请输入正确的邮箱的账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z][\W_]{8,}/, message: '密码格式错误  大于8位,必须同时包含数字和字母', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    // 提交账号和密码 登录
    submitLogin (formName) {
      this.$refs[formName].validate((valid) => {
        // 通过验证
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在登陆中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          api.adminLogin({
            AdminAccount: this.userForm.username,
            AdminPwd: SHA256(this.userForm.password)
          }).then(res => {
            if (res.data.code === 0) {
              if (res.data.data.me.AdminStatus === '0') {
                this.$message.error('登录失败，此账号已被禁用')
                loading.close()
                return
              }
              this.$message.success(res.data.message)
              loading.close()

              // 把me存储在cookie中 admin_me
              cookie.set('admin_me', res.data.data.me)
              this.$router.push('/admin')
              console.log(res.data)
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch(() => {
            this.$message.error('登陆失败')
            loading.close()
          })
        } else {
          console.log('验证不通过')
          return false
        }
      })
    },
    // 进行账号的注册
    addUserAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在注册中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          this.userSignInFrom.customerPwd = SHA256(this.userSignInFrom.customerPwd)
          api.shopSignIn(this.userSignInFrom).then(res => {
            if (res.data.code === 0) {
              // 关闭窗口
              this.closeAddAccountDialog(formName)
              this.$message.success(res.data.message)
              loading.close()
            } else {
              this.refsPwd()
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch((err) => {
            this.refsPwd()
            console.error(err)
            this.$message.error('注册失败, 请重试')
            loading.close()
          })
        } else {
          console.log('验证不通过')
          return false
        }
      })
    },
    // 关闭注册窗口
    closeAddAccountDialog (formName) {
      // 关闭窗口
      this.isShowAddUserAccountDialog = false
      // 头像
      this.userSignInFrom.customerAvatar = 'public/upload/img/userAvatar/default_user_avatar.jpg'
      // 重置表单
      this.$refs[formName].resetFields()
    },
    // 失败重新输入密码
    refsPwd () {
      this.userSignInFrom.customerPwd = ''
      this.userSignInFrom.customerPwdConFirm = ''
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      if (res.code === 0) {
        this.$message.success('上传头像成功')
        this.newAdminAccountFrom.AdminAvatar = res.data.newAvatarPath
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
  components: {
  }
}
</script>
<style lang="scss">
  .login-from {
    /* 输入框的样式 输入框的行高 */
    .el-input--medium .el-input__inner {
      background-color: rgba(251, 253, 250, 1);
      border: none;
      border-bottom: 1px solid black;
      border-radius: 0;
    }
    /* labei在顶部的时候 下内边距为10 */
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0px;
    }
  }
</style>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url('/static/img/admin/login/登录-背景.png');
    overflow: hidden;
    .w {
      width: 1200px;
      margin: 0 auto;
      .login-box {
        position: relative;
        width: 100%;
        height: 650px;
        border-radius: 6px;
        background-image: url('/static/img/admin/login/登录-表单背景.png');
        .right-from {
          display: flex;
          align-items: center;
          flex-direction: column;
          position: absolute;
          top: 77px;
          right: 103px;
          width: 400px;
          height: 500px;
          background:rgba(251,253,250,1);
          box-shadow:0px 10px 33px 10px rgba(40,51,73,0.13);
          border-radius:2px;
          padding: 0 35px;
          .from-title {
            margin-top: 41px;
          }
          .login-from {
            width: 100%;
            margin-top: 40px;
            .from-item {
              margin-bottom: 50px;
              color: $font-color-black;
              .from-item-input {
              }
            }
          }
          .login-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width:330px;
            height:40px;
            background-color: $primary-color;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            &:hover {
              background-color: $primary-sub-color;
            }
          }
          .sign-pwd {
            display: flex;
            justify-content: center;
            align-items: center;
            width:330px;
            height:40px;
            margin-top: 10px;
            color: $font-color-gray;
            p {
              margin-right: 5px;
              margin-left: 5px;
              cursor: pointer;
              &:hover {
                color: $primary-sub-color;
              }
            }
          }
        }
        .right-bottom-bg {
          position: absolute;
          width: 107px;
          height: 100px;
          right: 45px;
          background-image: url(/static/img/admin/login/登录-表单人物.png);
          bottom: 54px;
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
  }
</style>
