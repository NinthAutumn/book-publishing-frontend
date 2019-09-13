<template>
  <div class="mreview-modal dialog dialog__container">
    <div class="mreview-modal__container dialog__content">
      <div class="mreview-modal__header flex-row flex--align">
        <div class="mreview-modal__avatar">
          <v-avatar>
            <v-img :src="review.avatar? review.avatar: avatar"></v-img>
          </v-avatar>
        </div>
        <div class="mreview-modal__title" v-text="review.title"></div>
      </div>
      <div class="mreview-modal__body">
        <div class="mreview-modal__content" v-html="review.content"></div>
      </div>
      <div class="mreview-modal__footer">
        <div class="mreview-modal__book-cover">
          <v-img :src="review.cover"></v-img>
        </div>
        <div class="mreview-modal__meta">
          <div class="mreview-modal__book-title" v-text="review.book_title"></div>
          <div class="mreview-modal__author" v-text="`${review.pen_name} *  ${review.name}`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      review: "review/getReview"
    })
  },
  data() {
    return {
      avatar: require("~assets/img/profile.png")
    };
  },
  async mounted() {
    await this.$store.dispatch("review/fetchReview");
  }
};
</script>

<style lang="scss">
</style>
