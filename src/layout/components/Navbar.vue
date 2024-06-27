<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="headPort.staffPhoto" :src="headPort.staffPhoto" class="user-avatar" />
          <div v-else class="noAvatar">{{ headPort.username?.slice(0, 1) }}</div>
          <div class="user-avatarText">{{ headPort.username }}</div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="changePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <!-- 修改密码弹出框 -->
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
        <div>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPassword">
              <el-input v-model="ruleForm.oldPassword" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="ruleForm.newPassword" />
            </el-form-item>
            <el-form-item label="重复密码" prop="checkPassword">
              <el-input v-model="ruleForm.checkPassword" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
              <el-button @click="resetForm">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { apiUpatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === this.ruleForm.oldPassword) {
        callback(new Error('不能与原密码相同'))
      } else {
        callback()
      }
    }
    const validatePass3 = (rule, value, callback) => {
      if (value !== this.ruleForm.newPassword) {
        callback(new Error('新密码与重复密码不相同'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入重复密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    ...mapState('user', ['headPort'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$store.commit('user/clearToken')
      this.$store.commit('user/setHeadPort', {})
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    changePassword() {
      this.dialogVisible = true
    },
    resetForm() {
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      }
      this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          apiUpatePassword(this.ruleForm)
            .then((res) => {
              this.$message.success('修改密码成功')
              this.$store.commit('user/clearToken')
              this.$store.commit('user/setHeadPort', {})
              this.$router.push('/login')
            })
            .catch(() => {
              this.$message.error('修改密码失败')
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
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        margin-top: 5px;
        position: relative;
        align-items: center;
        .noAvatar {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-content: center;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: pink;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
