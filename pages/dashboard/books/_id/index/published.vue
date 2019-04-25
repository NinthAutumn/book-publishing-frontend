<template>
  <div class="published-toc">
    <chapter-toc :published="true" :toc="toc"></chapter-toc>
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
    ChapterToc: () => import("@/components/Dashboard/ChapterToc")
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
