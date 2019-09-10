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
          <h3 class="review-form__header">感想を書く</h3>

          <ReviewsForm v-if="!reviewed" v-model="reviewState"></ReviewsForm>
          <ReviewsForm
            v-else
            :pcontent="myReview.content"
            :ptitle="myReview.title"
            :prating="myReview.rating"
            :reviewed="reviewed"
            v-model="reviewState"
          ></ReviewsForm>
        </div>
      </transition>
    </div>
    <div class="book__reviews__divider flex flex--align flex--between">
      <div class="book__rating__all flex flex--align">
        <v-rating color="#FF8D29" readonly size="30" half-increments :value="+rating"></v-rating>
      </div>
      <button
        v-ripple
        @click.stop="reviewOpen"
        class="review-open button"
        v-text="reviewed? 'レビューを編集':'レビューを書く'"
      ></button>
    </div>
    <hr />
    <ul class="list">
      <Select
        transition="grow-shrink"
        icon="sort"
        :width="100"
        :height="30"
        :fontSize="14"
        def="良いね順"
        　name="並び替え"
        class="reviews-list__sort"
        :object="sort_type"
        v-model="sort"
      ></Select>
      <li class="show" v-for="(review, index) in reviews" :key="index">
        <Review @editReview="reviewOpen" :review="review"></Review>
        <hr />
      </li>
      <client-only>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </client-only>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rating: Number
  },
  data() {
    return {
      reviewState: false,
      sort_type: [
        { key: "良いね順", value: 0 },
        { key: "問題的論順", value: 1 },
        { key: "最新順", value: 2 }
      ],
      sort: 0,
      limit: 10,
      page: 2
    };
  },
  computed: {
    reviews() {
      return this.$store.getters["review/getReviews"];
    },
    reviewed() {
      return this.$store.getters["review/isReviewed"];
    },
    myReview() {
      return this.$store.getters["review/getMyReview"];
    }
  },
  watch: {
    sort: {
      immediate: true,
      handler: function(newReview, oldREview) {
        this.sortReview();
      }
    }
  },
  async mounted() {
    await this.$store.dispatch("review/showAll", {
      bookId: this.$route.params.id,
      page: 1,
      limit: 10,
      type: 0
    });
    await this.$store.dispatch("review/fetchIsReviewed", {
      bookId: this.$route.params.id
    });
  },
  components: {
    Review: () => import("./Review"),
    ReviewsForm: () => import("./ReviewForm"),
    Select: () => import("@/components/All/Select")
  },
  methods: {
    async sortReview() {
      await this.$store.dispatch("review/showAll", {
        bookId: this.$route.params.id,
        page: 1,
        limit: 10,
        type: this.sort
      });
    },
    async reviewOpen() {
      if (!this.$store.getters.isAuthenticated) {
        return this.$store.commit("LOGIN_STATE");
      }
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
      let reviews = [];
      if (this.$store.getters.isAuthenticated) {
        reviews = await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          userId: this.$store.getters["auth/getUser"].id,
          page: this.page++,
          limit: 10,
          direction: "desc",
          type: this.sort,
          next: true
        });
      } else {
        reviews = await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          page: this.page++,
          limit: 10,
          direction: "desc",
          type: this.sort,
          next: true
        });
      }
      if (reviews.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
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

.review-open {
  padding: 1rem 2rem;
  background-color: #fff;
  color: white;
  background-color: #2a2f45;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  // border: 1px solid #2a2f45;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
}
li {
  transition: 300ms;
}
.reviews-list__sort {
  margin: 1rem 0 !important;
}
.review-form-modal {
  background-color: #f1f3f7;

  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);

  .review-form__header {
    font-size: 2rem;
    padding: 1rem 0;
    color: #32325d;
  }
}
</style>
