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
        userId: store.state.auth.user._id
      });
      await store.dispatch("user/getSettings");
    } else {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: params.chaptersId
      });
    }
  },
  layout: "chapter-nav/Chapter",
  created() {},
  scrollToTop: false,
  transition: "none"
};
</script>

<style lang="scss">
body {
}

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
      border: 1px solid #cecece;
      .chapter-title {
        margin-top: 10px;
        header {
          font-size: 24px;
          margin-bottom: 14px;
          margin-top: 12px;
        }
      }
      width: 700px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      p {
        line-height: 28px;
        font-weight: 400;
        margin-bottom: 12px;
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>

