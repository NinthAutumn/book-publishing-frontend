<template>
  <div class="transaction-pie">
    <div class="transaction-pie__header">作品購入パイチャート</div>
    <div class="transaction-pie__pie">
      <ve-pie height="50rem" :data="chartData" :settings="chartSetting"></ve-pie>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartSetting: {
        nullAddZero: true,
        offsetY: 300,
        radius: 90
        // scale: [true, true]
      },
      chartData: {
        columns: ["book", "sum"],
        rows: []
      }
    };
  },
  computed: {
    transaction() {
      return this.$store.getters["dashboard/getTransactionPie"];
    }
  },
  async mounted() {
    this.transaction.forEach(item => {
      this.chartData.rows.push({ book: item.title, sum: item.sum });
    });
  }
};
</script>

<style lang="scss">
.transaction-pie {
  width: 49%;
  margin-right: 0;
  padding: 1rem;
  background-color: #fff;
  // width: 50%;
  // height: 50rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  // position: relative;
  &__header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  &__pie {
  }
}
</style>
