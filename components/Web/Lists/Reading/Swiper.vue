<template>
  <div class="swiper-reading">
    <div v-swiper:mySwiper="!$device.isMobile?swiperOption:mobileOpion">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="list in reading" :key="list.id">
          <reading-card v-if="!$device.isMobile" :reading="list"></reading-card>
          <mobile-reading v-else :reading="list"></mobile-reading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "swiper-reading",
  props: ["reading"],
  components: {
    ReadingCard: () => import("@/components/Web/Cards/ReadingList"),
    MobileReading: () => import("@/components/Mobile/Cards/Reading")
  },
  serverCacheKey: () => true,
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 5,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {},
        breakpoints: {}
      },
      mobileOpion: {
        slidesPerView: 1.05,
        spaceBetween: 10,
        freeMode: false,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {},
        breakpoints: {}
      }
    };
  },
  methods: {
    nav: function(image) {
      this.$router.push(image.link);
    }
  },
  async created() {
    if (this.$device.isMobile) {
      this.paginationSize = 7;
    }
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 500px) {
  .swiper-reading {
    $self: &;
    .swiper-wrapper {
      padding-left: 0.5rem !important;
    }
    .swiper-slide {
      width: 19rem !important;
      height: 32rem;
    }
    &__container {
    }
  }
}
</style>
