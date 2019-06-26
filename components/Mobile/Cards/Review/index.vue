<template>
  <div class="mobile-review">
    <Moment v-if="type === 'moment'" :review="review" :user="user"></Moment>
    <Default v-if="type === 'default'" :review="review"></Default>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "default" },
    review: { type: Object },
    user: { type: Object }
  },
  components: {
    Moment: () => import("./Moment"),
    Default: () => import("./Default")
  }
};
</script>

<style lang="scss">
</style>
