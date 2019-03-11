<template>
  <div class="reviews-list">
    <div class="divider">
      <transition name="fade">
        <div
          class="divider review-form-modal"
          v-click-outside="reviewClose"
          v-if="reviewState"
          :class="{center: $store.state.menuState === 'menu-inactive'}"
        >
          <ReviewsForm v-if="!reviewed" v-model="reviewState"></ReviewsForm>
          <ReviewsForm
            v-else
            :pcontent="$store.state.review.myReview.content"
            :ptitle="$store.state.review.myReview.title"
            :prating="$store.state.review.myReview.rating.total"
            :reviewed="reviewed"
            v-model="reviewState"
          ></ReviewsForm>
        </div>
      </transition>
    </div>
    <div class="book__reviews__divider flex flex--align flex--between">
      <div class="book__rating__all flex flex--align">
        <no-ssr class>
          <star-rating
            name="rating"
            v-model="$store.state.book.book.ratings"
            :star-size="23"
            :read-only="true"
            inactive-color="#D8D7D5"
            active-color="#FFB727"
            :increment="0.01"
            :round-start-rating="false"
            border-color="#FFB727"
            :glow="1"
            class="star-rating"
          ></star-rating>
        </no-ssr>
      </div>
      <button v-if="!reviewed" @click="reviewOpen" class="review-open button">レビューを書く</button>
      <button v-else @click="reviewOpen" class="review-open button">レビューを編集</button>
    </div>
    <hr>
    <ul class="list">
      <Select
        transition="grow-shrink"
        icon="sort"
        :width="120"
        def="良いね順"
        　name="並び替え"
        :object="sort_type"
      ></Select>
      <li class="show" v-for="(review, index) in reviews" :key="index">
        <Review :review="review"></Review>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import Review from "./Review";
import ReviewsForm from "@/components/Bookpage/ReviewForm";
import Select from "@/components/All/Select";

export default {
  props: {
    // reviews: Array
  },
  data() {
    return {
      reviewState: false,
      sort_type: [
        { key: "良いね順", value: 0 },
        { key: "問題的論順", value: 1 },
        { key: "最新順", value: 2 }
      ]
    };
  },
  computed: {
    reviews() {
      return this.$store.state.review.reviews;
    },
    reviewed() {
      return this.$store.state.review.reviewed;
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
    Review,
    ReviewsForm,
    Select
  },
  methods: {
    async reviewOpen() {
      if (this.reviewed) {
        await this.$store.dispatch("review/myReview", {
          bookId: this.$route.params.id
        });
        this.reviewState = !this.reviewState;
      } else {
        this.reviewState = !this.reviewState;
      }
    },
    reviewClose() {
      this.reviewState = false;
    }
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
