<template>
  <div class="panel">
    <panel-title title="部门添加"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="部门名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="负责人:" prop="master">
              <el-input v-model="form.master" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="投资限额:">
              <el-input-number v-model="form.sum"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :loading="on_submit">立即提交</el-button>
              <router-link :to="{name: 'insuranceDepartment'}">
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
  import {url_add_insurance_department} from "common/URL";
  import {panelTitle} from "components";

  export default{
    data(){
      return {
        form: {
          name: '',
          master: '',
          sum: 0
        },
        on_submit: false,
        rules: {
          name: [{required: true, message: '姓名不能为空！', trigger: 'blur'}],
          master: [{required: true, message: '负责人不能为空！', trigger: 'blur'}]
        }
      }
    },
    methods: {
      //提交
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.on_submit = true
            this.$http.post(url_add_insurance_department, this.form)
              .then(({data:{data, code, msg}}) => {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                setTimeout(function () {
                  router.push({name: 'insuranceDepartment'})
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
