<template>
  <div class="library-booklist">
    <transition-group name="list" tag="ul" class="browse-booklist__list">
      <li class="library-booklist__item" v-for="(book, index) in books" :key="index">
        <Book :book="book"></Book>
      </li>
    </transition-group>
  </div>
</template>
<script>
import Book from "./Book";
export default {
  props: {
    books: Array,
    trendings: Boolean,
    history: Boolean
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
.browse-booklist {
  $self: &;
  // z-index: -1;
  &__sort {
    .flex-divider {
      height: 100%;
    }
    box-shadow: 1px 1px 5px 0px rgb(233, 233, 233);
    width: 120px;
    height: 30px;
    position: relative;
    color: grey;
    .selected {
      color: rgb(71, 71, 71);
    }
    &__options {
      position: absolute;
      top: -10px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0px 8px 24px rgb(233, 233, 233);
      .disabled {
        color: #f4648a;
        font-size: 13px;
      }
      &__item {
        font-size: 14px;
        height: 30px;
        color: black;
        transition: color 100ms;

        &:hover {
          color: #f4648a;
          transition: color 100ms;
        }
      }
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
      transition: 200ms;
    }
    &__icon {
      margin-right: 5px;
      font-size: 14px;
    }
    &__text {
      font-size: 14px;
    }
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 135px);
    grid-gap: 15px;
    #{$self}__item {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>
