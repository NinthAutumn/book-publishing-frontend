<template>
  <div class="banner-list">
    <div v-swiper:mySwiper="swiperOption" v-if="!$device.isMobile">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image,index) in images" :key="index">
          <v-img class="banner-list__image" :height="228" :width="400" :src="image.cover"></v-img>
        </div>
      </div>
    </div>
    <div v-swiper:mySwiper="mobileOption" v-else>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image,index) in images" :key="index">
          <v-img class="banner-list__image" :max-height="228" :max-width="400" :src="image.cover"></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paginationSize: 10,
      images: [
        { cover: require("../../assets/banner1.png") },
        { cover: require("../../assets/banner1.jpg") },
        { cover: require("../../assets/banner3.jpg") }
      ],
      mobileOption: {
        slidesPerView: 1.1,
        spaceBetween: 15,
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
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 15,
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
      }
    };
  },
  async created() {
    if (this.$device.isMobile) {
      this.paginationSize = 7;
    }
  }
};
</script>

<style lang="scss">
.banner-list {
  $self: &;
  width: 100%;
  .swiper-container {
    border-radius: 2rem;
  }
  &__image {
    border-radius: 2rem;
  }
  .VueCarousel-pagination {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 5px;
  }

  .VueCarousel-dot-container {
    opacity: 0.7;
    button {
      margin-right: 5px;
    }
  }
  .swiper-wrapper {
    position: relative;
  }
  .swiper-slide {
    width: 420px;
  }
  .mobile {
    border-radius: 10px;
  }
  img {
    width: 100%;
  }
}
</style>
