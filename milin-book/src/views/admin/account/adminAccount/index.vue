<template>
  <right-content>
    <div class="account-content">
      <!-- 新建管理员账号 -->
      <div class="card add-admin-account" @click="openAddAdminAccountDialog = true">
        <i class="iconfont icon-jia1"></i>
      </div>
      <div class="card" v-for="(item, index) in adminAccountList" :key="index">
        <div class="card-header" :style="{backgroundImage: `url(http://localhost:3000/${item.AdminAvatar})`}"></div>
        <div class="card-bottom">
          <div class="card-bottom-left">
            <i class="iconfont" :class="item.AdminFlag === '3'? 'icon-level3' : item.AdminFlag === '2'? 'icon-level2' : 'icon-level1'"></i>
            <h2 class="text-24-R">{{ item.AdminName }}</h2>
          </div>
          <div class="card-bottom-right">
            <el-switch
              v-model="item.AdminStatus"
              @change="adminStatusChange(item.AdminStatus, item.AdminId)"
              active-value = '1'
              inactive-value = '0'
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
            <div class="card-bottom-right-handle">
              <el-button type="primary" @click="openUpdateAdminAccountDialogFn(item)" size="small">编辑</el-button>
              <el-button type="danger" @click="deleteAdminAccount(item.AdminId)" size="small">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加管理员账号的窗口 -->
      <el-dialog custom-class="my-el-dialog" :visible.sync="openAddAdminAccountDialog" width="420px" top="120px">
        <div class="handle-title text-16-M">
          添加管理员账号
        </div>
        <div class="add-account-content add-account-from">
          <el-form :model="newAdminAccountFrom" :rules="newAdminAccountFromRules" label-position="left" ref="addAccountFrom" label-width="100px" hide-required-asterisk>
            <div class="from-item">
              <el-form-item label="管理员昵称" prop="AdminName">
                <div class="item-input">
                  <el-input v-model="newAdminAccountFrom.AdminName" placeholder="请输入昵称或者姓名"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item label="管理员账号" prop="AdminAccount">
                <div class="item-input">
                  <el-input v-model="newAdminAccountFrom.AdminAccount" placeholder="请输入邮箱为账号"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item label="账号密码" prop="AdminPwd">
                <div class="item-input">
                  <el-input v-model="newAdminAccountFrom.AdminPwd" placeholder="请输入密码" :readonly="true"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item label="管理员等级">
                <div class="item-input">
                  <el-select v-model="newAdminAccountFrom.AdminFlag">
                    <el-option
                      v-for="item in AdminFlagSelect"
                      :key="item.AdminFlag"
                      :label="item.label"
                      :value="item.AdminFlag">
                    </el-option>
                  </el-select>
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
                    :data="{
                      uploadDir: 'adminAvatar'
                    }"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="uploadsError"
                    :on-change="uploadActive"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="newAdminAccountFrom.AdminAvatar" :src="`http://localhost:3000/${newAdminAccountFrom.AdminAvatar}`" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAddAdminAccountDialog('addAccountFrom')">取 消</el-button>
          <el-button type="primary" @click="addAdminAccount('addAccountFrom')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 更新管理员账号的窗口 -->
      <el-dialog custom-class="my-el-dialog" :visible.sync="openUpdateAdminAccountDialog" width="420px" top="120px">
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
              <el-form-item label="管理员等级">
                <div class="item-input">
                  <el-select v-model="updateAdminAccountFrom.AdminFlag">
                    <el-option
                      v-for="item in AdminFlagSelect"
                      :key="item.AdminFlag"
                      :label="item.label"
                      :value="item.AdminFlag">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="from-item">
              <el-form-item label="上传头像">
                <div class="item-input img-bg">
                  <el-upload
                    ref="uploadsAvatar"
                    :data="{
                      uploadDir: 'adminAvatar'
                    }"
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
    </div>
  </right-content>
</template>
<script>
import * as api from '../../../../api'
import SHA256 from 'js-sha256'
export default {
  data () {
    return {
      // 上传文件node 的头部
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      AdminFlagSelect: [
        {
          AdminFlag: '1',
          label: '等级一'
        },
        {
          AdminFlag: '2',
          label: '等级二'
        },
        {
          AdminFlag: '3',
          label: '等级三'
        }
      ],
      adminAccountList: [],
      // 打开添加管理员账号的dialog
      openAddAdminAccountDialog: false,
      // 打开更新账号的dialog
      openUpdateAdminAccountDialog: false,
      // 新增的管理员表单
      newAdminAccountFrom: {
        AdminName: '',
        AdminAccount: '',
        AdminPwd: 'asdzxc456',
        // 权限
        AdminFlag: '1',
        // 头像
        AdminAvatar: 'public/upload/img/adminAvatar/default_admin_avatar.png'
      },
      // 更新账号的表单
      updateAdminAccountFrom: {
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
  created () {
    this.getAllAcount()
  },
  methods: {
    // 获取所有的用户列表
    getAllAcount () {
      let loading = this.$loading({
        lock: true,
        text: '正在请求账号列表中',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminGetAccountAll().then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data)
          this.adminAccountList = res.data.data.accountList
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(() => {
        this.$message.error('获取账号列表失败')
        loading.close()
      })
    },
    // 保存新添加的管理员账号
    addAdminAccount (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$loading({
            lock: true,
            text: '正在添加管理员账号中',
            background: 'rgba(0, 0, 0, 0.2)'
          })
          this.newAdminAccountFrom.AdminPwd = SHA256(this.newAdminAccountFrom.AdminPwd)
          api.adminAddAdminAccount(this.newAdminAccountFrom).then(res => {
            if (res.data.code === 0) {
              this.$message.success(res.data.message)
              loading.close()
              console.log(res.data)

              // 重置表单
              this.closeAddAdminAccountDialog(formName)
              // 刷新列表
              this.getAllAcount()
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch(() => {
            this.$message.error('添加管理员账号失败，请重试')
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除管理员账号
    deleteAdminAccount (adminId) {
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loading = this.$loading({
          lock: true,
          text: '正在删除管理员账号',
          background: 'rgba(0, 0, 0, 0.2)'
        })
        api.deleteAdminAccount({
          adminId: adminId
        }).then(res => {
          if (res.data.code === 0) {
            this.$message.success(res.data.message)
            loading.close()
            console.log(res.data)

            // 刷新列表
            this.getAllAcount()
          } else {
            this.$message.error(res.data.message)
            loading.close()
          }
        }).catch(() => {
          this.$message.error('删除管理员账号失败, 请重试')
          loading.close()
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 禁用账号 解禁账号
    adminStatusChange (AdminStatus, AdminId) {
      let loading = this.$loading({
        lock: true,
        text: '正在更新账号状态',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      api.adminUpdateAdminAccountStatus({
        AdminStatus: AdminStatus,
        AdminId: AdminId
      }).then(res => {
        if (res.data.code === 0) {
          this.$message.success(res.data.message)
          loading.close()
          console.log(res.data)

          // 刷新列表
          this.getAllAcount()
        } else {
          this.$message.error(res.data.message)
          loading.close()
        }
      }).catch(() => {
        this.$message.error('更新账号状态失败, 请重试')
        loading.close()
      })
    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      if (res.code === 0) {
        this.$message.success('上传头像成功')
        this.newAdminAccountFrom.AdminAvatar = res.data.Filepath
      } else {
        this.$message.error('上传头像失败')
      }
    },
    // 更新头像
    updateHandleAvatarSuccess (res, file) {
      if (res.code === 0) {
        this.$message.success('上传头像成功')
        this.updateAdminAccountFrom.AdminAvatar = res.data.Filepath
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
    },
    // 手动上传图片
    submitAvatar () {
      this.$refs['uploadsAvatar'].submit()
    },
    // 关闭添加管理员账号的窗口 并重置一些表单数据
    closeAddAdminAccountDialog (formName) {
      // 关闭窗口
      this.openAddAdminAccountDialog = false
      this.newAdminAccountFrom.AdminFlag = '1'
      // 头像
      this.newAdminAccountFrom.AdminAvatar = 'public/upload/img/adminAvatar/default_admin_avatar.png'
      this.$refs[formName].resetFields()
    },
    // 打开更新账号的表单
    openUpdateAdminAccountDialogFn (item) {
      this.updateAdminAccountFrom = JSON.parse(JSON.stringify(item))
      this.openUpdateAdminAccountDialog = true
    },
    // 关闭更新账号的表单 并重置一些数据
    closeUpdateAdminAccountDialog (formName) {
      this.updateAdminAccountFrom = {
        AdminName: '',
        // 权限
        AdminFlag: '',
        // 头像
        AdminAvatar: ''
      }
      this.openUpdateAdminAccountDialog = false
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
              console.log(res.data)

              // 重置表单
              this.closeUpdateAdminAccountDialog(formName)
              // 刷新列表
              this.getAllAcount()
            } else {
              this.$message.error(res.data.message)
              loading.close()
            }
          }).catch(() => {
            this.$message.error('更新管理员账号失败，请重试')
            loading.close()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    width: 100%;
    height: 240px;
    margin-bottom: 40px;
    .col {
      height: 100%;
      border: 1px solid #000;
    }
  }
  .account-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // padding: 20px 20px 0 20px;
    min-width: 1090px;
    overflow: auto;
    .card {
      display: flex;
      flex-direction: column;
      width: 250px;
      height: 270px;
      // border: 1px solid #000;
      margin-right: 20px;
      margin-bottom: 20px;
      background-color: white;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      &.add-admin-account {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        i {
          font-size: 88px;
          color: $primary-color;
        }
        &:hover {
          i {
            color: white;
          }
          background-color: $primary-color;
        }
      }
      &-header {
        display: flex;
        height: 190px;
        width: 100%;
        border-bottom: 4px solid $bg-color-gray;
        background-size: cover;
      }
      &-bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
        &-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          margin-left: 20px;
          i {
            font-size: 18px;
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
        &-right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          height: 100%;
          flex: 1;
          &-handle {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
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
