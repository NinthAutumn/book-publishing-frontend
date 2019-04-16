<template>
  <div class="nav">
    <Horizontal></Horizontal>
    <Vertical></Vertical>
  </div>
</template>
<script>
export default {
  components: {
    Horizontal: () => import("./Horizontal"),
    Vertical: () => import("./Vertical")
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>
