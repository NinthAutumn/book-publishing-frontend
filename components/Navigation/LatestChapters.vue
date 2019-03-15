<template>
  <div class="latest-chapters">
    <ul class="latest-chapters__list">
      <li class="latest-chapters__item" v-for="(chapter,index) in chapters" :key="index">
        <div class="latest-chapters__chapter-title">{{chapter.title}}</div>
        <div class="latest-chapters__chapter-meta">
          <div class="latest-chapters__chapter-index">第{{chapter.index}}話</div>
          <div
            class="latest-chapters__chapter-date"
          >{{$moment(chapter.createdAt).startOf('minute').fromNow()}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.$store.state.auth.loggedIn) {
      await this.$store.dispatch("library/fetchLatestChapters");
      console.log(this.$store.state.auth.loggedIn);
    }
  },
  computed: {
    chapters() {
      return this.$store.getters["library/getLatestChapters"];
    }
  }
};
</script>

<style lang="scss">
.latest-chapters {
  width: 100%;
  &__list {
    width: inherit;
  }
  &__item {
    width: inherit;
    height: 55px;
  }
}
</style>
