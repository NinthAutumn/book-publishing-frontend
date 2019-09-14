<template>
  <div class="home-rankings">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper home-rankings_container">
        <home-ranking
          class="swiper-slide"
          :title="ranking.title"
          :books="ranking.list"
          v-for="ranking in rankings"
          :key="ranking.title"
        ></home-ranking>
      </div>
    </div>
    <div class="home-rankings__list"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      rankings: "ranking/getRankingsList"
    })
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 0,
        freeMode: false,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        on: {},
        breakpoints: {}
      }
    };
  },
  components: {
    HomeRanking: () => import("@/components/Mobile/Cards/Book/HomeRanking")
  },
  async mounted() {
    await this.$store.dispatch("ranking/fetchHomeRankingList");
  }
};
</script>

<style lang="scss">
</style>
