<template>
  <div class="views-bargraph">
    <no-ssr>
      <ve-histogram :height="height" :settings="chartSetting" :data="chartData"></ve-histogram>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: ["height"],
  async created() {
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
</style>
