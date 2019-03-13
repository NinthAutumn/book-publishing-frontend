<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="graphs flex flex--right">
      <div class="graph">
        <no-ssr>
          <ve-histogram height="300px" :settings="chartSetting" :data="chartData"></ve-histogram>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import Analytics from "@/components/Dashboard/Analytics";
export default {
  layout: "user-nav/User",
  async fetch({ store, params }) {
    await store.dispatch("dashboard/fetchTotalViews");
  },
  components: { Analytics },
  created() {
    console.log();
  },
  mounted() {
    this.$store.getters["dashboard/getTotalViews"].forEach(stat => {
      if (this.chartData.columns.indexOf(stat._id.book[0]) === -1) {
        this.chartData.columns.push(stat._id.book[0]);
      }

      this.chartData.rows.push({
        date: stat._id.day,
        [stat._id.book[0]]: stat.sum
      });
    });
  },
  data() {
    return {
      chartSetting: {},
      chartData: {
        columns: ["date"],
        rows: []
      }
    };
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
  padding: 10px;
  width: 500px;
  margin-top: 30px;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgb(233, 233, 233);
  border-radius: 5px;
}
#line-chart {
}
</style>
