<template>
  <div class="ranking-main">
    <BooksList :books="$store.state.book.books.highestrated"></BooksList>
  </div>
</template>

<script>
import BooksList from "@/components/Ranking/BooksList";
export default {
  auth: false,
  async fetch({ store }) {},
  components: {
    BooksList
  }
};
</script>

<style>
</style>
