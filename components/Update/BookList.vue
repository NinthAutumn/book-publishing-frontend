<template>
  <div class="update-books">
    <ul class="update-books__date-list">
      <li class="update-books__date-item" v-for="(books, index) in latestBooks" :key="index">
        <div class="update-books__date-title">{{books._id}}</div>
        <ul class="update-books__book-list">
          <li class="update-books__book-item" v-for="(book, index) in books.books" :key="index">
            <Book :book="book.book[0]" :chapters="book.chapters"></Book>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Book from "./Book";
export default {
  components: {
    Book
  },
  created() {},
  computed: {
    latestBooks() {
      return this.$store.getters["chapter/getLatestBooks"];
    }
  }
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
    grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
    grid-template-rows: auto;
    grid-gap: 0.5rem;

    #{$self}__book-item {
    }
  }
  @media screen and(max-width: 500px) {
    #{$self}__book-list {
      grid-template-columns: repeat(3, minmax(5rem, 13rem));
      grid-gap: 3px;

      #{$self}__book-item {
      }
    }
  }
}
</style>
