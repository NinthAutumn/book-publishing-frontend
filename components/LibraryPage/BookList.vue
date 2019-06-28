<template>
  <div class="library-booklist">
    <transition-group tag="ul" class="library-booklist__list" v-if="trendings">
      <li class="library-booklist__item" v-for="(book) in books" :key="book.book_id">
        <book-card progress :cover="book.cover" :isMobile="$device.isMobile" :book="book"></book-card>
      </li>
    </transition-group>
    <transition-group tag="ul" v-if="history" class="library-booklist__list">
      <li class="library-booklist__item" v-for="(book) in books" :key="book.book_id">
        <book-card :cover="book.cover" :book="book" :isMobile="$device.isMobile"></book-card>
      </li>
    </transition-group>
  </div>
</template>
<script>
// import Book from "./Book";

export default {
  props: {
    books: Array,
    trendings: Boolean,
    history: Boolean
  },
  data() {
    return {
      sortSelect: false,
      itemSelected: false,
      selected: "並び替え",
      sortTypes: ["最近読んだ順", "入れた順", "名前順"]
    };
  },
  components: {
    Book: () => import("./Book"),
    BookCard: () => import("@/components/Web/Cards/Book")
  },
  methods: {
    showSelect() {
      this.sortSelect = true;
    },
    hideSelect() {
      this.sortSelect = false;
    },
    selectedOrder(order) {
      this.selected = order;

      this.itemSelected = true;
      this.sortSelect = false;
    }
  }
};
</script>
<style lang="scss">
.library-booklist {
  $self: &;
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
    /* autoprefixer: ignore next */
    grid-template-columns: repeat(auto-fill, minmax(10rem, 13.5rem));
    /* autoprefixer: ignore next */
    grid-gap: 5px;
    #{$self}__item {
      grid-column: auto;
      grid-row: auto;
    }
  }
  @media screen and (max-width: 500px) {
    &__list {
      grid-template-columns: repeat(3, minmax(5rem, 15rem));
    }
  }
}
</style>
