<template>
  <div class="earning-page">
    <header class="earning-page__header">収入</header>
    <Total class="earning-page__graph"></Total>
    <Earning></Earning>
    <!-- <transaction-graph class="earning-page__graph"></transaction-graph>
    <transaction-pie class="earning-page__pie"></transaction-pie>-->
    <transaction-list class="earning-page__list"></transaction-list>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {},
  components: {
    Total: () => import("@/components/Dashboard/Earning/Total"),
    Earning: () => import("@/components/Dashboard/Earning/Earning"),
    TransactionList: () =>
      import("@/components/Dashboard/Earning/TransactionList")
  }
};
</script>

<style lang="scss">
.earning-page {
  /* autoprefixer: ignore next */
  display: grid;
  /* autoprefixer: ignore next */
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "header header" "graph pie" "list list ";
  /* autoprefixer: ignore next */
  grid-gap: 1.5rem;
  /* autoprefixer: ignore next */
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
    margin-bottom: 1rem;
  }
}
</style>
