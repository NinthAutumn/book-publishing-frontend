<template>
  <div class="banner-list">
    <div v-swiper:mySwiper="!$device.isMobile?swiperOption:mobileOption">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(image,index) in (!$device.isMobile? images: mimages)"
          :key="index"
        >
          <nuxt-link tag="div" class="banner-list__container" :to="image.link">
            <v-img
              class="banner-list__image"
              :max-height="250"
              :max-width="437.5"
              :src="image.cover"
            ></v-img>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner-list",
  serverCacheKey: () => true,
  data() {
    return {
      paginationSize: 10,
      images: [
        { cover: require(`../../assets/banner5.png?size=500`), link: "/" },
        { cover: require(`../../assets/banner2.png?size=500`), link: "/" },
        {
          cover: require(`../../assets/banner3.png?size=500`),
          link: "/rankings"
        },
        { cover: require(`../../assets/banner1.png?size=500`), link: "/" }
      ],
      mimages: [
        { cover: require(`../../assets/banner5.png?size=325`), link: "/" },
        { cover: require(`../../assets/banner2.png?size=325`), link: "/" },
        {
          cover: require(`../../assets/banner3.png?size=325`),
          link: "/rankings"
        },
        { cover: require(`../../assets/banner1.png?size=325`), link: "/" }
      ],
      mobileOption: {
        slidesPerView: 1.005,
        spaceBetween: 15,
        freeMode: false,
        // mousewheel: {
        //   invert: true,
        //   sensitivity: 1,
        //   forceToAxis: true
        // },
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
.banner-list {
  $self: &;
  width: 100%;
  .swiper-container {
    // border-radius: 2rem;
  }
  &__image {
    // box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    //   0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    border-radius: 2rem;
    // margin: 1rem;
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
    width: 437.5px;
  }
  .mobile {
    border-radius: 10px;
  }
  img {
    width: 100%;
  }
}
</style>
