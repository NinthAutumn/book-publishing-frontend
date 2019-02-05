<template>
  <div class="published-toc">
    <chapter-toc :published="true" :toc="toc"></chapter-toc>
  </div>
</template>

<script>
import ChapterToc from "@/components/Dashboard/ChapterToc";

export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/published"];
    }
  },
  components: {
    ChapterToc
  }
};
</script>

<style>
</style>
