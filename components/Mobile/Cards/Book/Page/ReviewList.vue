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
            <v-rating color="#FF6452" readonly :size="22" half-increments :value="+book.rating"></v-rating>
          </div>
        </div>
        <div class="mbp-reviews__list">
          <review-card
            @selectReview="handleSelect"
            :limit="150"
            v-for="review in reviews"
            :key="review.id"
            :review="review"
            :book="book"
          ></review-card>
          <client-only>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
          </client-only>
        </div>

        <div class="mbp-reviews__form" @click="$emit('toggleForm')">
          <fa class="mbp-reviews__icon" icon="pen"></fa>
          <div class="mbp-reviews__create" v-text="reviewed? 'レビューを編集する':'レビューを書く'"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapActions({
      fetchReviews: "review/showAll"
    }),
    handleSelect(val) {
      this.$emit("selectReview", val);
    },
    async sortReview() {
      await this.fetchReviews({
        bookId: this.$route.params.id,
        page: 1,
        limit: 10,
        type: 0
      });
    },
    async infiniteHandler($state) {
      const reviews = await this.fetchReviews({
        bookId: this.$route.params.id,
        page: this.page++,
        limit: 10,
        direction: "desc",
        type: 0,
        next: true
      });

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
      reviews: "review/getReviews",
      reviewed: "review/isReviewed"
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
    }
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
