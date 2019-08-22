<template>
  <div class="review-card">
    <div class="review-card__container">
      <div class="review-card__header">
        <div class="flex-divider flex-row flex--align flex--between">
          <div class="flex-divider flex-row flex--align flex--between">
            <v-avatar :size="40" class="review-card__avatar">
              <v-img :src="review.avatar.img"></v-img>
            </v-avatar>
            <div class="flex-divider">
              <div class="review-card__title" v-text="review.title"></div>
              <v-rating color="#FF8D29" readonly size="17" half-increments :value="+review.rating"></v-rating>
              <div class="review-card__author" v-text="review.username"></div>
            </div>
          </div>

          <div class="review-card__cover" v-if="!$device.isMobile">
            <v-img
              class="review-card__img"
              :src="review.cover + '/s'"
              min-width="3rem"
              :lazy-src="cover"
              :aspect-ratio="1/1.5"
            ></v-img>
          </div>
        </div>
      </div>
      <div class="review-card__content flex-row flex--align flex--between">
        <div class="review-card__text">
          <div class="review-card__content" v-html="truncate(review.content,wordCount)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
    book: Object
  },
  data() {
    return {
      cover: require("~/assets/img/cover.png"),
      wordCount: 200
    };
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

<style lang="scss">
.review-card {
  $self: &;
  @media screen and (max-width: 450px) {
    &__container {
      width: 100%;
      #{$self}__name {
      }
    }
  }
  &__container {
    color: #525f7f;
    .v-icon {
      padding: 0 !important;
    }
    width: 40rem;

    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    border-radius: 1rem;
    #{$self}__author {
      font-size: 1.4rem;
      opacity: 0.9;
    }
    #{$self}__avatar {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      margin-right: 0.5rem;
    }
    #{$self}__title {
      font-size: 1.7rem;
      font-weight: bold;
    }
    #{$self}__header {
      margin-bottom: 0.5rem;
    }
    #{$self}__cover {
      margin: 0;
      #{$self}__img {
        border-radius: 0.5rem;
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
    }
  }
}
</style>
