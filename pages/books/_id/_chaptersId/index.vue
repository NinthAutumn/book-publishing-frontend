<template>
  <div class="chapter">
    <nav class="left-vertical-nav">
      <img class="book-cover" :src="$store.state.chapter.chapterCover" alt>
    </nav>
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
        <div class="chapter-content">
          <p>{{$store.state.chapter.chapter.content}}</p>
        </div>
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
export default {
  data() {
    return {
      bottom: false
    };
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
  }
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
      .chapter-title {
        header {
          font-size: 24px;
          // font-weight: bold;
        }
      }
      padding: 0px 50px;
      width: 94.5rem;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
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
