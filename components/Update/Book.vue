<template>
  <div class="update-book">
    <div class="update-book__cover">
      <v-img
        :aspect-ratio="1/1.5"
        max-width="13.5rem"
        :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapters: Array,
    book: Object
  }
};
</script>

<style lang="scss">
</style>
