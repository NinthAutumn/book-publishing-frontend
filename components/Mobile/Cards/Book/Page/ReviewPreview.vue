<template>
  <div class="pmb-reviewp">
    <div class="pmb-reviewp__container">
      <div class="pmb-reviewp__header">
        <div class="pmb-reviewp__title">感想 ({{reviewCount}})</div>
        <div class="pmb-reviewp__rating">
          <v-rating color="#FF8D29" readonly :size="22" half-increments :value="+book.rating"></v-rating>
        </div>
        <div class="pmb-reviewp__all" @click.stop="$emit('openReviews')">
          全部見る
          <fa class="pmb-reviewp__all-icon" icon="caret-right"></fa>
        </div>
      </div>
      <div class="pmb-reviewp__list">
        <div v-swiper:mySwiper="swiperMobile">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(review) in preview" :key="review.id">
              <review-card
                @selectReview="handleSelect"
                type="preview"
                :limit="150"
                :review="review"
                :book="book"
              ></review-card>
            </div>
          </div>
        </div>
      </div>
      <div class="pmb-reviewp__form">
        <fa class="pmb-reviewp__icon" icon="pen"></fa>
        <div class="pmb-reviewp__create">レビューを書く</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    book: Object
  },
  computed: {
    ...mapGetters({
      reviewCount: "review/getReviewCount",
      preview: "review/getPreviewReviews"
    })
  },
  async mounted() {
    await this.$store.dispatch("review/showAll", {
      bookId: this.$route.params.id,
      page: 1,
      limit: 5,
      direction: "desc",
      type: "likes",
      preview: true
    });
  },
  data() {
    return {
      swiperMobile: {
        slidesPerView: 1.1,
        spaceBetween: 5,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        on: {},
        breakpoints: {}
      }
    };
  },
  methods: {
    handleSelect(val) {
      this.$emit("selectReview", val);
    }
  },
  components: {
    ReviewCard: () => import("@/components/Mobile/Cards/Review/Preview")
  }
};
</script>

<style lang="scss">
.pmb-reviewp {
  $self: &;
  &__container {
    padding: 0.5rem;
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    #{$self}__form {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      justify-content: center;
      padding: 1rem 0;
      // position: fixed;
      // bottom: 0;
      // left: 0;
      border-radius: 0.5rem;
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
        font-size: 1.4rem;
      }
      #{$self}__all {
        font-size: 1.4rem;
        // margin-right: 1rem;
        color: #2a2f45;
      }
      // displ
    }
  }
}
</style>
