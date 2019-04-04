<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library__nav flex-row" @mouseleave="navLineOut" v-if="!$device.isMobile">
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
    <div v-else class="library-nav__list library-nav__list--mobile flex-row">
      <div
        v-for="(item,index) in nav_list"
        :key="index"
        :class="{'library-nav__item--selected': selected_item === item}"
        @click="change_tab(item)"
        class="library-nav__item library-nav__item--mobile"
        v-ripple
      >{{item}}</div>
    </div>
    <div class="flex-divider flex-row flex--between">
      <div v-if="selectedTabName === 'bookmark'&& selected_item!== '歴史'" class="library-bookmark">
        <div class="library-bookmark__select flex flex--align flex--right">
          <Select
            v-model="order"
            def="入れた順"
            transition="grow-shrink"
            icon="sort"
            name="並び替え"
            :data="sortTypes"
          ></Select>
        </div>
        <BookList :trendings="true" :books="bookmarks"></BookList>
      </div>
      <div class="library-history" v-if="selectedTabName=== 'history'||selected_item=== '歴史'">
        <BookList :history="true" :books="history"></BookList>
      </div>

      <div class="library-profile" v-if="!$device.isMobile">
        <Profile></Profile>
      </div>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/LibraryPage/BookList";
import Profile from "@/components/LibraryPage/Profile";
import Select from "@/components/All/Select";
export default {
  components: {
    BookList,
    Profile,
    Select
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
      selectedTabName: "bookmark",
      sortTypes: ["最近読んだ順", "入れた順", "名前順"],
      order: "入れた順",
      selected_item: "再生リスト",
      nav_list: ["再生リスト", "レビュー", "購入済み", "歴史"]
    };
  },
  watch: {
    order: function(e) {
      if (e === "入れた順") {
        this.$store.commit("library/SORT_BY_DATE");
      } else if (e === "最近読んだ順") {
      } else {
        this.$store.commit("library/SORT_BY_NAME");
      }
    }
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
    sortSelect() {},
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
    },
    async change_tab(item) {
      this.selected_item = item;
      if (item === "歴史") {
        await this.$store.dispatch("library/getHistory");
      }
    }
  },
  async fetch({ store }) {
    await store.dispatch("library/getBookmark");
    await store.dispatch("review/userReviews");
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
  @media screen and (max-width: 400px) {
    &-bookmark {
      margin: 0 !important;
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
.library-nav {
  &__list {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgb(243, 243, 243);

    margin-bottom: 1rem;
  }
  &__item {
    padding: 0.5rem 0;
    margin-right: 0.5rem;
    font-size: 1.6rem;
    &:active {
      color: $primary;
      border-bottom: 2px solid $primary;
    }
    &--selected {
      color: $primary;
      border-bottom: 2px solid $primary;
    }
  }
}
</style>
