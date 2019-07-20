<template>
  <div class="mranking-card">
    <div class="mranking-card__container" v-ripple>
      <div class="mranking-card__cover">
        <v-img
          :aspect-ratio="1/1.5"
          max-width="15rem"
          class="mranking-card__img"
          :src="book.cover"
          :lazy-src="cover"
          style="border-radius: 0.4rem;"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="black "></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </div>
      <div class="mranking-card__meta">
        <div class="mranking-card__title" v-line-clamp="1" v-text="book.title"></div>
        <div class="mranking-card__author" v-text="`${book.pen_name}・${book.name}`"></div>
        <div class="mranking-card__rating">
          <v-rating color="#FF8D29" readonly :size="17" half-increments :value="+book.rating"></v-rating>
        </div>
        <div class="flex-divider flex-row flex--right">
          <div class="mranking-card__point" v-if="score" v-text=" `ポイント${book.score}`"></div>
          <div class="mranking-card__point" v-else>
            <fa class="mranking-card__bolt" icon="bolt"></fa>
            {{book.score}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    index: Number,
    score: [Number, String],
    trending: Boolean,
    vote: Boolean
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png")
    };
  }
};
</script>

<style lang="scss">
.mranking-card {
  $self: &;
  width: 100%;
  &__container {
    display: flex;

    width: 100%;
    padding: 0.5rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    #{$self}__cover {
      min-width: 6rem;
      margin-right: 0.5rem;
    }
    #{$self}__meta {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex-grow: 1;
    }
    #{$self}__point {
      font-size: 1.5rem;
      #{$self}__bolt {
        //  font-size:
        color: #ff1d5e;
      }
    }
    #{$self}__title {
      font-size: 1.5rem;
    }
    .v-icon {
      padding: 0 !important;
    }
  }
}
</style>
