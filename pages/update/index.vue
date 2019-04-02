<template>
  <div class="update-page">
    <div class="update-page__title">更新された小説</div>
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
.update-page {
  &__title {
    font-size: 2rem;
  }
}
</style>
