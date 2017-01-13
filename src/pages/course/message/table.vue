<template>
  <div class="panel">
    <panel-title title="课程消息管理">
      <el-select
        v-model="message_value"
        placeholder="请选择消息类型"
        @change="change_message_type"
        class="panel_title_select">
        <el-option
          v-for="item in message_options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" icon="plus" size="small" @click="dialogVisible = true">添加课程消息</el-button>
      <el-dialog title="添加课程消息" v-model="dialogVisible" size="tiny">
        <add-message :lecture_id="lecture_id"
                     @submit_success="add_message_success"
                     @submit_close="dialogVisible = false"
                     style="padding: 0;width: 470px"></add-message>
      </el-dialog>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="messageData"
        border>
        <el-table-column
          prop="message_id"
          label="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sender_nickname"
          label="发送人姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="sender_title"
          label="发送人类型"
          width="120">
        </el-table-column>
        <el-table-column
          inline-template
          label="头像"
          width="130"
          align="center">
          <img :src="row.sender_headimg" style="height:40px;margin:5px auto;display:block"/>
        </el-table-column>
        <el-table-column
          inline-template
          label="消息类型"
          align="center"
          width="120">
          <el-tag type="primary" close-transition>
            <span v-text="set_message_type(row.message_type)"></span>
          </el-tag>
        </el-table-column>
        <el-table-column
          inline-template
          label="添加时间"
          align="center"
          width="250">
          <span v-text="set_add_time(row.add_time)"></span>
        </el-table-column>
        <el-table-column
          inline-template
          label="是否显示"
          align="center"
          width="150">
          <vswitch
            :object="{id: row.message_id}"
            v-model="row.isshow"
            on-text="显示"
            off-text="隐藏"
            @change="change_message_show">
          </vswitch>
        </el-table-column>
        <el-table-column
          inline-template
          align="center"
          label="消息内容">
          <div>
            <span v-if="row.message_type === messageType.audio">
              <audio-play :src="row.content"></audio-play>
              <span style="display:inline-block;margin-left:20px">
                <el-tooltip effect="dark" content="下载语音" placement="top">
                  <a class="el-button el-button--primary el-button--small" :href="row.content" download>
                    <i class="fa fa-arrow-down"></i>
                  </a>
                </el-tooltip>
              </span>
            </span>
            <span v-else-if="row.message_type === messageType.picture" style="display:inline-block">
              <el-tooltip effect="dark" content="预览" placement="top">
                <img :src="row.content"
                     style="height:40px;margin:5px auto;display:block;cursor:pointer"
                     @click.stop="preview_message_picture(row.content)"/>
              </el-tooltip>
            </span>
            <span v-else>
              <el-tooltip effect="dark" :content="row.content" placement="top">
                <div class="nowrap">
                  <span v-text="row.content"></span>
                </div>
              </el-tooltip>
            </span>
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
  import {url_course_message_manage, url_course_message_isshow} from 'common/URL'
  import {panelTitle, audioPlay, vswitch} from 'components'
  import addMessage from './components/add'

  const SHOW_TYPE = 'show'
  const HIDEN_TYPE = 'hiden'

  const MESSAGE_TEXT = 'text' //文字消息
  const MESSAGE_AUDIO = 'audio'//语音消息
  const MESSAGE_REWARD = 'reward'//打赏消息
  const MESSAGE_PUBLISH = 'publish'//发布消息
  const MESSAGE_PICTURE = 'picture'//图片消息
  const MESSAGE_REPLY_TEXT = 'reply_text'//回复消息

  export default{
    data(){
      return {
        lecture_id: this.$route.params.id,
        messageType: {
          audio: MESSAGE_AUDIO,
          picture: MESSAGE_PICTURE
        },
        messageData: null,
        //dialog对话框显示隐藏
        dialogVisible: false,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10,
        message_value: null,
        message_options: [{
          value: null,
          label: '全部类型'
        }, {
          value: MESSAGE_TEXT,
          label: this.set_message_type(MESSAGE_TEXT)
        }, {
          value: MESSAGE_AUDIO,
          label: this.set_message_type(MESSAGE_AUDIO)
        }, {
          value: MESSAGE_REWARD,
          label: this.set_message_type(MESSAGE_REWARD)
        }, {
          value: MESSAGE_PUBLISH,
          label: this.set_message_type(MESSAGE_PUBLISH)
        }, {
          value: MESSAGE_PICTURE,
          label: this.set_message_type(MESSAGE_PICTURE)
        }, {
          value: MESSAGE_REPLY_TEXT,
          label: this.set_message_type(MESSAGE_REPLY_TEXT)
        }]
      }
    },
    created() {
      this.get_course_message_data()
    },
    components: {
      panelTitle,
      vswitch,
      audioPlay,
      addMessage
    },
    methods: {
      //预览图片消息图片
      preview_message_picture(url){
        this.$ViewImage.open(url)
      },
      change_message_type(){
        this.currentPage = 1
        this.get_course_message_data()
      },
      get_course_message_data() {
        let _url = url_course_message_manage + "?id=" + this.lecture_id + "&p=" + this.currentPage + "&length=" + this.length
        if (this.message_value !== null) {
          _url = _url + "&message_type=" + this.message_value
        }
        this.$http.get(_url)
          .then(({data:{data, code, p, total}}) => {
            this.messageData = data
            //设置isshow的类型为Boolean类型
            for (let i = 0; i < this.messageData.length; i++) {
              this.messageData[i].isshow = (this.messageData[i].isshow) === SHOW_TYPE
            }
            this.currentPage = parseInt(p)
            this.total = parseInt(total)
          })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_course_message_data()
      },
      get_isshow(isshow){
        return isshow === SHOW_TYPE
      },
      set_add_time(time) {
        let _time = new Date(time)
        return _time.$DateFormat("yyyy-MM-dd hh:mm")
      },
      set_message_type(type){
        switch (type) {
          case MESSAGE_TEXT:
            return '文字消息'
            break
          case MESSAGE_AUDIO:
            return '语音消息'
            break
          case MESSAGE_REWARD:
            return '打赏消息'
            break
          case MESSAGE_PUBLISH:
            return '发布消息'
            break
          case MESSAGE_PICTURE:
            return '图片消息'
            break
          case MESSAGE_REPLY_TEXT:
            return '回复消息'
            break
        }
      },
      change_message_show(obj, val){
        this.$http.post(url_course_message_isshow, {
          id: obj.id,
          isshow: val ? SHOW_TYPE : HIDEN_TYPE
        })
          .then(({data:{data, code, msg}}) => {
            if (code === API_SUCCESS) {
              this.$message({
                message: msg,
                type: 'success'
              })
            } else {
              this.get_course_message_data()
            }
          })
      },
      //课程消息添加成功
      add_message_success(){
        this.dialogVisible = false
        this.message_value = null
        this.currentPage = 1
        this.get_course_message_data()
      }
    }
  }
</script>
