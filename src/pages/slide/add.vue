<template>
  <div class="panel">
    <panel-title title="幻灯片添加"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="幻灯片名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="幻灯片URL:" prop="url">
              <el-input placeholder="请输入内容" v-model="form.url">
                <template slot="prepend">Http://</template>
              </el-input>
            </el-form-item>
            <el-form-item label="幻灯片图片:" prop="image">
              <el-upload
                :action="image_upload_url"
                type="drag"
                :thumbnail-mode="true"
                :on-preview="handlePreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="fileList"
              >
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否显示:" prop="isshow">
              <el-switch on-text="显示" off-text="隐藏" v-model="form.isshow"></el-switch>
            </el-form-item>
            <el-form-item label="幻灯片排序:" prop="orderby">
              <el-input-number v-model="form.orderby"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="on_submit">立即提交</el-button>
              <router-link :to="{name: 'slide'}">
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
  import {url_file_upload, url_slide_add, API_SUCCESS} from 'common/URL'
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        image_upload_url: url_file_upload,
        fileList: [],
        on_submit: false,
        form: {
          name: '',
          url: '',
          image: '',
          isshow: true,
          orderby: 1
        },
        rules: {
          name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          url: [{required: true, message: 'url不能为空！', trigger: 'blur'}],
          image: [{required: true, message: '图片未上传！', trigger: 'blur'}]
        }
      }
    },
    methods: {
      //查看图片
      handlePreview(file){
        this.$ViewImage.open(file.url)
      },
      handleRemove(file, fileList) {
        //移除
        this.form['image'] = ''
        this.fileList = []
      },
      handleSuccess(response) {
        //上传成功
        if (response.code === API_SUCCESS) {
          this.form['image'] = response.data.url
        }
      },
      onSubmit() {
        let slef = this
        let data = slef.form
        let name = data.name
        let url = data.url
        let image = data.image
        this.$refs.form.validate((valid) => {
          if (valid) {
            slef.on_submit = true
            this.$http.post(url_slide_add, {
              name: name,
              url: url,
              image: image,
              orderby: data.orderby,
              isshow: data.isshow ? 1 : 0
            })
              .then(({data:{data, code, msg}}) => {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(function () {
                  router.push({name: 'slide'})
                }, 500)
              })
          } else {
            return false
          }
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
