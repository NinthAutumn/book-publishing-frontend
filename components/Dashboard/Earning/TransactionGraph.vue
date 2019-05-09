
<template>
  <div class="transaction-graph">
    <div class="transaction-graph__header">購入グラフ</div>
    <div class="transaction-graph__graph">
      <no-ssr>
        <ve-line heigh="50rem" ref="view-bar" :settings="chartSetting" :data="chartData"></ve-line>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartSetting: {
        nullAddZero: true,
        area: true,
        offsetY: 300
        // scale: [true, true]
      },
      chartData: {
        columns: ["date"],
        rows: []
      },
      height: "30rem"
    };
  },
  computed: {
    transaction() {
      return this.$store.getters["dashboard/getTransactionGraph"];
    }
  },
  mounted: async function() {
    let row = Object.keys(this.transaction);
    let i = 8;
    while (i >= 0) {
      let date = this.$moment()
        .subtract(i, "days")
        .format("YYYY-MM-DD");
      this.chartData.rows.push({ date });
      i--;
    }
    row.forEach(item => {
      this.chartData.rows.forEach((el, index) => {
        if (el.date === item) {
          this.object = {
            date: item
          };
          this.transaction[item].forEach(book => {
            if (this.chartData.columns.indexOf(book.title) === -1) {
              this.chartData.columns.push(book.title);
            }
            this.object[book.title] = book.sum;
          });
          this.chartData.rows[index] = this.object;
        }
      });
    });
  }
};
</script>

<style lang="scss">
.transaction-graph {
  width: 49%;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  // position: relative;
  &__header {
    font-size: 1.6rem;
    font-weight: bold;
    padding: 2rem 1rem;
  }
  &__graph {
    // width: 50rem;
    // height: 50rem;
  }
}
</style>
