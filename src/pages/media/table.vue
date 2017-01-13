<template>
  <div class="panel">
    <panel-title title="素材管理">
      <el-button @click.stop="on_refresh_media" size="small"><i class="fa fa-refresh"></i></el-button>
      <el-select
        v-model="media_select_value"
        placeholder="请选择消息类型"
        @change="change_media_site_value"
        class="panel_title_select">
        <el-option
          v-for="item in media_site_options"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span v-if="tabActive === media_type_message">
              <router-link :to="{name: 'mediaAdd'}" tag="span">
                <el-button type="primary" icon="plus" size="small">新建图文消息</el-button>
              </router-link>
            </span>
      <span v-else>
              <el-upload
                :action="image_upload_url"
                :show-upload-list="false"
                :multiple="true"
                accept="image/*"
                :on-success="upload_photo_success"
                style="display: inline-block;width:auto"
                class="upload-photo">
                <el-button type="primary" icon="plus" size="small">本地上传</el-button>
              </el-upload>
            </span>
    </panel-title>
    <div class="panel-body">
      <!--<el-tabs @tab-click="handle_tab" class="media-tabs width_100" :active-name="tabActive">-->
      <!--<el-tab-pane label="图文消息" :name="media_type_message">-->
      <div class="media-data-null" v-if="messageData == null">暂无素材</div>
      <div class="appimage-list" v-else>
        <ul class="ofh" ref="message_ref">
          <li class="item ofh fl relative" v-for="item in messageData">
            <p class="time nowrap" v-text="item.time"></p>
            <div v-for="(sub_item,index) in item.message">
              <div class="sub-item" v-if="item.message.length === 1">
                <div class="warp ofh relative" @click.stop="view_media_message(sub_item.id)">
                  <h4 class="title ofh" v-text="sub_item.title"></h4>
                  <div class="thumb ofh">
                    <img :src="sub_item.image" class="width_100"/>
                  </div>
                  <p class="desc" v-text="sub_item.descrip"></p>
                </div>
              </div>
              <div class="sub-item more-sub-item" v-else :class="{'first-sub-item': index === 0}">
                <div class="warp ofh relative" @click.stop="view_media_message(sub_item.id)">
                  <div class="thumb sub-thumb absolute ofh">
                    <img :src="sub_item.image" class="width_100"/>
                  </div>
                  <h4 class="title ofh sub-title absolute" v-text="sub_item.title"></h4>
                </div>
              </div>
            </div>
            <div class="bottom align_center ofh">
              <el-col :span="12">
                <el-tooltip class="button block width_100" effect="dark" content="编辑" placement="top">
                  <router-link :to="{name: 'mediaUpdate', params: {id: item.id}}" tag="span"
                               class="block">
                    <i class="el-icon-edit"></i>
                  </router-link>
                </el-tooltip>
              </el-col>
              <el-col :span="12">
                <el-tooltip class="button block width_100" effect="dark" content="删除" placement="top">
                            <span class="block" @click.stop="delete_media_message(item.id)">
                              <i class="el-icon-delete"></i>
                            </span>
                </el-tooltip>
              </el-col>
            </div>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="handleMessageCurrentChange"
          :current-page="message_current_page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="message_total">
        </el-pagination>
      </div>
      <!--</el-tab-pane>-->
      <!--<el-tab-pane label="图片" :name="media_type_photo">-->
      <!--<div class="media-data-null" v-if="photoData == null">暂无素材</div>-->
      <!--<div class="appphoto-list ofh" v-else>-->
      <!--<ul class="ofh">-->
      <!--<li class="item ofh fl relative" v-for="(item,index) in photoData">-->
      <!--<div class="thumb ofh relative" @click.stop="view_image(index)">-->
      <!--<img :src="item.image" class="absolute img height_100"/>-->
      <!--<span class="absolute width_100 name nowrap align_center" v-text="item.name"></span>-->
      <!--</div>-->
      <!--<div class="bottom align_center ofh">-->
      <!--<el-col :span="24">-->
      <!--<el-tooltip class="button block width_100" effect="dark" content="删除" placement="top">-->
      <!--<span class="block" @click="delete_media_photo(item.id)">-->
      <!--<i class="el-icon-delete"></i>-->
      <!--</span>-->
      <!--</el-tooltip>-->
      <!--</el-col>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--<div class="pagination">-->
      <!--<el-pagination-->
      <!--@current-change="handlePhotoCurrentChange"-->
      <!--:current-page="photo_current_page"-->
      <!--:page-size="10"-->
      <!--layout="total, prev, pager, next"-->
      <!--:total="photo_total">-->
      <!--</el-pagination>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->
    </div>
    <view-qrcode
      v-if="view_qrcode_visible"
      :image="view_qrcode_image"
      @close="close_view_qrcode"></view-qrcode>
  </div>
</template>
<script type="text/javascript">
  import {
    API_SUCCESS,
    url_media_message,
    url_media_photo,
    url_media_message_delete,
    url_media_photo_delete,
    url_file_upload,
    url_media_message_sub_code_by_id
  } from 'common/URL'
  import {panelTitle} from 'components'
  import viewQRCode from './components/viewQRCode'
  import Masonry from 'masonry-layout'

  const MEDIA_TYPE_MESSAGE = 'message'
  const MEDIA_TYPE_PHOTO = 'photo'

  const SITE_TYPE_RISE = 'rise'
  const SITE_TYPE_LIVE = 'live'

  export default{
    data(){
      return {
        //图片上传地址
        image_upload_url: url_file_upload,
        //素材类型（图文消息）
        media_type_message: MEDIA_TYPE_MESSAGE,
        //素材类型（图片素材）
        media_type_photo: MEDIA_TYPE_PHOTO,
        //图文消息素材数据
        messageData: null,
        //图片素材数据
        photoData: null,
        //默认选项卡
        tabActive: MEDIA_TYPE_MESSAGE,
        //图文消息的当前页
        message_current_page: 1,
        //图片素材的当前页
        photo_current_page: 1,
        //图文消息数据总条目
        message_total: 0,
        //图片素材数据总条目
        photo_total: 0,
        //每页显示多少条数据
        length: 10,
        //瀑布流实例
        message_masonry: null,
        media_select_value: null,
        media_site_options: [{
          value: null,
          label: '全部站点'
        }, {
          value: SITE_TYPE_RISE,
          label: '利世优品'
        }, {
          value: SITE_TYPE_LIVE,
          label: '天雁课堂'
        }],
        //素材二维码预览
        view_qrcode_visible: false,
        view_qrcode_image: ''
      }
    },
    created() {
      this.get_media_data()
    },
    computed: {
      //是否是图文消息
      is_message_type() {
        return this.tabActive === MEDIA_TYPE_MESSAGE
      },
      //是否是图片素材
      is_photo_type(){
        return this.tabActive === MEDIA_TYPE_PHOTO
      }
    },
    methods: {
      //获取数据
      get_media_data() {
        if (this.is_message_type) {
          this.get_message_data()
        } else if (this.is_photo_type) {
          this.get_photo_data()
        }
      },
      //tabs切换
      handle_tab(tab) {
        if (this.tabActive !== tab.name) {
          this.media_select_value = null
          this.tabActive = tab.name
          this.get_media_data()
        }
      },
      //删除图文消息
      delete_media_message(id){
        this.$confirm('此操作将删除该图文消息素材, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_media_message_delete, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.get_message_data()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      //关闭预览图文消息
      close_view_qrcode(){
        this.view_qrcode_visible = false
      },
      //预览图文消息
      view_media_message(id){
        this.$http.get(url_media_message_sub_code_by_id + "?id=" + id)
          .then(({data:{data, msg, code}}) => {
            this.view_qrcode_visible = true
            this.view_qrcode_image = data.image
          })
      },
      //删除图片素材
      delete_media_photo(id){
        this.$confirm('此操作将删除该图片素材, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(url_media_photo_delete, {id: id})
            .then(({data:{data, code, msg}}) => {
              this.get_photo_data()
              this.$message({
                message: msg,
                type: 'success'
              })
            })
        }).catch(() => {
        })
      },
      on_refresh_media(){
        this.get_media_data()
      },
      //获取图文消息素材
      get_message_data() {
        let _url = url_media_message + "?p=" + this.message_current_page + "&length=" + this.length
        if (this.media_select_value !== null) {
          _url = _url + "&site=" + this.media_select_value
        }
        this.$http.get(_url)
          .then(({data:{data, code, p, total}}) => {
            this.messageData = data
            this.message_current_page = parseInt(p)
            this.message_total = parseInt(total)
            if (data !== null) {
              this.create_message_view()
            }
          })
      },
      //创建图文消息的瀑布流
      create_message_view() {
        this.$nextTick(() => {
          this.message_masonry = new Masonry(this.$refs.message_ref, {
            itemSelector: '.item',
            columnWidth: 20
          })
        })
      },
      //获取图片素材
      get_photo_data() {
        let _url = url_media_photo + "?p=" + this.photo_current_page + "&length=" + this.length
        if (this.media_select_value !== null) {
          _url = _url + "&site=" + this.media_select_value
        }
        this.$http.get(_url)
          .then(({data:{data, code, p, total}}) => {
            this.photoData = data
            this.photo_current_page = parseInt(p)
            this.photo_total = parseInt(total)
          })
      },
      //图文消息分页切换
      handleMessageCurrentChange(val){
        this.message_current_page = val
        this.get_message_data()
      },
      //图片素材分页切换
      handlePhotoCurrentChange(val){
        this.photo_current_page = val
        this.get_photo_data()
      },
      //图片上传成功
      upload_photo_success(response){
        if (response.code === API_SUCCESS) {
          this.get_photo_data()
        }
      },
      //单击预览图片
      view_image(index) {
        let _arr = new Array()
        for (let i = 0; i < this.photoData.length; i++) {
          _arr.push(this.photoData[i].image)
        }
        this.$ViewImage.open(_arr, index)
      },
      //站点切换
      change_media_site_value() {
        if (this.is_message_type) {
          this.message_current_page = 1
          this.get_message_data()
        } else if (this.is_photo_type) {
          this.photo_current_page = 1
          this.get_photo_data()
        }
      }
    },
    components: {
      panelTitle,
      'view-qrcode': viewQRCode
    },
    destroyed() {
      this.message_masonry = null
    }
  }
</script>
<style lang="scss" type="text/css">
  .media-data-null {
    padding: 100px 0;
    text-align: center;
    font-size: 14px;
    color: #8d8d8d;
  }

  //图文消息
  .appimage-list {
    .item {
      width: 300px;
      color: #666;
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid #e7e7eb;
      .time {
        font-size: 13px;
        margin: 0 14px;
        padding: 12px 0;
        line-height: 20px;
        border-bottom: 1px solid #e7e7eb;
      }
      .warp {
        padding: 15px;
        max-height: 320px;
        cursor: pointer;
        &:hover {
          &:before {
            position: absolute;
            left: 0;
            top: 50%;
            content: '预览文章';
            display: table;
            width: 100%;
            font-size: 14px;
            color: #fff;
            text-align: center;
            transform: translateY(-50%);
            z-index: 2;
          }
          &:after {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            content: '';
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
          }
        }
      }
      .title {
        max-height: 44px;
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        line-height: 1.6;
        color: #222;
      }
      .thumb {
        margin-top: 12px;
        height: 160px;
        line-height: 160px;
      }
      .desc {
        padding-top: 5px;
        font-size: 14px;
        line-height: 20px;
      }
      .sub-item {
        &.more-sub-item {
          margin-top: -1px;
          border-top: 1px solid #e7e7eb;
          &.first-sub-item {
            .warp {
              height: 160px;
            }
            .sub-title {
              margin: 0;
              padding: 0;
              position: absolute;
              left: 15px;
              right: 15px;
              bottom: 15px;
              height: 30px;
              line-height: 30px;
              color: #fff;
              text-indent: 10px;
              background-color: rgba(0, 0, 0, 0.6);
            }
            .sub-thumb {
              width: 270px;
              height: 160px;
              line-height: 160px;
            }
          }
          .warp {
            height: 80px;
          }
          .sub-thumb {
            right: 15px;
            top: 15px;
            width: 80px;
            height: 80px;
            line-height: 80px;
            margin: 0;
          }
          .sub-title {
            position: relative;
            padding-right: 90px;
            margin: 18px auto;
            line-height: 22px;
            max-height: 44px;
            font-size: 14px;
            color: #222;
            font-weight: 400;
          }
        }
      }
      .bottom {
        height: 45px;
        line-height: 45px;
        background-color: #f4f4f4;
        border-top: 1px solid #e7e7eb;
        .button {
          font-size: 18px;
          color: #b2b2b2;
          margin-left: -1px;
          border-left: 1px solid #e7e7eb;
          cursor: pointer;
          .el-tooltip__rel {
            width: 100%;
          }
          &:hover {
            color: #373636;
          }
        }
      }
    }
  }

  //图片素材
  .appphoto-list {
    margin-left: -20px;
    .item {
      width: 170px;
      height: 230px;
      margin-left: 20px;
      margin-bottom: 20px;
      color: #666;
      background-color: #fff;
      border: 1px solid #e7e7eb;
      .thumb {
        height: 200px;
        cursor: pointer;
        .img {
          left: 50%;
          top: 0;
          max-width: none !important;
          transform: translateX(-50%);
          z-index: 1;
        }
        .name {
          left: 0;
          bottom: -35px;
          font-size: 14px;
          height: 35px;
          line-height: 35px;
          background-color: #fff;
          transition: bottom 0.3s;
          opacity: 0;
          z-index: 3;
        }
        &:hover {
          &:before {
            position: absolute;
            left: 0;
            top: 0;
            content: '预览图片';
            display: block;
            width: 100%;
            height: 200px;
            line-height: 200px;
            font-size: 14px;
            color: #fff;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 2;
          }
          .name {
            bottom: 0;
            opacity: 1;
          }
        }
      }
      .bottom {
        height: 30px;
        line-height: 30px;
        background-color: #f4f4f4;
        border-top: 1px solid #e7e7eb;
        .button {
          font-size: 18px;
          color: #b2b2b2;
          margin-left: -1px;
          border-left: 1px solid #e7e7eb;
          cursor: pointer;
          .el-tooltip__rel {
            width: 100%;
          }
          &:hover {
            color: #373636;
          }
        }
      }
    }
  }

  .appmedia-header {
    margin-bottom: 15px;
  }
</style>
