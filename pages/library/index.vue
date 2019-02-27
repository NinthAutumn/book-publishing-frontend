<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library__nav flex" @mouseleave="navLineOut">
      <div
        @click="navSelect('Bookmark')"
        @mouseenter="navLine('Bookmark')"
        class="library__nav__item"
      >ブックマーク</div>
      <div @mouseenter="navLine('readingList')" class="library__nav__item">再生リスト</div>
      <div @mouseenter="navLine('review')" class="library__nav__item">レビュー</div>
      <div @mouseenter="navLine('bought')" class="library__nav__item">購入済み</div>
      <div
        @click="navSelect('history')"
        @mouseenter="navLine('history')"
        class="library__nav__item"
      >歴史</div>

      <i class="i__line" :style="line"></i>
    </div>
    <div class="flex-divider flex flex-row flex--between">
      <div v-if="selectedTabName === 'bookmark'" class="library-bookmark">
        <BookList :trendings="true" :books="bookmarks"></BookList>
      </div>
      <div class="library-history" v-if="selectedTabName=== 'history'">
        <BookList :history="true" :books="history"></BookList>
      </div>

      <div class="library-profile">
        <Profile></Profile>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/LibraryPage/BookList";
import Profile from "@/components/LibraryPage/Profile";
export default {
  components: {
    BookList,
    Profile
  },
  data() {
    return {
      line: {
        width: "96px",
        left: "0px"
      },
      selectedTab: {
        width: "96px",
        left: "0px"
      },
      selectedTabName: "bookmark"
    };
  },
  computed: {
    bookmarks() {
      return this.$store.state.library.bookmarks;
    },
    history() {
      return this.$store.state.library.history;
    }
  },
  methods: {
    sortSelect(type) {},
    navLineOut() {
      this.line = this.selectedTab;
    },
    async navSelect(item) {
      switch (item) {
        case "Bookmark":
          this.selectedTab = {
            width: "96px",
            left: "0px"
          };
          this.selectedTabName = "bookmark";
          break;
        case "readingList":
          this.selectedTab = {
            width: "80px",
            left: "106px"
          };
          this.selectedTabName = "readingList";
          break;
        case "review":
          this.selectedTab = {
            width: "64px",
            left: "196px"
          };
          this.selectedTabName = "review";
          break;
        case "bought":
          this.selectedTab = {
            width: "64px",
            left: "270px"
          };
          this.selectedTabName = "bought";
          break;
        case "history":
          this.selectedTab = {
            width: "32px",
            left: "344px"
          };
          this.selectedTabName = "history";
          await this.$store.dispatch("library/getHistory");
          break;
      }
    },
    navLine(item) {
      switch (item) {
        case "Bookmark":
          this.line = {
            width: "96px",
            left: "0px"
          };
          break;
        case "readingList":
          this.line = {
            width: "80px",
            left: "106px"
          };

          break;
        case "review":
          this.line = {
            width: "64px",
            left: "196px"
          };
          break;
        case "bought":
          this.line = {
            width: "64px",
            left: "270px"
          };
          break;
        case "history":
          this.line = {
            width: "32px",
            left: "344px"
          };
          break;
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch("library/getBookmark");
  }
};
</script>

<style lang="scss">
.library {
  &__nav {
    &:hover {
      cursor: pointer;
    }
    position: relative;
    .i {
      &__line {
        position: absolute;
        top: 100%;
        content: "";
        border-top: 2px solid $primary;
        transition: 300ms;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__item {
      font-size: 16px;
      margin-right: 10px;
    }
  }
  &-profile {
    width: 180px;
  }
  $self: &;
  &-history {
    margin-right: 10px;
    flex-grow: 1;
    &__header {
      font-size: 16px !important;
    }
  }
  &-bookmark {
    margin-right: 10px;
    flex-grow: 1;
    &__header {
      font-size: 16px !important;
    }
  }
  &__header-wrapper {
    height: 60px;
    width: 100%;
  }
  &__header {
    font-size: 20px;
  }
}
</style>
