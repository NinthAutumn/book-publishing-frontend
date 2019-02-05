<template>
  <div class="deleted-toc">
    <chapter-toc :toc="toc"></chapter-toc>
  </div>
</template>

<script>
import ChapterToc from "@/components/Dashboard/ChapterToc";

export default {
  computed: {
    toc() {
      return this.$store.getters["chapter/deleted"];
    }
  },
  components: {
    ChapterToc
  }
};
</script>

<style>
</style>
