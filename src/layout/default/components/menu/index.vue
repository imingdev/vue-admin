<!--
/**
 * @intro: 左边导航菜单.
 */
-->
<template>
  <el-aside width="200px" class="default-layout-left-menu">
    <el-container class="height_100" direction="vertical">
      <router-link tag="div" :to="homePage" class="logo-view align_center width_100 pointer">
        <img src="./images/logo.png"/>
      </router-link>
      <el-scrollbar class="flex__item" wrap-style="overflow-x: hidden;">
        <el-menu
          class="menu-warp"
          :default-active="getDefaultActive"
          :router="true"
          unique-opened
          background-color="#344058"
          text-color="#c2d7e6"
          active-text-color="#fff">
          <template v-for="(item, index) in menu">
            <!--展开菜单-->
            <el-submenu
              :key="index"
              v-if="item.child && item.child.length"
              :index="`menu_${index}`">
              <template slot="title">
                <i class="menu__icon fa" :class="item.icon" v-if="item.icon"/>
                <span class="menu__label" v-text="item.label"/>
              </template>
              <el-menu-item
                v-for="(sub_item, sub_index) in item.child"
                :key="`sub_menu_${sub_index}`"
                :index="sub_item.path"
                :route="{path: sub_item.path}">
                <i class="menu__icon fa" :class="sub_item.icon" v-if="sub_item.icon"/>
                <span class="menu__label" v-text="sub_item.label"/>
              </el-menu-item>
            </el-submenu>
            <!--顶级菜单-->
            <el-menu-item
              v-else
              :key="index"
              :index="item.path"
              :route="{path: item.path}">
              <template slot="title">
                <i class="menu__icon fa" :class="item.icon" v-if="item.icon"/>
                <span class="menu__label" v-text="item.label"/>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-container>
  </el-aside>
</template>
<script type="text/javascript">
import {homePage} from 'src/common/setting'
import {Home} from 'src/router/auto-routes'

export default {
  data () {
    return {
      homePage,
      menu: [{
        label: '主页',
        icon: 'fa-home',
        child: [{
          label: '主页1',
          icon: 'fa-home',
          path: Home.path
        }]
      }, {
        label: '表格管理',
        path: '/table',
        icon: 'fa-table',
        child: [{
          label: '基本表格',
          path: '/table/base'
        }, {
          label: '排序表格',
          path: '/table/sort'
        }]
      }, {
        label: '图表管理',
        path: '/charts',
        icon: 'fa-bar-chart-o',
        child: [{
          label: '柱状图表',
          path: '/charts/bar'
        }]
      }]
    }
  },
  computed: {
    getDefaultActive () {
      const {meta, path} = this.$route
      return meta.active || path
    }
  }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .default-layout-left-menu {
    background-color: #344058;

    .logo-view {
      margin: 10px auto;
    }

    .menu-warp {
      border: none;

      .menu__label, .menu__icon {
        color: #fff;
      }

      .menu__icon {
        width: 20px;
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: normal;
      }

      .el-submenu {
        .el-menu-item {
          background-color: #252d3e !important;
        }
      }

      .el-menu-item {
        &.is-active {
          background-color: #1e9fff !important;
        }
      }
    }
  }
</style>
