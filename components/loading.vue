<template>
  <div class="loading-component">
    <div class="loading-spinner">
      <BallScaleRippleMultipleLoader v-if="loading" color="#8860d0" size="30px"></BallScaleRippleMultipleLoader>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
.loading-component {
  width: 100%;
  height: 100%;
  // position: relative;
  // background-color: black;
  // background-image: url("https://i.redd.it/8ijp26bcwqd21.jpg");
  z-index: 1000;
  .loading-spinner {
    position: fixed;
    width: 50px;
    height: 50px;
    top: 60px;
    right: 10px;
    z-index: 10000;
  }
}
</style>
