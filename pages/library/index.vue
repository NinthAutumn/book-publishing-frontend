<template>
  <div class="library">
    <BookList :trendings="true" :books="$store.state.ranking.ratings.total"></BookList>
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

<style>
</style>
