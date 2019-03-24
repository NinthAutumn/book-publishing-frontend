<template>
  <div class="banner-list">
    <no-ssr>
      <carousel
        :paginationSize="paginationSize"
        paginationActiveColor="#f3a5a5"
        :paginationPadding="0"
        :perPage="1"
      >
        <slide v-for="(img, index) in images" :key="index">
          <img :src="img" alt :class="{mobile:$device.isMobile}">
        </slide>
      </carousel>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paginationSize: 10,
      images: [
        "https://cdn.pixabay.com/photo/2015/10/29/14/32/business-1012449_1280.jpg",
        "https://placeit-assets.s3-accelerate.amazonaws.com/landing-pages/make-a-twitch-banner2/Twitch-Banner-Blue-1024x324.png"
      ]
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
    width: 100% !important;
  }
  .mobile {
    border-radius: 10px;
  }
  img {
    width: 100%;
  }
}
</style>
