<template>
  <div class="drafted-toc">
    <book-toc :toc="toc"></book-toc>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/getDraft"];
    }
  },
  components: {
    BookToc: () => import("@/components/Dashboard/BookToc")
  },
  transition: "slide-fade",
  async mounted() {
    await this.$store.dispatch("chapter/fetchChapterList", {
      bookId: this.$route.params.id,
      state: "draft",
      structured: false
    });
  }
};
</script>

<style>
</style>
