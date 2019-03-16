<template>
  <div class="latest-chapters">
    <ul class="latest-chapters__list">
      <li
        tag="li"
        @click="removeInbox(chapter._id, chapter.bookId)"
        class="latest-chapters__item"
        v-for="(chapter,index) in chapters"
        :key="index"
      >
        <div class="latest-chapters__chapter-title flex flex--between">{{chapter.title}}</div>
        <div class="latest-chapters__chapter-meta flex flex--between">
          <div class="latest-chapters__chapter-index">第{{chapter.index}}話</div>
          <div
            class="latest-chapters__chapter-date"
          >{{$moment(chapter.createdAt).startOf('minute').fromNow()}}</div>
        </div>
        <div class="latest-chapters__notification"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (this.$store.state.auth.loggedIn) {
      await this.$store.dispatch("library/fetchLatestChapters");
    }
  },
  computed: {
    chapters() {
      return this.$store.getters["library/getLatestChapters"];
    }
  },
  methods: {
    async removeInbox(chapterId, bookId) {
      console.log("this aint it busd");
      await this.$store.dispatch("library/patchLatestChapters", { chapterId });
      this.$router.push("/books/" + bookId + "/" + chapterId);
    }
  }
};
</script>

<style lang="scss">
.latest-chapters {
  width: 100%;
  $self: &;
  &__list {
    width: inherit;
  }
  &__item {
    position: relative;
    width: inherit;
    // height: 55px;
    padding: 8px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
    transition: 300ms;
    &:hover {
      user-select: none;
      cursor: pointer;
      box-shadow: 1px 1px 5px 0 rgb(207, 207, 207);
      transition: 300ms;
    }
    #{$self}__chapter-meta {
    }
    #{$self}__notification {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 100px;
      background-color: $primary;
      position: absolute;
      top: 5px;
      right: 5px;
    }
    #{$self}__chapter-title {
      font-size: 13px;
      margin-bottom: 5px;
    }
    #{$self}__chapter-index {
      font-size: 12px;
    }
    #{$self}__chapter-date {
      font-size: 12px;
    }
  }
}
</style>
