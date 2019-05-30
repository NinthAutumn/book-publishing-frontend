<template>
  <div class="divider chapter-wrapper">
    <main class="divider chapter-container">
      <Chapter v-if="!nochapter"></Chapter>
      <div v-else class="chapter-closed" @click="nochapter=false">
        <fa icon="expand-arrows-alt"></fa>
      </div>

      <CommentList v-if="!$device.isMobile"></CommentList>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bottom: false,
      nochapter: false
    };
  },
  components: {
    Chapter: () => import("@/components/ChapterPage/Chapter"),
    CommentList: () => import("@/components/ChapterPage/CommentList")
  },
  async mounted() {
    if (this.$route.query.comment) {
      this.nochapter = true;
    }

    await this.$store.dispatch("chapter/fetchChapterNav", {
      index: this.$store.getters["chapter/getChapter"].index,
      bookId: this.$route.params.id,
      settingIndex: this.$store.getters["chapter/getChapter"].setting_index
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
          chapterId
          // userId: this.$store.getters["user/loggedInUser"].id
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
          chapterId
          // userId: this.$store.getters["user/loggedInUser"].id
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
  async fetch({ store, params, query }) {
    const index = params.chaptersId;
    if (store.state.auth.loggedIn) {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: params.chaptersId,
        // userId: store.getters["user/getUser"].id,
        bookId: params.id
      });
      await store.dispatch("user/fetchUserSettings");
      if (!query.comment) {
        await store.dispatch("library/postHistory", {
          chapterId: params.chaptersId,
          bookId: params.id
        });
      }
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
  computed: {},
  scrollToTop: true,
  transition: "none"
};
</script>

<style lang="scss">
.chapter {
  display: flex;
  justify-content: space-around;
  .chapter-closed {
    padding: 1rem;
    font-size: 2.5rem;
    &:hover {
      cursor: pointer;
    }
  }
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
        width: 80vw;
      }
    }
    .chapter-container::after {
    }
  }
}
</style>

