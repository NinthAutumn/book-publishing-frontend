<template>
  <div class="library-booklist">
    <transition-group tag="ul" class="library-booklist__list" v-if="trendings">
      <li class="library-booklist__item" v-for="(book) in books" :key="book.book_id">
        <book-card
          @editModeToggle="handleEditMode"
          progress
          @addBook="addBookHandler"
          @removeBook="removeBookHndler"
          :cover="book.cover"
          :isMobile="$device.isMobile"
          :book="book"
          :editMode="$device.isMobile? $route.query.editMode: editMode"
        ></book-card>
      </li>
    </transition-group>
    <transition-group tag="ul" v-if="history" class="library-booklist__list">
      <li class="library-booklist__item" v-for="(book) in books" :key="book.book_id">
        <book-card :cover="book.cover" rating :book="book" :isMobile="$device.isMobile"></book-card>
      </li>
    </transition-group>
    <div
      v-if="$route.query.editMode&&$device.isMobile"
      class="library-booklist__edit-nav"
      @click="deleteHandler"
    >
      <p v-text="'削除'"></p>
    </div>
  </div>
</template>
<script>
// import Book from "./Book";

export default {
  props: {
    books: Array,
    trendings: Boolean,
    history: Boolean,
    editMode: Boolean
  },
  data() {
    return {
      sortSelect: false,
      itemSelected: false,
      selected: "並び替え",
      sortTypes: ["最近読んだ順", "入れた順", "名前順"],
      // editMode: false,
      select: {}
    };
  },
  components: {
    BookCard: () => import("@/components/Web/Cards/Book/Default")
  },
  methods: {
    showSelect() {
      this.sortSelect = true;
    },
    hideSelect() {
      this.sortSelect = false;
    },
    addBookHandler({ bookId }) {
      this.select[bookId] = {
        type: "bookmark",
        bookId: bookId
      };
      this.$emit("input", this.select);
    },
    removeBookHndler({ bookId }) {
      delete this.select[bookId];
      this.$emit("input", this.select);
    },
    async deleteHandler() {
      if (Object.keys(this.select).length < 1) {
        return;
      }
      await this.$axios.patch("/library/bulk", {
        list: this.select
      });
      await this.$store.dispatch("library/getBookmark", { sortby: 3 });
    },
    selectedOrder(order) {
      this.selected = order;

      this.itemSelected = true;
      this.sortSelect = false;
    },
    handleEditMode(bookId) {
      if (this.$device.isMobile) return this.$router.push("?editMode=true");

      // this.editMode = !this.editMode;
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
    // #{$self}__ed{

    // }
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
  &__edit-nav {
    width: 100%;
    position: fixed;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $secondary;
    color: white;
    bottom: 0;
    left: 0;
    z-index: 1003;
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
