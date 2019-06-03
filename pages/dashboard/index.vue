<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="user-dashboard__content">
      <div class="flex-divider flex-row" style=" margin-bottom: 2rem;">
        <ViewBarGraph class="user-dashboard__view" height="300px"></ViewBarGraph>
        <comment-list class="user-dashboard__comment-list"></comment-list>
      </div>
      <div class="flex-divider flex-row" style="flex-direction:row-reverse;flex-wrap:wrap;">
        <transaction-list class="user-dashboard__transaction-list"></transaction-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  props: {},
  async fetch({ store, params }) {
    await store.dispatch("analytic/fetchUserViews", { type: 8 });
    await store.dispatch("dashboard/fetchStatistics", { page: 1 });
    await store.dispatch("dashboard/fetchRanking", { type: "daily" });
  },
  components: {
    Analytics: () => import("@/components/Dashboard/Analytics"),
    ViewBarGraph: () => import("@/components/Dashboard/Graphs/Views"),
    CommentList: () => import("@/components/Dashboard/CommentList"),
    TransactionList: () =>
      import("@/components/Dashboard/Earning/TransactionList")
  },
  computed: {},
  created() {},
  mounted() {},
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.user-dashboard {
  position: relative;
  min-height: 100vh;
  $self: &;
  &__content {
    /* autoprefixer: ignore next */
    display: flex;
    /* autoprefixer: ignore next */
    flex-direction: column;

    margin-top: 1rem;
    /* autoprefixer: ignore next */
    grid-template-areas: "views views views" "transactions transactions commentlist";
    /* autoprefixer: ignore next */
    grid-gap: 10px;
    // margin-bottom: 1rem;
    padding-bottom: 10px;
    #{$self}__view {
      flex-grow: 1;
    }
    #{$self}__comment-list {
      grid-area: commentlist;
      margin-left: 2rem;
    }
    #{$self}__transaction-list {
      width: 100%;
      grid-area: transactions;
    }
  }
  &__header {
    header {
      font-size: 30px;
    }
    .write-book {
      height: 45px;
      width: 150px;
      font-size: 16px;
    }
  }
  .analytics-overview {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    background-color: #fff;
    th {
      font-size: 20px;
    }
    td {
      text-align: center;
      font-size: 16px;
    }
  }
}

#line-chart {
}
</style>
