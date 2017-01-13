<template>
  <div class="left-side-inner">
    <div class="logo">
      <router-link to="/">
        <img src="./images/logo.png" alt="">
      </router-link>
    </div>
    <el-menu class="menu-box" theme="dark">
      <router-link active-class="is-active" :to="item.path" :index="index" v-for="(item,index) in nav_menu_data"
                   tag="li" class="menu-list el-menu-item">
        <i class="icon fa" :class="item.icon"></i>
        <span v-text="item.title"></span>
      </router-link>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        nav_menu_data: process.env.NODE_ENV === 'development' ?
          [
            // {
            //   title: "主页",
            //   path: "/home",
            //   icon: "fa-home"
            // },
            {
              title: "幻灯片管理",
              path: "/slide",
              icon: "fa-picture-o"
            }, {
            title: "自定义菜单",
            path: "/menu",
            icon: "fa-bars"
          }, {
            title: "素材管理",
            path: "/media",
            icon: "fa-camera-retro"
          }, {
            title: "课程管理",
            path: "/course",
            icon: "fa-book"
          }, {
            title: "讲师认证",
            path: "/lecturer/verify",
            icon: "fa-bookmark"
          }, {
            title: "保险头条",
            path: "/insurance/headline",
            icon: "fa-medkit"
          }, {
            title: "投资管理",
            path: "/insurance/investment/department",
            icon: "fa-medkit"
          }]
          :
          [{
            title: "课程管理",
            path: "/course",
            icon: "fa-book"
          }, {
            title: "幻灯片管理",
            path: "/slide",
            icon: "fa-picture-o"
          }, {
            title: "讲师认证",
            path: "/lecturer/verify",
            icon: "fa-bookmark"
          }, {
            title: "素材管理",
            path: "/media",
            icon: "fa-camera-retro"
          }, {
            title: "保险头条",
            path: "/insurance/headline",
            icon: "fa-medkit"
          }, {
            title: "保险管理",
            path: "/insurance/investment/department",
            icon: "fa-medkit"
          }]
      }
    }
  }

</script>
