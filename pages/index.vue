<template>
  <div class="home-page page-padding" ref="homepage">
    <div class="search-books" v-if="$device.isMobile">
      <search-bar></search-bar>
    </div>

    <nuxt-child></nuxt-child>
    <div class="head-banner">
      <BannerList></BannerList>
    </div>
    <nav-list v-if="$device.isMobile"></nav-list>
    <div class="main-books">
      <div class="flex-divider flex-row">
        <div class="card-title">
          <h3>おすすめ</h3>
          <Recommended></Recommended>
        </div>
        <div class="card-title" v-if="compo">
          <h3>ランキング</h3>
          <Ranking></Ranking>
        </div>
      </div>
      <adsbygoogle v-if="!user.status" />
      <div class="card-title flex flex--align">
        <h3>評価が高いレビュー</h3>
      </div>
      <ReviewList :height="height"></ReviewList>
      <div class="card-title">
        <h3>今日人気の作品</h3>
      </div>
      <BooksList :trendings="trending"></BooksList>
      <div class="card-title">
        <h3>更新された作品</h3>
      </div>
      <BooksList :trendings="latest"></BooksList>
      <mobile-ranking v-if="$device.isMobile"></mobile-ranking>
      <adsbygoogle v-if="!user.status" />
      <div class="card-title">
        <h3>更新頻度が高い</h3>
      </div>
      <BooksList :trendings="frequent"></BooksList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    BooksList: () => import("@/components/Homepage/BooksList"),
    ReviewList: () => import("@/components/Homepage/ReviewList"),
    Ranking: () => import("@/components/Homepage/Ranking"),
    BannerList: () => import("@/components/Homepage/BannerList"),
    SearchBar: () => import("@/components/Navigation/SearchBar"),
    Recommended: () => import("@/components/Homepage/Recommended"),
    MobileRanking: () => import("@/components/Mobile/List/Book/Ranking/Home"),
    NavList: () => import("@/components/Mobile/Layout/Nav")
  },
  async asyncData({ store }) {},
  async fetch({ store }) {
    await store.dispatch("analytic/fetchRecommended");

    await store.dispatch("analytic/fetchVoteRanking", {
      time: "daily",
      page: 1,
      limit: 5
    });
  },
  async mounted() {},
  data() {
    return {
      compo: false,

      width: 0,
      height: 0
    };
  },
  async mounted() {
    await this.$store.dispatch("analytic/fetchHighFrequent");
    await this.$store.dispatch("analytic/fetchLatest");
    await this.$store.dispatch("analytic/fetchTrending", {
      time: "weekly",
      page: 1
    });
    await this.$store.dispatch("analytic/fetchTrendingReviews");
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    // this.compo = this.checkMobile() ? Header : null;
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    checkMobile() {
      return window ? window.innerWidth < 1 : true;
    },
    handleResize() {
      this.width = this.$refs.homepage.clientWidth;
      this.height = this.$refs.homepage.clientWidth;
      this.compo = this.width > 1197;
    }
  },
  computed: {
    ...mapGetters({
      trending: "analytic/getTrendingList",
      latest: "analytic/getLatest",
      recommended: "analytic/getRecommended",
      frequent: "analytic/getFrequent",
      user: "user/loggedInUser"
    })
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
  user-select: none;
  /* position: relative; */
  /* display: grid; */
  /* grid-template-columns:  */
  .search-books {
    width: 100%;
    display: flex;
    .search-form {
      width: 100vw !important;
    }
    .search-bar {
      flex-grow: 1;
      width: 100%;
    }
  }
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
    font-size: 2.5rem;
    margin: 1rem 0;
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
