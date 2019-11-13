<template>
  <div class="divider chapter-wrapper">
    <main class="divider chapter-container" :class="{'chapter-container--mobile':$device.isMobile}">
      <component v-if="!nochapter" :is="chapterComponent" :comment="$route.query.comment" />
      <div v-if="nochapter" class="chapter-closed" @click="nochapter=false">
        <fa icon="expand-arrows-alt"></fa>
      </div>
      <CommentList v-if="!$device.isMobile"></CommentList>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    }
    await this.fetchDrawing({ chapterId: this.$route.params.chaptersId });
    await this.fetchNav({
      index: this.chapter.index,
      bookId: this.$route.params.id,
      settingIndex: this.chapter.setting_index
    });
    if (
      !this.$route.query.comment &&
      this.$store.getters["auth/isAuthenticated"]
    ) {
      await this.postHistory({
        chapterId: this.$route.params.chaptersId,
        bookId: this.$route.params.id
      });
    }
  },
  methods: {
    ...mapActions({
      fetchChapter: "chapter/fetchChapter",
      fetchNav: "chapter/fetchChapterNav",
      fetchDrawing: "drawing/fetchChapterDrawings",
      postHistory: "library/postHistory"
    }),
    async nextChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.chapter.navigation.next._id;
      await this.fetchChapter({ bookId, chapterId });
      this.$router.push(`/books/${bookId}/${chapterId}`);
    },
    async prevChapter() {
      const bookId = this.$route.params.id,
        chapterId = this.chapter.navigation.prev._id;
      await this.fetchChapter({ bookId, chapterId });
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
      chapter: "chapter/getChapter"
    }),
    chapterComponent() {
      if (this.$device.isMobile)
        return () => import("@/components/ChapterPage/MobileChapter");
      return () => import("@/components/ChapterPage/Chapter");
    }
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
    .chapter-container {
      background-color: white;
      position: relative;
      display: inline-block;
      max-width: 750px;
      min-height: 100vh;

      box-sizing: border-box;
      padding: 0 1rem;
      @include themify($themes) {
        background: themed("textBigBackgroundColor");
        color: themed("textColor");
      }
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
  }
}
</style>

