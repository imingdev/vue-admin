<template>
  <div class="panel">
    <panel-title title="修改保险头条"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头条标题:" prop="title">
              <el-input v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="头条简介:">
              <el-input type="textarea" v-model="form.descip" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="封面图片:" prop="img">
              <el-upload
                :action="image_upload_url"
                type="drag"
                :thumbnail-mode="true"
                :on-preview="handleImgPreview"
                :on-success="handleImgSuccess"
                :on-remove="handleImgRemove"
                :default-file-list="img_file_list"
              >
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="上传语音:" prop="audio">
              <div class="audio_upload ofh relative">
                      <span v-if="form.url !== null">
                        <audio-play :src="form.url"></audio-play>
                        <el-button size="small"
                                   type="primary"
                                   icon="close"
                                   style="margin-left:15px"
                                   @click="handle_remove_audio">
                        </el-button>
                      </span>
                <el-upload
                  :action="url_audio_upload"
                  accept="audio/*"
                  :on-success="handle_success_audio"
                  :show-upload-list="false"
                  v-else>
                  <el-button size="small" type="primary" icon="upload2"></el-button>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="是否显示:" prop="isshow">
              <el-switch on-text="显示" off-text="隐藏" v-model="form.isshow"></el-switch>
            </el-form-item>
            <el-form-item label="排序:" prop="orderby">
              <el-input-number v-model="form.orderby"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="on_submit">立即提交</el-button>
              <router-link :to="{name: 'insuranceHeadline'}">
                <el-button>取消</el-button>
              </router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    url_file_upload,
    url_update_insurance_headline,
    url_get_insurance_headline_by_id,
    API_SUCCESS
  } from 'common/URL'
  import {panelTitle, audioPlay} from 'components'

  const DATA_SHOW_TYPE = 'show'
  const DATA_HIDE_TYPE = 'hide'

  export default{
    data(){
      return {
        headline_id: this.$route.params.id,
        url_audio_upload: url_file_upload,
        image_upload_url: url_file_upload,
        img_file_list: [],
        form: {},
        on_submit: false
      }
    },
    computed: {
      rules(){
        return {
          title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
          url: [{required: true, message: '语音未上传！', trigger: 'blur'}],
          img: [{required: true, message: '封面图片上传！', trigger: 'blur'}]
        }
      }
    },
    methods: {
      //查看封面图片
      handleImgPreview(file){
        this.$ViewImage.open(file.url)
      },
      //封面图片上传成功
      handleImgSuccess(response){
        if (response.code === API_SUCCESS) {
          this.form.img = response.data.url
        }
      },
      //封面移除
      handleImgRemove(){
        this.form.img = null
        this.img_file_list = []
      },
      //上传语音成功
      handle_success_audio(response){
        if (response.code === API_SUCCESS) {
          this.form.url = response.data.url
        }
      },
      //移除语音
      handle_remove_audio() {
        this.form.url = null
      },
      //数据提交
      onSubmit(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let _data = this.form
            this.on_submit = true
            this.$http.post(url_update_insurance_headline, {
              id: this.headline_id,
              title: _data.title,
              descip: _data.descip,
              url: _data.url,
              isshow: _data.isshow ? DATA_SHOW_TYPE : DATA_HIDE_TYPE,
              orderby: _data.orderby
            })
              .then(({data:{data, code, msg}}) => {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(() => {
                  router.push({name: 'insuranceHeadline'})
                }, 500)
              })
          } else {
            return false
          }
        })
      },
      // 根据id获取数据
      get_data_by_id(){
        this.$http.get(url_get_insurance_headline_by_id + "?id=" + this.headline_id)
          .then(({data:{data, code, msg}}) => {
            this.form = data
            this.form.isshow = data.isshow === DATA_SHOW_TYPE
            let _name = data.title
            let _url = data.img
            this.img_file_list = [{
              name: _name,
              url: _url
            }]
          })
      }
    },
    created(){
      this.get_data_by_id()
    },
    components: {
      panelTitle,
      audioPlay
    }
  }
</script>
