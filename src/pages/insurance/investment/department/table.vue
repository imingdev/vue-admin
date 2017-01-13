<template>
  <div class="panel">
    <panel-title title="部门管理">
      <el-button :loading="load_refresh" @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'insuranceDepartmentAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加部门</el-button>
      </router-link>
      <a href="/index.php/Admin/Invest/excel_export" class="el-button el-button--danger el-button--small"
         target="_bank">
        <i class="el-icon-document"></i>
        <span>导出全部</span>
      </a>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="departmentData"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门"
          width="250">
        </el-table-column>
        <el-table-column
          prop="master"
          label="负责人"
          width="250">
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="添加时间"
          width="250"
          align="center">
        </el-table-column>
        <el-table-column
          inline-template
          label="限额(单位元)"
          width="250"
          align="center">
          <div>
            <i class="fa fa-rmb"></i>
            <span v-text="row.sum"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <div>
            <router-link :to="{name: 'insuranceDepartmentUpdate', params: {id: row.id}}" tag="span">
              <el-button type="info" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" icon="delete" @click="delete_department(row.id)">删除</el-button>
            <router-link :to="{name: 'insuranceDepartmentInvest', params: {id: row.id}}" tag="span">
              <el-button type="warning">
                <i class="fa fa-rmb"></i>
                投资详情
              </el-button>
            </router-link>
            <el-button type="danger" icon="document" @click="export_invest(row.id)">导出</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    url_get_insurance_department,
    url_delete_insurance_department_by_id,
    url_get_insurance_department_invest
  } from 'common/URL'
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        departmentData: null,
        //刷新时的loading效果
        load_refresh: false
      }
    },
    methods: {
      //获取数据
      get_department_data(){
        this.$http.get(url_get_insurance_department)
          .then(({data:{code, msg, data}}) => {
            this.departmentData = data
          })
      },
      //根据id删除数据
      delete_department(id){
        this.$confirm('此操作将删除该保险部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_delete_insurance_department_by_id, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.get_department_data()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      //刷新数据
      on_refresh(){
        this.get_department_data()
      },
      //导出
      export_invest(id){
        this.$http.get(url_get_insurance_department_invest + '?id=' + id)
          .then(({data:{code, msg, data}}) => {
            let _title = [
              {value: 'id', prop: "id", "type": "ROW_HEADER_HEADER", "datatype": "string"},
              {value: '部门', prop: "departmentname", "type": "ROW_HEADER_HEADER", "datatype": "string"},
              {value: '投资人', prop: "name", "type": "ROW_HEADER_HEADER", "datatype": "string"},
              {value: '投资金额(单位元)', prop: "num", "type": "ROW_HEADER_HEADER", "datatype": "string"},
              {value: '投资时间', prop: "addtime", "type": "ROW_HEADER_HEADER", "datatype": "string"}
            ]
            let _data = new Array(data.length)
            for (let i = 0; i < data.length; i++) {
              let _innerArr = new Array(_title.length)
              for (let j = 0; j < _title.length; j++) {
                let _d = _title[j].prop
                _innerArr[j] = {
                  value: data[i][_d],
                  type: "ROW_HEADER"
                }
              }
              _data[i] = _innerArr
            }
            if (_data === '' || _data === null) {
              return
            }
            this.JSONToExcelConvertor(_data, '利世天使投资', _title)
          })
      },
      //导出excel方法
      JSONToExcelConvertor(JSONData, FileName, ShowLabel){
        //先转化json
        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData
        let excel = '<table>'
        //设置表头
        let row = "<tr>"
        for (let i = 0, l = ShowLabel.length; i < l; i++) {
          row += "<td>" + ShowLabel[i].value + '</td>'
        }
        //换行
        excel += row + "</tr>"
        //设置数据
        for (let i = 0; i < arrData.length; i++) {
          let row = "<tr>"
          for (var index in arrData[i]) {
            let value = arrData[i][index].value === "." ? "" : arrData[i][index].value
            row += '<td>' + value + '</td>'
          }
          excel += row + "</tr>"
        }
        excel += "</table>"
        let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>"
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel'
        excelFile += '; charset=UTF-8">'
        excelFile += "<head>"
        excelFile += "<!--[if gte mso 9]>"
        excelFile += "<xml>"
        excelFile += "<x:ExcelWorkbook>"
        excelFile += "<x:ExcelWorksheets>"
        excelFile += "<x:ExcelWorksheet>"
        excelFile += "<x:Name>"
        excelFile += "{worksheet}"
        excelFile += "</x:Name>"
        excelFile += "<x:WorksheetOptions>"
        excelFile += "<x:DisplayGridlines/>"
        excelFile += "</x:WorksheetOptions>"
        excelFile += "</x:ExcelWorksheet>"
        excelFile += "</x:ExcelWorksheets>"
        excelFile += "</x:ExcelWorkbook>"
        excelFile += "</xml>"
        excelFile += "<![endif]-->"
        excelFile += "</head>"
        excelFile += "<body>"
        excelFile += excel
        excelFile += "</body>"
        excelFile += "</html>"
        let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
        let link = document.createElement("a")
        link.href = uri
        link.style = "visibility:hidden"
        link.download = FileName + ".xls"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    created(){
      this.get_department_data()
    },
    components: {
      panelTitle
    }
  }
</script>
