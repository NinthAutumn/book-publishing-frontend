<template>
  <div class="table-of-content">
    <ul>
      <li v-for="(chapter, index) in toc" :key="index">{{chapter.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.state.getters["chapter/published"];
    }
  },
  created() {}
};
</script>

<style>
</style>
