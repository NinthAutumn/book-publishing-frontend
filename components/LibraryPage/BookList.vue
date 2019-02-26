<template>
  <div class="library-booklist">
    <div class="flex-divider flex flex--right">
      <div class="library-booklist__sort flex flex--center flex--align">
        <div class="library-booklist__sort__icon">
          <fa icon="sort"></fa>
        </div>
        <div class="library-booklist__sort__text">並び替え</div>
      </div>
    </div>
    <ul class="library-booklist__list" v-if="trendings">
      <li class="library-booklist__item" v-for="book in books" :key="book.id">
        <Book :book="book._id.book[0]"></Book>
      </li>
    </ul>
    <ul class="library-booklist__list" v-else>
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
  &__sort {
    // background-color:;
    box-shadow: 1px 1px 5px 0px rgb(233, 233, 233);
    // border-radius: 5px;
    width: 100px;
    height: 30px;

    &:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      transition: 200ms;
    }
    &__icon {
      font-size: 14px;
    }
    &__text {
      font-size: 14px;
    }
  }
  // grid-template-rows:
  &__list {
    display: grid;
    grid-template-columns: repeat(6, 135px);
    grid-gap: 5px;
    #{$self}__item {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>
