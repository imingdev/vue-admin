<template>
  <div class="panel-body">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="发送人:" prop="publisher_id">
        <el-select v-model="form.publisher_id" placeholder="请选择发送人">
          <el-option
            v-for="item in lecture_members"
            :label="item.nickname"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息类型:">
        <el-radio-group v-model="form.type" @change="change_form_type">
          <el-radio :label="message_text">文字消息</el-radio>
          <el-radio :label="message_audio">语音消息</el-radio>
          <el-radio :label="message_picture">图片消息</el-radio>
        </el-radio-group>
      </el-form-item>
      <div style="margin-top:-15px">
        <div v-if="is_message_text">
          <el-form-item label="" prop="content">
            <el-input v-model="textContent" placeholder="请输入文字消息"></el-input>
          </el-form-item>
        </div>
        <div v-if="is_message_audio">
          <el-form-item label="" prop="content">
            <div class="audio_upload ofh relative">
              <audio-play v-if="audioContent !== null" :src="audioContent"></audio-play>
              <el-upload
                :action="url_file_upload"
                accept="audio/*"
                :on-success="handle_success_audio"
                :show-upload-list="false"
                v-if="audioContent === null">
                <el-button size="small" type="primary" icon="upload2"></el-button>
              </el-upload>
              <el-button size="small" type="primary" icon="close"
                         v-if="audioContent !== null"
                         style="margin-left:15px"
                         @click="handle_remove_audio"></el-button>
            </div>
          </el-form-item>
        </div>
        <div v-if="is_message_picture">
          <el-form-item label="" prop="content">
            <el-upload
              :action="url_file_upload"
              type="drag"
              :thumbnail-mode="true"
              :on-preview="handle_preview_picture"
              :on-success="handle_success_picture"
              :on-remove="handle_remove_picture">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <!--content-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="on_submit">立即提交</el-button>
        <el-button style="margin-left:20px" @click="$emit('submit_close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, audioPlay} from 'components'
  import {url_get_lecture_members, API_SUCCESS, url_file_upload, url_course_uploda_msg} from 'common/URL'

  const MESSAGE_TEXT = 'text' //文字消息
  const MESSAGE_AUDIO = 'audio'//语音消息
  const MESSAGE_PICTURE = 'picture'//图片消息

  export default{
    props: {
      lecture_id: {
        require: true
      }
    },
    data(){
      return {
        url_file_upload: url_file_upload,
        message_text: MESSAGE_TEXT,
        message_audio: MESSAGE_AUDIO,
        message_picture: MESSAGE_PICTURE,
        lecture_members: null,
        on_submit: false,
        form: {
          publisher_id: null,
          lecture_id: this.lecture_id,
          type: MESSAGE_TEXT,
          content: null
        },
        textContent: null,
        pictureContent: null,
        audioContent: null
      }
    },
    components: {
      panelTitle,
      audioPlay
    },
    created() {
      this.get_lecture_members()
    },
    computed: {
      //验证规则
      rules() {
        let _rules = {
          publisher_id: [{required: true, message: '请选择发送人', trigger: 'change'}],
          content: [{required: true, message: this.get_error_message, trigger: 'blur'}]
        }
        return _rules
      },
      //判断是否为文字消息
      is_message_text() {
        return this.form.type === MESSAGE_TEXT
      },
      //判断是否为语音消息
      is_message_audio() {
        return this.form.type === MESSAGE_AUDIO
      },
      //判断是否为图片消息
      is_message_picture() {
        return this.form.type === MESSAGE_PICTURE
      },
      get_error_message(){
        if (this.is_message_text) {
          return '文字消息不能为空'
        } else if (this.is_message_audio) {
          return '语音消息不能为空'
        } else if (this.is_message_picture) {
          return '图片消息不能为空'
        }
      }
    },
    methods: {
      //预览图片
      handle_preview_picture(file){
        this.$ViewImage.open(file.url)
      },
      //移除图片
      handle_remove_picture(file, fileList) {
        this.pictureContent = null
      },
      //图片上传成功
      handle_success_picture(response) {
        if (response.code === API_SUCCESS) {
          this.pictureContent = response.data.url
        }
      },
      //移除语音
      handle_remove_audio() {
        this.audioContent = null
      },
      //语音上传成功
      handle_success_audio(response) {
        if (response.code === API_SUCCESS) {
          this.audioContent = response.data.url
        }
      },
      //获取课程中的会员信息
      get_lecture_members(){
        this.$http.get(url_get_lecture_members + "?lecture_id=" + this.form.lecture_id)
          .then(({data:{data, code, msg}}) => {
            this.lecture_members = data
          })
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let _self = this
            this.on_submit = true
            _self.$http.post(url_course_uploda_msg, _self.form)
              .then(({data:{data, code, msg}}) => {
                _self.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(function () {
                  //上传成功时的操作
                  _self.$emit("submit_success")
                  _self.on_submit = false
                  _self.form = {
                    publisher_id: null,
                    lecture_id: _self.lecture_id,
                    type: MESSAGE_TEXT,
                    content: null
                  }
                  _self.textContent = null
                  _self.pictureContent = null
                  _self.audioContent = null
                }, 500)
              })
          } else {
            return false
          }
        })
      },
      change_form_type(val){
        this.form.type = val
        if (this.is_message_text) {
          this.form['content'] = this.textContent
        } else if (this.is_message_audio) {
          this.form['content'] = this.audioContent
        } else if (this.is_message_picture) {
          this.form['content'] = this.pictureContent
        }
      }
    },
    watch: {
      textContent(val){
        this.form['content'] = val
      },
      pictureContent(val){
        this.form['content'] = val
      },
      audioContent(val){
        this.form['content'] = val
      },
    }
  }
</script>
