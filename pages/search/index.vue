<template>
  <div id="search">
    <ul>
      <li class="search-book-item" v-for="(book, index) in searchBooks" :key="index">
        <Books :book="book"></Books>
      </li>
    </ul>
  </div>
</template>
<script>
import Books from "@/components/SearchPage/Books";
export default {
  name: "search",
  components: {
    Books
  },
  computed: {
    searchBooks() {
      return this.$store.state.search.books;
    }
  },
  data() {
    return {};
  },
  methods: {},
  auth: false
};
</script>
<style>
/* #search {
  margin-left: 24rem;
  margin-top: 50rem;
  padding: 10rem;
} */

.search-book-item {
  margin-bottom: 10px;
}
</style>
