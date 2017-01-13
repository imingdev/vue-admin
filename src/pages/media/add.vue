<template>
  <div class="panel">
    <panel-title title="新建图文消息">
      <el-radio-group v-model="site_type_value">
        <el-radio :label="site_type_live">天雁课堂</el-radio>
        <el-radio :label="site_type_rise">利世优品</el-radio>
      </el-radio-group>
    </panel-title>
    <div class="panel-body">
      <el-row>
        <div class="fl media-message-thumb relative ofh">
          <message-thumb
            :data="message_data"
            @change="message_change"
            @add="add_message_data"
            @move_up="move_up_message_data"
            @move_down="move_down_message_data"
            @delete="delete_message_data"></message-thumb>
        </div>
        <div class="media-message-edit relative ofh">
          <el-form label-position="top" :model="form_data" ref="form" :rules="rules">
            <el-form-item label="标题" class="form-item" prop="title">
              <el-input placeholder="请输入标题" v-model="form_data.title"></el-input>
            </el-form-item>
            <el-form-item label="作者" class="form-item">
              <el-input placeholder="请输入作者" v-model="form_data.auther"></el-input>
            </el-form-item>
            <el-form-item label="摘要" class="form-item">
              <el-input type="textarea" placeholder="请输入摘要" v-model="form_data.descrip"></el-input>
            </el-form-item>
            <el-form-item label="封面" class="form-item" prop="image">
              <el-upload
                :action="imageUpload"
                type="drag"
                :thumbnail-mode="true"
                :on-preview="handlePreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="set_message_default_image"
              >
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip"
                     slot="tip"
                     style="margin-top: -15px;"
                     v-if="index === 0">大图片建议尺寸：900像素 * 500像素
                </div>
                <div class="el-upload__tip"
                     slot="tip"
                     style="margin-top: -15px;"
                     v-else>小图片建议尺寸：200像素 * 200像素
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型" class="form-item">
              <el-radio-group v-model="form_data.type">
                <el-radio :label="event_url">跳转地址</el-radio>
                <el-radio :label="event_view">发送文章</el-radio>
              </el-radio-group>
            </el-form-item>
            <div style="margin-top:-15px">
              <el-form-item label="" class="form-item" v-if="is_url_type" prop="urlContent">
                <el-input v-model="form_data.urlContent" placeholder="请输入url地址"></el-input>
              </el-form-item>
              <el-form-item label="" v-else prop="inputContent">
                <editor
                  :inputContent="form_data.inputContent"
                  v-model="form_data.inputContent"
                  :imageUpload="imageUpload"
                  height="420"
                  maxHeight="500"></editor>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-row>
      <el-row class="align_center width_100" style="margin-top:20px">
        <el-button type="primary" @click="onSubmit" style="margin-right:50px">立即提交</el-button>
        <router-link :to="{name: 'media'}">
          <el-button>取消</el-button>
        </router-link>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {messageThumb, editor, panelTitle} from 'components'
  import {API_SUCCESS, url_file_upload, url_add_media_message} from 'common/URL'
  const EVENT_URL = "url"
  const EVENT_VIEW = "view"
  const DEFAULT_EVENT = EVENT_VIEW

  const DEFAULT_INPUT = '<p><br></p>'

  const SITE_TYPE_RISE = 'rise'
  const SITE_TYPE_LIVE = 'live'
  const DEFAULT_SITE = SITE_TYPE_LIVE

  export default{
    data(){
      return {
        imageUpload: url_file_upload,
        form_data: {},
        site_type_value: DEFAULT_SITE,
        message_data: [{
          title: '图文标题',
          descrip: null,
          image: null,
          auther: null,
          type: DEFAULT_EVENT,
          content: null,
          origin_url: null,
          urlContent: null,
          inputContent: DEFAULT_INPUT
        }],
        site_type_rise: SITE_TYPE_RISE,
        site_type_live: SITE_TYPE_LIVE,
        event_url: EVENT_URL,
        event_view: EVENT_VIEW,
        index: 0
      }
    },
    components: {
      messageThumb,
      editor,
      panelTitle
    },
    methods: {
      //设置form数据
      set_form_data() {
        let _self = this
        _self.form_data = _self.message_data[_self.index]
        let _type = _self.form_data.type
        _self.form_data.type = EVENT_URL
        if (_type === EVENT_VIEW) {
          setTimeout(() => {
            _self.form_data.type = _type
          }, 10)
        }
      },
      //查看图片
      handlePreview(file){
        this.$ViewImage.open(file.url)
      },
      //移除图片
      handleRemove(file, fileList) {
        this.form_data['image'] = null
      },
      //封面图片上传成功
      handleSuccess(response) {
        if (response.code === API_SUCCESS) {
          this.form_data['image'] = response.data.url
        }
      },
      //提交数据
      onSubmit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            //提交前数据处理
            let _message = new Array(this.message_data.length)
            for (let i = 0; i < _message.length; i++) {
              let _md = this.message_data[i]
              let _obj
              if ((typeof _md.id) === 'undefined') {
                _obj = {
                  title: _md.title,
                  descrip: _md.descrip,
                  image: _md.image,
                  auther: _md.auther,
                  type: _md.type,
                  content: _md.type === EVENT_URL ? _md.urlContent : _md.inputContent,
                  origin_url: _md.origin_url
                }
              } else {
                _obj = {
                  id: _md.id,
                  title: _md.title,
                  descrip: _md.descrip,
                  image: _md.image,
                  auther: _md.auther,
                  type: _md.type,
                  content: _md.type === EVENT_URL ? _md.urlContent : _md.inputContent,
                  origin_url: _md.origin_url
                }
              }
              _message[i] = _obj
            }

            this.$http.post(url_add_media_message, {
              site: this.site_type_value,
              message: _message
            })
              .then(({data:{data, code, msg}}) => {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(() => {
                  router.push({name: 'media'})
                }, 500)
              })
          } else {
            return false
          }
        })
      },
      //设置数据
      message_change(index){
        if (this.index !== index) {
          this.index = index
          this.set_form_data()
        }
      },
      //添加数据
      add_message_data(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.message_data.push({
              title: '图文标题',
              descrip: null,
              image: null,
              auther: null,
              type: DEFAULT_EVENT,
              content: null,
              origin_url: null,
              urlContent: null,
              inputContent: DEFAULT_INPUT
            })
            this.index = this.message_data.length - 1
            this.set_form_data()
          } else {
            return false
          }
        })
      },
      //上移数据
      move_up_message_data(index){
        let _data = this.message_data
        let _self_data = _data[index]
        let _move_data = _data[index - 1]
        _data[index] = _move_data
        _data[index - 1] = _self_data
        this.message_data = _data
      },
      //下移数据
      move_down_message_data(index){
        let _data = this.message_data
        let _self_data = _data[index]
        let _move_data = _data[index + 1]
        _data[index] = _move_data
        _data[index + 1] = _self_data
        this.message_data = _data
      },
      //删除数据
      delete_message_data(index){
        this.message_data.splice(index, 1)
        this.index = this.message_data.length - 1
        this.set_form_data()
      }
    },
    computed: {
      //判断是否为url跳转类型
      is_url_type() {
        return this.form_data.type === EVENT_URL
      },
      //设置默认已上传的文件列表
      set_message_default_image() {
        if (typeof this.message_data[this.index] === 'undefined') return []
        let _image = this.message_data[this.index].image
        return _image === null ? [] : [{
            name: this.message_data[this.index].title,
            url: _image
          }]
      },
      // 验证器
      rules() {
        //编辑器输入验证器
        let _validateEditor = (rule, value, callback) => {
          if (!this.is_url_type) {
            if (value === '' || value === DEFAULT_INPUT || value === null) {
              callback(new Error('内容不能为空！'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }
        return {
          title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
          image: [{required: true, message: '图片未上传！', trigger: 'blur'}],
          urlContent: [{required: this.is_url_type, message: '内容不能为空！', trigger: 'blur'}],
          inputContent: [{validator: _validateEditor, trigger: 'blur'}]
        }
      }
    },
    created() {
      this.set_form_data()
    }
  }
</script>
