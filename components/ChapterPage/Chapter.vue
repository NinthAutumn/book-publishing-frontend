<template>
  <section class="divider" style="padding: 0 10px;">
    <div class="chapter-title">
      <header>{{$store.state.chapter.chapter.title}}</header>
    </div>
    <div
      class="chapter-announcement chapter-announcement--header"
      v-if="$store.state.chapter.chapter.extra.announcement"
    >
      <h4>告知・メッセージ・上書き</h4>
      <p v-text="$store.state.chapter.chapter.extra.announcement.header"></p>
      <fa class="announcement-pin" icon="thumbtack"></fa>
    </div>
    <article
      class="chapter-content"
      v-html="$store.state.chapter.chapter.content"
      style="flex-direction:column;"
    ></article>

    <div
      class="chapter-announcement chapter-announcement--footer"
      v-if="$store.state.chapter.chapter.extra.announcement"
    >
      <h4>告知・メッセージ・下書き</h4>
      <p v-text="$store.state.chapter.chapter.extra.announcement.footer"></p>
      <fa class="announcement-pin" icon="thumbtack"></fa>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    // console.log(this.$store.state.chapter.chapter);
  }
};
</script>

<style lang="scss">
.chapter-title {
  font-size: 1px;
  text-align: center;
}

.chapter-announcement {
  position: relative;
  .announcement-pin {
    &--header {
    }
    &--footer {
    }
    font-size: 30px;
    position: absolute;
    top: 7px;
    // font-family: "Noto Serif Sans" !important;
    right: 10px;
    color: $primary-lighter;
    transform: rotate(40deg);
  }

  h4 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 5px;
  }
  p {
    font-size: 16px;
    margin: 0 !important;
  }

  padding: 10px;
  background-color: white;
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
