<template>
  <div class="banner-skeleton flex-row">
    <v-skeleton-loader
      style="border-radius:2rem;margin-right:1rem;"
      height="25rem"
      width="437.5"
      type="image"
    ></v-skeleton-loader>
    <v-skeleton-loader
      style="border-radius:2rem;margin-right:1rem;"
      height="25rem"
      width="437.5"
      type="image"
    ></v-skeleton-loader>
    <v-skeleton-loader
      style="border-top-left-radius:2rem; border-bottom-left-radius:2rem;"
      height="25rem"
      width="218"
      type="image"
    ></v-skeleton-loader>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.banner-skeleton {
  position: relative;
  $self: &;
  width: 100%;
}
</style>
