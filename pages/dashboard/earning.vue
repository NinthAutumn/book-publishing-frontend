<template>
  <div class="earning-page">
    <header class="earning-page__header">収入</header>
    <!-- <transaction-graph class="earning-page__graph"></transaction-graph>
    <transaction-pie class="earning-page__pie"></transaction-pie>
    <transaction-list class="earning-page__list"></transaction-list>-->
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {},
  components: {}
};
</script>

<style lang="scss">
.earning-page {
  display: grid;
  grid-template-areas: "header header" "graph pie" "list list ";
  grid-gap: 1.5rem;
  &__header {
    font-size: 3rem;
    grid-area: header;
  }
  &__graph {
    grid-area: graph;
  }
  &__pie {
    grid-area: pie;
  }
  &__list {
    grid-area: list;
  }
}
</style>
