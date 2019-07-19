<template>
  <div class="book-scard">
    <nuxt-link class="book-scard__container" :to="`/books/${book.id}`">
      <div class="book-scard__cover">
        <v-img
          class="book-scard__img"
          :src="book.cover + '?webp'"
          :lazy-src="lazyCover"
          :aspect-ratio="1/1.5"
          max-width="15rem"
          min-width="5rem"
        >
          <template v-slot:placeholder>
            <div class="book-scard__loading">
              <div class="trinity-rings-spinner">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </template>
        </v-img>
      </div>
      <div class="book-scard__meta">
        <div class="book-scard__title" v-line-clamp="1" v-text="book.title"></div>
        <div class="flex-divider flex-row">
          <div class="book-scard__genre" v-text="`${book.pen_name}・${book.name}`"></div>
        </div>
        <div class="flex-divider flex-row">
          <div class="book-scard__genres" v-for="genre in book.genres" :key="genre">{{genre}}</div>
        </div>
        <div class="book-scard__synopsis" v-line-clamp="4" v-text="book.synopsis"></div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object
    }
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
    display: flex;
    // min-width: 50rem;
    transform: scale(1);
    transition: 200ms;
    border-radius: 0.5rem;
    padding: 1rem;
    user-select: none;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    &:hover {
      // transform: scale(1.05);
      transition: 200ms;
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      cursor: pointer;
    }
    &:active,
    &:focus {
      transform: scale(0.98);
    }
    #{$self}__cover {
      min-width: 13rem;
      margin-right: 1rem;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    #{$self}__meta {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      #{$self}__title {
        font-size: 1.8rem;
      }
      #{$self}__genres {
        font-size: 1.4rem;
        padding: 0.3rem 1rem;
        border-radius: 50rem;
        background-color: $primary;
        color: white;
        margin-right: 1rem;
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
