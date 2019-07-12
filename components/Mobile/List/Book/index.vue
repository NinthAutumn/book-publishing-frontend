<template>
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(book) in books" :key="book.id">
        <book-card :cover="book.cover" :book="book" :isMobile="$device.isMobile"></book-card>
      </div>
    </div>
    <div class="background" v-if="!$device.isMobile">
      <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
    </div>
    <div class="background" v-if="!$device.isMobile">
      <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    books: [Array, Object],
    slides: { type: [Number, String], default: 3 }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: this.slides,
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
  },
  components: {
    BookCard: () => import("@/components/Web/Cards/Book")
  }
};
</script>

<style lang="scss">
</style>
