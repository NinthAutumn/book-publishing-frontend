<template>
  <div class="divider" style="padding: 0 10px;">
    <div class="chapter-title">
      <header>{{$store.state.chapter.chapter.title}}</header>
    </div>
    <div
      class="chapter-announcement"
      v-if="$store.state.chapter.chapter.extra"
    >{{$store.state.chapter.chapter.extra}}</div>
    <div
      class="chapter-content"
      v-html="$store.state.chapter.chapter.content"
      style="flex-direction:column;"
    ></div>
    <div
      class="chapter-announcement"
      v-if="$store.state.chapter.chapter.extra"
    >{{$store.state.chapter.chapter.extra}}</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.chapter-title {
  font-size: 1px;
  text-align: center;
}

.chapter-content {
  // padding: 10px;
  // width: 50vw;
  // width:
  // padding: 5px;
  // text-align: center;
  display: flex;
  justify-content: space-around;
  line-height: 30px;
  // font-family: "Meiryo", "Lucida Grande", "sans-serif";

  p {
    // white-space: pre-wrap;
    font-size: 16px !important;
    // font-weight: 300;
    text-align: left;
    line-height: 30px !important;
    margin-bottom: 15px !important;
  }
}
</style>
