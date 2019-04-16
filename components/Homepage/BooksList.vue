<template>
  <div class="swiping-page" :class="{'swiping-page--mobile': $device.isMobile}">
    <div v-if="trendings&&!$device.isMobile" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(book,index) in trendings" :key="book.id">
          <Book :index="index" :book="book.book[0]" :size="size = 'big'"></Book>
        </div>
      </div>
      <div class="background" v-if="!$device.isMobile">
        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      </div>
      <div class="background" v-if="!$device.isMobile">
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </div>
    </div>
    <div v-if="trendings&&$device.isMobile" v-swiper:mySwiper="swiperMobile">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(book,index) in trendings" :key="book.id">
          <Book :index="index" :book="book.book[0]" :size="size = 'big'"></Book>
        </div>
      </div>
    </div>
    <div v-if="!trendings&&!$device.isMobile" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(book,index) in books" :key="book.id">
          <Book :index="index" :book="book" :size="size = 'big'"></Book>
        </div>
      </div>
      <div class="background" v-if="!$device.isMobile">
        <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
      </div>
      <div class="background" v-if="!$device.isMobile">
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </div>
    </div>
    <div v-if="!trendings&&$device.isMobile" v-swiper:mySwiper="swiperMobile">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(book,index) in books" :key="book.id">
          <Book :index="index" :book="book" :size="size = 'big'"></Book>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    books: Array,
    trendings: Array
  },
  data() {
    return {
      // slidesNumber: 7,
      swiperMobile: {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
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
  components: {
    Book: () => import("./Book")
  },
  methods: {}
};
</script>
<style lang="scss">
.swiping-page--mobile {
  .swiper-slide {
    min-width: 10rem !important;
    max-width: 15rem !important;
  }
  #book-card {
    min-width: 10rem !important;
    max-width: 15rem !important;
  }
  .book-title {
    a {
      font-size: 12px;
      font-weight: bold;
    }
  }

  .book-cover {
    border-radius: 3px;
  }
  .book-homepage {
    // min-width: 30rem !important;
    // max-width: 32rem !important;
    // min-height: 20rem !important;
    // max-height: 22rem !important;
  }
  .book-img {
    border-radius: 3px;
    // min-width: 10rem !important;
    // max-width: 12rem !important;
    // min-height: 15rem !important;
    // max-height: 18rem !important;
    // width: 10rem !important;
    // height: 15rem !important;
  }
}
.swiper-wrapper {
  // z-index: -10;
}
.swiper-slide {
  width: 14rem;
}
.main-books {
  width: 100%;
}
.my-swiper {
  height: 300px;
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
  background-color: rgba(255, 255, 255, 0.945);

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
