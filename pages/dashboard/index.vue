<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="user-dashboard__content">
      <div class="flex-divider flex-row" style=" margin-bottom: 2rem;">
        <comment-list class="user-dashboard__comment-list"></comment-list>
        <ViewBarGraph class="user-dashboard__view" height="300px"></ViewBarGraph>
      </div>
      <div class="flex-divider flex-row" style="flex-direction:row-reverse;flex-wrap:wrap;">
        <transaction-list class="user-dashboard__transaction-list"></transaction-list>
      </div>
    </div>
  </div>
</template>

<script>
import { hydrateWhenVisible } from "vue-lazy-hydration";
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    await store.dispatch("analytic/fetchUserViews", { type: 8 });
    await store.dispatch("dashboard/fetchStatistics", { page: 1 });
    await store.dispatch("dashboard/fetchRanking", { type: "daily" });
  },
  components: {
    Analytics: hydrateWhenVisible(() =>
      import("@/components/Dashboard/Analytics")
    ),
    ViewBarGraph: hydrateWhenVisible(() =>
      import("@/components/Dashboard/Graphs/Views")
    ),
    CommentList: hydrateWhenVisible(() =>
      import("@/components/Dashboard/CommentList")
    ),
    TransactionList: hydrateWhenVisible(() =>
      import("@/components/Dashboard/Earning/TransactionList")
    )
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
      margin-left: 2rem;
      width: 100%;
    }
    #{$self}__comment-list {
      grid-area: commentlist;
      // flex-grow: 1;
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
