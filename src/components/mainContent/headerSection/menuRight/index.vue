<template>
  <div class="menu-right" v-if="user_data">
    <ul class="notification-menu">
      <li class="notification-list">
        <span class="notification-btn" @click="show_menu">
          <img src="./images/user-avatar.jpg" :alt="user_data.name"/>
          <span v-text="user_data.name"></span>
          <span class="icon"></span>
        </span>
        <ul class="dropdown-menu" v-show="isShow">
          <!--<li class="dropdown-list">-->
            <!--<span class="dropdown-btn" @click="user_click(1)">-->
              <!--<i class="icon fa fa-user"></i>-->
              <!--<span>个人信息</span>-->
            <!--</span>-->
          <!--</li>-->
          <!--<li class="dropdown-list">-->
            <!--<span class="dropdown-btn" @click="user_click(2)">-->
              <!--<i class="icon fa fa-cog"></i>-->
              <!--<span>设置</span>-->
            <!--</span>-->
          <!--</li>-->
          <li class="dropdown-list">
            <span class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-sign-out"></i>
              <span>安全退出</span>
            </span>
          </li>
        </ul>
      </li>
    </ul>
    <div style="position:fixed;width:100%;height:100%;top:0;left:0;z-index:998;" v-if="isShow" @click="show_menu"></div>
  </div>
</template>
<script type="text/javascript">
  import {url_user_logout, API_SUCCESS} from 'common/URL'

  const USER_OUT = 0
  const USER_INFO = 1
  const USER_SETTING = 2

  export default{
    data(){
      return {
        isShow: false,
        dialog_title: '',
        dialog_message: '',
        dialogVisible: false
      }
    },
    computed: {
      user_data() {
        return this.$store.state.user_data
      }
    },
    methods: {
      show_menu() {
        this.isShow = !this.isShow
      },
      user_out(){
        //退出
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_user_logout)
            .then(({data:{data, code, msg}}) => {
              if (code === API_SUCCESS) {
                this.isShow = false
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.$store.commit('USER_DATA', new Object())
                this.$store.commit('AUTH_LOGIN', false)
                router.replace({name: "login"})
              }
            })
        }).catch(() => {

        })
      },
      user_info() {
        //个人信息
      },
      user_setting() {
        //设置
      },
      user_click(type) {
        switch (type) {
          case USER_OUT :
            //退出
            this.user_out()
            break
          case USER_INFO:
            //个人信息
            break
          case USER_SETTING:
            //设置
            break
        }
      }
    }
  }
</script>
