<template>
  <div class="home-page">
    <img src="http://placehold.jp/1090x240.png">
    <div class="main-books">
      <h3 class="card-title">Recommended</h3>
      <div class="main-books-list">
        <div v-for="book in books" :key="book.id">
          <Book :book="book" :size="size = 'big'"></Book>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "../components/Book";
export default {
  components: {
    Book
  },
  data() {
    return {
      books: [
        {
          title: "神達に拾われた男",
          cover: "'/_nuxt/assets/bookcover.jpeg'"
        },
        {
          title: "神達に拾われた男",
          cover: "'/_nuxt/assets/books.jpeg'"
        },
        {
          title: "神達に拾われた男",
          cover: "'/_nuxt/assets/bookcover.jpeg'"
        },
        {
          title: "神達に拾われた男",
          cover: "'/_nuxt/assets/bookcover.jpeg'"
        },
        {
          title: "神達に拾われた男",
          cover: "/_nuxt/assets/bookcover.jpeg"
        },
        {
          title: "神達に拾われた男",
          cover: "/_nuxt/assets/bookcover.jpeg"
        }
      ],
      size: null
    };
  }
};
</script>

<style>
.home-page {
  margin-left: 240px;
  margin-top: 50px;
  padding: 10px 50px;
}
.main-books-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}

.card-title {
  font-weight: 400;
  margin: 0;
  margin-top: 10px;
}
body {
  background: #eeeeee;
}
</style>
