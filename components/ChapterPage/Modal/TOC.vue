<template>
  <div class="table-of-content">
    <div class="loading" v-if="loading">loading...</div>
    <ul v-else>
      <li v-for="(chapter, index) in toc" :key="index">{{chapter.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    toc() {
      return this.$store.state.chapter.toc;
    },
    loading() {
      return this.$store.state.chapter.loading;
    }
  },
  async mount() {}
};
</script>

<style>
.table-of-content {
  /* position: sticky; */
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  /* height: 100vh; */
}
</style>
