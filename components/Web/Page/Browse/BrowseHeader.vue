<template>
  <div class="browse-header">
    <div class="browse-header__container">
      <search-book style="margin-bottom:1rem;"></search-book>
      <search-tag></search-tag>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SearchBook: () => import("@/components/Web/Forms/Search/SearchBook"),
    SearchTag: () => import("@/components/Web/Forms/Search/SearchTag")
  }
};
</script>

<style lang="scss">
</style>
