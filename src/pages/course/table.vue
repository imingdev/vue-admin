<template>
  <div class="panel">
    <panel-title title="课程管理"></panel-title>
    <div class="panel-body">
      <el-table
        :data="courseData"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="课程名称"
          width="350">
        </el-table-column>
        <el-table-column
          prop="starttime"
          label="开课时间"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          inline-template
          label="时长(分钟)"
          width="120"
          align="center">
          <div>
            <i class="fa fa-clock-o"></i>
            <span v-text="row.mins"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="付费(元)"
          width="100"
          align="center">
          <div>
            <i class="fa fa-rmb"></i>
            <span v-text="row.payearns"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="打赏(元)"
          width="100"
          align="center">
          <div>
            <i class="fa fa-rmb"></i>
            <span v-text="row.playearns"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="封面图片"
          width="200"
          align="center">
          <img :src="row.coverimg" style="height:40px;margin:5px auto;display:block"/>
        </el-table-column>
        <el-table-column
          inline-template
          prop="type"
          label="类型"
          width="120"
          align="center">
          <el-tag type="primary" close-transition>
            <span v-text="set_course_type(row.type)"></span>
          </el-tag>
        </el-table-column>
        <el-table-column
          prop="clicknum"
          label="点击量"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <div>
            <router-link :to="{name: 'courseUpdate', params: {id: row.id}}" tag="span">
              <el-button type="info" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" icon="delete" @click="delete_course(row.id)">删除</el-button>
            <router-link :to="{name: 'courseMessage', params: {id: row.id}}" tag="span">
              <el-button type="warning">
                <i class="fa fa-comment"></i>
                消息
              </el-button>
            </router-link>
          </div>
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
  import {url_course_manage, url_course_delete} from 'common/URL'
  import {panelTitle} from 'components'
  const COURSE_OPEN_LECTURE = 'open_lecture'
  const COURSE_PASSWORD_LECTURE = 'password_lecture'
  const COURSE_PAY_LECTURE = 'pay_lecture'

  export default{
    data(){
      return {
        courseData: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10
      }
    },
    created() {
      this.get_course_data()
    },
    methods: {
      get_course_data() {
        this.$http.get(url_course_manage + "?p=" + this.currentPage + "&length=" + this.length)
          .then(({data:{data, code, p, total}}) => {
            this.courseData = data
            this.currentPage = parseInt(p)
            this.total = parseInt(total)
          })
      },
      //删除
      delete_course(id){
        this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_course_delete, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.get_course_data()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_course_data()
      },
      set_course_type(type){
        if (type === COURSE_OPEN_LECTURE) {
          return '普通课程'
        } else if (type === COURSE_PASSWORD_LECTURE) {
          return '加密课程'
        } else if (type === COURSE_PAY_LECTURE) {
          return '付费课程'
        }
      }
    },
    components: {
      panelTitle
    }
  }
</script>
