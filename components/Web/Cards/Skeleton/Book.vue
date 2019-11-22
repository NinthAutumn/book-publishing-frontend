<template>
  <v-sheet class="book-skeleton">
    <div class="book-skeleton__divider flex-divider flex-column" style="margin-right:1rem;">
      <v-skeleton-loader width="14rem" :aspect-ratio="1/1.5" ref="skeleton" :type="'image'"></v-skeleton-loader>
      <v-skeleton-loader style="margin-top:1rem;" width="14rem" :type="'sentences'"></v-skeleton-loader>
    </div>
  </v-sheet>
</template>

<script>
export default {};
</script>

<style lang="scss">
</style>
