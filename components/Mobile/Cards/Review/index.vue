<template>
  <div class="mobile-review">
    <Moment v-if="type === 'moment'" :review="review" :user="user"></Moment>
    <Default :book="book" :limit="limit" v-if="type === 'default'" :review="review"></Default>
    <Preview :book="book" :limit="limit" v-if="type === 'preview'" :review="review"></Preview>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "default" },
    review: { type: Object },
    user: { type: Object },
    limit: { type: Number, default: 300 },
    book: { type: Object }
  },
  components: {
    Moment: () => import("./Moment"),
    Default: () => import("./Default"),
    Preview: () => import("./Preview")
  }
};
</script>

<style lang="scss">
</style>
