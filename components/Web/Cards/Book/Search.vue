<template>
  <div class="book-scard">
    <nuxt-link tag="div" class="book-scard__container" :to="`/books/${book.id}`">
      <div class="book-scard__cover">
        <v-img
          class="book-scard__img"
          :src="book.cover + '/m'"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        ></v-img>
      </div>
      <div class="book-scard__meta">
        <nuxt-link
          :to="`/books/${book.id}`"
          class="book-scard__title"
          v-line-clamp="1"
          v-text="book.title"
        ></nuxt-link>
        <div class="flex-divider flex-row">
          <div class="book-scard__genre" v-text="`${book.pen_name}・${book.name}`"></div>
        </div>
        <v-rating color="#FF8D29" readonly :size="20" half-increments :value="+book.rating"></v-rating>

        <div class="flex-divider flex-row">
          <div class="book-scard__genres" v-for="(genre,index) in book.genres" :key="genre">
            <div class="book-scard__genre-container" v-if="index < 3">{{genre}}</div>
          </div>
        </div>
        <div class="book-scard__synopsis" v-line-clamp="4" v-text="book.synopsis"></div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "browse-bookcard",
  serverCacheKey: props => props.book.id + "::" + props.index,
  props: {
    book: {
      type: Object
    },
    index: Number
  },
  data() {
    return {
      lazyCover: require("~/assets/img/NobleCardLight.png?webp")
    };
  }
};
</script>

<style lang="scss">
.book-scard {
  &__loading {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  $self: &;
  &__container {
    .v-icon {
      padding: 0 !important;
    }
    display: flex;
    // min-width: 50rem;
    transform: scale(1);
    transition: 200ms;
    border-radius: 0.5rem;
    padding: 1rem;
    user-select: none;
    // box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
    //   0 1px 1px 0 rgba(0, 0, 0, 0.07);
    &:hover {
      // transform: scale(1.05);
      transition: 200ms;
      // box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
      //   0 3px 6px 0 rgba(0, 0, 0, 0.07);
      cursor: pointer;
    }
    &:active,
    &:focus {
      // transform: scale(0.98);
    }
    #{$self}__cover {
      min-width: 13rem;
      margin-right: 1rem;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
    }
    #{$self}__meta {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      #{$self}__title {
        font-size: 1.8rem;
      }
      #{$self}__genres {
        #{$self}__genre-container {
          font-size: 1.2rem;
          padding: 0.1rem 2rem;
          border: 1px solid $primary;
          border-radius: 50rem;
          background-color: white;
          color: $primary;
          margin-right: 1rem;
        }
      }
      #{$self}__genre {
        font-size: 1.4rem;
        padding: 0.3rem 1rem;

        background-color: #556cd6;
        color: white;
        border-radius: 50rem;
      }
      #{$self}__synopsis {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
