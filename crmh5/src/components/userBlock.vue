<template>
  <div class="userBlock">
    <div class="user-head">
      <div class="lbar"></div>
      <span>用户管理</span>
    </div>
    <div class="user-choice-blank">
      <div class="row">
        <div @click="goToUserMessagePage">
          <i class="iconfont userfont">&#xe62c;</i>
          <span>个人信息</span>
        </div>
        <div @click="goToAddressPage">
          <i class="iconfont userfont">&#xe60a;</i>
          <span>收货地址</span>
        </div>
        <div @click="goToCredentialsPage">
          <i class="iconfont userfont">&#xe61a;</i>
          <span>授权证书</span>
        </div>
      </div>
      <div class="row">
        <div @click="goToInviteCodePage">
          <i class="iconfont userfont">&#xe63a;</i>
          <span>邀请二维码</span>
        </div>
        <div @click="goToPublicMessage">
          <i class="iconfont userfont">&#xe602;</i>
          <span>网盘资源</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  methods: {
    ...mapActions(['getUserData']),
    async goToUserMessagePage () {
      let result = await this.getUserData()
      if (result.code === 200) {
        this.$router.replace({path: '/userMessage'})
      } else {
        return Toast({
          message: result.error
        })
      }
    },
    goToAddressPage () {
      this.$router.replace({path: '/managerAddress'})
    },
    goToCredentialsPage () {
      this.$router.replace({path: '/credentials'})
    },
    goToInviteCodePage () {
      this.$router.replace('/inviteCode')
    },
    goToPublicMessage () {
      this.$router.replace('/publicMessage')
    }
  }
}
</script>
<style lang='scss'>
  .userBlock {
    margin: 10px 0;
    .user-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      background-color: #e8dfdf;
      .lbar {
        height: 60%;
        width: 5px;
        background-color: green;
        margin: 0 8px;
        border-radius: 25%;
      }
    }
    .user-choice-blank {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex-direction: row;
        height: 120px;
        width: 100%;
        div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          border: 1px solid #e8dfdf;
          cursor: pointer;
          span {
            margin: 5px 0;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
