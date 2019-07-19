<template>
  <div class="update-books">
    <ul class="update-books__date-list">
      <li class="update-books__date-item" v-for="(books, index) in latestBooks" :key="index">
        <div class="update-books__date-title">{{books.date}}</div>
        <ul class="update-books__book-list">
          <li class="update-books__book-item" v-for="(book, index) in books.book" :key="index">
            <Book :book="book"></Book>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// import Book from "./Book";
export default {
  props: {
    latestBooks: Array
  },
  components: {
    Book: () => import("./Book")
  },
  created() {},
  computed: {}
};
</script>

<style lang="scss">
.update-books {
  $self: &;
  &__date-list {
    #{$self}__date-title {
      font-size: 1.6rem;
      margin: 1rem 0;
    }
    #{$self}__date-item {
    }
  }
  &__book-list {
    display: grid;
    /* autoprefixer: ignore next */
    grid-template-columns: repeat(3, minmax(30rem, 50rem));
    grid-template-rows: auto;
    /* autoprefixer: ignore next */
    grid-gap: 1rem;

    #{$self}__book-item {
    }
  }
  @supports not (
    /* autoprefixer: ignore next */ grid-template-columns:
      repeat(auto-fill, minmax(10rem, 15rem))
  ) {
    &__book-list {
      grid-template-columns: repeat(8, minmax(10rem, 15rem));
    }
  }
  @media screen and(max-width: 500px) {
    #{$self}__book-list {
      grid-template-columns: repeat(3, minmax(5rem, 15rem));
      /* autoprefixer: ignore next */
      grid-gap: 3px;

      #{$self}__book-item {
      }
    }
  }
}
</style>
