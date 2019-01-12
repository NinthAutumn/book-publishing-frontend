<template>
  <div class="chapters">
    <div class="chapter-title">{{$store.state.chapter.chapter.title}}</div>
    <div class="chapter-content">{{$store.state.chapter.chapter.content}}</div>
  </div>
</template>

<script>
export default {
  auth: false,
  async fetch({ store, params }) {
    console.log("fetch called");
    await store.dispatch("chapter/getChapter", params.chaptersId);
  }
};
</script>

<style lang="scss">
.chapter {
  &-title {
    font-size: 18px;
    text-align: center;
  }
  &-content {
    font-size: 16px;
  }
}
</style>
