<template>
  <div class="panel">
    <panel-title title="自定义菜单"></panel-title>
    <div class="panel-body">
      <div class="menu-preview align_center ofh fl relative">
        <h2 class="title nowrap">天雁商学院</h2>
        <div class="menu-list absolute">
          <ul class="d_box">
            <li class="item nowrap relative d_boxflex" v-for="(menu_item, index) in menu_button"
                :class="{'active': set_menu_class(index)}"
                @click.stop="set_menu_index(index)">
              <i class="icon menu" v-if="menu_item.sub_button.length > 0"></i>
              <span class="text" v-text="menu_item.name"></span>
              <div class="menu-sub-list width_100 absolute" v-if="index == menu_index">
                <ul class="relative">
                  <li class="sub-item relative" v-for="(sub_item,sub_index) in menu_item.sub_button"
                      @click.stop="set_sub_menu_index(sub_index)"
                      :class="{'active': set_sub_menu_class(index,sub_index)}">
                    <span class="nowrap text block" v-text="sub_item.name"></span>
                  </li>
                  <li class="sub-item relative" v-if="menu_item.sub_button.length < 5" @click.stop="add_sub_menu">
                          <span class="nowrap text block">
                            <i class="icon add"></i>
                          </span>
                  </li>
                </ul>
                <span class="arrow absolute"></span>
              </div>
            </li>
            <li class="item nowrap d_boxflex" v-if="menu_button.length < 3" @click="add_menu_button">
              <i class="icon add"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu-form ofh relative">
        <div class="edit-warp width_100 height_100 relative">
          <div class="title-bar ofh" v-if="!index_is_null">
            <span class="left text fl" v-text="wx_name"></span>
            <span class="right text fr" @click.stop="delete_button">删除菜单</span>
          </div>
          <div class="form-area" v-if="!index_is_null">
            <el-row>
              <el-col :span="24" v-if="menu_sub_button_length">
                <p class="form-tips">已为“<span v-text="menu_button[menu_index].name"></span>”添加了5个子菜单，无法设置其他内容。</p>
                <el-form ref="form" label-position="left" label-width="100px">
                  <el-form-item label="菜单名称" class="form-group">
                    <el-input placeholder="请输入菜单名称" class="input" v-model="wx_name"></el-input>
                    <p class="form-tips">字数不超过4个汉字或8个字母</p>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="24" v-else>
                <el-form ref="form" label-position="left" label-width="100px">
                  <el-form-item label="子菜单名称" class="form-group">
                    <el-input placeholder="请输入菜单名称" class="input" v-model="wx_name"></el-input>
                    <p class="form-tips">字数不超过8个汉字或16个字母</p>
                  </el-form-item>
                  <el-form-item label="子菜单内容">
                    <el-radio-group v-model="wx_type">
                      <el-radio :label="event_click">发送消息</el-radio>
                      <el-radio :label="event_view">跳转网页</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div class="url-content ofh" v-if="event_type_switch">
                    <p class="form-tips">点击该子菜单会跳到以下链接</p>
                    <el-form-item label="页面地址" class="form-group form-url">
                      <el-input class="input" v-model="wx_url"></el-input>
                    </el-form-item>
                  </div>
                  <div class="url-content ofh" v-else>
                    <p class="form-tips">尽请期待</p>
                  </div>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
        <span class="arrow absolute"></span>
      </div>
      <div class="menu-button align_center ofh relative">
        <div class="left-button fl" v-if="false">
          <el-button :plain="true" type="success" class="button">菜单排序</el-button>
          <el-button :plain="true" type="success" class="button">完成</el-button>
        </div>
        <div class="right-button">
          <el-button type="success" class="button" @click.stop="submit_wx_button">保存并发布</el-button>
          <el-button :plain="true" type="success" class="button" v-if="false">预览</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {url_menu_info, url_menu_save} from 'common/URL'
  import {panelTitle} from 'components'

  const EVENT_VIEW = "view"
  const EVENT_CLICK = "click"

  export default {
    data() {
      return {
        menu_index: null,
        sub_menu_index: null,
        wx_name: '',
        wx_type: EVENT_VIEW,
        wx_url: '',
        event_view: EVENT_VIEW,
        event_click: EVENT_CLICK
      }
    },
    components: {
      panelTitle
    },
    created() {
      this.get_menu_button()
    },
    computed: {
      //从vuex中获取自定义菜单
      menu_button() {
        return this.$store.getters.wx_menu_button
      },
      //判断当前的一级菜单中的子菜单的长度是否等于5
      menu_sub_button_length() {
        let _flag = this.menu_button[this.menu_index].sub_button.length == 5 && this.sub_menu_index == null
        if (this.menu_button[this.menu_index].sub_button.length > 0) {
          this.menu_button[this.menu_index].url = ''
          this.menu_button[this.menu_index].type = ''
          this.commit_menu_vuex(this.menu_button)
        }
        return _flag
      },
      event_type_switch(){
        return this.wx_type == EVENT_VIEW
      },
      index_is_null() {
        return this.menu_index == null && this.sub_menu_index == null
      }
    },
    methods: {
      //添加菜单到状态管理器中
      commit_menu_vuex(menu) {
        this.$store.commit('WX_MENU_BUTTON', menu)
      },
      //获取自定义菜单
      get_menu_button() {
        this.$http.get(url_menu_info)
          .then(({data:{data, code, msg}}) => {
            this.commit_menu_vuex(data)
          })
      },
      //单击一级菜单事件
      set_menu_index(index) {
        this.sub_menu_index = null
        this.menu_index = index

        let _data = this.menu_button[this.menu_index]
        this.set_form_data(_data)
      },
      //添加一级菜单
      add_menu_button() {
        let _menu = this.menu_button
        _menu.push({
          name: "菜单名称",
          type: "view",
          url: "",
          sub_button: []
        })
        this.commit_menu_vuex(_menu)
        this.sub_menu_index = null
        this.menu_index = this.menu_button.length - 1

        let _data = this.menu_button[this.menu_index]
        this.set_form_data(_data)
      },
      //单击二级菜单事件
      set_sub_menu_index(index){
        this.sub_menu_index = index

        let _data = this.menu_button[this.menu_index].sub_button[this.sub_menu_index]
        this.set_form_data(_data)
      },
      //添加二级菜单
      add_sub_menu() {
        let _menu = this.menu_button
        let _sub_menu = _menu[this.menu_index].sub_button
        _sub_menu.push({
          "name": "子菜单名称",
          "type": "view",
          "url": ""
        })
        this.commit_menu_vuex(_menu)
        this.sub_menu_index = _sub_menu.length - 1

        let _data = this.menu_button[this.menu_index].sub_button[this.sub_menu_index]
        this.set_form_data(_data)
      },
      //设置一级菜单的active
      set_menu_class(index) {
        return index == this.menu_index && this.sub_menu_index == null
      },
      //设置二级菜单的active
      set_sub_menu_class(index, sub_index) {
        return sub_index == this.sub_menu_index && index == this.menu_index
      },
      //设置数据到表单中
      set_form_data(data) {
        this.wx_name = data.name
        this.wx_url = data.url
      },
      //删除菜单
      delete_button() {
        this.$confirm('此操作将删除 “' + this.wx_name + '” 菜单下设置的内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let _menu = this.menu_button
          if (this.sub_menu_index == null) {
            //一级菜单
            _menu.splice(this.menu_index, 1)
            let _slef_index = _menu.length - 1
            this.menu_index = _slef_index < 0 ? null : _slef_index
          } else {
            //二级菜单
            _menu[this.menu_index].sub_button.splice(this.sub_menu_index, 1)
            let _slef_index = _menu[this.menu_index].sub_button.length - 1
            this.sub_menu_index = _slef_index < 0 ? null : _slef_index
          }
          this.commit_menu_vuex(_menu)
        }).catch(() => {

        })
      },
      //提交自定义菜单
      submit_wx_button(){
        this.$http.post(url_menu_save, {menu_button: this.menu_button})
          .then(({data:{data, code, msg}}) => {
            this.$message({
              message: msg,
              type: 'success'
            })
          })
      }
    },
    watch: {
      wx_type(val, oldVal){
        //click类型暂时不做
        this.wx_type = EVENT_VIEW
      },
      wx_name(val, oldVal){
        let _menu = this.menu_button
        if (this.sub_menu_index == null) {
          //一级菜单
          _menu[this.menu_index].name = val
        } else {
          //二级菜单
          _menu[this.menu_index].sub_button[this.sub_menu_index].name = val
        }
        this.commit_menu_vuex(_menu)
      },
      wx_url(val, oldVal){
        let _menu = this.menu_button
        if (this.sub_menu_index == null) {
          //一级菜单
          _menu[this.menu_index].url = val
        } else {
          //二级菜单
          _menu[this.menu_index].sub_button[this.sub_menu_index].url = val
        }
        this.commit_menu_vuex(_menu)
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .menu-preview {
    width: 318px;
    height: 578px;
    background-image: url(./images/wechat_head.png);
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100% auto;
    border: 1px solid #e7e7eb;
    .title {
      color: #fff;
      margin-top: 20px;
      height: 45px;
      line-height: 45px;
      font-size: 15px;
      font-weight: normal;
    }
    .menu-list {
      left: 0;
      bottom: 0;
      width: 275px;
      height: 50px;
      line-height: 50px;
      padding-left: 43px;
      background-image: url(./images/wechat_foot.png);
      background-repeat: no-repeat;
      background-position: center top;
      background-size: 100% auto;
      border-top: 1px solid #e7e7eb;
      .item {
        color: #616161;
        font-size: 14px;
        border-left: 1px solid #e7e7eb;
        overflow: visible;
        cursor: pointer;
        &:hover {
          color: #000;
          background-color: #fff;
        }
        .icon {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 2px;
          margin-top: -2px;
          vertical-align: middle;
          background-image: url(./images/wechat_icons.png);
          background-repeat: no-repeat;
          &.menu {
            background-position: 0 -36px;
          }
          &.add {
            width: 14px;
            height: 14px;
            background-position: 0 0;
          }
        }
        &.active {
          line-height: 48px;
          background-color: #fff;
          color: #44b549;
          border: 1px solid #44b549;
        }
      }
    }
    .menu-sub-list {
      left: 0;
      bottom: 60px;
      border: 1px solid #d0d0d0;
      background-color: #fafafa;
      border-radius: 2px;
      & > ul {
        z-index: 2;
      }
      .sub-item {
        color: #616161;
        font-size: 14px;
        padding: 0 10px;
        height: 45px;
        line-height: 45px;
        cursor: pointer;
        .text {
          margin-bottom: -1px;
          border-bottom: 1px solid #e7e7eb;
        }
        &:hover {
          background-color: #eee;
        }
        &.active {
          height: 43px;
          line-height: 43px;
          background-color: #fff;
          color: #44b549;
          border: 1px solid #44b549;
          margin: -1px;
          .text {
            border-bottom: none;
          }
        }
        &:last-child {
          .text {
            border-bottom: none;
          }
        }
      }
      .arrow {
        content: '';
        left: 50%;
        top: 100%;
        margin-top: -4px;
        margin-left: -4px;
        width: 8px;
        height: 8px;
        border-left: 1px solid #e7e7eb;
        border-bottom: 1px solid #e7e7eb;
        background-color: #fafafa;
        transform: rotate(-45deg);
        z-index: 1;
      }
    }
  }

  .menu-form {
    margin-left: 332px;
    padding-left: 13px;
    width: 600px;
    height: 580px;
    .edit-warp {
      padding: 0 20px;
      box-sizing: border-box;
      background-color: #f4f5f9;
      border: 1px solid #e7e7eb;
    }
    .title-bar {
      padding: 10px 0;
      border-bottom: 1px solid #e7e7eb;
      .text {
        font-size: 14px;
        &.left {
          color: #222;
        }
        &.right {
          color: #459ae9;
          cursor: pointer;
        }
      }
    }
    .form-group {
      margin-top: 30px;
      .input {
        width: 290px;
        height: 30px;
        line-height: 30px;
        input {
          background-color: #fff;
          border: 1px solid #e7e7eb;
          border-radius: 0;
        }
      }
      &.form-url {
        margin: 0;
      }
    }
    .form-tips {
      margin-top: 5px;
      color: #8d8d8d;
      font-size: 14px;
      line-height: 36px;
    }
    .url-content {
      padding: 16px 20px;
      padding-top: 0;
      border: 1px solid #e7e7eb;
      background-color: #fff;
    }
    .arrow {
      left: 5px;
      bottom: 20px;
      width: 15px;
      height: 15px;
      background-color: #f4f5f9;
      border-top: 1px solid #e7e7eb;
      border-left: 1px solid #e7e7eb;
      transform: rotate(-45deg);
    }
  }

  .menu-button {
    padding: 50px 0;
    .left-button {
      width: 320px;
    }
    .right-button {
      margin-left: 345px;
      width: 600px;
    }
    .button {
      margin: 0 20px;
      padding: 10px 25px;
    }
  }

</style>
