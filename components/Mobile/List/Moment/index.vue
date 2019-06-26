<template>
  <div class="moment-mobile">
    <div class="moment-mobile__nav">
      <div class="moment-mobile__nav-item" v-for="item in nav" :key="item.value">{{item.key}}</div>
    </div>
    <div class="moment-mobile__list" v-if="!selected">
      <review-card
        :type="'moment'"
        :review="review"
        :user="user"
        v-for="review in reviews"
        :key="review.id"
      ></review-card>
    </div>
    <div class="moment-mobile__list" v-else></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      nav: {
        review: {
          value: 0,
          key: "レビュー"
        },
        comment: {
          value: 1,
          key: "コメント"
        }
      },
      selected: 0
    };
  },
  computed: {
    ...mapGetters({
      reviews: "user/getProfileReviews"
    })
  },
  components: {
    ReviewCard: () => import("@/components/Mobile/Cards/Review")
  },
  async mounted() {
    await this.$store.dispatch("user/fetchProfileReviews", {
      userId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
.moment-mobile {
  $self: &;
  &__nav {
    display: flex;
    font-size: 1.8rem;
  }
}
</style>
