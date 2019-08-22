<template>
  <div class="mbp-reviews dialog dialog__container" :class="{'mbp-reviews--disabled':!value}">
    <transition name="slide-up" appear>
      <div class="mbp-reviews__container dialog__content" v-if="value">
        <div class="mbp-reviews__nav-top flex-row flex--align flex--right">
          <div
            class="mbp-reviews__close"
            v-ripple="{color:'#556CD6'}"
            @click.stop="$emit('toggleReviews')"
          >
            <fa class="mbp-reviews__nav-icon" icon="chevron-down"></fa>
          </div>
        </div>
        <div class="mbp-reviews__header">
          <div class="mbp-reviews__title">感想 ({{reviewCount}})</div>
          <div class="mbp-reviews__rating">
            <v-rating color="#FF8D29" readonly :size="22" half-increments :value="+book.rating"></v-rating>
          </div>
        </div>
        <!-- <div class="mbp-review__new flex-row flex--align flex--right"> -->

        <!-- </div> -->

        <div class="mbp-reviews__list">
          <review-card
            @selectReview="handleSelect"
            :limit="150"
            v-for="review in reviews"
            :key="review.id"
            :review="review"
            :book="book"
          ></review-card>
          <no-ssr>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
          </no-ssr>
        </div>

        <div class="mbp-reviews__form" @click="$emit('toggleForm')">
          <fa class="mbp-reviews__icon" icon="pen"></fa>
          <div class="mbp-reviews__create">レビューを書く</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    book: Object,
    value: {
      default: false
    }
  },
  components: {
    ReviewCard: () => import("@/components/Mobile/Cards/Review/Default")
  },
  data() {
    return {
      sort_type: [
        { key: "良いね順", value: 0 },
        { key: "問題的論順", value: 1 },
        { key: "最新順", value: 2 }
      ],
      page: 2
    };
  },
  watch: {
    sort: {
      immediate: true,
      handler: function(newReview, oldREview) {
        this.sortReview();
      }
    }
  },
  methods: {
    handleSelect(val) {
      this.$emit("selectReview", val);
    },
    async sortReview() {
      await this.$store.dispatch("review/showAll", {
        bookId: this.$route.params.id,
        page: 1,
        limit: 10,
        type: this.sort
      });
    },
    async infiniteHandler($state) {
      let reviews = [];
      if (this.$store.getters.isAuthenticated) {
        reviews = await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          userId: this.$store.getters["user/loggedInUser"].id,
          page: this.page++,
          limit: 10,
          direction: "desc",
          type: "likes",
          next: true
        });
      } else {
        reviews = await this.$store.dispatch("review/showAll", {
          bookId: this.$route.params.id,
          page: this.page++,
          limit: 10,
          direction: "desc",
          type: "likes",
          next: true
        });
      }
      if (reviews.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  },
  computed: {
    ...mapGetters({
      reviewCount: "review/getReviewCount",
      reviews: "review/getReviews"
    })
  }
};
</script>

<style lang="scss">
.mbp-reviews {
  $self: &;
  &--disabled {
    // opacity: 0;
    visibility: hidden;
    transition: 300ms;
  }
  &__container {
    #{$self}__close {
      font-size: 1.6rem;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &:active,
      &:focus,
      &:hover {
        // color: $secondary;
      }
    }
    // padding-bottom: 5rem !important;
    #{$self}__form {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      justify-content: center;
      padding: 1rem 0;
      position: fixed;
      bottom: 0;
      left: 0;
      // border-radius: 0.5rem;
      background-color: #2a2f45;
      color: white;
      width: 100%;
      #{$self}__icon {
        margin-right: 0.5rem;
      }
      #{$self}__create {
        font-size: 1.4rem;
      }
    }
    // padding: 0 0.5rem;
    // box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
    //   0 3px 6px 0 rgba(0, 0, 0, 0.07);
    // border-radius: 0.5rem;
    // padding: 0.5rem;
    #{$self}__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      #{$self}__title {
        font-weight: bold;
        font-size: 1.6rem;
      }
      // displ
    }
  }

  &__list {
    max-height: 100%;
    overflow: auto;
    padding-bottom: 5rem;
  }
}
</style>
