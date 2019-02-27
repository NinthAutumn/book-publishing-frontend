<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library__nav flex" @mouseleave="navLineOut">
      <div @mouseenter="navLine('Bookmark')" class="library__nav__item">ブックマーク</div>
      <div @mouseenter="navLine('readingList')" class="library__nav__item">再生リスト</div>
      <div @mouseenter="navLine('bought')" class="library__nav__item">購入済み</div>
      <div @mouseenter="navLine('history')" class="library__nav__item">歴史</div>
      <i class="i__line" :style="line"></i>
    </div>
    <div class="flex-divider flex flex-row flex--between">
      <div class="library-bookmark">
        <BookList :trendings="true" :books="$store.state.ranking.ratings.total"></BookList>
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
      }
    };
  },
  methods: {
    sortSelect(type) {},
    navLineOut() {
      this.line = this.selectedTab;
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
        case "bought":
          this.line = {
            width: "64px",
            left: "196px"
          };
          break;
        case "history":
          this.line = {
            width: "32px",
            left: "270px"
          };
      }
    }
  },
  async fetch({ store }) {
    // await store.dispatch("book/getBook", params.id);
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
        display: block;
        border-top: 2px solid $primary;
        transition: 300ms;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__item {
      font-size: 16px;
      // margin-right: 10px;
      margin-right: 10px;
    }
  }
  &-profile {
    width: 180px;
  }
  $self: &;
  &-bookmark {
    // width: 50%;
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
