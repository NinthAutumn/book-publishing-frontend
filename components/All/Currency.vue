<template>
  <div class="currency flex flex--align" :class="{'currency--large':size === 'large'}">
    <div class="currency__number" :class="{'currency__number--large':size === 'large'}">{{amount}}</div>
    <div class="currency__type" :class="{'currency__type--large':size === 'large'}">
      <div
        class="currency__icon currency__icon--back"
        :class="{'currency__icon--large':size === 'large'}"
      ></div>
      <Crown class="currency__icon" :class="{'currency__icon--large':size === 'large'}"></Crown>
    </div>
  </div>
</template>

<script>
import Crown from "@/assets/svg/crown.svg";
export default {
  props: {
    size: String,
    amount: Number
  },
  components: {
    Crown
  }
};
</script>

<style lang="scss">
.currency {
  height: 100%;
  &--large {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
    width: 100px;
  }
  &__number {
    // font-family: Kameron;
    font-size: 16px;
    // font-weight: bold;
    &--large {
      // margin-left: 5px;
      font-size: 25px;
    }
  }
  &__type {
    height: 25px;
    width: 25px;
    &--large {
      width: 45px;
      height: 45px;
      margin: 0;
      margin-bottom: 10px;
    }
    position: relative;
    margin-left: 5px;
  }
  // perspective: 400px;
  // perspective-origin: 100% 100%;
  // perspective-origin-y: 100%;
  // perspective-origin-x: 10%;

  &__icon {
    position: absolute;
    fill: $secondary;
    font-weight: bold;
    width: 22px;
    height: 22px;
    // margin-left: 15px;
    box-shadow: 1px 1px 5px $secondary;
    border-radius: 10000px;
    transition: 300ms;
    // left: 24px;
    // transform: rotate3d(0, 1, 0, 40deg);
    z-index: 1;
    top: 1px;
    &--large {
      width: 45px;
      height: 45px;
    }
    &--back {
      // top: 1px;
      // // transform: rotate3d(0, 1, 0, 40deg);
      // left: 1px;
      // position: absolute;

      // background-color: $secondary;
      // // box-shadow: 1px 1px 5px grey;
      // border-radius: 1000px;
      // transition: 300ms;
    }

    // box-shadow: inset 1px 1px 5px rgb(253, 225, 225);
    //   1px 1px 5px rgb(255, 241, 241);
    // box-shadow: 1px 1px 5px grey;
    // border-radius: 25000px;
    // background-color: #ffffff;
  }
}
</style>
