<template>
  <div class="deleted-toc">
    <book-toc :toc="toc"></book-toc>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/getDeleted"];
    }
  },
  components: {
    BookToc: () => import("@/components/Dashboard/BookToc")
  },
  transition: "slide-fade"
};
</script>

<style>
</style>
