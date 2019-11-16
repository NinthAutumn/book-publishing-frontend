<template>
  <div class="pills-list">
    <div class="pills-list__container">
      <ul class="pills-list__list">
        <li class="pills-list__item" v-for="(pill,index) in pill" :key="index">{{pill}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pills: {
      type: [Object, Array],
      required: true
    }
  }
};
</script>

<style lang="scss">
</style>
