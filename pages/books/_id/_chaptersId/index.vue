<template>
  <div class="divider chapter-wrapper">
    <main class="divider chapter-container" :class="{'chapter-container--mobile':$device.isMobile}">
      <Chapter v-if="!nochapter&&!$device.isMobile"></Chapter>
      <mobile-chapter :comment="$route.query.comment" v-if="$device.isMobile"></mobile-chapter>
      <div v-if="nochapter" class="chapter-closed" @click="nochapter=false">
        <fa icon="expand-arrows-alt"></fa>
      </div>
      <CommentList v-if="!$device.isMobile"></CommentList>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible, hydrateSsrOnly } from "vue-lazy-hydration";

export default {
  data() {
    return {
      bottom: false,
      nochapter: false
    };
  },
  components: {
    Chapter: hydrateSsrOnly(() => import("@/components/ChapterPage/Chapter")),
    MobileChapter: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/MobileChapter")
    ),
    CommentList: hydrateWhenVisible(() =>
      import("@/components/ChapterPage/CommentList")
    )
  },
  async mounted() {
    if (this.$route.query.comment) {
      this.nochapter = true;
      // this.$vuetify.goTo(`#comment${this.$route.query.comment}`);
    }
    await this.$store.dispatch("drawing/fetchChapterDrawings", {
      chapterId: this.$route.params.chaptersId
    });
    await this.$store.dispatch("chapter/fetchChapterNav", {
      index: this.$store.getters["chapter/getChapter"].index,
      bookId: this.$route.params.id,
      settingIndex: this.$store.getters["chapter/getChapter"].setting_index
    });
  },
  methods: {
    async nextChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.chapter.navigation.next._id;

      await this.$store.dispatch("chapter/fetchChapter", {
        bookId,
        chapterId
      });
      this.$router.push(`/books/${bookId}/${chapterId}`);
    },
    async prevChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.chapter.navigation.prev._id;
      await this.$store.dispatch("chapter/fetchChapter", {
        bookId,
        chapterId
      });
      this.$router.push(`/books/${bookId}/${chapterId}`);
    }
  },
  auth: false,
  async fetch({ store, route }) {
    const index = route.params.chaptersId;
    if (store.getters["auth/isAuthenticated"]) {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: route.params.chaptersId,
        bookId: route.params.id
      });
      await store.dispatch("user/fetchUserSettings");
      if (!route.query.comment) {
        await store.dispatch("library/postHistory", {
          chapterId: route.params.chaptersId,
          bookId: route.params.id
        });
      }
    } else {
      await store.dispatch("chapter/fetchChapter", {
        chapterId: route.params.chaptersId,
        bookId: route.params.id
      });
    }
  },
  layout: "chapter-nav/Chapter",
  computed: {
    ...mapGetters({
      title: "chapter/getChapterBookTitle",
      chapter: "chapte/getChapter"
    })
  },
  scrollToTop: true,
  pageTransition: false,
  head() {
    return {
      title: this.title
    };
  }
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
    max-width: 100%;
    box-sizing: border-box;
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
      padding: 0 1rem;
      &--mobile {
        max-width: 100%;
      }
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
        display: block;
        // position: relative;
        width: 80vw;
      }
    }
    .chapter-container::after {
    }
  }
}
</style>

