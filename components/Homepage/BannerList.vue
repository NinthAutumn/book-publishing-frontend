<template>
  <div class="banner-list">
    <no-ssr>
      <!-- <img :src="img" alt :class="{mobile:$device.isMobile}"> -->
    </no-ssr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paginationSize: 10,
      images: ["../../assets/banner.jpg"]
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
