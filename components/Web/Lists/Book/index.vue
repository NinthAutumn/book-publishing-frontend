<template>
  <div class="swiper-books" :class="{'swiper-books--mobile':$device.isMobile}">
    <div class="swiper-books__skeleton" v-if="loading">
      <book-skeleton v-for="(book) in slides" :key="book"></book-skeleton>
    </div>
    <div v-swiper:mySwiper="$device.isMobile? swiperMobile:swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(book) in books" :key="book.id">
          <book-card rating :cover="book.cover" :book="book" :isMobile="$device.isMobile"></book-card>
        </div>
      </div>
      <div class="background" v-if="!$device.isMobile">
        <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { hydrateWhenVisible } from "vue-lazy-hydration";
export default {
  props: ["books"],
  components: {
    BookCard: hydrateWhenVisible(() => import("@/components/Web/Cards/Book")),
    BookSkeleton: () => import("@/components/Web/Cards/Skeleton/Book")
  },
  created() {
    this.slides = this.$device.isMobile ? 4 : 7;
  },
  mounted() {
    this.loading = false;
  },
  data() {
    return {
      swiperMobile: {
        slidesPerView: 3.5,
        spaceBetween: 5,
        freeMode: false,
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
        freeMode: false,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        navigation: {
          nextEl: ".swiper-button-next"
        },
        on: {},
        breakpoints: {}
      },
      loading: true,
      slides: 7
    };
  }
};
</script>

<style lang="scss">
.swiper-slide {
  width: 14rem;
}

.main-books {
  width: 100%;
}
.my-swiper {
  height: 300px;
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
  height: 100%;
  top: 21px;
  width: 50px;
  background-color: rgba(255, 255, 255, 0.945);
}

.swiper-button-disabled {
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
  position: relative;
}
.swiper-books {
  &__skeleton {
    display: flex;
  }
}
.swiping-books--mobile {
  .swiper-slide {
    min-width: 5rem !important;
    max-width: 15rem !important;
  }
  #book-card {
    min-width: 5rem !important;
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

  .book-img {
    border-radius: 3px;
  }
}
</style>
