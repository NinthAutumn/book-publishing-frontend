<template>
  <div class="review-mobile">
    <div class="review-mobile__container">
      <div class="review-mobile__avatar">
        <v-avatar :size="40" class="review-mobile__img">
          <v-img :src="book.user_id === review.user_id? book.avatar : review.avatar.img"></v-img>
        </v-avatar>
      </div>
      <div class="review-mobile__meta">
        <div class="review-mobile__header">
          <div class="review-mobile__title" v-text="review.title"></div>
          <div class="review-mobile__rating">
            <fa class="review-mobile__icon" :icon="{prefix:'far',iconName:'star'}"></fa>
            <div class="review-mobile__rate" v-text="review.rating"></div>
          </div>
        </div>
        <div
          v-if="review.content.length > 299 &&!open"
          class="review-mobile__content"
          v-html="truncate(review.content,300)"
        ></div>
        <div
          class="review-mobile__content"
          v-else-if="review.content.length <300 || open"
          v-html="review.content"
        ></div>
        <div class="review-mobile__nav" v-if="review.content.length > 299">
          <div class="review-mobile__open" v-if="!open" @click="open=!open">
            詳細
            <fa icon="caret-down" class="review-mobile__icon"></fa>
          </div>
          <div class="review-mobile__close" @click="open=!open" v-else>
            一部を表示
            <fa icon="caret-up" class="review-mobile__icon"></fa>
          </div>
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
      open: false
    };
  },
  methods: {
    truncate: (string, number) => {
      if (string.length > number) {
        return (string || "").substring(0, number) + "...";
      } else {
        return string;
      }
    }
  },
  filters: {}
};
</script>

<style lang="scss">
.review-mobile {
  $self: &;
  &__container {
    display: flex;
    padding: 0.5rem;
    #{$self}__avatar {
      margin-right: 0.5rem;
      #{$self}__img {
        box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
          0 3px 6px 0 rgba(0, 0, 0, 0.07);
      }
    }
    #{$self}__meta {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      padding: 1rem;
      border-radius: 1rem;
    }
    #{$self}__nav {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $secondary;
      #{$self}__icon {
        margin-left: 0.5rem;
      }
      #{$self}__open {
        font-size: 1.4rem;
        font-weight: bold;
      }
      #{$self}__close {
        font-size: 1.4rem;
        font-weight: bold;
      }
    }
    #{$self}__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      #{$self}__title {
        font-size: 1.5rem;
        font-weight: bold;
      }
      #{$self}__rating {
        display: flex;
        align-items: center;
        justify-content: center;
        color: black;
        font-size: 1.8rem;
        #{$self}__icon {
          margin-right: 0.5rem;
          color: #ff8d29;
        }
        #{$self}__rate {
          color: #ff8d29;
          font-size: 1.6rem;
          font-weight: bold;
        }
      }
      // self
    }
    #{$self}__content {
    }
  }
}
</style>
