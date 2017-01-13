<template>
  <div class="panel">
    <panel-title title="保险头条">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'insuranceHeadlineAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加头条</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="headlineData"
        border>
        <el-table-column
          prop="id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          inline-template
          label="标题"
          width="250">
          <div class="nowrap">
            <span v-text="row.title"></span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          label="简介"
          width="380">
          <el-tooltip effect="dark" :content="row.descip" placement="top">
            <div class="nowrap">
              <span v-text="row.descip"></span>
            </div>
          </el-tooltip>
        </el-table-column>
        <el-table-column
          inline-template
          label="语音"
          width="300">
          <div>
            <audio-play :src="row.url"></audio-play>
            <span style="display:inline-block;margin-left:20px">
                    <el-tooltip effect="dark" content="下载语音" placement="top">
                      <a class="el-button el-button--primary el-button--small" :href="row.url" download>
                        <i class="fa fa-arrow-down"></i>
                      </a>
                    </el-tooltip>
                  </span>
          </div>
        </el-table-column>
        <el-table-column
          inline-template
          prop="isshow"
          label="是否显示"
          align="center"
          width="120">
          <el-tag type="primary" close-transition>
            <span v-text="set_headline_isshow(row.isshow)"></span>
          </el-tag>
        </el-table-column>
        <el-table-column
          prop="orderby"
          label="排序"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          inline-template
          :context="_self"
          label="操作">
          <div>
            <router-link :to="{name: 'insuranceHeadlineUpdate', params: {id: row.id}}" tag="span">
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
  import {url_get_insurance_headline, url_delete_insurance_headline} from 'common/URL'
  import {panelTitle, audioPlay} from 'components'

  const DATA_SHOW_TYPE = 'show'
  const DATA_HIDE_TYPE = 'hide'

  export default{
    data(){
      return {
        headlineData: null,
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
    components: {
      panelTitle,
      audioPlay
    },
    methods: {
      //刷新数据
      on_refresh() {
        this.load_refresh = true
        this.get_headline_data()
      },
      //设置是否显示
      set_headline_isshow(type){
        return type === DATA_SHOW_TYPE ? '显示' : '隐藏'
      },
      //根据id删除数据
      delete_slide(id){
        this.$confirm('此操作将删除该保险头条, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_delete_insurance_headline, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.get_headline_data()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      //获取数据
      get_headline_data(){
        this.$http.get(url_get_insurance_headline + "?p=" + this.currentPage + "&length=" + this.length)
          .then(({data:{data, code, p, total}}) => {
            this.headlineData = data
            this.currentPage = parseInt(p)
            this.total = parseInt(total)
            this.load_refresh = false
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_headline_data()
      }
    },
    created() {
      this.get_headline_data()
    }
  }
</script>
