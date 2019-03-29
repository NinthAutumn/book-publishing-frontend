<template>
  <div class="divider flex">
    <main class="divider chapter-container">
      <!-- <no-ssr v-if="$device.isMobile">
        <infinite-loading direction="top" @infinite="prevChapter"></infinite-loading>
      </no-ssr>-->
      <Chapter></Chapter>
      <CommentList v-if="!$device.isMobile"></CommentList>
      <!-- <no-ssr v-if="$device.isMobile">
        <infinite-loading direction="bottom" @infinite="nextChapter"></infinite-loading>
      </no-ssr>-->
    </main>
  </div>
</template>

<script>
import Chapter from "@/components/ChapterPage/Chapter";
import CommentList from "@/components/ChapterPage/CommentList";

export default {
  data() {
    return {
      bottom: false,
      pStart: { x: 0, y: 0 },
      pStop: { x: 0, y: 0 }
    };
  },

  components: {
    Chapter,
    CommentList
  },
  created() {
    if (process.client) {
      if (this.$device.isMobile) {
        this.scroll();
        this.touch();
      }
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("onscroll", this.nextChapter());
      window.removeEventListener("touchstart", this.swipeStart());
      window.removeEventListener("touchend", this.swipeEnd());
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        // if (document.documentElement.scrollTop <= 0) {
        //   this.prevChapter();
        // }
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.nextChapter();
        }
      };
    },
    swipeStart(e) {
      if (typeof e["targetTouches"] !== "undefined") {
        var touch = e.targetTouches[0];
        this.pStart.x = touch.screenX;
        this.pStart.y = touch.screenY;
      } else {
        this.pStart.x = e.screenX;
        this.pStart.y = e.screenY;
      }
    },
    swipeEnd(e) {
      if (typeof e["changedTouches"] !== "undefined") {
        let touch = e.changedTouches[0];
        this.pStop.x = touch.screenX;
        this.pStop.y = touch.screenY;
      } else {
        this.pStop.x = e.screenX;
        this.pStop.y = e.screenY;
      }

      this.swipeCheck();
    },
    swipeCheck: function() {
      let changeY = this.pStart.y - this.pStop.y;
      let changeX = this.pStart.x - this.pStop.x;
      if (this.isPullDown(changeY, changeX)) {
        this.prevChapter();
      }
    },
    isPullDown: function(dY, dX) {
      // methods of checking slope, length, direction of line created by swipe action
      return (
        dY < 0 &&
        ((Math.abs(dX) <= 100 && Math.abs(dY) >= 200) ||
          (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
      );
    },
    touch() {
      const self = this;
      document.addEventListener("touchstart", e => {
        this.swipeStart(e);
      });
      document.addEventListener("touchend", e => {
        this.swipeEnd(e);
      });
    },
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
          userId: this.$store.getters["loggedInUser"]._id
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
  transition: "none",
  mounted() {
    // this.touch();
  }
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

