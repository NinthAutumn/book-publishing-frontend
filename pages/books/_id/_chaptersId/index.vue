<template>
  <div class="divider chapter-wrapper">
    <main class="divider chapter-container">
      <Chapter></Chapter>
      <CommentList v-if="!$device.isMobile"></CommentList>
      <no-ssr v-if="$device.isMobile">
        <infinite-loading direction="bottom" @infinite="nextChapter"></infinite-loading>
      </no-ssr>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottom: false
    };
  },
  components: {
    Chapter: () => import("@/components/ChapterPage/Chapter"),
    CommentList: () => import("@/components/ChapterPage/CommentList")
  },
  async mounted() {
    await this.$store.dispatch("chapter/fetchChapterNav", {
      index: this.$store.getters["chapter/getChapter"].index,
      bookId: this.$route.params.id
    });
  },
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async nextChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.$store.state.chapter.navigation.next._id;
      await this.$store
        .dispatch("chapter/fetchChapter", {
          bookId,
          chapterId,
          userId: this.$store.getters["loggedInUser"]._id
        })
        .then(review => {
          this.$router.push(`/books/${bookId}/${chapterId}`);
        });
    },
    async prevChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.$store.state.chapter.navigation.prev._id;
      await this.$store
        .dispatch("chapter/fetchChapter", {
          bookId,
          chapterId,
          userId: this.$store.getters["loggedInUser"].id
        })
        .then(review => {
          this.$router.push(`/books/${bookId}/${chapterId}`);
        });
    },
    nextPage() {
      if (this.bottomVisible()) {
        if (
          this.$store.state.chapter.chapter.bookId.chapters.length !==
          this.$store.state.chapter.chapter.index
        ) {
          this.$router.push(
            "/books/" +
              this.$route.params.id +
              "/" +
              (this.$store.state.chapter.chapter.index + 1)
          );
        }
      }
    }
  },
  auth: false,
  async fetch({ store, params }) {
    const index = params.chaptersId;
    if (store.state.auth.loggedIn) {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: params.chaptersId,
        userId: store.state.auth.user._id,
        bookId: params.id
      });
      await store.dispatch("user/fetchUserSettings");
    } else {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: params.chaptersId,
        bookId: params.id
      });
    }
  },
  layout: "chapter-nav/Chapter",
  async asyncData({ store, params }) {
    if (!store.getters["chapter/getBookChapterCount"]) {
      // await store.dispatch("book/fetchBookChapterCount", params.id);
    }
  },
  scrollToTop: false,
  transition: "none"
};
</script>

<style lang="scss">
.chapter {
  display: flex;
  justify-content: space-around;
  .chapter-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    .chapter-navigation__next {
      text-align: center;
    }
    .chapter-navigation__previous {
      text-align: center;
    }
    .chapter-container {
      background-color: white;
      position: relative;
      display: inline-block;
      border: 1px solid #cecece;
      max-width: 750px;
      box-sizing: border-box;
      .chapter-title {
        margin-top: 10px;
        header {
          display: inline-block;
          font-size: 24px;
          margin-bottom: 14px;
          margin-top: 12px;
        }
      }
      &::after {
        content: "";
        display: inline-block;
        width: 100%;
      }
    }
    .chapter-container::after {
    }
  }
}
</style>

