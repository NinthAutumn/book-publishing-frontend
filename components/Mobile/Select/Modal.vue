<template>
  <div class="select-modal">
    <ul class="select-modal__list">
      <li class="select-modal__item"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    selected: [String, Object],
    list: [Object, Array]
  }
};
</script>

<style lang="scss" scoped>
</style>
