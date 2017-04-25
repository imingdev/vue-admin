<template>
  <div class="menu-right" v-if="get_user_info.is_login">
    <div class="notification-menu">
      <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">
          <img :src="get_user_info.user.avatar" :alt="get_user_info.user.name"/>
          <span v-text="get_user_info.user.name"></span>
          <span class="icon"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-user"></i>
              <span>个人信息</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-cog"></i>
              <span>设置</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-sign-out"></i>
              <span>安全退出</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {port_user} from 'common/port_uri'
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {SET_USER_INFO} from 'store/actions/type'

  const USER_OUT = 0
  const USER_INFO = 1
  const USER_SETTING = 2

  export default{
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      //退出
      user_out(){
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(port_user.logout)
            .then(({data: {msg}}) => {
              this.isShow = false
              this.$message({
                message: msg,
                type: 'success'
              })
              this.set_user_info({
                user: null,
                is_login: false
              })
              setTimeout(() => {
                this.$router.replace({name: "login"})
              }, 500)
            })
            .catch(({status, statusText}) => {
              this.$message({
                message: '提交失败！错误原因 ' + statusText + ' 状态码 ' + status,
                type: 'error'
              })
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
