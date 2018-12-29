<template>
  <div class="home-page" :class="$store.state.menuState">
    <div class="head-banner">
      <img src="http://placehold.jp/1090x240.png" style="width:100%;">
    </div>
    <div class="main-books">
      <div class="card-title">
        <h3>Recommended</h3>
      </div>
      <BooksList :books="books"></BooksList>
    </div>
  </div>
</template>

<script>
import BooksList from "../components/BooksList";
export default {
  components: {
    BooksList
  },
  // data() {
  //   return {
  //     books: [
  //       {
  //         title: "神達に拾われた男",
  //         cover: require("~/assets/bookcover.png"),
  //         rating: 5
  //       },
  //       {
  //         title: "この素晴らしい世界に祝福を!",
  //         cover: require("~/assets/book1.jpeg"),
  //         rating: 4.3
  //       },
  //       {
  //         title:
  //           "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
  //         cover: require("~/assets/book2.jpeg"),
  //         rating: 2.5
  //       },
  //       {
  //         title: "神達に拾われた男",
  //         cover: require("~/assets/bookcover.png"),
  //         rating: 3.4
  //       },
  //       {
  //         title: "神達に拾われた男",
  //         cover: require("~/assets/book1.jpeg"),
  //         rating: 1.2
  //       },
  //       {
  //         title: "神達に拾われた男",
  //         cover: require("~/assets/book2.jpeg"),
  //         rating: 4.5
  //       },
  //       {
  //         title: "この素晴らしい世界に祝福を!",
  //         cover: require("~/assets/book1.jpeg")
  //       },
  //       {
  //         title:
  //           "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
  //         cover: require("~/assets/book2.jpeg")
  //       },
  //       {
  //         title: "この素晴らしい世界に祝福を!",
  //         cover: require("~/assets/book1.jpeg")
  //       },
  //       {
  //         title:
  //           "(´・ω・`)最強勇者はお払い箱→魔王になったらずっと俺の無双ターン",
  //         cover: require("~/assets/book2.jpeg")
  //       }
  //     ],
  //     size: null
  //   };
  // },
  methods: {},
  asyncData({ $axios }) {
    return $axios.$get("http://0.0.0.0:5000/books/all").then(res => {
      return {
        books: res.books,
        size: null
      };
    });

    // return axios.get(`https://my-api/posts/${params.id}`).then(res => {
    //   return { title: res.data.title };
    // });
  },
  created() {},
  auth: false
};
</script>

<style scoped>
.menu-active {
  margin-left: 24rem;
  margin-top: 5rem;
  padding: 1rem 5rem;
  transition: 300ms;
}
.menu-inactive {
  padding: 6rem 3rem;
  transition: 300ms;
}
.home-page {
  /* position: relative; */
  /* display: grid; */
  /* grid-template-columns:  */
}
.main-books-list {
  display: flex;
  align-items: center;
  overflow: hidden;
  /* justify-content: space-between; */
  padding: 0.5rem 0;
  animation: appearGradually 300ms ease-out;
  animation-fill-mode: backwards;
}

.main-books {
}

.card-title {
  margin-top: 1rem;
  /* padding: 5px 0; */
  /* text-align: center; */
  /* background: #557fe980; */
  width: 15rem;
  border-radius: 0.5rem;
  font-weight: 300;
  /* -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75); */
}
h3 {
  font-family: "Open Sans", sans-serif;

  font-size: 2rem;
  /* color: white; */
  margin: 0;
  /* margin-top: 10px; */
  font-weight: 500;
}
body {
  background: white;
}

.head-banner {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
