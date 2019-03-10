<template>
  <div class="reviews-list">
    <ul class="list">
      <li class="show" v-for="(review, index) in reviews" :key="index">
        <Review :review="review"></Review>
        <hr>
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
      return this.$store.state.review.reviews;
    }
  },
  watch: {
    // reviews: {
    //   immediate: true,
    //   handler: function(newReview, oldREview) {
    //     return newReview;
    //   }
    // }
  },
  components: {
    Review
  }
};
</script>

<style lang="scss" >
hr {
  border: 0.5px solid #c2bac3;
}

.list {
}

li {
  transition: 300ms;
}
</style>
