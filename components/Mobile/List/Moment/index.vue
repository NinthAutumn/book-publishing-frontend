<template>
  <div class="moment-mobile">
    <div class="moment-mobile__nav">
      <div
        class="moment-mobile__nav-item"
        :class="{'moment-mobile__nav-item--selected': item.value === selected}"
        @click="selected = item.value"
        v-for="item in nav"
        :key="item.value"
      >{{item.key}}</div>
    </div>
    <div class="moment-mobile__list" v-if="!selected">
      <review-card
        :type="'moment'"
        :review="review"
        :user="user"
        v-for="review in activity"
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
          key: "アクティビティー"
        }
        // comment: {
        //   value: 1,
        //   key: "コメント"
        // }
      },
      selected: 0
    };
  },
  computed: {
    ...mapGetters({
      activity: "user/getUserActivity"
    })
  },
  components: {
    ReviewCard: () => import("@/components/Mobile/Cards/Review")
  },
  async mounted() {
    await this.$store.dispatch("user/fetchUserActivityList", {
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
    margin: 1rem 0;
    #{$self}__nav-item {
      font-size: inherit;
      margin-right: 1rem;
      &--selected {
        border-bottom: 2px solid #566cd6;
      }
    }
    border-bottom: 2px solid rgb(243, 243, 243);
  }
}
</style>
