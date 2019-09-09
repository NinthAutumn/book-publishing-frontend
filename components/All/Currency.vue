<template>
  <div class="currency flex-row flex--align" :class="{'currency--large':size === 'large'}">
    <div
      class="currency__type flex--align flex-row flex--center"
      :class="{'currency__type--large':size === 'large','currency__icon--small':small}"
    >
      <svg-icon
        name="crown"
        class="currency__icon"
        :style="{fill: color,width,height:width,marginRight}"
        :class="{'currency__icon--large':size === 'large','currency__icon--small':small}"
      ></svg-icon>
    </div>
    <div
      class="currency__number"
      :style="{fontSize}"
      :class="{'currency__number--large':size === 'large','currency__number--small':small}"
    >{{amount}}</div>
  </div>
</template>

<script>
export default {
  props: {
    size: String,
    amount: [String, Number],
    color: String,
    small: Boolean,
    fontSize: String,
    width: String,
    height: String,
    marginRight: String
  },
  components: {}
};
</script>

<style lang="scss">
.currency {
  height: 100%;
  margin-right: 0.5rem;
  &--large {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__number {
    // font-family: Kameron;
    font-size: 16px;
    // font-weight: bold;
    &--large {
      // margin-left: 5px;
      font-size: 25px;
    }
    &--small {
      font-size: 1.2rem;
      color: #b0b2b3;
    }
  }
  &__type {
    // height: 25px;
    // width: 25px;
    transform-style: preserve-3d;
    transform: perspective(500px);
    &--large {
      width: 45px;
      height: 45px;
      margin: 0;
      margin-bottom: 10px;
    }
    &--small {
      width: 1rem;
      height: 1rem !important;
    }
    margin-right: 0.4rem;
  }
  // perspective: 400px;
  // perspective-origin: 100% 100%;
  // perspective-origin-y: 100%;
  // perspective-origin-x: 10%;

  &__icon {
    transform-style: preserve-3d;
    position: relative;
    fill: $secondary;
    font-weight: bold;
    width: 22px;
    height: 22px;
    // margin-left: 15px;
    box-shadow: 1px 1px 3px $secondary;
    border-radius: 10000px;
    transition: 300ms;
    // left: 24px;
    // transform: rotate3d(0, 1, 0, 40deg);
    z-index: 1;
    &--large {
      width: 45px;
      height: 45px;
    }
    &--small {
      width: 1.2rem;
      height: 1.2rem;
    }

    &:hover {
      transform: scale(1.1) translateY(-2px);
      transition: 300ms;
    }
  }
}
</style>
