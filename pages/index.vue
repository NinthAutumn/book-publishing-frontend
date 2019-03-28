<template>
  <div class="home-page">
    <div class="head-banner">
      <BannerList></BannerList>
    </div>
    <div class="main-books">
      <div class="card-title flex flex--align">
        <h3>おすすめ作品</h3>
      </div>
      <BooksList :books="$store.getters['book/getRecommended']"></BooksList>
      <div class="card-title flex flex--align">
        <h3>評価が高いレビュー</h3>
      </div>
      <ReviewList></ReviewList>
      <div class="card-title">
        <h3>今週人気の作品</h3>
      </div>
      <BooksList :trendings="trending"></BooksList>
      <!-- <Ranking></Ranking> -->
    </div>
  </div>
</template>

<script>
import BooksList from "@/components/Homepage/BooksList";
import ReviewList from "@/components/Homepage/ReviewList";
import Ranking from "@/components/Homepage/Ranking";
import BlobOne from "@/assets/svg/blob.svg";
import BlobTwo from "@/assets/svg/blob2.svg";
import BannerList from "@/components/Homepage/BannerList";

export default {
  components: {
    BooksList,
    ReviewList,
    Ranking,
    BlobOne,
    BlobTwo,
    BannerList
  },
  methods: {},

  async fetch({ store }) {
    await store.dispatch("book/fetchRecommended");
    await store.dispatch("review/mostLiked");
    await store.dispatch("ranking/fetchTrending", {
      days: 7,
      limit: 10,
      page: 1
    });
    if (store.state.auth.loggedIn) {
      await store.dispatch("library/fetchLatestChapters");
    }
  },
  async created() {},
  async mounted() {
    if (this.$store.state.auth.loggedIn) {
    }
  },
  computed: {
    trending() {
      return this.$store.getters["ranking/getTrendingList"];
    }
  },
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

  font-weight: 300;
  h3 {
    font-size: 1.8rem;
    margin: 0;
    font-weight: 500;
  }
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
