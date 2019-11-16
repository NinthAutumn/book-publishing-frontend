<template>
  <div class="book-ranking">
    <div class="book-ranking__container">
      <div class="book-ranking__cover">
        <div
          class="book-ranking__ranking"
          :class="`book-ranking__ranking--${noColor? '':index}`"
          v-text="index + 1"
        ></div>
        <v-img
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="12.5rem"
          class="book-ranking__img"
          :src="book.cover + '/m'"
          :lazy-src="cover"
          style="border-radius: 0.4rem;"
        ></v-img>
      </div>
      <div class="book-ranking__meta">
        <nuxt-link
          tag="a"
          :to="`/books/${book.id}`"
          class="book-ranking__title"
          v-text="book.title"
        ></nuxt-link>
        <div class="book-ranking__pill flex-row">
          <div class="book-ranking__author" v-text="`${book.pen_name}・${book.name}`"></div>
        </div>
        <div class="book-ranking__rating">
          <v-rating color="#FF6452" readonly :size="17" half-increments :value="+book.rating"></v-rating>
          <span v-text="book.rating"></span>
        </div>
        <div v-line-clamp="3" class="book-ranking__synopsis" v-text="book.synopsis"></div>
        <div class="book-ranking__score">
          <fa v-if="vote" class="book-ranking__bolt" icon="bolt"></fa>
          <!-- <span v-></span> -->
          <div v-if="score" class="book-ranking__points" v-text="vote? score: `ポイント：　${score}`"></div>
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
    score: [String, Number],
    vote: Boolean,
    noColor: Boolean
  },
  data() {
    return {
      cover: require("~/assets/img/NobleCardLight.png")
    };
  }
};
</script>

<style lang="scss">
.book-ranking {
  $self: &;
  margin-bottom: 1rem;
  width: 100%;
  &__container {
    user-select: none;

    display: flex;
    width: 100%;
    #{$self}__cover {
      position: relative;
      margin-right: 1rem;
    }
    #{$self}__ranking {
      font-size: 1.6rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      border-radius: 0.3rem;
      z-index: 1;
      font-weight: bold;
      color: white;
      background-color: #2a2f45;
      &--0 {
        background-color: #ffa500;
      }
      &--1 {
        background-color: #556cd6;
      }
      &--2 {
        background-color: #cd7f32;
      }
    }
    #{$self}__meta {
      display: flex;
      // align-items:center;
      justify-content: space-between;
      flex-direction: column;
      width: 100%;
      #{$self}__title {
        &:hover {
          cursor: pointer;
        }
        font-size: 1.8rem;
        font-weight: 500;
      }
      #{$self}__author {
        font-size: 1.4rem;
        padding: 0.1rem 2rem;

        border-radius: 10rem;
        background-color: $secondary;
        color: white;
      }
      #{$self}__synopsis {
        font-size: 1.4rem;
      }
    }
    #{$self}__rating {
      display: flex;
      align-items: center;
      span {
        font-size: 1.2rem;
        font-weight: bold;
        margin-left: 1rem;
      }
    }
    #{$self}__score {
      align-self: flex-end;
      display: flex;
      align-items: center;
    }
    #{$self}__points {
      font-size: 1.6rem;

      font-weight: bold;
    }
    #{$self}__bolt {
      font-size: 1.6rem;
      color: #ff1d5e;
      margin-right: 0.5rem;
    }
    .v-icon {
      padding: 0 !important;
    }
  }
}
</style>
