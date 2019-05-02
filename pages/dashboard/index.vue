<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="user-dashboard__content">
      <ViewBarGraph class="user-dashboard__view" height="300px"></ViewBarGraph>
      <comment-list class="user-dashboard__comment-list"></comment-list>
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

  $self: &;
  &__content {
    display: grid;
    margin-top: 1rem;
    grid-template-areas: "views views views" "commentlist . .";
    grid-gap: 10px;

    #{$self}__view {
      grid-area: views;
    }
    #{$self}__comment-list {
      grid-area: commentlist;
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
