<template>
  <div class="user-dashboard">
    <div class="user-dashboard__header flex flex--align flex--between">
      <header>ダッシュボード</header>
    </div>
    <Analytics></Analytics>
    <div class="graph">
      <ve-line :settings="chartSetting" :data="chartData"></ve-line>
    </div>
  </div>
</template>

<script>
import Analytics from "@/components/Dashboard/Analytics";
export default {
  layout: "user-nav/User",
  components: { Analytics },
  data() {
    return {
      chartSetting: {
        area: true
        // xAxisType: "value"
      },
      chartData: {
        columns: ["date", "sales"],
        rows: [
          { date: "1月1日", sales: 123 },
          { date: "1月2日", sales: 1223 },
          { date: "1月3日", sales: 2123 },
          { date: "1月4日", sales: 4123 },
          { date: "1月5日", sales: 3123 },
          { date: "1月6日", sales: 7123 }
        ]
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
#line-chart {
}
</style>
