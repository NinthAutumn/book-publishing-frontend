<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="graphs flex flex--right">
      <ViewBarGraph height="300px"></ViewBarGraph>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    await store.dispatch("dashboard/fetchTotalViews");
  },
  components: {
    Analytics: () => import("@/components/Dashboard/Analytics"),
    ViewBarGraph: () => import("@/components/Dashboard/Graphs/Views")
  },
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
  height: 100vh;
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
.graph {
  // overflow: hidden;
}
#line-chart {
}
</style>
