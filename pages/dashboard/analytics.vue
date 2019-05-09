<template>
  <div class="analytic-page">
    <header class="analytic-page__header">アナリティクス</header>
    <div class="flex-divider flex-row flex--between">
      <transaction-graph class="analytic-page__graph"></transaction-graph>
      <transaction-pie class="analytic-page__pie"></transaction-pie>
    </div>
    <transaction-list class="analytic-page__list"></transaction-list>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    await store.dispatch("dashboard/fetchTransactionGraph", { days: 9 });
    await store.dispatch("dashboard/fetchTransactionPie");
  },
  components: {
    TransactionList: () =>
      import("@/components/Dashboard/Earning/TransactionList"),
    TransactionGraph: () =>
      import("@/components/Dashboard/Earning/TransactionGraph"),
    TransactionPie: () =>
      import("@/components/Dashboard/Earning/TransactionPie")
  }
};
</script>

<style lang="scss">
.analytic-page {
  // display: grid;
  // grid-template-areas: "header header" "graph pie" "list list ";
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
    margin-top: 1rem;
  }
}
</style>
