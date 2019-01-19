<template>
  <div class="reviews-list">
    <ul>
      <hr>
      <li v-for="(review, index) in reviews" :key="index">
        <Review :review="review"></Review>
        <!-- <hr> -->
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

<style lang="scss" >
hr {
  // background: red;
  border: 0.5px solid #c2bac3;
}
</style>
