<template>
  <div class="deleted-toc">
    <chapter-toc :toc="toc"></chapter-toc>
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
    ChapterToc: () => import("@/components/Dashboard/ChapterToc")
  },
  transition: "slide-fade"
};
</script>

<style>
</style>
