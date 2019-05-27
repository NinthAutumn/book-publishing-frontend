<template>
  <div class="dialog dialog__container sub-modal__wrapper">
    <div class="dialog__content sub-modal__container"></div>
  </div>
</template>

<script>
export default {
  components: {
    SubList: () => import("./SubList"),
    SubPaymentList: () => import("./SubPaymentList"),
    SubPaymentMethod: () => import("./SubPaymentMethod")
  }
};
</script>

<style lang="scss">
</style>
