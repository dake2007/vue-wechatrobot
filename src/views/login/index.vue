<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box">wechatrobot后台管理</div>
      <!-- 登录的表单区域 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginFn" class="btn-login">登录</el-button>
          <el-link type="info" @click="$router.push('/register')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data () {
    return {
      // 登录表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单的验证规则对象
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码必须是6-15的非空字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    // 登录->点击事件
    loginFn () {
      this.$refs.loginRef.validate(async valid => {
        if (valid) {
          // console.log(this.loginForm)
          const { data: res } = await loginAPI(this.loginForm)
          // console.log(res)
          if (res.status !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          // 把token字符串保存到vuex的state中
          this.updateToken(res.token)
          this.$router.push('/')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 335px;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      font-weight: bold;
      text-align: center;
      font-size: 25px;
      color: aliceblue;
    }

    .btn-login {
      width: 100%;
    }
    ::v-deep .el-input__inner {
      background-color: transparent !important;
    }
    .el-button--primary:focus,
    .el-button--primary:hover {
      background: #5e656d;
      border-color: #5e757d;
      color: #fff;
      opacity: 1;
    }
    .el-button--primary {
      color: #fff;
      background-color: #4d5257;
      border-color: #4d6267;
      opacity: 0.7;
    }
  }
}
</style>
