<template>
  <div class="library">
    <BookList :books="$store.state.book.books.highestrated"></BookList>
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
