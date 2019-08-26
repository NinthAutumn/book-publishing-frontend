<template>
  <div class="book-card">
    <div class="book-card__cover">
      <v-img
        class="book-card__img"
        :src="cover"
        :lazy-src="lazyCover"
        :aspect-ratio="1/1.5"
        max-width="15rem"
      ></v-img>
    </div>
    <div class="book-card__rating"></div>
    <div class="book-card__title" v-text="title"></div>
  </div>
</template>

<script>
import { TrinityRingsSpinner } from "epic-spinners";
export default {
  props: {
    cover: {
      type: [String, Object],
      default: require("@/assets/img/NobleCardLight.png")
    },
    title: {
      type: [String]
    },
    rating: {
      type: [String, Number],
      default: null
    },
    theme: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      lazyCover: require("@/assets/img/NobleCardLight.png")
    };
  },
  components: {
    TrinityRingsSpinner
  }
};
</script>

<style lang="scss">
.book-card {
  $self: &;
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  &__cover {
    #{$self}__img {
      border-radius: 2rem;
    }
  }
}
</style>
