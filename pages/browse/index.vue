<template>
  <div class="browse-page">
    <div class="browse-page__header flex flex--align">
      <blob class="header-blob"></blob>
      <header>作品を探す</header>
      <div class="browse-page__sorting-list"></div>
    </div>
    <div class="browse-page__content"></div>
  </div>
</template>

<script>
import Blob from "@/assets/svg/blob2.svg";
export default {
  auth: false,
  components: {
    Blob
  }
};
</script>

<style lang="scss">
.browse-page {
  position: relative;
  &__header {
    height: 100px;
  }
  header {
    font-size: 20px;
  }
  .header-blob {
    position: absolute;
    z-index: -1;
    left: -5px;
    opacity: 0.5;
  }
}
</style>
