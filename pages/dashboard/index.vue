<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="graphs flex-row flex--between">
      <comment-list></comment-list>
      <ViewBarGraph height="300px"></ViewBarGraph>
    </div>
  </div>
</template>

<script>
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    await store.dispatch("analytic/fetchUserViews");
  },
  components: {
    Analytics: () => import("@/components/Dashboard/Analytics"),
    ViewBarGraph: () => import("@/components/Dashboard/Graphs/Views"),
    CommentList: () => import("@/components/Dashboard/CommentList")
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
  min-height: 100vh;
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
.graphs {
  margin-top: 20px;
  // overflow: hidden;
}
#line-chart {
}
</style>
