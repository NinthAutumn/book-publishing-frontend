<template>
  <div class="drawing-item">
    <div class="drawing-item__content" @click="selectImg">
      <!-- {{selected}} -->
      <v-img
        class="drawing-item__img"
        :class="{'drawing-item__img--selected':selectedImg}"
        :src="drawing.url"
      ></v-img>
      <!-- {{selected}} -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    drawing: Object,
    selected: Boolean
  },
  data() {
    return {
      selectedImg: false
    };
  },
  mounted() {
    this.selectedImg = !!this.selected;
  },
  methods: {
    selectImg() {
      this.selectedImg = !this.selectedImg;
      this.$emit("select", this.drawing);
    }
  }
};
</script>

<style lang="scss">
.drawing-item {
  $self: &;
  overflow: auto;
  min-width: 10rem;
  min-height: 10rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
  &__content {
    #{$self}__img {
      box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
        0 1px 1px 0 rgba(0, 0, 0, 0.07);
      &--selected {
        border: 2px solid #556cd6;
      }
    }
    &:hover {
      box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.07);
      cursor: pointer;
    }
    // margin-right: 1rem;
    // margin-bottom: 1rem;
  }
}
</style>
