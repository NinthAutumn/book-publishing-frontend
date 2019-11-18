<template>
  <div class="swiper-select">
    <div class="swiper-select__container">
      <div class="swiper-select__options">
        <div
          class="swiper-select__option"
          :class="{'swiper-select__option--selected':option.value===selected}"
          v-for="(option) in options"
          :key="option.value"
          @click.stop="$emit('selectedOption',option)"
          v-ripple
        >{{option.key}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: [Array, Object],
      required: true
    },
    slidesPerView: {
      type: Number
    },
    selected: {
      type: [String, Number]
    }
  },
  mounted() {
    this.swiperOption.slidesPerView = this.slidesPerView;
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 20,
        slidesPerView: "auto",
        freeMode: false,
        mousewheel: {
          invert: true,
          sensitivity: 1,
          forceToAxis: true
        },
        on: {},
        breakpoints: {}
      }
    };
  }
};
</script>

<style lang="scss">
.swiper-select {
  $self: &;
  &__container {
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
      0 1px 1px 0 rgba(0, 0, 0, 0.07);
    padding: 1rem 2rem;
    border-radius: 10rem;
    #{$self}__options {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      #{$self}__option {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        padding: 0.25rem 2rem;
        border-radius: 10rem;
        box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1),
          0 1px 1px 0 rgba(0, 0, 0, 0.07);
        width: 100%;
        margin-right: 1rem;
        &--selected {
          color: white;
          background-color: black;
        }
        &:hover {
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
</style>

