<template>
  <div class="user-books">
    <ul class="user-books__list">
      <li class="user-books__item" v-for="(book, index) in books" :key="index">
        <div class="user-books__cover">
          <v-img
            :src="`https://storage.googleapis.com/theta-images/${book.cover}`"
            :aspect-ratio="1/1.5"
            max-width="11rem"
          ></v-img>
        </div>
        <div class="user-books__meta user-books__meta--title" v-text="book.title"></div>
        <div class="user-books__meta user-books__meta--genres">
          <div
            class="user-books__genre-list"
            v-for="(genre, index) in book.genres"
            :key="index"
          >{{genre}}</div>
        </div>
        <div class="user-books__meta user-books__meta--rating">
          <v-rating
            color="#FF8D29"
            v-if="book.ratings"
            readonly
            size="23"
            half-increments
            :value="+book.ratings.toFixed(2)"
          ></v-rating>
          <v-rating
            color="#FF8D29"
            size="23"
            half-increments
            v-else-if="book.rating"
            readonly
            :value="+book.rating.toFixed(2)"
          ></v-rating>
          <v-rating size="23" color="#FF8D29" v-else :readonly="true" :value="0"></v-rating>
        </div>
        <div class="user-books__meta user-books__meta--synopsis">
          <p v-clampy="3">{{book.synopsis}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array
  },
  data() {
    return {};
  },
  async created() {}
};
</script>

<style lang="scss">
.user-books {
  $self: &;
  .v-icon {
    padding: 0;
  }
  &__list {
    #{$self}__item {
      margin-bottom: 1rem;
      display: grid;
      grid-template-areas: "cover title title" "cover genres genres" "cover rating rating" "cover synopsis synopsis";
      grid-template-columns: minmax(5rem, 11rem) 1fr 1fr;
      grid-gap: 0.5rem 1rem;
      grid-template-rows: 3.5rem 3.5rem 2rem 1fr;
    }
    #{$self}__cover {
      grid-area: cover;
    }
    #{$self}__meta {
      &--title {
        grid-area: title;
        font-size: 2rem;
      }
      &--rating {
        grid-area: rating;
      }
      &--genres {
        grid-area: genres;
        font-size: 1.3rem;

        display: flex;
        align-items: center;
        flex-wrap: wrap;
        #{$self}__genre-list {
          user-select: none;

          display: flex;
          align-items: center;
          height: 2.5rem;
          font-size: inherit;
          padding: 0 1rem;
          border-radius: 0.5rem;
          border: 1px solid $primary;
          color: $primary;
          margin-right: 5px;
          transform: scale(1);
          transition: transform 200ms;
          &:hover {
            background-color: #ebe1ffa9;
            cursor: pointer;
          }
          &:active {
            transform: scale(0.95);
            transition: 200ms;
          }
        }
      }
      &--synopsis {
        grid-area: synopsis;
        align-self: end;
        font-size: 1.6rem;
        p {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
