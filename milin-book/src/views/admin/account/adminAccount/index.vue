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
              active-value = '1'
              inactive-value = '2'
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
            <el-button type="primary" size="small">编辑</el-button>
          </div>
        </div>
      </div>
      <el-dialog custom-class="my-el-dialog" :visible.sync="openAddAdminAccountDialog" width="380px" top="30px">
        <div class="handle-title text-16-M">
          添加账号
        </div>
        <div class="add-account-content add-account-from">
          <el-form :model="newAdminAccountFrom" :rules="newAdminAccountFromRules" label-position="left" ref="addAccount" label-width="100px" hide-required-asterisk>
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
                    :data="newAdminAccountFrom.AdminAccount"
                    :headers="headers"
                    action="http://localhost:3000/api/admin/upload"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="uploadsError"
                    :before-upload="beforeAvatarUpload">
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </div>
            <!-- <div class="from-item">
              <el-form-item label="预设看板">
                <div class="item-input">
                  <el-select v-model="panel.size_id" placeholder="大屏" @change="selecrChange">
                    <el-option
                      v-for="item in sizeSelect"
                      :key="item.id"
                      :label="item.label"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div> -->
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </right-content>
</template>
<script>
import * as api from '../../../../api'
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
      newAdminAccountFrom: {
        AdminName: '',
        AdminAccount: '',
        AdminPwd: 'asdzxc456',
        // 权限
        AdminFlag: '1',
        // 头像
        AdminAvatar: ''
      },
      newAdminAccountFromRules: {
        AdminName: [
          { required: true, message: '请输入新增的管理员昵称', trigger: 'blur' }
        ],
        AdminAccount: [
          { required: true, message: '请输入新增的管理员账号', trigger: 'blur' }
        ],
        AdminPwd: [
          { required: true, message: '请输入新增的账号密码', trigger: 'blur' }
        ]
      },
      imageUrl: ''
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
    addAdminAccount () {

    },
    // 上传成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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

    },
    // 手动上传图片
    submitAvatar () {
      this.$refs['uploadsAvatar'].submit()
    }
  }
}
</script>
<style lang="scss">
  .img-bg {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 110px;
      height: 110px;
      line-height: 110px;
      text-align: center;
    }
    .avatar {
      width: 110px;
      height: 110px;
      display: block;
    }
    .delete-bg {
      cursor: pointer;
      &:hover {
        color: $primary-color;
      }
    }
  }
</style>

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
    padding: 20px 20px 0 20px;
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
          &-button {
            width: 50%;
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
