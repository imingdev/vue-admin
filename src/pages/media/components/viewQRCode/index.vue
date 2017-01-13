<template>
  <div class="v-shade view-QRCode-warp" @click.self="close">
    <div class="absolute QRCode-image align_center">
      <img :src="image" class="width_100 height_100" />
      <p class="text">请使用微信扫描二维码预览！</p>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      image: {
        type: String,
        require: true
      }
    },
    methods: {
      close(e){
        this.$emit("close", e)
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .view-QRCode-warp {
    background-color: rgba(0, 0, 0, 0.8);
    .QRCode-image {
      left: 50%;
      top: 20%;
      margin-left: -125px;
      width: 250px;
      .text {
        margin-top: 15px;
        color: #fff;
        font-size: 18px;
      }
    }
  }
</style>
