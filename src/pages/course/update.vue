<template>
  <div class="panel">
    <panel-title title="课程修改"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="课程名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="课程封面:" prop="coverimg">
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
            <el-form-item label="开课时间:" prop="starttime">
              <el-date-picker
                v-model="starttime"
                placeholder="选择开课时间"
                :picker-options="pickerOptions"
                :editable="false"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                style="width: 220px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="时长(分钟):" prop="mins">
              <el-input-number v-model="form.mins" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="课程类型:" prop="type">
              <el-radio-group>
                <el-radio-group v-model="form.type" @change="change_lecture_type">
                  <el-radio :label="open_lecture">普通课程</el-radio>
                  <el-radio :label="password_lecture">加密课程</el-radio>
                  <el-radio :label="pay_lecture">付费课程</el-radio>
                </el-radio-group>
              </el-radio-group>
            </el-form-item>
            <div v-if="is_password_lecture">
              <el-form-item label="密码:" prop="pass">
                <el-input v-model="form.pass" placeholder="请输入课程密码" style="width: 220px"></el-input>
              </el-form-item>
            </div>
            <div v-if="is_pay_lecture">
              <el-form-item label="费用:" prop="cost">
                <el-input v-model="form.cost" placeholder="请输入课程费用" style="width: 220px"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="基础预约数:" prop="basescrib">
              <el-input-number v-model="form.basescrib" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="点击量:" prop="clicknum">
              <el-input-number v-model="form.clicknum" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="课程简介:" prop="intro">
              <el-input v-model="form.intro" type="textarea" placeholder="请输入课程简介" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="是否显示:">
              <el-switch on-text="显示" off-text="隐藏" v-model="isshow"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="on_submit">立即提交</el-button>
              <router-link :to="{name: 'course'}">
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
  import {url_course_by_id, API_SUCCESS, url_file_upload, url_course_update} from 'common/URL'
  import {panelTitle} from 'components'
  const OPEN_LECTURE = 'open_lecture'
  const PASSWORD_LECTURE = 'password_lecture'
  const PAY_LECTURE = 'pay_lecture'

  export default{
    data(){
      return {
        open_lecture: OPEN_LECTURE,
        password_lecture: PASSWORD_LECTURE,
        pay_lecture: PAY_LECTURE,
        image_upload_url: url_file_upload,
        form: {},
        course_id: this.$route.params.id,
        on_submit: false,
        pickerOptions: {
          disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        fileList: [],
        isshow: false,
        starttime: ''
      }
    },
    computed: {
      //验证规则
      rules() {
        let _rules = {
          name: [{required: true, message: '课程名称不能为空', trigger: 'blur'}],
          starttime: [{required: true, message: '请选择开课时间', trigger: 'change'}],
          pass: [{required: this.is_password_lecture, message: '请输入课程密码', trigger: 'blur'}],
          cost: [{required: this.is_pay_lecture, message: '请输入课程费用', trigger: 'blur'}]
        }
        return _rules
      },
      //判断是否是密码课程
      is_password_lecture() {
        return this.form.type === PASSWORD_LECTURE
      },
      //判断是否是普通课程
      is_open_lecture(){
        return this.form.type === OPEN_LECTURE
      },
      //判断是否是付费课程
      is_pay_lecture(){
        return this.form.type === PAY_LECTURE
      }
    },
    created() {
      this.get_course_by_id()
    },
    methods: {
      //查看图片
      handlePreview(file){
        this.$ViewImage.open(file.url)
      },
      handleRemove(file, fileList) {
        //移除
        this.form['coverimg'] = ''
      },
      handleSuccess(response) {
        //上传成功
        if (response.code === API_SUCCESS) {
          this.form['coverimg'] = response.data.url
        }
      },
      change_lecture_type(type){
        this.form['type'] = type
      },
      get_course_by_id(){
        this.$http.get(url_course_by_id + "?id=" + this.course_id)
          .then(({data:{data, code, msg}}) => {
            this.form = data
            this.isshow = data.isshow === 'show'
            this.starttime = data.starttime
            this.fileList = [{
              name: data.name,
              url: data.coverimg
            }]
          })
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            //提交前处理
            if (this.is_open_lecture) {
              this.form.pass = null
              this.form.cost = null
            } else if (this.is_password_lecture) {
              this.form.cost = null
            } else if (this.is_pay_lecture) {
              this.form.pass = null
            }
            this.on_submit = true
            this.$http.post(url_course_update, this.form)
              .then(({data:{data, code, msg}}) => {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(function () {
                  router.push({name: 'course'})
                }, 500)
              })
          } else {
            return false
          }
        })
      }
    },
    watch: {
      isshow(val){
        this.form.isshow = val ? 'show' : 'hiden'
      },
      starttime(val){
        let _strTime = ''
        if (typeof val == 'string') {
          _strTime = val
        } else {
          _strTime = val.$DateFormat("yyyy-MM-dd hh:mm")
        }
        this.form.starttime = _strTime
      }
    },
    components: {
      panelTitle
    }
  }
</script>
