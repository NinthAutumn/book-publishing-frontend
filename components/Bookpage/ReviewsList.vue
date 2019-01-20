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
    // reviews: Array
  },
  computed: {
    reviews() {
      return this.$store.getters["review/allReviews"];
    }
  },
  watch: {
    reviews: {
      immediate: true,
      handler: function(newReview, oldREview) {
        return newReview;
      }
    }
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
