<template>
  <div class="analytic-page">
    <header class="analytic-page__header">アナリティクス</header>
    <main-graph></main-graph>
    <div class="flex-divider flex-row flex--between">
      <!-- <transaction-graph class="analytic-page__graph"></transaction-graph> -->
      <funnel-graph></funnel-graph>
      <pie-graph class="analytic-page__pie"></pie-graph>
    </div>
    <transaction-list class="analytic-page__list"></transaction-list>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    // await store.dispatch("dashboard/fetchTransactionGraph", { time:  });
    await store.dispatch("dashboard/fetchTransactionPie");
  },
  components: {
    PieGraph: () => import("@/components/Dashboard/Graphs/Pie"),
    MainGraph: () => import("@/components/Dashboard/Graphs/Main"),
    FunnelGraph: () => import("@/components/Dashboard/Graphs/Funnel")
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
    margin-bottom: 1rem;
  }
  &__list {
    grid-area: list;
    margin-top: 1rem;
  }
}
</style>
