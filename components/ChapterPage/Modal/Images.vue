<template>
  <div class="images-modal">
    <ul class="images-modal__list">
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
