<template>
  <div class="images-modal">
    <ul class="images-modal__list" v-if="modal === 'image'&&drawings">
      <!-- {{chapter.drawings}} -->
      <li class="images-modal__item" v-for="(drawing) in drawings" :key="drawing">
        <v-img class="images-modal__img" :src="drawing.url" @click.stop="openImage(drawing.url)"></v-img>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["drawings"],
  computed: {
    ...mapGetters({
      modal: "chapter/getModalState"
    })
  },
  async mounted() {},
  methods: {
    openImage(url) {
      this.$store.commit("TOGGLE_IMAGE");
      this.$store.commit("SET_IMAGE_URL", url);
    }
  }
};
</script>

<style lang="scss">
.images-modal {
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  overflow: scroll;
  &__dialog {
    height: 100vh !important;
    border: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    z-index: 10000;
    overflow: hidden;
    position: fixed;
    // scroll-behavior: smooth;
    top: 0 !important;

    img {
      max-width: 80vw;
      max-height: 70vh;
      box-shadow: 1px 1px 5px rgb(238, 236, 236);
    }
    &__container {
      position: relative;
      // max-wid
    }
    &__close {
      position: absolute;
      top: -35px;
      right: -30px;

      &__icon {
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
  $self: &;
  &__list {
    #{$self}__img {
      transition: 300ms;
      max-width: 38rem;
      &:hover {
        transform: scale(1.05);
        transition: 300ms;
        cursor: pointer;
      }
    }
  }
  &__img {
    // min-width:;
    // max-width: 380px !important;
  }
}
</style>
