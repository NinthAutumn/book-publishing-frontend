<template>
  <div class="reviews-list">
    <div class="reviews" v-for="review in reviews" :key="review._id">
      <div class="reviews-author">{{review.userId.username}}</div>
      <div class="review-rating"></div>
      <div class="reviews-content">
        <div class="review-content-title">{{review.title}}</div>
        <div class="review-content-text">
          <p>{{review.content}}</p>
        </div>
      </div>
      <div class="reviews-like">
        <ArrowUp class="reviews-like-up"></ArrowUp>
        <ArrowDown></ArrowDown>
        <!-- <fa icon="arrow-up" class="like-button"></fa>
        <fa icon="arrow-down" class="dislike-button"></fa>-->
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDown from "@/assets/svg/arrow-down.svg";
import ArrowUp from "@/assets/svg/arrow-up.svg";
export default {
  props: {
    reviews: Array
  },
  components: {
    ArrowDown,
    ArrowUp
  }
};
</script>

<style>
.reviews {
  width: 100%;
  display: flex;
}
.reviews-like-up {
  fill: red;
}
</style>
