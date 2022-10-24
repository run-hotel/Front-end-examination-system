<template>
  <div class="justify-between page">
    <div ref="Blur" id="pop" style="display: none"></div>
    <LoadingCard ref="Load" style="display: none" />
    <div class="flex-col group">
      <div class="flex-col items-start group_15 view-dL5R0iFd">
        <span class="text_1 Text">Log In...</span><br />
        <span class="text_1 Text">在线考试管理员端</span>
        <span class="text_2 Text">Be Love Be here</span>
      </div>
      <div class="flex-col items-start group_2">
        <div class="flex-row group_17">
          <span class="text_3">Welcome</span>
          <span class="text_4">back! Please login to your account.</span>
        </div>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        auto-complete="on"
      >
        <div class="flex-col items-start group_16">
          <el-form-item prop="username">
            <div class="flex-row section_1">
              <img
                src="https://project-user-resource-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529306943396518005.png"
                class="image_1"
              />
              <el-input
                v-model="loginForm.username"
                name="username"
                class="text_5 text_6"
                auto-complete="on"
                placeholder="请输入管理员号"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="flex-row section_1 view_1">
              <img
                src="https://project-user-resource-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529306943399257711.png"
                class="image_1"
              />
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                show-password
                class="text_5 text_6"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </div>
          </el-form-item>
        </div>
        <!-- <el-form-item prop="validate" id="Verification">
          <el-input
            class="validate-code"
            v-model="form.validate"
            placeholder="验证码"
            style="margin-right: 40px"
          ></el-input>
          <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item> -->
        <div class="flex-row group_7">
          <el-form-item class="flex-row group_7">
            <el-button
              :loading="loading"
              class="flex-col items-center text-wrapper view-PpVUiiue"
              type="primary"
              @click.native.prevent="handleLogin"
              ><span class="text_11">登录</span></el-button
            >
          </el-form-item>
          <!-- button -->
          <!-- <router-link
            class="flex-col items-center text-wrapper_1 view-mhXv1fEN"
            to=""
          >
            <span class="text_12">注册</span>
          </router-link> -->
        </div>
      </el-form>
    </div>
    <div class="flex-col section_3">
      <div class="flex-col items-center group_8">
        <div class="flex-row group_9">
          <router-link to="/" class="text_13 ButtonHover">主页</router-link>
          <div class="flex-row group_10">
            <router-link to="/aboutus" class="text_14 ButtonHover"
              >关于我们</router-link
            >
            <div class="flex-row group_11">
              <router-link to="/news" class="text_15 ButtonHover"
                >超星期刊</router-link
              >
              <button class="text_16 ButtonHover">....</button>
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266504e5a7e3f03106ffb8e/6274b8cb3051170011fb085d/16527963987939193108.png"
        class="image_7 picture image-jjq67nzE"
      />
    </div>
  </div>
</template>
    
  <script>
import { reqLogin } from '@/api/login'
import { setStore } from '@/utils/mUtils'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入6位数字的教工号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.adminLogin()
        } else {
          // console.log('提交错误!!')
          return false
        }
      })
    },
    async adminLogin() {
      const result = await reqLogin(
        this.loginForm.username,
        this.loginForm.password
      )
      if (result.statu === 0) {
        this.loading = false
        this.$store.dispatch('recordUserInfo', result.data)
        // 将userInfo存入localSession
        setStore('adminInfo', result.data)
        this.$message({
          message: result.msg,
          type: 'success',
        })
        this.$router.push({ path: this.redirect || '/' })
      } else {
        this.loading = false
        this.$message({
          message: result.msg,
          type: 'warning',
        })
      }
    },
  },
}
</script>
    
</script>
  
  <style scoped>
#pop {
  background: rgba(52, 58, 65, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#Verification {
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  justify-items: center;
}
.validate-code {
  width: 136px;
  float: left;
}
/* 验证码样式 */
.code {
  width: 112px;
  height: 35px;
  float: right;
  border: none;
}
html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
  flex-shrink: 0;
  border: none;
  text-decoration: none;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.justify-start {
  display: flex;
  justify-content: flex-start;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-end {
  display: flex;
  justify-content: flex-end;
}

.justify-evenly {
  display: flex;
  justify-content: space-evenly;
}

.justify-around {
  display: flex;
  justify-content: space-around;
}

.justify-between {
  display: flex;
  justify-content: space-between;
}

.items-start {
  display: flex;
  align-items: flex-start;
}

.items-center {
  display: flex;
  align-items: center;
}

.items-end {
  display: flex;
  align-items: flex-end;
}
input:focus {
  filter: hue-rotate(10deg) brightness(150%) saturate(120%);
}

button {
  border: none;
  background-color: transparent;
  outline: none;
}
input {
  outline: none;
  font-weight: bold;
}
.section_1 {
  padding: 7px 10px 5px;
  background-image: linear-gradient(
    180deg,
    rgba(98, 106, 149, 0.4) 0%,
    rgba(181, 186, 213, 0.25) 100%
  );
  border-radius: 30px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  overflow: hidden;
  width: 450px;
  border: solid 1px rgba(255, 255, 255, 0.3);
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.section_1:hover {
  transform: translateX(30px) scale(1.1);
}
.image_1 {
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
.text_5 {
  margin-left: 10px;
  align-self: center;
}
.page {
  background-color: rgb(255, 255, 255);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.group {
  margin-left: 200px;
  width: 720px;
  justify-content: center;
  align-items: center;
  align-self: center;
  max-width: 1200px;
  max-height: 1000px;
  height: 900px;
}
.section_3 {
  background-color: rgba(228, 228, 228, 0.41);
  margin-left: 50px;
  width: 820px;
  padding: 30px;
  border-radius: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.text_1 {
  color: rgb(55, 81, 254);
  font-size: 36px;
  font-family: Open Sans;
  font-weight: 700;
  line-height: 43px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_2 {
  margin-top: 15.86px;
  color: rgb(55, 81, 254);
  font-size: 36px;
  font-family: LingWai SC;
  font-weight: 700;
  line-height: 43px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.view_1 {
  margin-top: 27px;
}
.section_2 {
  margin-left: 100px;
  margin-top: 10px;
  background-color: rgb(229, 229, 229, 0.2);
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 40px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  border: none;
}
.text-wrapper {
  padding: 21.03px 0 16.97px;
  border-radius: 5px;
  margin-left: 280px;
  filter: drop-shadow(0px 4px 1.5px rgba(0, 0, 0, 0.25));
  background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529291495598868906.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 129px;
  height: 54px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text-wrapper_1 {
  margin-left: 305px;
  padding: 21.03px 0 16.97px;
  border-radius: 5px;
  background-image: url('https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6266510d5a7e3f0310700f1e/6274b8cb3051170011fb085d/16529291495603403579.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 129px;
  height: 54px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text {
  color: rgb(55, 81, 254);
  font-size: 30px;
  font-family: Roboto;
  font-weight: 700;
  line-height: 27.57px;
}
.image {
  margin-left: 7.1px;
  margin-top: 14.33px;
  flex-shrink: 0;
  width: 25px;
  height: 7px;
}
.text_3 {
  margin-bottom: 3.66px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-family: Roboto;
  line-height: 17.34px;
}
.text_4 {
  margin-left: 7.15px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 18px;
  font-family: Roboto;
  line-height: 17.34px;
}
.text_6 {
  border: none;
  background-image: linear-gradient(
    180deg,
    rgba(98, 106, 149, 0.4) 0%,
    rgba(181, 186, 213, 0.25) 100%
  );
  background-color: #fff !important;
  backdrop-filter: blur(20px);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 13.57px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 800px;
  height: 35px;
  max-width: 900px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_7 {
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-family: SF Pro Text;
  line-height: 13.8px;
  position: relative;
  display: flex;
  width: 800px;
  height: 35px;
  justify-content: flex-start;
  align-items: center;
  max-width: 900px;
  max-height: 45px;
}
.text_9 {
  color: rgba(0, 0, 0, 0.61);
  font-size: 18px;
  font-family: Roboto;
  line-height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
  box-shadow: 0px 20px 40px rgba(147, 231, 221, 0.3);
  border-radius: 10px;
  width: 150px;
  height: 50px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.image_5 {
  margin-top: 5.1px;
  flex-shrink: 0;
  width: 14px;
  height: 8px;
  transform: rotate(270deg);
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_10 {
  margin-left: 8.97px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  font-family: Roboto;
  line-height: 13.89px;
}
.text_11 {
  color: rgb(255, 255, 255);
  font-size: 18px;
  font-family: Roboto;
  line-height: 16.72px;
}
.text_12 {
  color: rgb(11, 48, 241);
  font-size: 18px;
  font-family: Roboto;
  line-height: 16.72px;
}
.text_13 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-family: Roboto;
  line-height: 22.06px;
  display: flex;
  width: 120px;
  height: 50px;
  align-self: center;
  justify-content: center;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.image_4 {
  flex-shrink: 0;
  width: 13px;
  height: 13px;
}
.text_8 {
  margin-left: 12.48px;
  margin-right: 5.01px;
  color: rgba(0, 0, 0, 0.61);
  font-size: 18px;
  font-family: Roboto;
  line-height: 13.68px;
}
.text_14 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-family: SF Pro;
  line-height: 22.15px;
  display: flex;
  justify-content: center;
  width: 120px;
  height: 50px;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_15 {
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-family: Roboto;
  line-height: 22.44px;
  display: flex;
  width: 120px;
  height: 50px;
  justify-content: center;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.text_16 {
  margin-left: 65.72px;
  color: rgb(0, 0, 0);
  font-size: 24px;
  font-family: Roboto;
  line-height: 22.32px;
  display: flex;
  width: 120px;
  height: 50px;
  justify-content: center;
  align-items: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_15 {
  margin-top: 110.12px;
  padding: 60px;
  /* height: 200px; */
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_2 {
  margin-top: 110.85px;
}
.group_16 {
  margin-top: 37.16px;
  margin-left: 120px;
}
.group_4 {
  margin-top: 28px;
  padding: 0 7px;
}
.group_8 {
  padding-bottom: 2.64px;
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
  padding-top: 2.64px;
  margin-right: 20px;
}
.image_7 {
  margin-top: 63.5px;
  width: 839px;
  height: 583px;
  transition: 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.group_14 {
  position: inherit;
  margin-top: 100px;
  margin-top: 0;
  transition: 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  padding: 10px;
  width: 200px;
  height: 80px;
  align-items: center;
  cursor: pointer;
}
.group_17 {
  margin-left: 7.54px;
}
.group_5 {
  margin-top: -25px;
  margin-left: 130px;
  flex: 1 1 auto;
  transform: scale(0.8);
}
.group_9 {
  padding: 0 12.34px;
}
.group_10 {
  margin-left: 98.46px;
  margin-right: 33.96px;
  flex-shrink: 0;
}
.group_11 {
  margin-left: 86.18px;
  flex-shrink: 0;
}
.view-PpVUiiue:hover {
  transform: scale(1.2);
  scale: 1.2em;
  cursor: pointer;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 20px 40px rgba(73, 39, 171, 0.3));
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(40px);
  border-radius: 10px;
}
.view-mhXv1fEN:hover {
  transform: scale(1.2);
  scale: 1.2em;
  cursor: pointer;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.05))
    drop-shadow(0px 20px 40px rgba(73, 39, 171, 0.3));
}
.view-3T1ieCoQ:hover {
  transform: rotate(360deg);
}
.view-dL5R0iFd:hover {
  background: gradient(180deg, #ffffff 0%, #d9dfff 100%);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  border-radius: 0px 30px 30px 30px;
  transform: translateX(20px);
  cursor: default;
}
.Text:hover {
  transform: translateX(10px) translateY(10px);
}
.ButtonHover:hover {
  background: #00cffd;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transform: scale(1.2);
  cursor: pointer;
}
.view-POKTESgX:hover {
  background: linear-gradient(180deg, #ffffff 0%, #d9dfff 100%);
  border: 0.5px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2);
  backdrop-filter: blur(30px);
  cursor: pointer;
}
.view-POKTESgX:hover :first-child {
  transform: rotate(360deg);
}
.image-jjq67nzE:hover {
  transform: translateX(100px);
}
.view-315XDzH1:hover {
  cursor: pointer;
}
.forget:hover {
  transform: scale(0.8);
  cursor: pointer;
  filter: hue-rotate(10deg) brightness(150%) saturate(120%);
}
.image-jjq67nzE:checked {
  transform: translateX(100px);
}
</style>
  
