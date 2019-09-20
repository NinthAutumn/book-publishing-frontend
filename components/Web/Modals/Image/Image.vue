<template>
  <div class="image-item">
    <div class="image-item__container" @click="$emit('selected',drawing)">
      <v-img :src="drawing.url"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drawing: Object
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
</style>
