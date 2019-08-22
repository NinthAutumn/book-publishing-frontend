<template>
  <div class="pmobile-book">
    <header-card :book="book"></header-card>
    <ranking-list></ranking-list>
    <summary-card :synopsis="book.synopsis"></summary-card>
    <review-list
      @toggleForm="toggleForm"
      @selectReview="reviewPage"
      @openReviews="reviewModalState"
      :book="book"
    ></review-list>
    <review-modal
      @selectReview="reviewPage"
      @toggleReviews="reviewModalState"
      @toggleForm="toggleForm"
      v-model="$route.query.modal"
      :book="book"
    ></review-modal>
    <review-page :book="book" @selectReview="reviewPage" v-model="$route.query.review"></review-page>
    <review-form @toggleForm="toggleForm" v-model="$route.query.form"></review-form>
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
    },
    toggleForm: function(state) {
      if (this.$route.query.form) {
        if (this.$route.query.modal) {
          return this.$router.push("?modal=true");
        }
        this.$router.push("");
      } else {
        if (this.$route.query.modal) {
          this.$router.push(`?form=true&modal=true`);
        } else {
          this.$router.push("?form=true");
        }
      }
    }
  },
  components: {
    HeaderCard: () => import("./Header"),
    SummaryCard: () => import("./Summary"),
    ReviewList: () => import("./ReviewPreview"),
    RankingList: () => import("./Ranking"),
    ReviewModal: () => import("./ReviewList"),
    ReviewPage: () => import("@/components/Mobile/Cards/Review/Page"),
    ReviewForm: () => import("@/components/Mobile/Modals/Review/form")
  }
};
</script>

<style lang="scss">
</style>
