<template>
  <div class="chapter-new">
    <create-chapter></create-chapter>
  </div>
</template>

<script>
import CreateChapter from "@/components/Dashboard/CreateChapter";
export default {
  layout: "user-nav/User",
  components: {
    CreateChapter
  },
  created() {
    // console.log(this.$route.name);
  }
};
</script>

<style>
</style>
