<template>
  <div class="funnel-graph">
    <div class="funnel-graph__header">
      <div class="funnel-graph__title">作品ファネル</div>
    </div>
    <div class="funne-graph__graph">
      <no-ssr>
        <ve-funnel :data="chartData" :settings="chartSetting"></ve-funnel>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["status", "value"],
        rows: []
      },
      chartSetting: {
        dimension: "status",
        useDefaultOrder: true,
        ascending: true,
        metrics: "value"
        // scale: [true, true]
      }
    };
  },
  async mounted() {
    await this.$store
      .dispatch("dashboard/fetchBookFunnel", { bookId: 577 })
      .then(data => {
        let row = Object.keys(data);
        row.forEach(item => {
          let object = {
            status: item,
            value: data[item]
          };
          this.chartData.rows.push(object);
        });
      });
  }
};
</script>

<style lang="scss">
.funnel-graph {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(60, 66, 87, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);
  border-radius: 5px;
  $self: &;
  margin-bottom: 1rem;
  width: 49%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    #{$self}__title {
      font-size: 1.6rem;
      padding: 2rem;
      font-weight: bold;
    }
  }
  &__graph {
  }
}
</style>
