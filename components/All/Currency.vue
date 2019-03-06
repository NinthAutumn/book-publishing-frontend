<template>
  <div class="currency flex flex--align">
    <div class="currency__number">{{amount}}</div>
    <Crown class="currency__icon"></Crown>
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
    color: $primary;
    // font-weight: bold;
  }
  &__icon {
    fill: $primary;
    font-weight: bold;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    // box-shadow: inset 1px 1px 5px rgb(253, 225, 225),
    //   1px 1px 5px rgb(255, 241, 241);
    // box-shadow: 1px 1px 5px grey;
    border-radius: 100px;
    background-color: #f4648a6b;
  }
}
</style>
