<template>
  <div class="reviews-list">
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <Review :review="review"></Review>
      </li>
    </ul>
  </div>
</template>

<script>
import Review from "./Review";

export default {
  props: {
    reviews: Array
  },

  components: {
    Review
  }
};
</script>

<style lang="scss">
</style>
