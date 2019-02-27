<template>
  <div class="library-booklist">
    <div class="flex-divider flex flex--right">
      <div class="library-booklist__sort">
        <div
          @click="showSelect"
          class="flex-divider flex flex--center flex--align"
          :class="{selected: itemSelected}"
        >
          <div class="library-booklist__sort__icon">
            <fa icon="sort"></fa>
          </div>
          <div class="library-booklist__sort__text" v-text="selected"></div>
        </div>

        <transition name="grow-shrink">
          <div
            v-if="sortSelect"
            v-click-outside="hideSelect"
            class="library-booklist__sort__options flex flex-column flex--center"
          >
            <div
              class="library-booklist__sort__options__item disabled flex flex--align flex--center"
            >選ぶ</div>

            <div
              class="library-booklist__sort__options__item flex flex--align flex--center"
              @click="selectedOrder(item)"
              v-for="(item, index) in sortTypes"
              :key="index"
              v-text="item"
            ></div>
          </div>
        </transition>
      </div>
    </div>
    <ul class="library-booklist__list" v-if="trendings">
      <li class="library-booklist__item" v-for="book in books" :key="book.id">
        <Book :book="book.bookId"></Book>
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
    return {
      sortSelect: false,
      itemSelected: false,
      selected: "並び替え",
      sortTypes: ["最近読んだ順", "入れた順", "名前順"]
    };
  },
  components: {
    Book
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
    // background-color:;
    .flex-divider {
      height: 100%;
    }
    box-shadow: 1px 1px 5px 0px rgb(233, 233, 233);
    // border-radius: 5px;
    width: 120px;
    height: 30px;
    position: relative;
    color: grey;
    .selected {
      // color: #b68d98;
      color: black;
    }
    &__options {
      position: absolute;
      top: -10px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0px 8px 24px rgb(233, 233, 233);
      .disabled {
        color: #f4648a;
        // margin-left: 10px;
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
        // width: 100%;
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
  // grid-template-rows:
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 135px);
    grid-gap: 5px;
    #{$self}__item {
      grid-column: auto;
      grid-row: auto;
    }
  }
}
</style>
