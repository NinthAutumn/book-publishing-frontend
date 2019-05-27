<template>
  <div class="user-book flex" style="background-color: #fbf9f9;">
    <BookForm></BookForm>
    <!-- <TagCreate></TagCreate> -->
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  components: {
    BookForm: () => import("@/components/Dashboard/Forms/Book")
  },
  async fetch({ route, store }) {
    await store.dispatch("book/fetchAllGenres");
    if (route.query.bookId) {
      await store.dispatch("book/fetchBook", {
        id: route.query.bookId
      });
      await store.dispatch("book/fetchBookGenreAndTags", route.query.bookId);
    }
  }
};
</script>

<style>
.user-book {
  height: 100%;
}
</style>
