<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library-bookmark__header">ブックマーク</div>
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
  methods: {
    sortSelect(type) {}
  },
  async fetch({ store }) {
    // await store.dispatch("book/getBook", params.id);
  }
};
</script>

<style lang="scss">
.library {
  &-profile {
    width: 180px;
  }
  $self: &;
  &-bookmark {
    // width: 50%;
    margin-right: 10px;

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
