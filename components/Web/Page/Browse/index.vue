<template>
  <div class="browse-page">
    <div class="browse-page__container">
      <browse-header></browse-header>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    BrowseHeader: () => import("./BrowseHeader")
  }
};
</script>

<style lang="scss">
</style>
