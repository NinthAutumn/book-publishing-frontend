<template>
  <div class="swiping-page" v-cloak>
    <div v-swiper:mySwiper="swiperOption" v-if="!$device.isMobile">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(review,index) in reviews" :key="index">
          <Review :height="height" :review="review"></Review>
        </div>
      </div>
      <div class="background">
        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      </div>
      <div class="background">
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </div>
    </div>
    <div class="mobile-swiper--review" v-swiper:mySwiper="mobileOption" v-else>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(review,index) in reviews" :key="index">
          <Review mobile :review="review"></Review>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Review from "./Review";
export default {
  props: ["height"],
  created() {},
  computed: {
    reviews() {
      return this.$store.getters["analytic/getTrendingReviews"];
    }
  },
  data() {
    return {
      // slidesNumber: 2,
      mobileOption: {
        // loop: true,
        slidesPerView: 1,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        navigation: {},
        on: {},
        breakpoints: {}
      },
      swiperOption: {
        // loop: true,
        autoHeight: true,
        slidesPerView: 2,
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
  components: {
    Review: () => import("./Review")
  },
  methods: {},
  created() {}
};
</script>
<style lang="scss">
.swiper-wrapper {
  // z-index: -10;
}
.main-books {
  width: 100%;
  // display: flex;
  // justify-content: space-around;
  // align-content: center;
}
.mobile-swiper--review {
}

.my-swiper {
  height: 100%;
}
.my-swiper {
  // height: 110%;/

  // width: 80% !important;
  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: rgb(238, 238, 238);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}
.swiper-button-next,
.swiper-button-prev {
  // position: relative;
  height: 100%;
  top: 21px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.658);

  // filter: blur(1px);
  // -webkit-box-shadow: 0px 0px 54px 0px rgba(219, 219, 219, 1);
  // -moz-box-shadow: 0px 0px 54px 0px rgba(219, 219, 219, 1);
  // box-shadow: 0px 0px 54px 0px rgba(219, 219, 219, 1);
}

.swiper-button-disabled {
  // display: none;
  // background-image: "";
  opacity: 0 !important;
  transition: 500ms;
}
.swiper-button-prev {
  left: 0;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%238860D0'%2F%3E%3C%2Fsvg%3E") !important;
  transition: 500ms;
}
.swiper-button-next {
  right: 0;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%238860D0'%2F%3E%3C%2Fsvg%3E") !important;
  transition: 500ms;
}

.swiping-page {
  // margin-left: 24rem;
  // margin-top: 5rem;
  // padding: 1rem 5rem;
  position: relative;
}
</style>
