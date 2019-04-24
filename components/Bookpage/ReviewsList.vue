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
        <v-rating
          color="#FF8D29"
          v-if="$store.state.book.book.ratings"
          readonly
          size="30"
          half-increments
          :value="+$store.state.book.book.ratings.toFixed(2)"
        ></v-rating>

        <v-rating size="20" color="#FF8D29" v-else :readonly="true" :value="0"></v-rating>
      </div>
      <button
        v-if="!reviewed&&!$device.isMobile"
        @click.stop="reviewOpen"
        class="review-open button"
      >レビューを書く</button>
      <button v-else-if="!$device.isMobile" @click="reviewOpen" class="review-open button">レビューを編集</button>
    </div>
    <hr>
    <ul class="list">
      <Select
        transition="grow-shrink"
        icon="sort"
        :width="120"
        :height="35"
        :fontSize="15"
        def="良いね順"
        　name="並び替え"
        class="reviews-list__sort"
        :object="sort_type"
      ></Select>
      <li class="show" v-for="(review, index) in reviews" :key="index">
        <Review :review="review"></Review>
        <hr>
      </li>
      <no-ssr>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </no-ssr>
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
      ],
      limit: 10,
      page: 2
    };
  },
  computed: {
    reviews() {
      return this.$store.getters["review/getReviews"];
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
    },
    async infiniteHandler($state) {
      // await this.$store
      //   .dispatch("review/fetchNextReviews", {
      //     bookId: this.$route.params.id,
      //     page: this.page++,
      //     userId: this.$store.getters["loggedInUser"].id
      //   })
      //   .then(review => {
      //     if (this.$store.state.review.nextChapterLength) {
      //       $state.loaded();
      //     } else {
      //       $state.complete();
      //     }
      //   });
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
.reviews-list__sort {
  margin-top: 5px;
}
</style>
