<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm">
          <el-form-item prop="userPhone">
            <el-input v-model="ruleForm.userPhone" />
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input v-model="ruleForm.userPassword" />
          </el-form-item>
          <el-form-item prop="isChecked">
            <el-checkbox v-model="ruleForm.isChecked">用户协议</el-checkbox>
          </el-form-item>
          <el-form-item><el-button type="primary" @click.native.prevent="submitForm('ruleForm')">登录</el-button></el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    const checkCheckBox = (rule, value, callback) => {
      if (!value) {
        // 没有勾选时
        return callback(new Error('请勾选用户协议'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userPhone: '13800000002',
        userPassword: 'hm#qd@23!',
        isChecked: true
      },
      rules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, // 正则校验不用字符串
            message: '请填写正确的手机号码',
            trigger: 'blur'
          }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6, // 正则校验不用字符串
            max: 19,
            message: '请填写正确的密码',
            trigger: 'blur'
          }
        ],
        isChecked: [{ validator: checkCheckBox }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          login(this.ruleForm).then((res) => {
            this.$store.commit('user/setToken1', res.data)
            this.$router.push('/')
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
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center / contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
