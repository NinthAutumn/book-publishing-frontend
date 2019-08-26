<template>
  <div class="dash-booklist">
    <ul class="dash-booklist__list">
      <li class="dash-booklist__item" v-for="(book, index) in books" :key="index">
        <!-- <Book :book="book"></Book> -->
        <book-card :book="book"></book-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: Array
  },
  data() {
    return {
      image: false
    };
  },
  components: {
    Book: () => import("./Book"),
    BookCard: () => import("@/components/Web/Cards/Book/Dashboard")
  }
};
</script>

<style lang="scss">
.dash-booklist {
  $self: &;
  &__list {
    // padding-left: 5rem;
    // padding-top: 5rem;
    /* autoprefixer: ignore next */
    display: grid;
    /* autoprefixer: ignore next */
    grid-template-columns: repeat(2, minmax(30rem, 1fr));
    /* autoprefixer: ignore next */
    grid-gap: 1rem;
    // grid-template-rows:minmax(20rem, 300rem);
  }
  @media screen and (min-width: 1500px) {
    &__list {
      grid-template-columns: repeat(3, minmax(30rem, 1fr)) !important;
    }
  }
}
</style>
