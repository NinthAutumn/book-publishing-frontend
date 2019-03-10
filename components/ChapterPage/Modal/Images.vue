<template>
  <div class="images-modal">
    <ul class="images-modal__list" v-if="modal === 'image'">
      <li
        class="images-modal__item"
        v-for="(drawing, index) in chapters.extra.drawings"
        :key="index"
      >
        <img
          class="images-modal__img"
          :src="`https://storage.googleapis.com/theta-images/${drawing}`"
          alt
          @click="openImage(`https://storage.googleapis.com/theta-images/${drawing}`)"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    chapters() {
      return this.$store.state.chapter.chapter;
    },
    modal() {
      return this.$store.state.chapter.modal;
    }
  },
  methods: {
    openImage(url) {
      this.$store.commit("neutral/IMAGE_OPEN");
      this.$store.commit("neutral/SET_IMAGE", url);
    }
  }
};
</script>

<style lang="scss">
.images-modal {
  top: 50px;
  position: sticky;
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  &__dialog {
    height: 100vh !important;
    border: 0;
    background-color: rgba(0, 0, 0, 0.185);
    width: 100%;
    z-index: 10000;
    overflow: hidden;
    position: fixed;
    // scroll-behavior: smooth;
    top: 0 !important;
    img {
      max-width: 800px;
      box-shadow: 1px 1px 5px rgb(236, 236, 236);
    }
    &__container {
      position: relative;
    }
    &__close {
      position: absolute;
      top: 1px;
      right: 5px;

      &__icon {
        color: grey;
        font-size: 20px;
        transition: 300ms;
        &:hover {
          cursor: pointer;
          transform: scale(1.1) rotate(180deg);
          transition: 300ms;
        }
      }
    }
  }
  &__img {
    max-width: 380px !important;
    transition: 300ms;
    &:hover {
      transform: scale(1.05);
      transition: 300ms;
    }
  }
}
</style>
