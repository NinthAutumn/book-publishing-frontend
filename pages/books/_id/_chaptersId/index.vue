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

// import
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
    // bottomVisible() {
    //   const scrollY = window.scrollY;
    //   const visible = document.documentElement.clientHeight;
    //   const pageHeight = document.documentElement.scrollHeight;
    //   const bottomOfPage = visible + scrollY >= pageHeight;
    //   return bottomOfPage || pageHeight < visible;
    // },
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
  // watch: {
  //   bottom(bottom) {
  //     if (bottom) {
  //       this.nextPage();
  //     }
  //   }
  // },
  async fetch({ store, params }) {
    const index = params.chaptersId;
    if (store.state.auth.loggedIn) {
      await store.dispatch("chapter/nextChapter", {
        bookId: params.id,
        index: index,
        userId: store.state.auth.user._id
      });
    } else {
      await store.dispatch("chapter/nextChapter", {
        bookId: params.id,
        index: index
      });
    }

    await store.dispatch("comment/getComments", {
      chapterIndex: index,
      bookId: params.id
    });
  },
  layout: "chapter-nav/Chapter",
  created() {
    // if (process.client) {
    //   window.addEventListener("scroll", () => {
    //     this.bottom = this.bottomVisible();
    //   });
    // }
  },
  scrollToTop: false,
  transition: "none"
};
</script>

<style lang="scss">
body {
  // background-color: black;
}

.navigation-next {
  position: sticky !important;
  height: 100vh;
  width: 50px;
  font-size: 30px;
  top: 0;
  &:hover {
    background-color: $secondary;
    cursor: pointer;
    color: white;
    transition: 300ms;
  }
}
.navigation-prev {
  position: sticky !important;
  height: 100vh;
  width: 50px;
  font-size: 30px;
  top: 0;
  &:hover {
    background-color: $primary;
    cursor: pointer;
    color: white;
    transition: 300ms;
  }
}
.navigation-prev-cont {
  position: sticky !important;
  height: 100vh;
  width: 50px;
  font-size: 30px;
  top: 0;
  // &:hover {
  //   background-color: $primary;
  //   cursor: pointer;
  //   color: white;
  //   transition: 300ms;
  // }
}

.left-vertical-nav {
  position: fixed;
  // top: 60px;
  // left: 12rem;
  left: 14.4rem;
  // left: 0;
  .book-cover {
    height: 16.8rem;
    width: 11rem;
    border-radius: 10px;
  }
}

.chapter {
  // margin-top: 50px;
  display: flex;
  justify-content: space-around;

  // height: 100vh;
  // background: black;
  // color: white;
  .chapter-wrapper {
    position: relative;
    // height: 100vh;
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
      // height: 100vh;
      .chapter-title {
        margin-top: 10px;
        header {
          font-size: 24px;
          // font-weight: bold;
          margin-bottom: 14px;
          margin-top: 12px;
        }
      }
      // padding: 0px 50px;
      width: 700px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      p {
        line-height: 28px;
        font-weight: 400;
        margin-bottom: 12px;
      }
      // align-items: center;
      // justify-content: space-around;
    }
  }
}
</style>

