<template>
  <div class="divider flex">
    <main class="divider chapter-container">
      <Chapter></Chapter>
      <CommentList></CommentList>
    </main>
  </div>
</template>

<script>
import Chapter from "@/components/ChapterPage/Chapter";
import CommentList from "@/components/ChapterPage/CommentList";

export default {
  data() {
    return {
      bottom: false
    };
  },

  components: {
    Chapter,
    CommentList
  },
  methods: {
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
      await store.dispatch("user/getSettings");
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
      await store.dispatch("book/fetchBookChapterCount", params.id);
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

