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
      return this.$store.state.chapter.toc;
    }
  },
  created() {}
};
</script>

<style>
.table-of-content {
  top: 50px;
  position: sticky;
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  /* height: 100vh; */
}
</style>
