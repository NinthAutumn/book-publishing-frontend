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
    padding-top: 5rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(30rem, 1fr));
    grid-gap: 10rem;
    // grid-template-rows:minmax(20rem, 300rem);
  }
}
</style>
