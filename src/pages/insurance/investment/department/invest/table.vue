<template>
  <div class="panel">
    <panel-title title="投资详情"></panel-title>
    <div class="panel-body">
      <el-table
        :data="invest_data"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="departmentname"
          label="部门"
          width="250">
        </el-table-column>
        <el-table-column
          prop="name"
          label="投资人"
          width="250">
        </el-table-column>
        <el-table-column
          inline-template
          label="头像"
          width="130"
          align="center">
          <img :src="row.image" style="height:40px;margin:5px auto;display:block"/>
        </el-table-column>
        <el-table-column
          inline-template
          label="投资金额(单位元)"
          width="250"
          align="center">
          <div>
            <i class="fa fa-rmb"></i>
            <span v-text="row.num"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="投资时间"
          align="center"
          width="250">
          <span v-text="row.addtime"></span>
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <div>
            <router-link :to="{name: 'insuranceDepartmentInvestUpdate', params: {id: row.id}}" tag="span">
              <el-button type="info" icon="edit">修改</el-button>
            </router-link>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {url_get_insurance_department_invest} from 'common/URL'
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        department_id: this.$route.params.id,
        invest_data: null
      }
    },
    methods: {
      get_invest_data(){
        this.$http.get(url_get_insurance_department_invest + '?id=' + this.department_id)
          .then(({data:{code, msg, data}}) => {
            this.invest_data = data
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
