<template>
  <div class="dash-booklist">
    <ul class="dash-booklist__list">
      <li class="dash-booklist__item" v-for="(book, index) in books" :key="index">
        <Book :book="book"></Book>
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
    Book: () => import("./Book")
  }
};
</script>

<style lang="scss">
.dash-booklist {
  $self: &;
  &__list {
    padding-left: 5rem;
    // padding-top: 5rem;
    /* autoprefixer: ignore next */
    display: grid;
    /* autoprefixer: ignore next */
    grid-template-columns: repeat(2, minmax(30rem, 1fr));
    /* autoprefixer: ignore next */
    grid-gap: 1rem 5rem;
    // grid-template-rows:minmax(20rem, 300rem);
  }
}
</style>
