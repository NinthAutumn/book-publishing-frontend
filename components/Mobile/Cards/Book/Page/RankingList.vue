<template>
  <div class="pmb-ranking">
    <div class="pmb-ranking__container">
      <div class="pmb-ranking__list">
        <div v-swiper:mySwiper="swiperMobile">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ranking-card></ranking-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    RankingCard: () => import("./Ranking")
  },
  data() {
    return {
      swiperMobile: {
        slidesPerView: 1.1,
        spaceBetween: 5,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        on: {},
        breakpoints: {}
      }
    };
  }
};
</script>

<style lang="scss">
</style>
