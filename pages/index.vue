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
          cover: require("~/assets/bookcover.png")
        },
        {
          title: "この素晴らしい世界に祝福を!",
          cover: require("~/assets/book1.jpeg")
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/book2.jpeg")
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/bookcover.png")
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/book1.jpeg")
        },
        {
          title: "神達に拾われた男",
          cover: require("~/assets/book2.jpeg")
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
  animation: appearGradually 300ms ease-out;
  animation-fill-mode: backwards;
}

.card-title {
  font-weight: 400;
  margin: 0;
  margin-top: 10px;
}
body {
  background: #eeeeee;
}

@keyframes appearGradually {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
