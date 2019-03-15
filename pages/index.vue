<template>
  <div class="home-page">
    <div class="head-banner">
      <img
        src="http://gonakedselling.com/wp-content/uploads/2014/04/book-web-banner.jpg"
        style="width:100%;"
      >
    </div>
    <div class="main-books">
      <div class="card-title flex flex--align">
        <h3>今日のおすすめ</h3>
      </div>
      <BooksList :books="$store.state.book.books.highestrated"></BooksList>
      <ReviewList></ReviewList>
      <div class="card-title">
        <h3>今人気急上昇中の作品</h3>
      </div>
      <BooksList :trendings="$store.state.book.books.trending"></BooksList>
      <Ranking></Ranking>
    </div>
  </div>
</template>

<script>
import BooksList from "@/components/Homepage/BooksList";
import ReviewList from "@/components/Homepage/ReviewList";
import Ranking from "@/components/Homepage/Ranking";
import BlobOne from "@/assets/svg/blob.svg";
import BlobTwo from "@/assets/svg/blob2.svg";

export default {
  components: {
    BooksList,
    ReviewList,
    Ranking,
    BlobOne,
    BlobTwo
  },
  methods: {},
  async fetch({ store }) {
    await store.dispatch("book/allBooks");
    await store.dispatch("review/mostLiked");
    await store.dispatch("ranking/bookAnalysisHomeRanking", {
      storeType: "bookmark",
      limit: 7
    });
    if (store.state.auth.loggedIn) {
    }
  },
  async created() {},
  auth: false
};
</script>

<style lang="scss" scoped>
/* .menu-active {
  margin-left: 24rem;
  margin-top: 5rem;
  padding: 1rem 5rem;
  transition: 300ms;
}
.menu-inactive {
  padding: 6rem 3rem;
  transition: 300ms;
} */
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

.blob-back {
  position: absolute;
  z-index: -2;
  // transform: rotate(90deg);
  top: -70px;
  left: -40px;
  // fill: red;
  opacity: 0.8;
}

.card-title {
  margin-top: 1rem;
  position: relative;
  /* padding: 5px 0; */
  /* text-align: center; */
  /* background: #557fe980; */
  // width: 15rem;
  // border-radius: 0.5rem;
  font-weight: 300;
  // height: 50px;
  /* -webkit-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  -moz-box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75);
  box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 0.75); */
}
h3 {
  font-family: "Open Sans", sans-serif;

  font-size: 2rem;
  /* color: white; */
  margin: 0;
  // margin-bottom: 10px;
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
