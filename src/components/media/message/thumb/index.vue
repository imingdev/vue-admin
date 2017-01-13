<template>
  <div class="message-list-warp ofh">
    <div class="list ofh">
      <ul class="ofh">
        <li class="item relative ofh" v-for="(item,index) in thumb_data"
            :class="{'large': index === 0,'active': index === data_index}"
            @click.stop="set_data_index(index)">
          <div class="inner relative ofh">
            <div class="title ofh" v-text="item.title"></div>
            <div class="thumb absolute ofh">
              <img :src="item.image"/>
            </div>
          </div>
          <div class="bottom absolute width_100 ofh" v-if="thumb_data.length > 1">
            <span class="handle fl top" title="上移"
                  v-if="index !== 0"
                  @click.stop="data_up_move(index)">
              <i class="fa fa-arrow-up"></i>
            </span>
            <span class="handle fl down" title="下移"
                  v-if="index !== thumb_data.length - 1"
                  @click.stop="data_down_move(index)">
              <i class="fa fa-arrow-down"></i>
            </span>
            <span class="handle fr del" title="删除"
                  @click.stop="data_delete(index)">
              <i class="el-icon-delete"></i>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="message-add align_center ofh"
         v-if="thumb_data.length < 8"
         @click.stop="data_add">
      <i class="icon el-icon-plus"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      data: {
        type: Array,
        require: true
      }
    },
    data(){
      return {
        thumb_data: this.data,
        data_index: 0
      }
    },
    methods: {
      //数据上移
      data_up_move(index){
        if (this.data_index > 0) {
          this.data_index = index - 1
          this.$emit("move_up", index)
        }
      },
      //数据下移
      data_down_move(index){
        if (this.data_index < this.thumb_data.length - 1) {
          this.data_index = index + 1
          this.$emit("move_down", index)
        }
      },
      //数据删除
      data_delete(index){
        if (this.thumb_data.length > 0) {
          this.$confirm('此操作将删除此篇图文, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit("delete", index)
            this.data_index = this.thumb_data.length - 1
          }).catch(() => {
          })
        }
      },
      //数据添加
      data_add() {
        if (this.thumb_data.length < 8) {
          this.$emit("add")
          this.data_index = this.thumb_data.length - 1
        }
      },
      //设置数据的索引
      set_data_index(index){
        this.data_index = index
        this.$emit("change", this.data_index)
      }
    },
    watch: {
      data(val){
        this.thumb_data = val
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .message-list-warp {
    .list {
      border: 1px solid #e7e7eb;
      border-top: none;
      background-color: #fff;
      .item {
        border-top: 1px solid #e7e7eb;
        cursor: pointer;
        &.active {
          border: 1px solid #ff0000;
        }
        .inner {
          margin: 10px;
          height: 80px;
        }
        &.large {
          .inner {
            height: 120px;
          }
          .title {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            text-indent: 15px;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 30px;
            line-height: 30px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 2;
          }
          .thumb {
            width: 100%;
            height: 100%;
            z-index: 1;
          }
        }
        &:hover {
          .bottom {
            bottom: 0;
          }
        }
        .title {
          padding-right: 90px;
          margin: 18px auto;
          line-height: 22px;
          max-height: 44px;
          font-size: 14px;
          color: #222;
          font-weight: 400;
        }
        .thumb {
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background-image: url(./images/media_message_thumb.png);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 35px auto;
          background-color: #ececec;
        }
        .bottom {
          left: 0;
          bottom: -40px;
          height: 40px;
          line-height: 40px;
          background: rgba(0, 0, 0, 0.5);
          transition: bottom 0.3s;
          z-index: 3;
          .handle {
            margin: 0 10px;
            height: 40px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
    }
    .message-add {
      height: 100px;
      line-height: 100px;
      border: 1px dashed #d9dadc;
      border-top: none;
      cursor: pointer;
      .icon {
        font-size: 35px;
        color: #777;
        vertical-align: middle;
      }
    }
  }
</style>
