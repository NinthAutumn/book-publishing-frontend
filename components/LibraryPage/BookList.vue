<template>
  <div class="library-booklist">
    <ul v-if="trendings" class="library-booklist__list">
      <li class="library-booklist__item" v-for="book in books" :key="book.id">
        <Book :book="book._id.book[0]"></Book>
      </li>
    </ul>
    <ul class="library-booklist__list">
      <li class="library-booklist__item" v-for="book in books" :key="book.id">
        <Book :book="book" :size="size = 'big'"></Book>
      </li>
    </ul>
  </div>
</template>
<script>
import Book from "./Book";
export default {
  props: {
    books: Array,
    trendings: Boolean
  },
  data() {
    return {};
  },
  components: {
    Book
  },
  methods: {}
};
</script>
<style lang="scss">
.library-booklist {
  $self: &;

  // grid-template-rows:
  &__list {
    display: grid;
    grid-template-columns: 135px 135px 135px 135px;
    grid-gap: 5px;
    #{$self}__item {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>
