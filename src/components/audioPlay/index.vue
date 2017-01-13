<template>
  <div class="audio-play relative ofh">
    <audio :src="src" controls class="audio"></audio>
  </div>
</template>
<script type="text/javascript">
  export default{
    props: {
      src: {
        type: String
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  .audio-play {
    width: 200px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 5px;
    .audio {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
