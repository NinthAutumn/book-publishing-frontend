<template>
  <div class="library">
    <div class="library__header-wrapper flex flex--align">
      <header class="library__header">ライブラリー</header>
    </div>
    <div class="library-bookmark">
      <div class="library-bookmark__header">ブックマーク</div>
      <div class="library-bookmark__sort-button flex flex--right">並び替え</div>
      <BookList :trendings="true" :books="$store.state.ranking.ratings.total"></BookList>
    </div>
  </div>
</template>

<script>
import BookList from "@/components/LibraryPage/BookList";
export default {
  components: {
    BookList
  },
  async fetch({ store }) {
    // await store.dispatch("book/getBook", params.id);
  }
};
</script>

<style lang="scss">
.library {
  $self: &;
  &-bookmark {
    width: 50%;
    &__header {
      font-size: 16px;
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
