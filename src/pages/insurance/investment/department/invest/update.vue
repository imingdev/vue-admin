<template>
  <div class="panel">
    <panel-title title="投资详情修改"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="投资金额:" prop="name">
              <el-input-number v-model="form.num"></el-input-number>
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
  import {url_get_insurance_department_invest_by_id, url_update_insurance_department_invest} from 'common/URL'
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        invest_id: this.$route.params.id,
        form: {},
        on_submit: false
      }
    },
    methods: {
      //获取数据
      get_invest_data(){
        this.$http.get(url_get_insurance_department_invest_by_id + '?id=' + this.invest_id)
          .then(({data:{code, msg, data}}) => {
            this.form = data
          })
      },
      //提交
      onSubmit(){
        this.$http.post(url_update_insurance_department_invest, this.form)
          .then(({data:{code, msg, data}}) => {
            this.$message({
              message: msg,
              type: 'success'
            })
            setTimeout(function () {
              router.push({name: 'insuranceDepartment'})
            }, 500)
          })
      }
    },
    created(){
      this.get_invest_data()
    },
    components: {
      panelTitle
    }
  }
</script>
