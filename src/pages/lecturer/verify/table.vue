<template>
  <div class="panel">
    <panel-title title="讲师认证">
      <el-select
        v-model="verify_status"
        placeholder="请选择认证状态"
        @change="change_verify_status"
        class="panel_title_select">
        <el-option
          v-for="item in verify_options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="verifyData"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="250">
        </el-table-column>
        <el-table-column
          prop="wxcode"
          label="微信号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="apply_time"
          label="申请时间"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          prop="check_time"
          label="审核时间"
          align="center"
          width="200">
        </el-table-column>
        <el-table-column
          inline-template
          label="地址"
          width="280">
          <span class="nowrap" v-text="row.address"></span>
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <vswitch
            :object="{id: row.id}"
            v-model="row.status"
            on-text="通过"
            off-text="拒绝"
            @change="set_verify_status">
          </vswitch>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {url_get_lecturer_verify, url_set_lecturer_verify_status} from 'common/URL'
  import {panelTitle, vswitch} from 'components'

  const VERIFY_WAIT = 'wait'//等待
  const VERIFY_FAIL = 'fail'//失败
  const VERIFY_SUCCESS = 'sucess'//成功

  export default{
    data(){
      return {
        verifyData: null,
        verify_options: [{
          value: null,
          label: '全部状态'
        }, {
          value: VERIFY_WAIT,
          label: this.get_verify_status_text(VERIFY_WAIT)
        }, {
          value: VERIFY_FAIL,
          label: this.get_verify_status_text(VERIFY_FAIL)
        }, {
          value: VERIFY_SUCCESS,
          label: this.get_verify_status_text(VERIFY_SUCCESS)
        }],
        verify_status: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10,
        verify_switch: null
      }
    },
    created() {
      this.get_verify_data()
    },
    components: {
      panelTitle,
      vswitch
    },
    methods: {
      //获取状态文本
      get_verify_status_text(status){
        if (status === VERIFY_WAIT) {
          return '等待'
        } else if (status === VERIFY_FAIL) {
          return '失败'
        } else if (status === VERIFY_SUCCESS) {
          return '成功'
        }
      },
      //获取认证数据
      get_verify_data() {
        let _url = url_get_lecturer_verify + "?p=" + this.currentPage + "&length=" + this.length
        if (this.verify_status !== null) {
          _url = _url + "&status=" + this.verify_status
        }
        this.$http.get(_url)
          .then(({data:{data, code, p, total}}) => {
            this.verifyData = data
            //设置status的类型为Boolean类型
            for (let i = 0; i < this.verifyData.length; i++) {
              this.verifyData[i].status = (this.verifyData[i].status) === VERIFY_SUCCESS
            }
            this.currentPage = parseInt(p)
            this.total = parseInt(total)
          })
      },
      //设置认证讲师认证状态
      set_verify_status(obj, status){
        let _status = status ? VERIFY_SUCCESS : VERIFY_FAIL
        this.$http.post(url_set_lecturer_verify_status, {
          id: obj.id,
          status: _status
        })
          .then(({data:{data, code, msg}}) => {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.get_verify_data()
          })
      },
      change_verify_status() {
        this.currentPage = 1
        this.get_verify_data()
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.get_verify_data()
      }
    }
  }
</script>
