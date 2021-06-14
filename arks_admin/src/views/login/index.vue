<template>
  <div class="login">
    <div class="login-time">
      {{ time }}
    </div>
    <div class="login-from">
      <div class="login-from-content">
        <div class="login-title">
          <img src="../../assets/img/logo.png" alt="">
          <h1>Welcome to ark system</h1>
        </div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="用户名">
              <template #prepend>
                <i class="el-icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="type"
              placeholder="密码"
              v-model="param.password"
            >
              <template #prepend>
                <i class="el-icon-lollipop"></i>
              </template>
              <template #suffix>
                <i v-if="type === 'password'" class="el-icon-lock" @click="changeIcon('text')" /> 
                <i v-else class="el-icon-unlock" @click="changeIcon('password')" /> 
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha_val">
            <el-input
              placeholder="验证码"
              v-model="param.captcha_val"
              @keyup.enter="submitForm()"
            >
              <template #prepend>
                <i class="el-icon-coin" />
              </template>
              <template #suffix>
                <img v-if="param.captcha_url" :src="param.captcha_url" @click="captcha" />
                <i v-else class="el-icon-refresh" />
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button @click="submitForm()">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCaptcha, login } from '../../api/index'
import Session from '../../utils/sessionStorage'
export default {
  data() {
    return {
      param: {
        username: "",
        password: "",
        captcha_val: '',
        captcha_url: '',
        captcha_id: ''
      },
      type: 'password',
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 30, message: "用户名错误", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度为6-20个字符", trigger: "blur" }
        ],
        captcha_val: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "blur" }
        ]
      },
      time: '',
      timer: null
    }
  },
  created() {
    this.$store.commit("clearTags");
    this.initTime()
    this.timer = setInterval(() => {
      this.initTime()
    }, 1000);
    this.captcha()
  },
  setup() {

  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    initTime() {
      const date = new Date()
      const hours = date.getHours() >= 10 ? date.getHours() : 0 + date.getHours().toString()
      const min = date.getMinutes() >= 10 ? date.getMinutes() : 0 + date.getMinutes().toString()
      const sec = date.getSeconds() >= 10 ? date.getSeconds() : 0 + date.getSeconds().toString()
      this.time = `${hours}:${min}:${sec}`
    },
    submitForm() {
      this.$refs.login.validate(valid => {
        if (valid) {
          login(this.param).then(res => {
            Session('set', 'userInfo', res.data)
            Session('set', 'token', res.data.token)
            this.$router.push("/")
            // dispatch({type: 'SET_USERINFO', value: res.data})
          })
        } else {
          this.$message.error("请输入账号和密码")
          return false;
        }
      })
    },
    changeIcon(type) {
      this.type = type
    },
    captcha() {
      getCaptcha().then(res => {
        this.param = Object.assign(this.param, res.data)
      })
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  min-width: 1440px;
  background-image: linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%);
  display: flex;
  .login-time {
    flex: 5;
    font-size: 120px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;
    user-select: none;
    color: #eee;
  }
  .login-from {
    flex: 3;
    display: flex;
    align-items: center;
    .login-from-content {
      width: 500px;
      padding: 20px;
      border-radius: 20px;
      background-color: rgba(255, 255, 255, .01);
      box-shadow: 5px 4px 10px 4px rgba(0, 0, 0, .1);
      .login-title {
        user-select: none;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        h1 {
          position: relative;
          text-align: center;
          color: rgba(255, 255, 255, .6);
          font-family:monospace;
          &:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 5%;
            width: 90%;
            height: 2px;
            background-color: #ff69b4;
          }
        }
        img {
          width: 50px;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      
    }
  }
}
.login-btn {
  button {
    width: 100%;
    background-color: rgba(255, 255, 255, .2);
    border: none;
    color: #ff69b4;
  }
}
::v-deep(.el-input-group__prepend) {
  background-color: rgba(255, 255, 255, .2);
}
::v-deep(.el-input__inner) {
  background-color: rgba(255, 255, 255, .2);
  color: #ff69b4;
}
::v-deep(.el-input__inner:focus) {
  border-color: #ff69b4;
}
::v-deep(.el-input__suffix) {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  i {
    cursor: pointer;
    font-size: 18px;
    color: #fff;
  }
  img {
    height: 38px;
    display: block;
  }
}
</style>