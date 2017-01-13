<template>
  <div class="view-image-warp width_100 height_100">
    <div v-if="visible" class="warp absolute ofh width_100 height_100" @click.self="close_image">
      <div class="view-image absolute align_center ofh" @click.self="close_image">
        <img :src="get_image" class="img relative"/>
      </div>
      <div class="view-console align_center">
        <div class="buttons ofh">
          <el-button icon="arrow-left" title="查看上一个"
                     class="view-btn fl prev"
                     :disabled="prevDisabled"
                     @click.stop="prev_img">
          </el-button>
          <el-button icon="close" title="关闭"
                     class="view-btn fl close"
                     @click.stop="close_image"
                     style="font-size: 22px;">
          </el-button>
          <el-button icon="arrow-right" title="查看下一个"
                     class="view-btn fl next"
                     :disabled="nextDisabled"
                     @click.stop="next_img">
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        visible: false,
        imageData: [],
        imgIndex: 0
      }
    },
    computed: {
      get_image() {
        return this.imageData[this.imgIndex]
      },
      prevDisabled() {
        return this.imgIndex === 0
      },
      nextDisabled() {
        return this.imgIndex === this.imageData.length - 1
      }
    },
    methods: {
      //上一个
      prev_img(){
        let index = this.imgIndex - 1
        this.imgIndex = index < 0 ? 0 : index
      },
      //下一个
      next_img() {
        let index = this.imgIndex + 1
        let length = this.imageData.length - 1
        this.imgIndex = index > length ? length : index
      },
      //关闭
      close_image() {
        this.$ViewImage.close()
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .view-image-warp {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .warp {
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.92);
    }
    .view-image {
      left: 0;
      top: 50%;
      margin-top: -300px;
      width: 100%;
      height: 600px;
      line-height: 600px;
      font-size: 0;
      .close {
        top: 0;
        right: 0;
      }
      .img {
        max-height: 100%;
        vertical-align: middle;
      }
    }
    .view-console {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 100px;
      .buttons {
        display: inline-block;
        padding: 14px 4px;
        line-height: 32px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 45px;
      }
      .view-btn {
        padding: 0 32px;
        height: 28px;
        line-height: 28px;
        color: #fff;
        font-size: 28px;
        border: none;
        border-left: 1px solid #5c5c5c;
        border-radius: 0;
        background-color: transparent;
        &:first-child {
          border: none;
        }
        &:hover {
          color: #3d3732;
        }
        &:disabled {
          color: #6b6b6b;
        }
      }
    }
  }
</style>
