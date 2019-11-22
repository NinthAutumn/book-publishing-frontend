<template>
  <div class="image-item">
    <div class="image-item__container" @click="$emit('selected',drawing)">
      <!-- <img :src="drawing.url" /> -->
      <v-img eager min-width="5rem" max-width="100%" height="100%" :src="drawing.url"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drawing: Object
  },
  data() {
    return {
      avatar: require("~/assets/img/profile.png")
    };
  }
};
</script>

<style lang="scss">
.image-item {
  max-width: 100%;
  &__container {
    max-width: 100%;
    img {
      max-width: 100%;
    }
  }
}
</style>
