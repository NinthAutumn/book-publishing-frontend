<template>
  <div class="mranking-card">
    <nuxt-link :to="`/books/${book.id}`" tag="div" class="mranking-card__container" v-ripple>
      <div class="mranking-card__ranking" :class="`mranking-card__ranking--${index}`">{{index+1}}</div>
      <div class="mranking-card__cover">
        <v-img
          :aspect-ratio="1/1.5"
          max-width="15rem"
          class="mranking-card__img"
          :src="book.cover + '/m'"
          :lazy-src="cover"
          style="border-radius: 0.4rem;"
        ></v-img>
      </div>
      <div class="mranking-card__meta">
        <div class="mranking-card__title" v-line-clamp="1" v-text="book.title"></div>
        <div class="flex-divider flex-row">
          <div class="mranking-card__author" v-text="`${book.pen_name}・${book.name}`"></div>
        </div>
        <div class="mranking-card__rating">
          <v-rating color="#FF8D29" readonly :size="17" half-increments :value="+book.rating"></v-rating>
        </div>
        <div class="flex-divider flex-row flex--right">
          <div class="mranking-card__point" v-if="!vote" v-text=" `ポイント${book.score}`"></div>
          <div class="mranking-card__point" v-else>
            <fa class="mranking-card__bolt" icon="bolt"></fa>
            {{book.score}}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "banner-list",
  serverCacheKey: props =>
    props.book.id + "::" + props.score || props.vote + "::" + props.index,
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
    position: relative;
    width: 100%;
    padding: 0.5rem;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    #{$self}__ranking {
      height: 30px;
      width: 30px;
      z-index: 2;
      font-size: 12px;
      font-weight: bold;
      position: absolute;
      background-color: #fff;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2a2f45;
      color: white;
      &--0 {
        color: white;
        background-color: #ffa500;
      }
      &--1 {
        background-color: #556cd6;
        color: white;
      }
      &--2 {
        background-color: $bronze;
        color: white;
      }
    }
    #{$self}__cover {
      min-width: 6rem;
      margin-right: 0.5rem;

      #{$self}__img {
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
      }
    }
    #{$self}__meta {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex-grow: 1;
    }
    #{$self}__author {
      font-size: 1.1rem;
      padding: 0.15rem 1rem;
      border-radius: 50rem;
      background-color: #556cd6;
      color: white;
    }
    #{$self}__point {
      font-size: 1.2rem;
      font-weight: bold;
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
