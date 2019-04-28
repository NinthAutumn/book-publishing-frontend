<template>
  <div class="library-booklist">
    <ul class="browse-booklist__list">
      <li class="library-booklist__item" v-for="(book) in books" :key="book.id">
        <Book :book="book"></Book>
      </li>
    </ul>
    <no-ssr>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </no-ssr>
  </div>
</template>
<script>
export default {
  props: {
    books: Array,
    trendings: Boolean,
    history: Boolean,
    type: Number,
    genres: Array,
    direction: String,
    tags: Array
  },
  data() {
    return {
      page: 2
    };
  },
  watch: {
    type: function(val) {
      this.page = 2;
    },
    tags: function(val) {
      this.page = 2;
    },
    direction: function(val) {
      this.page = 2;
    },
    genres: function(val) {
      this.page = 2;
    }
  },
  components: {
    Book: () => import("./Book")
  },
  methods: {
    async infiniteHandler($state) {
      const books = await this.$store.dispatch("book/browseBooks", {
        type: this.type,
        direction: this.direction,
        genres: this.genres,
        tags: this.tags,
        page: this.page++,
        limit: 20,
        infinite: true
      });
      if (books.length > 0) {
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
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
    grid-template-columns: repeat(auto-fit, minmax(10rem, 15rem));
    grid-gap: 0.5rem;
  }
  @media screen and (max-width: 400px) {
    &__list {
      grid-template-columns: repeat(3, minmax(5rem, 15rem));
    }
  }
}
</style>
