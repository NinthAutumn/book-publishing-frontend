<template>
  <ul class="search-books">
    <Book :book="book" v-for="book in books" :key="book.id"></Book>
  </ul>
</template>

<script>
export default {
  props: {
    books: Array
  },
  computed: {},
  data() {
    return {
      readMore: null
    };
  },
  components: {
    Book: () => import("./Book")
  },
  methods: {
    openState() {
      if (this.readMore) {
        this.readMore = "";
      } else {
        this.readMore = "open";
      }
    }
  },
  created() {
    // if (this.book.synopsis.length > 340) {
    //   this.readMore = "open";
    // } else {
    //   this.readMore = "";
    // }
  }
};
</script>

<style lang="scss">
.book-synopsis {
  a {
    &:hover {
      cursor: pointer;
    }
  }
}
.book-cover-img {
  margin-right: 10px;
}
.book-container {
  .v-icon {
    padding: 0 !important;
  }
  padding: 5px 7px;
  .vue-star-rating-rating-text {
    margin: 0 !important;
    font-size: 15px;
  }
  .book-info {
  }
  .book-info .open {
    height: none;
    height: 100% !important;
    overflow: visible;
    transition: 300ms;
  }
  .book-header {
  }
  .book-synopsis {
    overflow: hidden;
    line-height: 27px;
  }
}

.book-title {
  &--text {
    font-size: 18px;
    font-weight: 500;
    color: rgb(65, 57, 66);
    &:hover {
      color: $primary;
    }
  }
}

.genre-list {
  &--item {
    height: 25px;
    p {
      font-size: 13px;
      color: $secondary;
    }

    border-radius: 5px;
    border: 1.4px solid $secondary;
    padding: 0px 7px;
    margin-left: 2px;

    &:hover {
      background-color: $secondary;
      p {
        color: white;
      }
      cursor: pointer;
    }
  }
}
</style>
