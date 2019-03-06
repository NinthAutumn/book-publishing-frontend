<template>
  <div class="currency flex flex--align">
    <div class="currency__number">{{amount}}</div>
    <div class="currency__type">
      <div class="currency__icon--back"></div>
      <Crown class="currency__icon"></Crown>
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
  &__number {
    // font-family: Kameron;
    font-size: 16px;
    color: black;
    // font-weight: bold;
  }
  &__type {
    height: 23px;
    width: 23px;
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

    transition: 300ms;
    // left: 24px;
    // transform: rotate3d(0, 1, 0, 40deg);
    z-index: 1;
    top: 1px;
    &--back {
      top: 1px;
      // transform: rotate3d(0, 1, 0, 40deg);
      left: 1px;
      position: absolute;
      height: 22px;
      width: 22px;
      background-color: $secondary;
      // box-shadow: 1px 1px 5px grey;
      border-radius: 1000px;
      transition: 300ms;
    }

    // box-shadow: inset 1px 1px 5px rgb(253, 225, 225);
    //   1px 1px 5px rgb(255, 241, 241);
    // box-shadow: 1px 1px 5px grey;
    // border-radius: 25000px;
    // background-color: #ffffff;
  }
}
</style>
