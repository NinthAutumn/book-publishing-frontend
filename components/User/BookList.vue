<template>
  <div class="profile-books">
    <ul class="profile-books__list" v-if="$route.query.author">
      <li class="profile-books__item" v-for="(book, index) in books" :key="index">
        <nuxt-link tag="div" :to="`/books/${book.id}`" class="profile-books__cover">
          <v-img
            style="border-radius:0.4rem;"
            :src="book.cover"
            :aspect-ratio="1/1.5"
            max-width="11rem"
          ></v-img>
        </nuxt-link>
        <nuxt-link
          tag="div"
          :to="`/books/${book.id}`"
          class="profile-books__meta profile-books__meta--title"
          v-text="book.title"
        ></nuxt-link>
        <div class="profile-books__meta profile-books__meta--genres">
          <div
            class="profile-books__genre-list"
            v-for="(genre, index) in book.genres"
            :key="index"
          >{{genre}}</div>
        </div>
        <div class="profile-books__meta profile-books__meta--rating">
          <v-rating
            color="#FF6452"
            v-if="book.rating"
            readonly
            size="20"
            half-increments
            :value="+book.rating"
          ></v-rating>
          <v-rating size="20" color="#FF6452" v-else :readonly="true" :value="0"></v-rating>
        </div>
        <div class="profile-books__meta profile-books__meta--synopsis">
          <p v-line-clamp="3">{{book.synopsis}}</p>
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
  computed: {},
  async mounted() {
    await this.$store.dispatch("user/fetchProfileBooks", {
      userId: this.$route.params.id
    });
  }
};
</script>

<style lang="scss">
.profile-books {
  $self: &;
  // min-height: none;
  .v-icon {
    padding: 0;
  }
  &__list {
    // height: 500px;
    // overflow: auto;
    #{$self}__item {
      margin-bottom: 1rem;
      display: grid;
      grid-template-areas: "cover title title" "cover genres genres" "cover rating rating" "cover synopsis synopsis";
      grid-template-columns: minmax(5rem, 11rem) 1fr 1fr;
      /* autoprefixer: ignore next */
      grid-gap: 0.5rem 1rem;
      grid-template-rows: 3.5rem 3.5rem 2rem 1fr;
    }
    #{$self}__cover {
      grid-area: cover;
    }
    #{$self}__meta {
      &--title {
        grid-area: title;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 2rem;
        &:hover {
          cursor: pointer;
        }
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
        // align-self: end;
        font-size: 1.6rem;
        align-self: self-start;
        p {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
