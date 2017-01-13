<template>
  <div class="panel">
    <panel-title title="幻灯片管理">
      <el-button :loading="load_refresh" @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'slideAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加幻灯片</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="slideData"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="url"
          label="路径"
          width="500">
        </el-table-column>
        <el-table-column
          inline-template
          label="图片"
          width="200"
          align="center">
          <img :src="row.image" style="height:40px;margin:5px auto;display:block"/>
        </el-table-column>
        <el-table-column
          inline-template
          prop="isshow"
          label="显示"
          width="80"
          align="center">
          <el-tag :type="row.isshow == 1 ? 'primary' : 'danger'" close-transition>
            {{row.isshow == 1 ? '显示' : '隐藏'}}
          </el-tag>
        </el-table-column>
        <el-table-column
          prop="orderby"
          label="排序"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <div>
            <router-link :to="{name: 'slideUpdate', params: {id: row.id}}" tag="span">
              <el-button type="info" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" icon="delete" @click="delete_slide(row.id)">删除</el-button>
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
  import {url_slide_manage, url_slide_delete, url_slide_is_show} from 'common/URL'
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        slideData: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10,
        //刷新时的loading效果
        load_refresh: false
      }
    },
    methods: {
      getSlideData() {
        this.$http.get(url_slide_manage + "?p=" + this.currentPage + "&length=" + this.length)
          .then(({data:{data, code, p, total}}) => {
            this.slideData = data
            this.currentPage = parseInt(p)
            this.total = parseInt(total)
            this.load_refresh = false
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.getSlideData()
      },
      //根据id删除数据
      delete_slide(id){
        this.$confirm('此操作将删除该幻灯片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_slide_delete, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.getSlideData()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      //刷新数据
      on_refresh() {
        this.load_refresh = true
        this.getSlideData()
      }
    },
    created() {
      this.getSlideData()
    },
    components: {
      panelTitle
    }
  }
</script>
