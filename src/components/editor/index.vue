<template>
  <div class="width_100 height_100 relative">
    <textarea ref="editor" :style="get_style" v-html="content"></textarea>
  </div>
</template>
<script type="text/javascript">
  import {API_SUCCESS, url_image_upload} from 'common/URL'
  import wangeditor from './lib/wangEditor'

  export default{
    props: {
      inputContent: {
        type: String
      },
      imageUpload: {
        type: String,
        default: url_image_upload
      },
      mapAk: {
        type: String,
        default: 'X5E5Gp6o9OhV77aihDjwLk8q'
      },
      uploadFileName: {
        type: String,
        default: 'file'
      },
      height: {
        type: String,
        default: "400px"
      },
      maxHeight: {
        type: String,
        default: "400px"
      },
      init_editor_html: {
        type: String,
        default: null
      }
    },
    data(){
      return {
        editor: null,
        content: this.inputContent
      }
    },
    mounted() {
      this.$nextTick(this.createdEditor)
    },
    methods: {
      createdEditor(){
        let self = this
        wangeditor.config.printLog = false
        if (self.editor === null) {
          // 创建编辑器
          self.editor = new wangeditor(self.$refs.editor)
        } else {
          self.undestroy()
        }
        // 上传图片URL
        self.editor.config.uploadImgUrl = this.imageUpload
        //百度地图秘钥
        self.editor.config.mapAk = this.mapAk
        //上传的文件字段名
        self.editor.config.uploadImgFileName = this.uploadFileName
        self.editor.onchange = function () {
          // onchange 事件中更新数据
          self.content = this.$txt.html()
        }
        // 自定义load事件
        self.editor.config.uploadImgFns.onload = self.uploadImgFns
        if (self.editor !== null) {
          self.editor.create()
          self.editor.$txt.html(self.content)
        }
      },
      uploadImgFns(result, xhr) {
        let _jsonData = JSON.parse(result)
        if (_jsonData.code === API_SUCCESS) {
          let _data = _jsonData.data
          // 插入到编辑器中
          this.editor.command(null, 'insertHtml', '<img src="' + _data.url + '" alt="' + _data.name + '"/>')
        }
      }
    },
    computed: {
      get_style() {
        let _thatheight = this.height
        let _thatMaxheight = this.maxHeight
        let _height = _thatheight.indexOf("px") ? _thatheight + "px" : _thatheight
        let _maxheight = _thatMaxheight.indexOf("px") ? _thatMaxheight + "px" : _thatMaxheight
        return "height:" + _height + ";max-height:" + _maxheight
      }
    },
    destroyed() {
      this.editor.destroy()
      this.editor = null
    },
    watch: {
      content(val){
        this.$emit("input", val)
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  @import './scss/wangEditor';
</style>
