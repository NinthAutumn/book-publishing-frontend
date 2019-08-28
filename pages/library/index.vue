<template>
  <div class="library page-padding">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library__nav flex-row" @mouseleave="navLineOut" v-if="!$device.isMobile">
      <div
        @click="navSelect('Bookmark')"
        @mouseenter="navLine('Bookmark')"
        class="library__nav__item"
      >ブックマーク</div>
      <!-- <div @mouseenter="navLine('readingList')" class="library__nav__item">再生リスト</div>
      <div @mouseenter="navLine('review')" class="library__nav__item">レビュー</div>
      <div @mouseenter="navLine('bought')" class="library__nav__item">購入済み</div>-->
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
          <div class="library-bookmark__edit" v-if="!$device.isMobile">
            <div
              v-if="!editMode"
              class="library-bookmark__edit-button"
              @click="editMode= !editMode"
            >
              <fa class="library-bookmark__edit-icon" icon="pen"></fa>編集
            </div>
            <div class="library-bookmark__actions" v-else>
              <div
                class="library-bookmark__action library-bookmark__action--delete"
                :class="{'library-bookmark__action--deactive':Object.keys(bulk_items).length < 1}"
                @click="deleteHandler"
              >削除</div>
              <div
                class="library-bookmark__action library-bookmark__action--cancel"
                @click="editMode= !editMode"
              >キャンセル</div>
            </div>
          </div>
          <Select
            v-if="$device.isMobile? !$route.query.editMode: true"
            v-model="order"
            def="更新順"
            transition="grow-shrink"
            icon="sort"
            name="並び替え"
            :object="sortTypes"
            :width="120"
          ></Select>
        </div>
        <BookList v-model="bulk_items" :editMode="editMode" :trendings="true" :books="bookmarks"></BookList>
      </div>
      <div class="library-history" v-if="selectedTabName=== 'history'||selected_item=== '歴史'">
        <HistoryBook :books="history"></HistoryBook>
      </div>
      <div class="library-profile" v-if="!$device.isMobile">
        <Profile></Profile>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hydrateWhenVisible } from "vue-lazy-hydration";

export default {
  components: {
    BookList: hydrateWhenVisible(() =>
      import("@/components/LibraryPage/BookList")
    ),
    Profile: hydrateWhenVisible(() =>
      import("@/components/LibraryPage/Profile")
    ),
    Select: hydrateWhenVisible(() => import("@/components/All/Select")),
    HistoryBook: hydrateWhenVisible(() =>
      import("@/components/LibraryPage/HistoryBook")
    )
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
      sortTypes: [
        { key: "最近読んだ順", value: "0" },
        { key: "入れた順", value: "1" },
        { key: "名前順", value: "2" },
        { key: "更新順", value: "3" }
      ],
      bulk_items: {},
      order: "更新順",
      selected_item: "ブックマーク",
      editMode: false,
      nav_list: ["ブックマーク", "レビュー", "購入済み", "歴史"]
    };
  },
  mounted() {
    if (this.$device.isMobile) {
      this.nav_list = ["ブックマーク"];
    }
  },
  watch: {
    order: async function(e) {
      await this.$store.dispatch("library/getBookmark", { sortby: e });
    }
  },
  computed: {
    ...mapGetters({
      bookmarks: "library/getBookmarks",
      history: "library/getHistory",
      reviews: "library/getReviews"
    })
  },
  methods: {
    navLineOut() {
      this.line = this.selectedTab;
    },
    async deleteHandler() {
      if (Object.keys(this.bulk_items).length < 1) {
        return;
      }
      await this.$axios.patch("/library/bulk", {
        list: this.bulk_items
      });
      await this.$store.dispatch("library/getBookmark", { sortby: 3 });
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

        case "history":
          this.selectedTab = {
            width: "32px",
            left: "106px"
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
        case "history":
          this.line = {
            width: "32px",
            left: "106px"
          };
          break;
      }
    },
    async change_tab(item) {
      this.selected_item = item;
    }
  },
  async fetch({ store, redirect }) {
    if (!store.getters["auth/isAuthenticated"])
      return redirect(301, "/?auth=true");
    await store.dispatch("library/getBookmark", { sortby: 3 });
    await store.dispatch("library/fetchReviews");
  }
  // auth: true
};
</script>

<style lang="scss">
.library {
  &__nav {
    margin-bottom: 1rem;
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
    min-width: 180px;
    max-width: 300px;
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
    $self: &;
    &__edit {
      #{$self}__edit-button {
        font-size: 1.4rem;
        #{$self}__edit-icon {
          margin-right: 0.5rem;
        }
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
        margin-right: 1rem;
        color: $secondary;
      }
      #{$self}__actions {
        display: flex;

        #{$self}__action {
          font-size: 1.4rem;
          &--delete {
            margin-right: 3.5rem;
            color: orangered;
          }
          &--deactive {
            color: rgba(255, 68, 0, 0.658);
            &:hover {
              text-decoration: none !important;
              cursor: default !important;
            }
          }
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
          margin-right: 1rem;
          color: $secondary;
        }
      }
    }
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
