<template>
  <div class="chapter">
    <div class="chapter-wrapper">
      <nuxt-link
        class="chapter-navigation__previous"
        v-if=" $store.state.chapter.chapter.bookId.chapters[0].index !== $store.state.chapter.chapter.index"
        :to="{path: `${$store.state.chapter.chapter.index-1}`}"
      >Previous Chapter</nuxt-link>
      <div class="chapter-container">
        <div class="chapter-title">
          <header>{{$store.state.chapter.chapter.title}}</header>
        </div>
        <div
          class="chapter-content"
          v-html="$store.state.chapter.chapter.content"
          style="flex-direction:column;"
        ></div>
      </div>
      <nuxt-link
        class="chapter-navigation__next"
        v-if="($store.state.chapter.chapter.bookId.chapters.length) !== $store.state.chapter.chapter.index"
        :to="{path: `${$store.state.chapter.chapter.index+1}`}"
      >Next Chapter</nuxt-link>
    </div>
  </div>
</template>

<script>
import Chapter from "@/components/ChapterPage/Chapter";
export default {
  data() {
    return {
      bottom: false
    };
  },
  components: {
    Chapter
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
    // console.log("fetch called");
    const index = params.chaptersId;
    console.log(index);
    await store.dispatch("chapter/nextChapter", {
      bookId: params.id,
      index: index
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
  scrollToTop: false
};
</script>

<style lang="scss" >
body {
  // background-color: black;
}
.left-vertical-nav {
  position: fixed;
  top: 60px;
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
  display: flex;
  justify-content: space-around;
  // height: 100vh;
  // background: black;
  // color: white;
  .chapter-wrapper {
    // height: 100vh;
    .chapter-navigation__next {
      text-align: center;
    }
    .chapter-navigation__previous {
      text-align: center;
    }
    .chapter-container {
      // position: relative;
      // height: 100vh;
      .chapter-title {
        header {
          font-size: 24px;
          // font-weight: bold;
          margin-bottom: 14px;
          margin-top: 12px;
        }
      }
      padding: 0px 50px;
      width: 802px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      p {
        margin-bottom: 12px;
      }
      // align-items: center;
      // justify-content: space-around;
    }
  }

  &-title {
    font-size: 18px;
    text-align: center;
  }
  &-content {
    // padding: 10px;
    // width: 50vw;
    // width:
    // padding: 5px;
    // text-align: center;
    display: flex;
    justify-content: space-around;
    p {
      white-space: pre-wrap;
      font-size: 17px;
      text-align: left;
    }
  }
}
</style>
// >

// </style>
