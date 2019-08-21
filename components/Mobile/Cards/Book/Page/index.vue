<template>
  <div class="pmobile-book">
    <header-card :book="book"></header-card>
    <summary-card :synopsis="book.synopsis"></summary-card>
    <review-list @selectReview="reviewPage" @openReviews="reviewModalState" :book="book"></review-list>
    <review-modal
      @selectReview="reviewPage"
      @toggleReviews="reviewModalState"
      v-model="$route.query.modal"
      :book="book"
    ></review-modal>
    <review-page :book="book" @selectReview="reviewPage" v-model="$route.query.review"></review-page>
  </div>
</template>

<script>
export default {
  props: {
    book: Object
  },
  data() {
    return {
      reviewModal: false
    };
  },
  mounted() {
    // this.reviewModal = this.$route.query.review || false;
  },
  methods: {
    reviewModalState: function() {
      if (this.$route.query.modal) {
        this.$router.push("");
      } else {
        this.$router.push("?modal=true");
      }
    },
    reviewPage: function(state) {
      if (this.$route.query.review) {
        this.$router.push("");
      } else {
        if (this.$route.query.modal) {
          this.$router.push(`?review=${state}&modal=true`);
        } else {
          this.$router.push(`?review=${state}`);
        }
      }
    }
  },
  components: {
    HeaderCard: () => import("./Header"),
    SummaryCard: () => import("./Summary"),
    ReviewList: () => import("./ReviewPreview"),
    ReviewModal: () => import("./ReviewList"),
    ReviewPage: () => import("@/components/Mobile/Cards/Review/Page")
  }
};
</script>

<style lang="scss">
</style>
