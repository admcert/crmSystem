<template>
  <div class='login'>
    <h2>登录</h2>
    <mt-field class="logininput-box" placeholder="手机号" v-model="phone"></mt-field>
    <mt-field v-if="!usePassword" class="logininput-box" placeholder="验证码" v-model="checkCode">
      <mt-button @click="getIdentifyCode" type="primary" :disabled=closeBtn>
        获取
        <span v-if="closeBtn">({{rTime}}s)</span>
      </mt-button>
    </mt-field>
    <mt-field v-if="usePassword" class="logininput-box" placeholder="密码" type="password" v-model="password"></mt-field>
    <mt-button @click="goToMain" class="login-btn" type="primary">登录</mt-button>
    <div class='bottom'>
      <span v-if="!usePassword" @click="setUsePassword">密码登录</span>
      <span v-if="usePassword" @click="setUseIdentityCode">验证码登录</span>
      <a v-if="usePassword" @click="goToChangePassword">忘记密码?</a>
      <span class='register-btn' @click="goToRegister">注册帐号</span>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { checkPhone } from '../../utils/format'
import { mapActions } from 'vuex'
import api from '../../api/auth'
export default {
  data () {
    return {
      closeBtn: false,
      rTime: 60,
      usePassword: false,
      phone: '',
      password: '',
      checkCode: ''
    }
  },
  methods: {
    ...mapActions(['login', 'plogin']),
    goToChangePassword () {
      this.$router.push({path: '/changePass', query: {userPhone: this.phone}})
    },
    Timer () {
      if (this.rTime > 0) {
        this.rTime--
        setTimeout(this.Timer, 1000)
      } else {
        this.closeBtn = false
        this.rTime = 60
      }
    },
    async getIdentifyCode () {
      if (!checkPhone(this.phone)) {
        return Toast({
          message: '手机号有误'
        })
      }
      let result = await api.getNumVcode({phone: this.phone})
      if (result.data.code !== 200) {
        return Toast({
          message: result.data.error
        })
      }
      this.closeBtn = true
      this.Timer()
    },
    checkData () {
      if (this.usePassword && !this.password) {
        return Toast({
          message: '请输入密码'
        })
      }
      if (!this.usePassword && !this.checkCode) {
        return Toast({
          message: '请输入验证码'
        })
      }
      return 'success'
    },
    async goToMain () {
      let check = this.checkData()
      if (check !== 'success') {
        return
      }
      if (this.usePassword) {
        let result = await this.login({
          phoneNumber: this.phone,
          password: this.password,
          target: 1
        })
        if (result.data.code === 200) {
          this.$router.push('/main')
        } else {
          return Toast({
            message: result.data.error
          })
        }
      } else {
        let result2 = await this.plogin({
          phoneNumber: this.phone,
          code: this.checkCode,
          target: 1
        })
        if (result2.data.code === 200) {
          this.$router.push('/main')
        } else {
          return Toast({
            message: result2.data.error
          })
        }
      }
    },
    setUsePassword () {
      this.usePassword = true
    },
    setUseIdentityCode () {
      this.usePassword = false
    },
    goToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang='scss'>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #1e77ba;
    h2 {
      color: white;
      margin-bottom: 10px;
      font-size: 25px;
    }
    .logininput-box {
      width: 90%;
    }
    .login-btn {
      width: 90%;
      margin-top: 10px;
    }
    .bottom {
      display: flex;
      span {
        color: white;
        margin-top: 10px;
        cursor: pointer;
      }
      span:nth-child(1) {
        position: absolute;
        left: 20px;
      }
      .register-btn {
        position: absolute;
        right: 20px;
      }
      a {
        margin-top: 10px;
        color: #89bee6;
        position: absolute;
        left: 120px;
        point: cursor;
      }
    }
  }
</style>
