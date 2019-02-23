<template>
  <div class="shop-header">
    <div class="shop-w">
      <div class="shop-header-content">
        <div class="shop-header-content-left">
          <div class="shop-header-content-left-home">
            <i class="iconfont icon-shouyeshouye"></i>
            <p class="text-14-R" @click="pushHome">密林的书店首页</p>
          </div>
        </div>
        <div v-if="user_me" class="shop-header-content-right">
          <div class="shop-header-content-right-user">
            <el-popover
              ref="popover_userName"
              placement="bottom"
              width="200"
              trigger="hover">
              <div class="popover-content">
                <el-row type="flex" :gutter="0" class="row-bg" justify="space-between">
                  <el-col :span="11">
                    <img class="user-avatar" width="100%" :src="`http://localhost:3000/${user_me.CustomerAvatar}`" alt="">
                  </el-col>
                  <el-col :span="2">
                    <div class="bg-div">

                    </div>
                  </el-col>
                  <el-col :span="11">
                    <div class="right-handel">
                      <el-button plain type="primary" @click="isShowUpdateUserAccountPwdDialog = true" size="mini">修改密码</el-button>
                      <el-button plain type="danger" @click="logout" size="mini">注销登陆</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-popover>
            <div v-popover:popover_userName class="user-name hover-red">
              <i class="iconfont icon-yonghu1"></i>
              <p>{{ user_me.CustomerName }}</p>
            </div>
          </div>
          <i class="iconfont icon-vertical_line"></i>
          <div class="shop-car hover-red" >
            <i class="iconfont icon-gouwuche"></i>
            <el-badge :value="shopCarCount" type="warning" class="item">
              <p class="hover-red" @click="pushShopCar">我的购物车</p>
            </el-badge>
          </div>
          <i class="iconfont icon-vertical_line"></i>
          <div class="order hover-red">
            <i class="iconfont icon-dingdan"></i>
            <el-badge :value="orderCount" class="item">
              <p class="hover-red" @click="pushShopOrder">我的订单</p>
            </el-badge>
          </div>
        </div>
        <div v-else  class="shop-header-content-right">
          <p class="login-p">您好，欢迎光临密林，请
            <span @click="login" class="login-span">登陆</span>
          </p>
          <i style="margin-right: 5px;" class="iconfont icon-yonghu1"></i>
        </div>
      </div>
    </div>
    <!-- 修改密码 -->
    <el-dialog custom-class="my-el-dialog" :visible.sync="isShowUpdateUserAccountPwdDialog" width="420px" top="120px">
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
  </div>
</template>
<script>
import * as api from '../../../api'
import SHA256 from 'js-sha256'
import cookie from '../../../utils/cookie.js'
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
      // 修改用户的密码
      isShowUpdateUserAccountPwdDialog: false,
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
      }
    }
  },
  created () {
    // 获取购物车数量
    this.getShopCarCount()
    // 获取订单数量
    this.getOrderCount()
  },
  methods: {
    // 获取当前账户购物车中的数量
    getShopCarCount () {
      this.$store.commit('setShopCarCount')
    },
    // 获取当前账户的订单数量
    getOrderCount () {
      this.$store.commit('setOrderCount')
    },
    // 取消修改密码 重置表单
    clearInput (formName) {
      this.$refs[formName].resetFields()
      this.isShowUpdateUserAccountPwdDialog = false
    },
    //  检验合法性并进行修改
    changePw (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在更新密码中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          api.shopUpdateUserPwd({
            oldPwd: SHA256(this.pwFrom.oldPwd),
            newPwd: SHA256(this.pwFrom.newPwd),
            confirmPwd: SHA256(this.pwFrom.confirmPwd)
          }).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.message)
              loading.close()

              // 重置表单
              this.clearInput(formName)
              cookie.remove('user_me')
              this.$router.push('/shop/login')
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch((err) => {
            console.log(err)
            this.$message.error('更新密码失败，请重试')
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 退出登陆 注销
    logout () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cookie.remove('user_me')
        this.$router.push('/shop/login')
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      }).catch(() => {
      })
    },
    // 点击登陆 跳转到登陆页面
    login () {
      this.$router.push('/shop/login')
    },
    // 跳转到购物车
    pushShopCar () {
      this.$router.push('/shop/shopCar')
    },
    // 跳转到订单页
    pushShopOrder () {
      this.$router.push('/shop/shopOrder')
    },
    // 跳转到首页
    pushHome () {
      this.$router.push('/shop/home')
    }
  },
  computed: {
    user_me () {
      if (cookie.get('user_me')) {
        return JSON.parse(cookie.get('user_me'))
      }
      return ''
    },
    // 购物车中的数量
    shopCarCount () {
      return this.$store.state.shopCarCount
    },
    // 订单中的数量
    orderCount () {
      return this.$store.state.orderCount
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-header {
    height: 36px;
    border-bottom: 1px solid $bg-color-gray;
    background-color: #f5f5f5;
    color: #6C6C6C;
    cursor: pointer;
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 36px;
      &-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        &-home {
          display: flex;
          justify-content: space-around;
          align-items: center;
          i {
            margin-right: 5px;
          }
          &:hover {
            color: $danger-color;
          }
        }
      }
      &-right {
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        i {
          font-size: 20px;
        }
        &-user {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          .user-name {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            i {
              font-size: 20px;
              color: $danger-color;
              margin-right: 5px;
            }
          }
        }
        .shop-car {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          i {
            font-size: 18px;
            color: $danger-color;
            margin-right: 5px;
          }
        }
        .order {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          i {
            color: $danger-color;
            margin-right: 5px;
          }
        }
        .login-p {
          .login-span {
            color: $danger-color;
          }
        }
      }
    }
  }
  .popover-content {
    width: 100%;
    padding: 10px;
    .user-avatar {
      width: 80%;
      border-radius: 50%;
    }
    .bg-div {
      margin: 0 auto;
      width: 1px;
      height: 100%;
      background-color: #6C6C6C;
    }
    .right-handel {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      button  {
        margin-top: 5px;
      }
    }
  }
</style>
