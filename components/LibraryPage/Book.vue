<template>
  <div class="library-book">
    <div class="library-book__container">
      <div class="library-book__cover">
        <img :src="book.cover" alt>
      </div>
      <div class="library-book__text">
        <div class="library-book__title">{{book.title}}</div>
        <div class="library-book__progress"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  }
};
</script>

<style>
</style>
