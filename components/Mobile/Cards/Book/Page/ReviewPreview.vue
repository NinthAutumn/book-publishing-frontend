<template>
  <div class="pmb-reviewp">
    <div class="pmb-reviewp__container">
      <div class="mbp-reviewp__header">
        <div class="mbp-reviewp__title">感想 ({{reviewCount}})</div>
        <div class="mbp-reviewp__rating">
          <v-rating color="#FF8D29" readonly :size="22" half-increments :value="+book.rating"></v-rating>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  ...mapGetters({
    reviewCount: "review/getReviewCount",
    reviews: "review/getReviews"
  }),
  async mounted() {
    await this.$store.dispatch("review/showAll", {
      bookId: this.$route.params.id,
      page: this.page++,
      limit: 2,
      direction: "desc",
      type: "likes",
      preview: true
    });
  }
};
</script>

<style lang="scss">
</style>
