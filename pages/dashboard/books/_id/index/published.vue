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
      return this.$store.state.chapter.pTOC;
    }
  },
  components: {
    ChapterToc
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
