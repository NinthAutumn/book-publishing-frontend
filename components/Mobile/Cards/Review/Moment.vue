<template>
  <div class="review-card">
    <div class="review-card__container">
      <div class="review-card__avatar">
        <v-avatar size="30">
          <v-img :src="$route.query.author? user.author_avatar : user.avatar.img"></v-img>
        </v-avatar>
      </div>
      <div class="review-card__meta">
        <div class="review-card__title" v-text="review.title"></div>
        <!-- {{review.rating}} -->
        <v-rating color="#FF8D29" readonly size="20" half-increments :value="+review.rating"></v-rating>
        <div class="review-card__content" v-html="truncate(review.content, 100)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
    user: Object
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "…";
      } else {
        return string;
      }
    }
  }
};
</script>

<style lang="scss" >
.review-card {
  $self: &;
  margin-bottom: 1rem;
  .v-icon {
    padding: 0 !important;
  }

  &__container {
    display: flex;

    #{$self}__avatar {
      // width: 5rem;
      min-width: 4rem;
    }
    #{$self}__title {
      font-size: 1.7rem;
    }
    .v-icon {
      padding: 0 !important;
    }
  }
}
</style>
