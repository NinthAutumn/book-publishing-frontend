<template>
  <div class="review-card flex">
    <div class="review-card__profile-pic"></div>
    <div class="review-card__info flex-column">
      <div class="review-card__title">{{review._id.review[0].title}}</div>
      <div class="review-card__rating">{{review._id.review[0].rating.total}}</div>
      <div class="review-card__content">{{review._id.review[0].content}}</div>
    </div>
    <div class="review-card__book flex-column">
      <div class="review-card__book__cover">
        <!-- <img :src="._id.review[0].bookId" alt> -->
      </div>
      <div class="review-card__button button button--primary--open">Read</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object
  }
};
</script>

<style>
.review-card {
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
  -moz-box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
  box-shadow: 1px 1px 5px 0px rgba(186, 186, 186, 1);
}
</style>
