<template>
  <div class="published-toc">
    <book-toc :published="true" :toc="toc"></book-toc>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/getPublishedList"];
    }
  },
  async mounted() {
    await this.$store.dispatch("chapter/fetchChapterList", {
      bookId: this.$route.params.id,
      state: "published",
      structured: true
    });
  },
  components: {
    BookToc: () => import("@/components/Dashboard/BookToc")
  },
  created() {},
  transition: {
    name: "slide-fade",
    type: "in-out"
  }
};
</script>

<style>
</style>
