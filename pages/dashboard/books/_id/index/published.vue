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
