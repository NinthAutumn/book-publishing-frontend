<template>
  <div class="images-dialog flex flex--align flex--center">
    <div class="images-dialog__container" v-click-outside="closeImageDialog">
      <div class="images-dialog__close">
        <fa class="images-dialog__icon" icon="times" @click="closeImageDialog"></fa>
      </div>
      <div class="images-dialog__content flex flex--align flex--center">
        <img :src="$store.state.imageUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    closeImageDialog() {
      this.$store.commit("TOGGLE_IMAGE");
    }
  }
};
</script>

<style lang="scss">
.images-dialog {
  height: 100vh !important;
  border: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  z-index: 10000;
  overflow: hidden;
  position: fixed;
  // scroll-behavior: smooth;
  top: 0 !important;
  $self: &;
  img {
    max-width: 80vw;
    max-height: 70vh;
    // box-shadow: 1px 1px 5px rgb(238, 236, 236);
  }
  &__container {
    position: relative;
    // max-wid
  }
  &__close {
    position: absolute;
    top: -35px;
    right: -30px;

    #{$self}__icon {
      color: rgb(226, 226, 226);
      font-size: 30px;
      transition: 300ms;
      &:hover {
        cursor: pointer;
        transition: 300ms;
        color: white;
      }
    }
  }
}
</style>
