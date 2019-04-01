<template>
  <div class="update-page">
    <BookList></BookList>
  </div>
</template>

<script>
import BookList from "@/components/Update/BookList";
export default {
  components: {
    BookList
  },
  async fetch({ store }) {
    await store.dispatch("chapter/fetchLatestBooks", {
      page: 1,
      limit: 20
    });
  }
};
</script>

<style lang="scss">
</style>
