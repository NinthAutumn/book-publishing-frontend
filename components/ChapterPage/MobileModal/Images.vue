<template>
  <div class="mobile-image">
    <div class="mobile-image__header">
      <div class="mobile-image__back" v-ripple>
        <fa icon="arrow-left" @click="toggleModal"></fa>
      </div>
      <div class="mobile-image__title">作者投稿 描画像</div>
    </div>
    <div class="mobile-image__list">
      <div class="mobile-image__item" v-for="(drawing,index) in drawings" :key="index">
        <v-img class="mobile-image__img" :src="drawing"></v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: String,
    drawings: Array
  },
  methods: {
    toggleModal() {
      this.$emit("toggle", 3);
    }
  }
};
</script>

<style lang="scss">
.mobile-image {
  $self: &;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: fixed;
  z-index: 100;
  // position
  top: 0;
  right: 0;
  background-color: #fff;
  // overflow: auto;
  &__header {
    height: 5rem;
    background-color: black;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    #{$self}__back {
      font-size: 2.5rem;
      margin-right: 3rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #{$self}__title {
      font-size: 1.6rem;
    }
  }
  &__list {
    padding: 1rem;
    max-height: 93vh;
    max-width: 100%;
    overflow: auto;
    #{$self}__item {
      #{$self}__img {
        max-width: 100%;
      }
    }
  }
}
</style>
