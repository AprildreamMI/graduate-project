<template>
  <div class="login">
    <div class="w">
      <div class="login-box">
        <div class="right-from">
          <p class="from-title text-24-R">后台管理</p>
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
          <div class="login-btn text-14-M" @click="submitLogin('userForm')">
            <!-- <pc-btn @clickBtn="submitLogin('userForm')" :type="'primary'">登录</pc-btn> -->
            <!-- <el-button type="primary"  >登陆</el-button> -->
            登 陆
          </div>
        </div>
        <div class="right-bottom-bg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SHA256 from 'js-sha256'
import * as api from '../../../api'
import cookie from '../../../utils/cookie.js'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
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
    // 提交账号和密码
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
      height: 20px;
      line-height: 20px;
    }
    /* labei在顶部的时候 下内边距为10 */
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0px;
      font-size: 12px;

    }
    .el-form-item--medium .el-form-item__content {
      line-height: 20px;
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
            margin-top: 66px;
            .from-item {
              margin-bottom: 50px;
              color: $font-color-black;
              .from-item-input {
                // height: 30px;
              }
            }
          }
          .login-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width:330px;
            height:40px;
            margin-top: 20px;
            background-color: $primary-color;
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
            &:hover {
              background-color: $primary-sub-color;
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
  }
</style>
